"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ShoppingCart,
  Star,
  Clock,
  Heart,
  ChefHat,
  TrendingUp,
} from "lucide-react";

const categories = [
  { id: "all", name: "All Items", icon: ChefHat },
  { id: "traditional", name: "Traditional", icon: ChefHat },
  { id: "grill", name: "Grill", icon: TrendingUp },
  { id: "sandwich", name: "Sandwiches", icon: Star },
  { id: "beverages", name: "Beverages", icon: Clock },
];

export default function MenuPage() {
  const [featuredItems, setFeaturedItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Fetch menu items
  useEffect(() => {
  const loadMenu = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== "all") params.append("category", selectedCategory);
      if (searchTerm.trim() !== "") params.append("keyword", searchTerm.trim());

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/menu`);
      
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const resData = await res.json();
      setFeaturedItems(resData.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load menu. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  loadMenu();
}, [selectedCategory, searchTerm]);



  const toggleFavorite = (itemId: number) => {
    setFavorites((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const addToCart = (itemId: number) => {
    setCartItems((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#0E2148] dark:text-white">Menu</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         focus:ring-2 focus:ring-[#483AA0] focus:border-transparent 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#483AA0] text-white rounded-lg hover:bg-[#0E2148] transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#7965C1] text-white rounded-lg hover:bg-[#483AA0] transition-colors">
            <ShoppingCart className="w-4 h-4" />
            Cart ({cartItems})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h2 className="font-semibold mb-4 text-[#0E2148] dark:text-white">Categories</h2>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedCategory === cat.id
                        ? "bg-[#483AA0] text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="md:col-span-3">
          {loading ? (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">Loading menu...</div>
          ) : error ? (
            <div className="text-center py-16 text-red-500">{error}</div>
          ) : featuredItems.length === 0 ? (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              No menu items match your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item) => (
                <div
                  key={item.item_id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={item.item_image?.[0]?.url}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => toggleFavorite(item.item_id)}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                        favorites.includes(item.item_id)
                          ? "bg-red-100 text-red-600"
                          : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-600"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.includes(item.item_id) ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-[#0E2148] dark:text-white text-lg">
                        {item.name}
                      </h3>
                      <span className="text-lg font-bold text-[#483AA0]">
                        R{item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <button
                      onClick={() => addToCart(item.item_id)}
                      className="w-full bg-gradient-to-r from-[#483AA0] to-[#7965C1] text-white py-2 px-4 rounded-lg hover:from-[#0E2148] hover:to-[#483AA0] transition-all duration-300 font-medium"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
