import { getDB } from "@/lib/server/mongo";
import { ObjectId } from "mongodb";
export const runtime = "nodejs";
export async function GET(req) {
  try {
    const db = await getDB();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const query = slug ? { slug } : {};
    const products = await db.collection("products").find(query).toArray();
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET Error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch products" }),
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    const body = await req.json();
    const db = await getDB();
    if (body._id) delete body._id;
    const product = {
      ...body,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const result = await db.collection("products").insertOne(product);
    return new Response(
      JSON.stringify({
        message: "Product added successfully",
        insertedId: result.insertedId,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("POST Error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to create product" }),
      { status: 500 }
    );
  }
}
