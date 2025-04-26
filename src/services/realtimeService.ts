
// Singleton pattern to manage SSE connections
class RealtimeService {
  private static instance: RealtimeService;
  private listeners: { [key: string]: ((data: any) => void)[] } = {};
  private eventSource: EventSource | null = null;

  private constructor() {
    // Initialize SSE connection
    this.connect();
  }

  static getInstance(): RealtimeService {
    if (!RealtimeService.instance) {
      RealtimeService.instance = new RealtimeService();
    }
    return RealtimeService.instance;
  }

  private connect() {
    // Using a cloud function URL for SSE
    const url = `${import.meta.env.VITE_API_URL}/realtime-updates`;
    this.eventSource = new EventSource(url);

    this.eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type && this.listeners[data.type]) {
          this.listeners[data.type].forEach(callback => callback(data.payload));
        }
      } catch (error) {
        console.error('Error parsing SSE message:', error);
      }
    };

    this.eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      // Attempt to reconnect after 5 seconds
      setTimeout(() => this.connect(), 5000);
    };
  }

  subscribe(eventType: string, callback: (data: any) => void) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);

    // Return unsubscribe function
    return () => {
      this.listeners[eventType] = this.listeners[eventType].filter(cb => cb !== callback);
    };
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}

export const realtimeService = RealtimeService.getInstance();
