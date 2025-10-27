import { getDB } from "@/lib/server/mongo";
import { ObjectId } from "mongodb";
import { unlink } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export async function GET(req) {
  try {
    const db = await getDB();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const id = searchParams.get("id");

    let query = {};

    if (id) {
      query = { _id: new ObjectId(id) };
    } else if (slug) {
      query = { slug };
    }

    const products = await db.collection("products").find(query).toArray();
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "public, s-maxage=86400, max-age=3600, stale-while-revalidate=60",
      },
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
    const now = new Date();
    if (body._id) {
      const { _id, ...updateData } = body;
      const result = await db
        .collection("products")
        .updateOne(
          { _id: new ObjectId(_id) },
          { $set: { ...updateData, updated_at: now } }
        );
      if (result.matchedCount === 0) {
        return new Response(JSON.stringify({ message: "Product not found" }), {
          status: 404,
        });
      }
      return new Response(
        JSON.stringify({ message: "Product updated successfully", _id }),
        { status: 200 }
      );
    }
    delete body._id;
    const product = {
      ...body,
      created_at: now,
      updated_at: now,
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
    return new Response(JSON.stringify({ message: "Failed to save product" }), {
      status: 500,
    });
  }
}
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ message: "ID required" }), {
        status: 400,
      });
    }
    const db = await getDB();
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });
    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }
    const deleteResult = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });
    if (deleteResult.deletedCount === 0) {
      return new Response(
        JSON.stringify({ message: "Failed to delete from DB" }),
        { status: 500 }
      );
    }
    const imageUrls = product.banner || [];
    const deletePromises = imageUrls.map(async (imageUrl) => {
      try {
        const filename = path.basename(imageUrl);
        const filePath = path.join(
          process.cwd(),
          "public",
          "uploads",
          "products",
          filename
        );
        await unlink(filePath);
      } catch (err) {
        if (err.code !== "ENOENT") {
          console.error(`Failed to delete image ${imageUrl}:`, err);
        }
      }
    });
    await await Promise.all(deletePromises);
    return new Response(
      JSON.stringify({ message: "Product and images deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
