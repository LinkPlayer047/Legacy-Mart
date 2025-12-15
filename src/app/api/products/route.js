import connectToDB from "@/lib/db";
import Product from "@/models/products";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    await connectToDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return Response.json(products);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
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
      return Response.json(
        { error: "Name, price and images are required" },
        { status: 400 }
      );
    }

    const uploadedImages = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

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

    return Response.json(product, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
