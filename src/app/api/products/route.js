import connectToDB from "@/lib/db";
import Product from "@/models/products";
import cloudinary from "@/lib/cloudinary";
import { corsHeaders } from "@/lib/cors";

// Preflight
export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders });
}

export async function GET() {
  try {
    await connectToDB();
    const products = await Product.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(req) {
  try {
    await connectToDB();

    const formData = await req.formData();

    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");
    const files = formData.getAll("images");

    if (!name || !price || files.length === 0) {
      return new Response(
        JSON.stringify({ error: "Missing fields" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const uploadedImages = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "products" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        ).end(buffer);
      });

      uploadedImages.push({
        url: uploadRes.secure_url,
        public_id: uploadRes.public_id,
      });
    }

    const product = await Product.create({
      name,
      price,
      description,
      images: uploadedImages,
    });

    return new Response(JSON.stringify(product), {
      status: 201,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}
