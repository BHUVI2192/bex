
import axios from 'axios';

// MongoDB Atlas API endpoint
// For security reasons, this should be moved to environment variables in production
const API_URL = "https://us-east-1.aws.data.mongodb-api.com/app/data-yourapp/endpoint/data/v1";
const API_KEY = "YOUR_MONGODB_API_KEY"; // Replace with your actual API key
const DATA_SOURCE = "Cluster0"; // Replace with your MongoDB Atlas cluster name
const DATABASE = "esports_news"; // Your database name
const COLLECTION = "news"; // Your collection name

// Types
export interface NewsArticle {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  date: string;
  description: string;
  imageurl: string;
  source: string;
  isverified: boolean;
}

// Base headers for all requests
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'api-key': API_KEY,
});

// Get all news articles
export const getAllNews = async (): Promise<NewsArticle[]> => {
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/action/find`,
      headers: getHeaders(),
      data: {
        dataSource: DATA_SOURCE,
        database: DATABASE,
        collection: COLLECTION,
        sort: { date: -1 },
      },
    });
    
    console.log("MongoDB response:", response.data);
    return response.data.documents || [];
  } catch (error) {
    console.error("Error fetching news from MongoDB:", error);
    throw error;
  }
};

// Add a news article
export const addNewsArticle = async (article: NewsArticle): Promise<{ insertedId: string }> => {
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/action/insertOne`,
      headers: getHeaders(),
      data: {
        dataSource: DATA_SOURCE,
        database: DATABASE,
        collection: COLLECTION,
        document: {
          ...article,
          id: new Date().getTime().toString(), // Generate an id if not provided
          _id: { $oid: new Date().getTime().toString() } // MongoDB requires this format
        },
      },
    });
    
    console.log("MongoDB insert response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding news to MongoDB:", error);
    throw error;
  }
};

// Delete a news article
export const deleteNewsArticle = async (id: string): Promise<{ deletedCount: number }> => {
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/action/deleteOne`,
      headers: getHeaders(),
      data: {
        dataSource: DATA_SOURCE,
        database: DATABASE,
        collection: COLLECTION,
        filter: { id },
      },
    });
    
    console.log("MongoDB delete response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting news from MongoDB:", error);
    throw error;
  }
};

// Update a news article
export const updateNewsArticle = async (id: string, updates: Partial<NewsArticle>): Promise<{ modifiedCount: number }> => {
  try {
    const response = await axios({
      method: 'post',
      url: `${API_URL}/action/updateOne`,
      headers: getHeaders(),
      data: {
        dataSource: DATA_SOURCE,
        database: DATABASE,
        collection: COLLECTION,
        filter: { id },
        update: { $set: updates },
      },
    });
    
    console.log("MongoDB update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating news in MongoDB:", error);
    throw error;
  }
};
