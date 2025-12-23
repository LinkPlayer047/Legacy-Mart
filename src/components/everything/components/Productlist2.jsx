"use client";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addItem, setCart } from "../../../../cartSlice";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { Lato } from "next/font/google";
import { useSearchParams, useRouter } from "next/navigation";

const lato = Lato({ subsets: ["latin"], weight: ["700"] });

const Productlist2 = ({ pageTitle = "Our Products" }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const [appliedFilters, setAppliedFilters] = useState({
    category: "All",
    search: "",
    priceRange: [500, 5000],
    sort: "newest",
  });

  const PAGE_SIZE = 12;

  // --- NEW: Read category from URL ---
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "All";

  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    setAppliedFilters((prev) => ({
      ...prev,
      category: categoryFromUrl,
    }));
    setCurrentPage(1);
  }, [categoryFromUrl]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setCart(res.data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchCart();
  }, [dispatch]);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    try {
      await axios.post(
        "/api/cart",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(
        addItem({
          ...product,
          quantity: 1,
        })
      );

      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to cart");
    }
  };

  const applyFilter = () => {
    setAppliedFilters({
      category: selectedCategory,
      search: searchTerm,
      priceRange,
      sort: sortOption,
    });
    setCurrentPage(1);
  };

  const filteredAndSorted = useMemo(() => {
    let list = [...products];
    const { category, search, priceRange: pr, sort } = appliedFilters;

    if (category !== "All") list = list.filter((p) => p.category === category);
    list = list.filter((p) => p.price >= pr[0] && p.price <= pr[1]);
    if (search)
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );

    if (sort === "newest")
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sort === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [products, appliedFilters]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentPageProducts = filteredAndSorted.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [products]);

  return (
    <div className="bg-[#f5f7f9] py-20 pt-40">
      <div
        className={`max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-start justify-between gap-10 px-5 ${lato.className}`}
      >
        {/* Sidebar */}
        <aside className="lg:w-[30%] w-full bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center w-full border border-gray-300 rounded overflow-hidden mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 outline-none"
            />
            <button
              onClick={applyFilter}
              className="bg-[#0084d6] text-white px-3 py-2 hover:bg-[#0070b3]"
            >
              <IoIosArrowForward className="text-lg" />
            </button>
          </div>

          {/* Price Filter */}
          <div className="pt-6 w-full">
            <h2 className="text-[22px] mb-4 text-gray-800">Filter by Price</h2>
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                min={500}
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
                className="w-1/2 px-2 py-1 border rounded"
              />
              <input
                type="number"
                min={priceRange[0]}
                max={5000}
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-1/2 px-2 py-1 border rounded"
              />
            </div>
            <input
              type="range"
              min={500}
              max={5000}
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-gray-700 font-medium">
              <span>₨ {priceRange[0]}</span>
              <span>₨ {priceRange[1]}</span>
            </div>
            <button
              onClick={applyFilter}
              className="mt-5 w-full bg-[#0084d6] text-white py-2 rounded hover:bg-[#0070b3] transition"
            >
              Apply Filter
            </button>
          </div>

          {/* Categories */}
          <div className="pt-8">
            <h1 className="text-[22px] mb-4 font-semibold text-gray-800">
              Categories
            </h1>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    // Update URL and state for sidebar clicks
                    router.push(`/everything?category=${encodeURIComponent(cat)}`);
                  }}
                  className={`text-left px-3 py-2 rounded ${
                    selectedCategory === cat
                      ? "bg-[#0084d6] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[16px]">{cat}</span>
                    {cat !== "All" && (
                      <span className="text-gray-500">
                        ({products.filter((p) => p.category === cat).length})
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Products */}
        <main className="lg:w-[70%] w-full">
          {/* Header & Sorting */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-[26px] font-semibold text-gray-900">
              {pageTitle}
            </h2>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700">Sort:</label>
              <select
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  applyFilter();
                }}
                className="border rounded px-3 py-2"
              >
                <option value="newest">Newest</option>
                <option value="name-asc">Name A → Z</option>
                <option value="price-asc">Price low → high</option>
                <option value="price-desc">Price high → low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {currentPageProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPageProducts.map((product) => (
                <article
                  key={product._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  <Link href={`/singleproduct/${product._id}`}>
                    <div className="relative w-full h-64 cursor-pointer">
                      <img
                        src={product.images?.[0]?.url || "/placeholder.png"}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </Link>
                  <div className="p-4 text-center">
                    <Link href={`/singleproduct/${product._id}`}>
                      <h3 className="text-[16px] font-semibold text-gray-800 mb-2 hover:text-[#0084d6] transition">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-500 mb-2">{product.category}</p>
                    <h4 className="text-[#0084d6] font-bold text-[18px] mb-3">
                      ₨ {product.price}
                    </h4>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-[#0084d6] text-white px-5 py-2 rounded hover:bg-[#0070b3] transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-10">No products found.</p>
          )}

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">
                {filteredAndSorted.length === 0 ? 0 : startIndex + 1}
              </span>{" "}
              —{" "}
              <span className="font-medium">
                {Math.min(startIndex + PAGE_SIZE, filteredAndSorted.length)}
              </span>{" "}
              of <span className="font-medium">{filteredAndSorted.length}</span>{" "}
              products
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded border ${
                  currentPage === 1
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => goToPage(i + 1)}
                  className={`px-3 py-2 rounded ${
                    currentPage === i + 1
                      ? "bg-[#0084d6] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded border ${
                  currentPage === totalPages
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Productlist2;
