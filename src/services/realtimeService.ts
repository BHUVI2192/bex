
// Singleton pattern to manage SSE connections
class RealtimeService {
  private static instance: RealtimeService;
  private listeners: { [key: string]: ((data: any) => void)[] } = {};
  private eventSource: EventSource | null = null;
  private reconnectTimer: number | null = null;
  private isConnecting: boolean = false;
  private apiUrl: string;

  private constructor() {
    // Get API URL from environment variable or use default
    this.apiUrl = import.meta.env.VITE_API_URL || '';
    
    // Initialize SSE connection only if API URL is available
    if (this.apiUrl) {
      this.connect();
    } else {
      console.warn('VITE_API_URL is not defined. SSE connection will not be established.');
    }
  }

  static getInstance(): RealtimeService {
    if (!RealtimeService.instance) {
      RealtimeService.instance = new RealtimeService();
    }
    return RealtimeService.instance;
  }

  private connect() {
    // Avoid multiple connection attempts
    if (this.isConnecting || this.eventSource) {
      return;
    }

    this.isConnecting = true;

    try {
      // Using a cloud function URL for SSE
      const url = `${this.apiUrl}/realtime-updates`;
      console.log(`Connecting to SSE endpoint: ${url}`);
      
      this.eventSource = new EventSource(url);

      this.eventSource.onopen = () => {
        console.log('SSE connection established');
        this.isConnecting = false;
        // Clear any reconnect timer
        if (this.reconnectTimer) {
          clearTimeout(this.reconnectTimer);
          this.reconnectTimer = null;
        }
      };

      this.eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('SSE message received:', data);
          if (data.type && this.listeners[data.type]) {
            this.listeners[data.type].forEach(callback => callback(data.payload || data));
          }
        } catch (error) {
          console.error('Error parsing SSE message:', error);
        }
      };

      this.eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
        this.isConnecting = false;
        
        // Close the connection
        if (this.eventSource) {
          this.eventSource.close();
          this.eventSource = null;
        }
        
        // Attempt to reconnect after 5 seconds
        this.reconnectTimer = window.setTimeout(() => {
          console.log('Attempting to reconnect SSE...');
          this.connect();
        }, 5000);
      };
    } catch (error) {
      console.error('Error setting up SSE connection:', error);
      this.isConnecting = false;
    }
  }

  subscribe(eventType: string, callback: (data: any) => void): () => void {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
    
    // If we have an event source but it's not connected, try to reconnect
    if (!this.eventSource && !this.isConnecting && this.apiUrl) {
      this.connect();
    }

    console.log(`Subscribed to ${eventType} events`);

    // Return unsubscribe function
    return () => {
      console.log(`Unsubscribed from ${eventType} events`);
      if (this.listeners[eventType]) {
        this.listeners[eventType] = this.listeners[eventType].filter(cb => cb !== callback);
        
        // If no more listeners for this event type, remove the key
        if (this.listeners[eventType].length === 0) {
          delete this.listeners[eventType];
        }
      }
      
      // If no more listeners at all, disconnect
      if (Object.keys(this.listeners).length === 0) {
        this.disconnect();
      }
    };
  }

  disconnect() {
    if (this.eventSource) {
      console.log('Disconnecting SSE');
      this.eventSource.close();
      this.eventSource = null;
    }
    
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    
    this.listeners = {};
  }
}

export const realtimeService = RealtimeService.getInstance();
