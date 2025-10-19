/*"use client";

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
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { processCheckout } from "@/lib/checkout";
import { toCartItem } from "@/lib/cart";

/*
const featuredItemsData = [
  {
    id: 1,
    name: "Bunny Chow",
    description:
      "Traditional South African curry served in a hollowed-out bread loaf",
    price: 45.0,
    image:
      "https://media.audleytravel.com/-/media/images/home/africa/south-africa/country-guides/south-africa-beyond-safari-and-wine/shutterstock_2283389403_bunny_chow.jpg?q=79&w=800&h=571",
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
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop",
    rating: 4.6,
    cookTime: "10 min",
    category: "grill",
    isPopular: true,
  },
  {
   id: 20,
   name: "Latte",
   description: "Creamy espresso coffee with steamed milk and a touch of foam",
   price: 30.0,
   image: "https://www.arla.com/globalassets/arla-global/milk/open-your-senses/coffee/images/open-your-senses-coffee-split_deck-steamed_milk_art.jpg?preset=half-desktop",
   rating: 4.8,
   cookTime: "5 min",
   category: "beverages",
   isPopular: true,
  },
  {
    id: 3,
    name: "Gatsby",
    description: "Cape Town submarine sandwich with chips, meat, and sauce",
    price: 58.0,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=200&fit=crop",
    rating: 4.5,
    cookTime: "20 min",
    category: "traditional",
    isPopular: false,
  },
  {
    id: 5,
    name: "Pizza",
    description:
      "Traditional South African curry served in a hollowed-out bread loaf",
    price: 45.0,
    image:
      "https://ristorante-classico.de/de-wAssets/img/adobe-stock/speisen/AdobeStock_60447569.jpeg",
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
    image:
      "https://tse4.mm.bing.net/th/id/OIP.iPVFDnsVT-M0xhsHtoDQAQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
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
    image:
      "https://th.bing.com/th/id/R.2f3efd9008afc099c62f2b894ed96a05?rik=LofYM3CE5wPZaw&pid=ImgRaw&r=0",
    rating: 4.7,
    cookTime: "12 min",
    category: "sandwich",
    isPopular: false,
  },
  {
    id: 8,
    name: "Chicken Caesar Wrap",
    description: "Grilled chicken, fresh lettuce, parmesan, and Caesar dressing wrapped in a soft tortilla",
    price: 42.0,
    image: "https://insanelygoodrecipes.com/wp-content/uploads/2024/05/Chicken-Caesar-Tortilla-Wraps-1060x1060.jpg",
    rating: 4.7,
    cookTime: "12 min",
    category: "sandwich",
    isPopular: true,
  },
  {
    id: 9,
    name: "Coca Cola",
    description: "Refreshing soft drink",
    price: 25.0,
    image:
      "https://www.mashed.com/img/gallery/a-can-of-coca-cola-is-being-sold-for-over-300000/l-intro-1683831628.jpg",
    rating: 4.5,
    cookTime: "20 min",
    category: "beverages",
    isPopular: false,
  },
  { 
    id: 10, 
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
    id: 11,
    name: "Grilled Chicken Skewers",
    description: "Tender chicken skewers grilled to perfection with spices",
    price: 60.0,
    image:
      "https://pupswithchopsticks.com/wp-content/uploads/chicken-skewer-portrait2-new.jpg",
    rating: 4.9,
    cookTime: "18 min",
    category: "grill",
    isPopular: true,
  },
  {
    id: 12,
    name: "Veggie Wrap",
    description: "Healthy wrap filled with fresh veggies and hummus",
    price: 35.0,
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=300&h=200&fit=crop",
    rating: 4.4,
    cookTime: "10 min",
    category: "sandwich",
    isPopular: false,
  },
  {
    id: 13,
    name: "Milkshake",
    description: "Creamy milkshake in chocolate, vanilla or strawberry",
    price: 30.0,
    image:
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2022/03/28/cookies-and-cream-milkshake.jpg.rend.hgtvcom.1280.960.suffix/1648501387256.jpeg",
    rating: 4.6,
    cookTime: "5 min",
    category: "beverages",
    isPopular: true,
  },
  {
    id: 14,
    name: "Boerewors Platter",
    description: "Grilled boerewors served with chakalaka and pap",
    price: 75.0,
    image:
      "https://i.pinimg.com/originals/a7/5c/c5/a75cc5e85ecac88ddb8d62095fe57b93.jpg",
    rating: 4.8,
    cookTime: "20 min",
    category: "traditional",
    isPopular: true,
  },
  {
    id: 15,
    name: "Cheese Toastie",
    description: "Golden toasted sandwich filled with melted cheese",
    price: 28.0,
    image:
      "https://www.justspices.co.uk/media/recipe/Air-Fryer-Cheese-Toastie_Just-Spices_1_.webp",
    rating: 4.5,
    cookTime: "7 min",
    category: "sandwich",
    isPopular: true,
  },
  {
    id: 16,
    name: "Iced Tea",
    description: "Refreshing iced tea with lemon and mint",
    price: 20.0,
    image:
      "https://img.freepik.com/premium-photo/refreshing-iced-tea-glass-with-lemon-mint_128711-15732.jpg",
    rating: 4.3,
    cookTime: "3 min",
    category: "beverages",
    isPopular: false,
  },
  {
    id: 17,
    name: "Apple Pie",
    description: "Classic dessert with flaky crust and sweet apple filling",
    price: 40.0,
    image:
      "https://img.freepik.com/premium-photo/apple-pie-slice-with-ice-cream-caramel-sauce-plate-autumn-baking-idea_908985-78709.jpg",
    rating: 4.7,
    cookTime: "25 min",
    category: "other",
    isPopular: true,
  },
  {
  id: 18,
  name: "Pepsi",
  description: "Refreshing carbonated soft drink, perfect with any meal",
  price: 20.0,
  image: "https://images.news18.com/ibnlive/uploads/2022/06/pepsi-165597677616x9.png",
  rating: 4.5,
  cookTime: "1 min",
  category: "beverages",
  isPopular: true,
},
{
  id: 19,
  name: "Fresh White Bread",
  description: "Soft and fluffy freshly baked white bread, perfect for sandwiches or toast",
  price: 15.0,
  image: "https://brandadvisor.co.za/media/reviews/photos/original/e8/98/13/287179-albany-superior-best-of-both-72-1680094755.jpg",
  rating: 4.6,
  cookTime: "10 min",
  category: "other",
  isPopular: true,
}

];


const categories = [
  { id: "all", name: "All Items", icon: ChefHat },
  { id: "traditional", name: "Traditional", icon: ChefHat },
  { id: "grill", name: "Grill", icon: TrendingUp },
  { id: "sandwich", name: "Sandwiches", icon: Star },
  { id: "beverages", name: "Beverages", icon: Clock },
  { id: "other", name: "Other", icon: Heart },
];

export default function MenuPage() {
  const [featuredItems, setFeaturedItems] = useState(featuredItemsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showItemModal, setShowItemModal] = useState(false);


  // Auto-open cart popup if ?checkout=1 is present
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get("checkout") === "1") {
        setShowCartPopup(true);
        url.searchParams.delete("checkout");
        window.history.replaceState(
          {},
          "",
          url.pathname + url.search + url.hash
        );
      }
    } catch {}
  }, []);

  // Fetch menu items
  useEffect(() => {
    const loadMenu = async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== "all")
          params.append("category", selectedCategory);
        if (searchTerm.trim() !== "")
          params.append("keyword", searchTerm.trim());


  // Filter items by category and search term
  useEffect(() => {
    let filtered = [...featuredItemsData];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFeaturedItems(filtered);
  }, [selectedCategory, searchTerm]);

  const toggleFavorite = (itemId: number) => {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleCheckout = async () => {
    setShowCartPopup(false);
    await processCheckout({
      cartItems,
      clearCart,
      onSuccess: () => setShowCartPopup(false),
    });
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setShowItemModal(true);
  };

  const handleAddToCartFromModal = () => {
    if (selectedItem) {
      addToCart(toCartItem(selectedItem));
      setShowItemModal(false);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      {/* Header *//*}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0E2148] dark:text-white">
          Menu
        </h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         focus:ring-2 focus:ring-[#483AA0] focus:border-transparent 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#483AA0] text-white rounded-lg hover:bg-[#0E2148] transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button
            onClick={() => setShowCartPopup(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#7965C1] text-white rounded-lg hover:bg-[#483AA0] transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Cart ({cartCount})
          </button>
        </div>
      </div>

      {/* Main Grid *//*}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters *//*}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sticky top-4">
            <h2 className="font-semibold mb-4 text-[#0E2148] dark:text-white">
              Categories
            </h2>
            <div className="flex flex-wrap sm:flex-col gap-2">
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

        {/* Menu Items *//*}
        <div className="lg:col-span-3">
          {featuredItems.length === 0 ? (
            <div className="text-center py-16 text-gray-500 dark:text-gray-400">
              No menu items match your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  {/* Image *//*}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
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

                  {/* Info *//*}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(toCartItem(item));
                      }}
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

      {/* Item Detail Modal *//*}
      {showItemModal && selectedItem && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setShowItemModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
              {/* Header *//*}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-[#0E2148] dark:text-white">
                  {selectedItem.name}
                </h2>
                <button
                  onClick={() => setShowItemModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Content *//*}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image *//*}
                  <div className="md:w-1/2">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="w-full h-64 md:h-80 object-cover rounded-lg"
                    />
                  </div>

                  {/* Details *//*}
                  <div className="md:w-1/2">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-[#0E2148] dark:text-white mb-2">
                        {selectedItem.name}
                      </h3>
                      <p className="text-lg font-bold text-[#483AA0] mb-4">
                        R{selectedItem.price.toFixed(2)}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {selectedItem.description}
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {selectedItem.rating} Rating
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#483AA0]" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Cook Time: {selectedItem.cookTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ChefHat className="w-5 h-5 text-[#483AA0]" />
                        <span className="text-gray-700 dark:text-gray-300 capitalize">
                          Category: {selectedItem.category}
                        </span>
                      </div>
                      {selectedItem.isPopular && (
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-green-500" />
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            Popular Item
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleAddToCartFromModal}
                        className="flex-1 bg-gradient-to-r from-[#483AA0] to-[#7965C1] text-white py-3 px-6 rounded-lg hover:from-[#0E2148] hover:to-[#483AA0] transition-all duration-300 font-medium"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => toggleFavorite(selectedItem.id)}
                        className={`p-3 rounded-lg transition-colors ${
                          favorites.includes(selectedItem.id)
                            ? "bg-red-100 text-red-600 border border-red-300"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.includes(selectedItem.id) ? "fill-current" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Cart Popup *//*}
      {showCartPopup && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setShowCartPopup(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden">
              {/* Header *//*}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-[#0E2148] dark:text-white">
                  Your Cart
                </h2>
                <button
                  onClick={() => setShowCartPopup(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Cart Content *//*}
              <div className="p-4 max-h-96 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                    🛒 Your cart is empty.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div
                        key={`${item.id}-${index}`}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 flex items-center gap-3 bg-gray-50 dark:bg-gray-700"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-[#0E2148] dark:text-white">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            R{item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm px-2 py-1 border border-red-300 rounded hover:bg-red-50 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer *//*}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-[#0E2148] dark:text-white">
                      Total:
                    </span>
                    <span className="font-bold text-[#483AA0]">
                      R
                      {cartItems
                        .reduce((sum, item) => sum + item.price, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#7965C1] hover:bg-[#5d4fa8] text-white font-semibold py-2 px-4 rounded-md transition duration-200"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}*/