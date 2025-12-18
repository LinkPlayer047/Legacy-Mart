"use client";
import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { TbZoomScanFilled } from "react-icons/tb";
import axios from "axios";

const Productreviews2 = () => {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const imgRef = useRef();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
        setMainImage(res.data.images?.[0]?.url);
        setSelectedColor(res.data.colors?.[0]?.hex || null);
      } catch (err) {
        console.error(err);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">Loading...</div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-20 text-center text-gray-500">
        Product not found 😕
      </div>
    );
  }

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="py-20 bg-white">
      <div className="mycontainer2 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LEFT SIDE: Image Section */}
        <div className="space-y-3">
          <div
            className="relative w-full overflow-hidden"
            ref={imgRef}
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={mainImage || product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                zoom ? "scale-150" : "scale-100"
              }`}
              style={{ transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }}
            />
            <button
              onClick={() => {
                setCurrentIndex(product?.images.indexOf(mainImage));
                setIsLightboxOpen(true);
              }}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
            >
              <TbZoomScanFilled />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex mt-5 gap-2 justify-start">
            {product?.images?.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImage(img.url)}
                className={`border overflow-hidden ${
                  mainImage === img
                    ? "border-red-500"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <img
                  src={img.url}
                  alt={`thumb-${i}`}
                  className="w-50 h-40 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* LIGHTBOX */}
        {isLightboxOpen && (
          <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
              fullscreen ? "bg-black" : "bg-black/90"
            }`}
          >
            <div className="absolute top-4 left-5 text-white text-sm">
              {currentIndex + 1} / {product?.images?.length}
            </div>
            <div className="absolute top-4 right-5 flex gap-4 text-white">
              <button
                onClick={() => setFullscreen((prev) => !prev)}
                className="text-2xl hover:text-gray-300"
              >
                {fullscreen ? "🗗" : "🗖"}
              </button>
              <button
                onClick={() => {
                  setFullscreen(false);
                  setIsLightboxOpen(false);
                }}
                className="text-2xl font-bold hover:text-gray-300"
              >
                ✖
              </button>
            </div>
            <button
              className="absolute left-8 text-white text-3xl font-bold hover:text-gray-300"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === 0 ? product?.images?.length - 1 : prev - 1
                )
              }
            >
              ≪
            </button>
            <img
              src={product?.images[currentIndex]?.url}
              alt="Zoomed"
              className={`transition-all duration-500 rounded-xl ${
                fullscreen
                  ? "w-screen h-screen object-contain"
                  : "max-h-[80vh] max-w-[80vw] object-contain"
              }`}
            />
            <button
              className="absolute right-8 text-white text-3xl font-bold hover:text-gray-300"
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev === product?.images?.length - 1 ? 0 : prev + 1
                )
              }
            >
              ≫
            </button>
          </div>
        )}

        {/* RIGHT SIDE: Product Details */}
        <div className="space-y-4">
          {/* Breadcrumb */}
          <div className="text-gray-500 text-md flex flex-wrap gap-1 items-center">
            <span
              onClick={() => router.push("/everything")}
              className="cursor-pointer hover:text-black"
            >
              Home
            </span>
            <span>/</span>
            <span
              onClick={() => router.push(`/shop?category=${product?.category}`)}
              className="cursor-pointer hover:text-black"
            >
              {product?.category}
            </span>
            <span>/</span>
            <span className="text-black font-semibold">{product?.title}</span>
          </div>

          <h2 className="text-md font-semibold text-black">
            {product?.category}
          </h2>
          <h1 className="text-2xl font-bold">{product?.title}</h1>

          <p className="text-2xl font-semibold">₨ {product.price}.00</p>

          <p className="text-gray-500 leading-relaxed">{product?.description}</p>

          {/* Add to Cart Section */}
          <div className="mt-6 border-b border-gray-300 pb-7">
            <p className="text-2xl font-bold mb-3">₨ {product.price}.00</p>

            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex border border-gray-300">
                <button
                  className="px-3 py-2 text-xl"
                  onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                >
                  -
                </button>
                <span className="px-4 py-2 border border-gray-200 text-md">
                  {quantity}
                </span>
                <button
                  className="px-3 py-2 text-xl"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
                  const existingItem = storedCart.find((item) => item.name === product.name);

                  let updatedCart;
                  if (existingItem) {
                    updatedCart = storedCart.map((item) =>
                      item.name === product.name
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                    );
                  } else {
                    updatedCart = [
                      ...storedCart,
                      {
                        name: product.name,
                        price: product.price,
                        category: product.category,
                        image: product.image,
                        quantity: quantity,
                      },
                    ];
                  }

                  localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                  router.push("/cart");
                }}
                className="px-6 py-3 rounded-full text-white font-semibold transition bg-[#fc001d] hover:bg-[#e51931]"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mycontainer py-10">
        <div className="border-t border-gray-300 flex gap-6 overflow-x-auto">
          {["description", "additional", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 font-semibold text-sm md:text-base ${
                activeTab === tab
                  ? "border-t-2 border-[#525252] text-[#6e6d6e]"
                  : "text-gray-600 hover:text-gray-500"
              }`}
            >
              {tab === "description"
                ? "Description"
                : tab === "additional"
                ? "Additional Information"
                : "Reviews (0)"}
            </button>
          ))}
        </div>

        <div className="pt-6 text-gray-700">
          {activeTab === "description" && <p>{product.description}</p>}

          {activeTab === "additional" && (
            <div className="mt-2">
              <table className="min-w-full border border-gray-200 rounded-md">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-semibold w-1/4">
                      Available Sizes
                    </th>
                    <td className="p-3 text-gray-700">
                      {(product.sizes || []).map((s) => s.label).join(", ")}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-semibold">Colors</th>
                    <td className="p-3 text-gray-700">
                      {(product.colors || []).map((c) => c.name).join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left p-3 font-semibold">Category</th>
                    <td className="p-3 text-gray-700">{product.category || "-"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="mt-4 border border-gray-300 p-6 rounded-md">
              <p className="text-gray-600 mb-5">There are no reviews yet.</p>
              <h3 className="font-semibold text-lg mb-4">
                Be the first to review “{product.title}”
              </h3>

              {/* Rating */}
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => rating === 0 && setHover(star)}
                    onMouseLeave={() => rating === 0 && setHover(0)}
                    className={`text-2xl cursor-pointer ${
                      (hover || rating) >= star ? "text-orange-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                rows="4"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none mb-4"
                placeholder="Write your review..."
              ></textarea>

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-md p-2 mb-3"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
              />

              <button className="bg-[#e63946] text-white px-6 py-2 rounded-full hover:bg-[#d62828] transition">
                SUBMIT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Productreviews2;
