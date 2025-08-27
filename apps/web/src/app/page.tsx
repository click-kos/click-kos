"use client";

import { useState } from "react";
import { Search, ShoppingCart, Star, Clock, TrendingUp, ChefHat, Heart, Filter } from "lucide-react";

// Mock data for featured items
const featuredItems = [
  {
    id: 1,
    name: "Bunny Chow",
    description: "Traditional South African curry served in a hollowed-out bread loaf",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
    rating: 4.8,
    cookTime: "15 min",
    category: "Traditional",
    isPopular: true,
    isFavorite: false
  },
  {
    id: 2,
    name: "Boerewors Roll",
    description: "Grilled South African sausage in a fresh roll with relish",
    price: 32.00,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop",
    rating: 4.6,
    cookTime: "10 min",
    category: "Grill",
    isPopular: true,
    isFavorite: true
  },
  {
    id: 3,
    name: "Gatsby",
    description: "Cape Town submarine sandwich with chips, meat, and sauce",
    price: 58.00,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
    rating: 4.7,
    cookTime: "12 min",
    category: "Sandwich",
    isPopular: false,
    isFavorite: false
  },
  {
    id: 4,
    name: "Bobotie",
    description: "Traditional spiced mince dish with egg topping and rice",
    price: 52.00,
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=200&fit=crop",
    rating: 4.5,
    cookTime: "20 min",
    category: "Traditional",
    isPopular: false,
    isFavorite: true
  }
];

const categories = [
  { id: "all", name: "All Items", icon: ChefHat },
  { id: "traditional", name: "Traditional", icon: Star },
  { id: "grill", name: "Grill", icon: TrendingUp },
  { id: "sandwich", name: "Sandwiches", icon: ChefHat },
  { id: "beverages", name: "Beverages", icon: Star }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([2, 4]);

  const toggleFavorite = (itemId: number) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const addToCart = (itemId: number) => {
    setCartItems(prev => prev + 1);
    // Here you would implement actual cart functionality
  };

  const filteredItems = featuredItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           item.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0E2148] via-[#483AA0] to-[#7965C1] rounded-2xl p-8 mb-8 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Click & Kos
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            Discover authentic South African flavors and campus favorites. Order ahead to skip the queue during peak hours.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Open: 07:00 - 17:00</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>Average wait: 8 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#483AA0] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
            <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">Filters</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-[#7965C1] text-white rounded-xl hover:bg-[#483AA0] transition-colors shadow-sm">
            <ShoppingCart className="w-4 h-4" />
            <span>Cart ({cartItems})</span>
          </button>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#483AA0] text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-[#0E2148] dark:text-white">24</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Items Available</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-[#483AA0] dark:text-[#7965C1]">4.7</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-[#7965C1] dark:text-[#483AA0]">8min</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Wait</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">89%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
        </div>
      </div>

      {/* Featured Items Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#0E2148] dark:text-white">
            {selectedCategory === "all" ? "Featured Items" : `${categories.find(c => c.id === selectedCategory)?.name} Items`}
          </h2>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {filteredItems.length} items found
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Item Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {item.isPopular && (
                  <div className="absolute top-3 left-3 bg-[#483AA0] text-white px-2 py-1 rounded-full text-xs font-medium">
                    Popular
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                    favorites.includes(item.id)
                      ? "bg-red-100 text-red-600"
                      : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-600"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(item.id) ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Item Details */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-[#0E2148] dark:text-white text-lg">
                    {item.name}
                  </h3>
                  <span className="text-lg font-bold text-[#483AA0] dark:text-[#7965C1]">
                    R{item.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {item.description}
                </p>

                {/* Rating and Cook Time */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-gray-700 dark:text-gray-300">{item.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{item.cookTime}</span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addToCart(item.id)}
                  className="w-full bg-gradient-to-r from-[#483AA0] to-[#7965C1] text-white py-2 px-4 rounded-lg hover:from-[#0E2148] hover:to-[#483AA0] transition-all duration-300 font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
              No items found
            </h3>
            <p className="text-gray-400 dark:text-gray-500">
              Try adjusting your search or category filter
            </p>
          </div>
        )}
      </div>

      {/* Popular Categories Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-[#0E2148] dark:text-white mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl p-6 text-white cursor-pointer hover:scale-105 transition-transform">
            <ChefHat className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Traditional</h3>
            <p className="text-sm opacity-90">Authentic SA dishes</p>
          </div>
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-6 text-white cursor-pointer hover:scale-105 transition-transform">
            <Star className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Healthy</h3>
            <p className="text-sm opacity-90">Fresh & nutritious</p>
          </div>
          <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-xl p-6 text-white cursor-pointer hover:scale-105 transition-transform">
            <TrendingUp className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Quick Bites</h3>
            <p className="text-sm opacity-90">Fast & delicious</p>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white cursor-pointer hover:scale-105 transition-transform">
            <Clock className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Beverages</h3>
            <p className="text-sm opacity-90">Drinks & refreshers</p>
          </div>
        </div>
      </div>

      {/* Daily Specials */}
      <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#0E2148] dark:text-white mb-2">Today's Specials</h2>
          <p className="text-gray-600 dark:text-gray-400">Limited time offers you don't want to miss</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg text-[#0E2148] dark:text-white">Student Special</h3>
              <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                20% Off
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Any main meal + drink combo for students with valid ID
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-[#483AA0]">From R38</span>
              <button className="bg-[#483AA0] text-white px-4 py-2 rounded-lg hover:bg-[#0E2148] transition-colors text-sm">
                View Items
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-lg text-[#0E2148] dark:text-white">Happy Hour</h3>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                3-5 PM
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Buy 2 beverages and get the third one free
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-[#483AA0]">Buy 2 Get 1</span>
              <button className="bg-[#483AA0] text-white px-4 py-2 rounded-lg hover:bg-[#0E2148] transition-colors text-sm">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}