import connectToDB from "@/lib/db";
import Product from "@/models/products";
import cloudinary from "@/lib/cloudinary";
import { corsHeaders } from "@/lib/cors";

// Preflight
export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders });
}

// GET single product
export async function GET(req, { params }) {
  try {
    await connectToDB();
    const product = await Product.findById(params.id);
    if (!product) return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: corsHeaders });
    return new Response(JSON.stringify(product), { status: 200, headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
  }
}

// PUT update product
export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const product = await Product.findById(params.id);
    if (!product) return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: corsHeaders });

    const formData = await req.formData();
    product.name = formData.get("name") || product.name;
    product.price = formData.get("price") || product.price;
    product.description = formData.get("description") || product.description;
    product.sale = formData.get("sale") || product.sale;
    product.colors = formData.getAll("colors[]") || product.colors;
    product.sizes = formData.getAll("sizes[]") || product.sizes;

    const files = formData.getAll("images");
    if (files.length > 0) {
      for (const img of product.images) await cloudinary.uploader.destroy(img.public_id);

      const uploadedImages = [];
      for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadRes = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ folder: "products" }, (err, result) => err ? reject(err) : resolve(result)).end(buffer);
        });
        uploadedImages.push({ url: uploadRes.secure_url, public_id: uploadRes.public_id });
      }
      product.images = uploadedImages;
    }

    await product.save();
    return new Response(JSON.stringify(product), { status: 200, headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
  }
}

// DELETE product
export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const product = await Product.findById(params.id);
    if (!product) return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: corsHeaders });

    for (const img of product.images) await cloudinary.uploader.destroy(img.public_id);
    await product.deleteOne();

    return new Response(JSON.stringify({ message: "Deleted" }), { status: 200, headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
  }
}
