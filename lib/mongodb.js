import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise = null;

// If no URI is provided, we will use the in-memory fallback storage instead of
// throwing. This is useful for local dev where a MongoDB isn't configured.
if (uri) {
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
} else {
  console.warn('MONGODB_URI not set — using in-memory fallback storage');
}

// Fallback to local storage if MongoDB fails
const fallbackStorage = {
  users: new Map(),
  candidates: new Map(),
  hrAccounts: new Map()
};

export async function connectToDatabase() {
  try {
    if (!clientPromise) {
      // No MongoDB configured — use fallback
      return { db: fallbackStorage, client: null, usingFallback: true };
    }

    const client = await clientPromise;
    const db = client.db('simple-crm');
    return { db, client, usingFallback: false };
  } catch (error) {
    console.error('MongoDB connection failed, using fallback storage:', error.message);
    return { db: fallbackStorage, client: null, usingFallback: true };
  }
}