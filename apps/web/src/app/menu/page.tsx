"use client";

import { useState } from "react";
import { Search, Filter, ShoppingCart, Star, Clock, Heart, ChefHat, TrendingUp } from "lucide-react";

const featuredItems = [
  {
    id: 1,
    name: "Bunny Chow",
    description: "Traditional South African curry served in a hollowed-out bread loaf",
    price: 45.0,
    image: "https://media.audleytravel.com/-/media/images/home/africa/south-africa/country-guides/south-africa-beyond-safari-and-wine/shutterstock_2283389403_bunny_chow.jpg?q=79&w=800&h=571",
    rating: 4.8,
    cookTime: "15 min",
    category: "traditional",
    isPopular: true,
  },
  {
    id: 2,
    name: "Boerewors Roll",
    description: "Grilled South African sausage in a fresh roll with relish",
    price: 32.0,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop",
    rating: 4.6,
    cookTime: "10 min",
    category: "grill",
    isPopular: true,
  },
  {
    id: 3,
    name: "Gatsby",
    description: "Cape Town submarine sandwich with chips, meat, and sauce",
    price: 58.0,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
    rating: 4.7,
    cookTime: "12 min",
    category: "sandwich",
    isPopular: false,
  },
  {
    id: 4,
    name: "Bobotie",
    description: "Traditional spiced mince dish with egg topping and rice",
    price: 52.0,
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=200&fit=crop",
    rating: 4.5,
    cookTime: "20 min",
    category: "traditional",
    isPopular: false,
  },
  {
    id: 5,
    name: "Pizza",
    description: "Traditional South African curry served in a hollowed-out bread loaf",
    price: 45.0,
    image: "https://ristorante-classico.de/de-wAssets/img/adobe-stock/speisen/AdobeStock_60447569.jpeg",
    rating: 4.8,
    cookTime: "15 min",
    category: "traditional",
    isPopular: true,
  },
  {
    id: 6,
    name: "Sausage Roll",
    description: "Grilled South African sausage in a fresh roll with relish",
    price: 32.0,
    image: "https://tse4.mm.bing.net/th/id/OIP.iPVFDnsVT-M0xhsHtoDQAQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.6,
    cookTime: "10 min",
    category: "grill",
    isPopular: true,
  },
  {
    id: 7,
    name: "Sandwich",
    description: "Cape Town submarine sandwich with chips, meat, and sauce",
    price: 58.0,
    image: "https://th.bing.com/th/id/R.2f3efd9008afc099c62f2b894ed96a05?rik=LofYM3CE5wPZaw&pid=ImgRaw&r=0",
    rating: 4.7,
    cookTime: "12 min",
    category: "sandwich",
    isPopular: false,
  },
  {
    id: 8,
    name: "Choc Chip Muffins",
    description: "Delicious baked goods, perfect for breakfast or a snack",
    price: 52.0,
    image: "https://th.bing.com/th/id/R.eed34a85407d4eb39dd31ed95f3303ba?rik=IBv3CJ%2fS059jwA&pid=ImgRaw&r=0",
    rating: 4.5,
    cookTime: "20 min",
    category: "traditional",
    isPopular: false,
  },
  {
    id: 9,
    name: "Coca Cola",
    description: "Refreshing soft drink",
    price: 25.0,
    image: "https://www.mashed.com/img/gallery/a-can-of-coca-cola-is-being-sold-for-over-300000/l-intro-1683831628.jpg",
    rating: 4.5,
    cookTime: "20 min",
    category: "beverages",
    isPopular: false,
  },
];

const categories = [
  { id: "all", name: "All Items", icon: ChefHat },
  { id: "traditional", name: "Traditional", icon: ChefHat },
  { id: "grill", name: "Grill", icon: TrendingUp },
  { id: "sandwich", name: "Sandwiches", icon: Star },
  { id: "beverages", name: "Beverages", icon: Clock },
];

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cartItems, setCartItems] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (itemId: number) => {
    setFavorites((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const addToCart = (itemId: number) => {
    setCartItems((prev) => prev + 1);
  };

  const filteredItems = featuredItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
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
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.includes(item.id) ? "fill-current" : ""
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

                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{item.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{item.cookTime}</span>
                      </div>
                    </div>

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
          ) : (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              <p className="text-lg">No menu items match your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



