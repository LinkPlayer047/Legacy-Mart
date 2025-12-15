import connectToDB from "@/lib/db";
import Product from "@/models/product";
import cloudinary from "@/lib/cloudinary";

// GET single product
export async function GET(req, { params }) {
  try {
    await connectToDB();

    const product = await Product.findById(params.id);
    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json(product);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// UPDATE product
export async function PUT(req, { params }) {
  try {
    await connectToDB();

    const product = await Product.findById(params.id);
    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    const formData = await req.formData();

    product.name = formData.get("name") || product.name;
    product.price = formData.get("price") || product.price;
    product.description =
      formData.get("description") || product.description;

    const files = formData.getAll("images");

    if (files.length > 0) {
      // delete old images from cloudinary
      for (const img of product.images) {
        await cloudinary.uploader.destroy(img.public_id);
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

      product.images = uploadedImages;
    }

    await product.save();

    return Response.json(product);
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    const product = await Product.findById(params.id);
    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    for (const img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await product.deleteOne();

    return Response.json({ message: "Product deleted successfully" });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
