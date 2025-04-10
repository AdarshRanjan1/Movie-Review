import app from './server.js';
import { MongoClient } from 'mongodb';
import reviewsDAO from './dao/reviewsDAO.js';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 8000;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  tlsAllowInvalidCertificates: true
});

async function startServer() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected");

    await reviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });

  } catch (e) {
    console.error("❌ MongoDB connection failed:", e);
    process.exit(1);
  }
}

startServer();
