import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;
const options = {};
let client;
let clientPromise;
if (!uri) {
  if (process.env.NODE_ENV === "production") {
    console.warn(
      "⚠️ MONGODB_URI is not defined — make sure it's set in Cloud Run variables/secrets."
    );
  } else {
    console.warn(
      "⚠️ MONGODB_URI missing. Define it in your .env for local development."
    );
  }
}
if (uri) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}
export default clientPromise;
export async function getDB(dbName = "Jeevan") {
  if (!clientPromise) {
    throw new Error("MongoDB client not initialized — missing MONGODB_URI");
  }
  const client = await clientPromise;
  return client.db(dbName);
}
