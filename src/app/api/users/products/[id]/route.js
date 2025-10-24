import { ObjectId } from "mongodb";
import { getDB } from "@/lib/server/mongo";
export const runtime = "nodejs";
export async function GET(req, context) {
  try {
    const params = await context.params;
    const db = await getDB();
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(params.id) });
    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("GET ONE Error:", error);
    return new Response(JSON.stringify({ message: "Error fetching product" }), {
      status: 500,
    });
  }
}
export async function PUT(req, context) {
  try {
    const params = await context.params;
    const db = await getDB();
    const body = await req.json();
    await db
      .collection("products")
      .updateOne(
        { _id: new ObjectId(params.id) },
        { $set: { ...body, updated_at: new Date() } }
      );
    return new Response(
      JSON.stringify({ message: "Product updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT Error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update product" }),
      { status: 500 }
    );
  }
}
export async function DELETE(req, context) {
  try {
    const params = await context.params;
    const db = await getDB();
    await db.collection("products").deleteOne({
      _id: new ObjectId(params.id),
    });
    return new Response(
      JSON.stringify({ message: "Product deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete product" }),
      { status: 500 }
    );
  }
}
