

"use client";
import React, { useEffect, useMemo, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { Lato } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: ["700"] });

const Aproducts2 = () => {
  // UI / behavior state
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest"); // newest, name-asc, price-asc, price-desc
  const [currentPage, setCurrentPage] = useState(1);

  // Page size: 12 products per page (4 rows × 3 cols)
  const PAGE_SIZE = 12;

  // -------------------------
  // static product data (you can replace this with data fetched from backend)
  // -------------------------
  const products = [
    { id: 1, name: "Bright Gold Purse With Chain", category: "Accessories", price: 1600, image: "/17.jpg" },
    { id: 2, name: "Anchore Bracelet", category: "Accessories", price: 1800, image: "/7.jpg" },
    { id: 3, name: "BOHO Bangle Bracelet", category: "Accessories", price: 2000, image: "/8.jpg" },
    { id: 4, name: "BUDHHA Bracelet", category: "Accessories", price: 2000, image: "/12.jpg" },
    { id: 5, name: "Black Over The Shoulder HandBag", category: "Accessories", price: 2000, image: "/14.jpg" },
    

    // you can add more products here. If count > PAGE_SIZE they will go to page 2 automatically
    // { id: 13, name: "New Product", category: "Men", price: 2200, image: "/new.jpg" },
  ];

  // derive category list from products (unique)
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  // -------------------------
  // Cart logic (localStorage)
  // -------------------------
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCart);
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cartItems];
    const existingItem = updatedCart.find((item) => item.name === product.name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    // small non-blocking UX feedback (you can replace alert with toast)
    alert(`${product.name} added to cart! ✅`);
  };

  // -------------------------
  // Filtering + Sorting logic
  // -------------------------
  const filteredAndSorted = useMemo(() => {
    // 1. filter
    let list = products;
    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // 2. sort
    if (sortOption === "newest") {
      // assume higher id = newer
      list = [...list].sort((a, b) => b.id - a.id);
    } else if (sortOption === "name-asc") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, selectedCategory, sortOption]);

  // -------------------------
  // Pagination logic
  // -------------------------
  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / PAGE_SIZE));

  // If current page becomes invalid (e.g., after filtering), clamp it
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  // slice for current page
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentPageProducts = filteredAndSorted.slice(startIndex, startIndex + PAGE_SIZE);

  // helper to go to specific page
  const goToPage = (page) => {
    const p = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(p);
    // scroll to top of product list (optional)
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  // If products array changes (e.g., new product added), optionally jump to last page where new item lives:
  useEffect(() => {
    // find if last product id > last id of current filtered list; for static array not needed.
    // if you append product dynamically you can set logic to go to page containing new product
    // Example: automatically move to last page when products length increases
    // Uncomment if you want auto-jump on new product additions:
    // if (products.length > PAGE_SIZE && currentPage === 1) {
    //   goToPage(Math.ceil(products.length / PAGE_SIZE));
    // }
  }, [products]);

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="bg-[#f5f7f9] py-20">
      <div className={`max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-start justify-between gap-10 px-5 ${lato.className}`}>
        {/* LEFT FILTER SECTION */}
        <aside className="lg:w-[30%] w-full bg-white rounded-lg shadow-md p-6">
          {/* Search (optional) */}
          <div className="flex items-center w-full border border-gray-300 rounded overflow-hidden">
            <input type="text" placeholder="Search products..." className="w-full px-4 py-2 outline-none" />
            <Link href="/everything">
              <button className="bg-[#0084d6] text-white px-3 py-2 hover:bg-[#0070b3]">
                <IoIosArrowForward className="text-lg" />
              </button>
            </Link>
          </div>

          {/* Price filter preview (static visual) */}
          <div className="pt-6 w-full">
            <h2 className="text-[22px] mb-4 text-gray-800">Filter by Price</h2>
            <div className="relative w-full h-1 bg-gray-300 rounded-full">
              <div className="absolute top-0 left-[20%] right-[30%] h-1 bg-[#0084d6] rounded-full"></div>
              <div className="absolute top-1/2 -translate-y-1/2 left-[20%] w-4 h-4 bg-[#0084d6] rounded-full border-2 border-white shadow"></div>
              <div className="absolute top-1/2 -translate-y-1/2 right-[30%] w-4 h-4 bg-[#0084d6] rounded-full border-2 border-white shadow"></div>
            </div>
            <div className="flex justify-between mt-6 text-gray-700 font-medium">
              <span>₨ 500</span>
              <span>₨ 5000</span>
            </div>
            <button className="mt-5 w-full bg-[#0084d6] text-white py-2 rounded hover:bg-[#0070b3] transition">
              Apply Filter
            </button>
          </div>

          {/* Categories */}
          <div className="pt-8">
            <h1 className="text-[22px] mb-4 font-semibold text-gray-800">Categories</h1>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1); // reset to first page on category change
                  }}
                  className={`text-left px-3 py-2 rounded ${selectedCategory === cat ? "bg-[#0084d6] text-white" : "hover:bg-gray-100"}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[16px]">{cat}</span>
                    {cat !== "All" && <span className="text-gray-500">( {products.filter(p=>p.category===cat).length} )</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT PRODUCTS SECTION */}
        <main className="lg:w-[70%] w-full">
          {/* Header: title + sort */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-[26px] font-semibold text-gray-900">Our Products</h2>

            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">Sort:</label>
              <select
                value={sortOption}
                onChange={(e) => { setSortOption(e.target.value); setCurrentPage(1); }}
                className="border rounded px-3 py-2"
              >
                <option value="newest">Newest</option>
                <option value="name-asc">Name A → Z</option>
                <option value="price-asc">Price low → high</option>
                <option value="price-desc">Price high → low</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPageProducts.length === 0 ? (
              <div className="col-span-full text-center py-20 text-gray-500">No products found.</div>
            ) : (
              currentPageProducts.map((product) => (
                <article key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition">
                  <div className="relative w-full h-64">
                    <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-[16px] font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-gray-500 mb-2">{product.category}</p>
                    <h4 className="text-[#0084d6] font-bold text-[18px] mb-3">₨ {product.price}</h4>
                    <button onClick={() => addToCart(product)} className="bg-[#0084d6] text-white px-5 py-2 rounded hover:bg-[#0070b3] transition">
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{startIndex + 1}</span> — <span className="font-medium">{Math.min(startIndex + PAGE_SIZE, filteredAndSorted.length)}</span> of <span className="font-medium">{filteredAndSorted.length}</span> products
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}
                className={`px-3 py-2 rounded border ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}>
                Prev
              </button>

              {/* page numbers - show up to 7 page buttons intelligently */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  // keep UI small: show first, last, current ±1, and dots
                  if (totalPages > 7) {
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      Math.abs(pageNum - currentPage) <= 1
                    ) {
                      return (
                        <button key={pageNum} onClick={() => goToPage(pageNum)}
                          className={`px-3 py-2 rounded ${pageNum === currentPage ? "bg-[#0084d6] text-white" : "hover:bg-gray-100"}`}>
                          {pageNum}
                        </button>
                      );
                    }
                    if (pageNum === 2 && currentPage > 3) {
                      return <span key={"dots1"} className="px-2">…</span>;
                    }
                    if (pageNum === totalPages - 1 && currentPage < totalPages - 2) {
                      return <span key={"dots2"} className="px-2">…</span>;
                    }
                    return null;
                  } else {
                    return (
                      <button key={pageNum} onClick={() => goToPage(pageNum)}
                        className={`px-3 py-2 rounded ${pageNum === currentPage ? "bg-[#0084d6] text-white" : "hover:bg-gray-100"}`}>
                        {pageNum}
                      </button>
                    );
                  }
                })}
              </div>

              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded border ${currentPage === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"}`}>
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Aproducts2;
