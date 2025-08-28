import React, { useState, useEffect } from 'react';
import { ChevronFirst, ChevronLast, LayoutDashboard, Utensils, ShoppingCart, BarChart2, User, HelpCircle, Phone, LogOut, Settings, Eye, Edit, Trash2, ChevronDown } from 'lucide-react';

// This is the main App component that will render the dashboard.
// The following components would typically be in separate files. For the purpose of
// this self-contained preview, they are all in one file.

// --- Header Component ---
// This component displays the top header with user info, cart, and theme toggle.
const Header = ({ onThemeToggle, userRole, userName, onUserClick, cartItemCount, onRoleChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleRoleSelect = (role) => {
    onRoleChange(role);
    setDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-4 transition-colors duration-300 bg-white/80 backdrop-blur-md dark:bg-gray-900/80 shadow-sm rounded-b-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Klipoog Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          {/* User Role Selector Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Role: {userRole} <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                <div className="py-1">
                  <a href="#" onClick={() => handleRoleSelect('Admin')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Admin</a>
                  <a href="#" onClick={() => handleRoleSelect('Staff')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Staff</a>
                  <a href="#" onClick={() => handleRoleSelect('Student')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Student</a>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onThemeToggle}
            className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-gray-600 dark:text-gray-400"
            >
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
              <path d="M12 14v4M12 6V4M10 12h-4M14 12h4M16.9 16.9l2.8 2.8M4.3 4.3l2.8 2.8M16.9 7.1l2.8-2.8M4.3 19.7l2.8-2.8" />
            </svg>
          </button>
          <div className="relative">
            <button
              onClick={onUserClick}
              className="flex items-center p-2 space-x-2 transition-colors duration-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {userName}
              </span>
            </button>
          </div>
          <button
            className="relative p-2 transition-colors duration-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

// --- Sidebar Component ---
// This component renders the collapsible sidebar menu.
const Sidebar = ({ isExpanded, toggleSidebar, userRole }) => {
  const sidebarLinks = [
    { name: 'Dashboard', href: '#dashboard', icon: <LayoutDashboard />, roles: ['Admin', 'Staff', 'Student'] },
    { name: 'Menu', href: '#menu', icon: <Utensils />, roles: ['Admin', 'Staff', 'Student'] },
    { name: 'Orders', href: '#orders', icon: <ShoppingCart />, roles: ['Admin', 'Staff', 'Student'] },
    { name: 'Analytics', href: '#analytics', icon: <BarChart2 />, roles: ['Admin'] },
    { name: 'FAQ', href: '#faq', icon: <HelpCircle />, roles: ['Admin', 'Staff', 'Student'] },
    { name: 'Contact Us', href: '#contact', icon: <Phone />, roles: ['Admin', 'Staff', 'Student'] },
    { name: 'Settings', href: '#settings', icon: <Settings />, roles: ['Admin', 'Staff', 'Student'] },
    { name: 'Log Out', href: '#logout', icon: <LogOut />, roles: ['Admin', 'Staff', 'Student'] },
  ];

  const filteredLinks = sidebarLinks.filter(link => link.roles.includes(userRole));

  return (
    <aside
      className={`fixed top-0 left-0 z-30 flex flex-col justify-between h-screen p-4 transition-all duration-300 bg-white/80 backdrop-blur-md dark:bg-gray-900/80 shadow-lg rounded-r-lg ${isExpanded ? 'w-64' : 'w-20'}`}
    >
      <nav className="flex-1">
        <div className="flex justify-end mb-8">
          <button
            onClick={toggleSidebar}
            className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle sidebar"
          >
            {isExpanded ? (
              <ChevronFirst className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            ) : (
              <ChevronLast className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
        <ul className="space-y-4">
          {filteredLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="flex items-center px-4 py-2 text-gray-700 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-800"
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {link.icon}
                </div>
                {isExpanded && <span className="ml-3 font-medium">{link.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {isExpanded && (
        <div className="mt-auto p-4 text-center border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">Klipoog Online</p>
        </div>
      )}
    </aside>
  );
};

// --- Dashboard Content Components for each role ---
// These components represent the distinct dashboard views.
const DashboardCard = ({ title, value }) => (
  <div className="p-6 transition-transform transform bg-white rounded-lg shadow-md dark:bg-gray-800 hover:scale-105">
    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
  </div>
);

const RecentOrdersTable = ({ orders, userRole, onOrderAction }) => (
  <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">Order ID</th>
          {userRole !== 'Student' && (
            <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">Student</th>
          )}
          <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">Amount</th>
          <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">Status</th>
          <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
        {orders.map((order) => (
          <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm font-medium text-gray-900 dark:text-gray-100">{order.id}</span></td>
            {userRole !== 'Student' && (
              <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-gray-600 dark:text-gray-400">{order.student}</span></td>
            )}
            <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-gray-600 dark:text-gray-400">{order.amount}</span></td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                order.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
              }`}>
                {order.status}
              </span>
            </td>
            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
              <div className="flex items-center space-x-2 justify-end">
                <button onClick={() => onOrderAction('view', order.id)} className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="View order"><Eye className="w-4 h-4 text-gray-500 dark:text-gray-400" /></button>
                {userRole === 'Staff' && (
                  <>
                    <button onClick={() => onOrderAction('edit', order.id)} className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Edit order"><Edit className="w-4 h-4 text-gray-500 dark:text-gray-400" /></button>
                    <button onClick={() => onOrderAction('delete', order.id)} className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Delete order"><Trash2 className="w-4 h-4 text-gray-500 dark:text-gray-400" /></button>
                  </>
                )}
                {userRole === 'Student' && (
                  <button className="px-3 py-1 text-xs font-semibold text-white transition-colors duration-200 bg-purple-600 rounded-full hover:bg-purple-700" aria-label="Give feedback">Feedback</button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// --- Mock Data ---
// In a real application, this data would be fetched from your Supabase RESTful API.
const mockDashboardData = {
  Admin: {
    totalSales: 'R125,430',
    totalOrders: '8,500',
    menuItems: '120',
    recentOrders: [
      { id: 'ORD001', student: 'Lethabo Maepa', amount: 'R55', status: 'Completed' },
      { id: 'ORD002', student: 'Faith Lebepe', amount: 'R70', status: 'Pending' },
      { id: 'ORD003', student: 'Lebogang Phatlhane', amount: 'R45', status: 'Completed' },
      { id: 'ORD004', student: 'Baxolele Gudla', amount: 'R90', status: 'Canceled' },
    ],
    analytics: {
      peakHours: { '9-10 AM': '150 orders', '1-2 PM': '210 orders' },
      revenueTrends: 'Up 12% from last month',
    }
  },
  Staff: {
    activeOrders: '34',
    pendingOrders: '12',
    menuItems: '120',
    recentOrders: [
      { id: 'ORD001', student: 'Lethabo Maepa', amount: 'R55', status: 'Completed' },
      { id: 'ORD002', student: 'Faith Lebepe', amount: 'R70', status: 'Pending' },
      { id: 'ORD003', student: 'Lebogang Phatlhane', amount: 'R45', status: 'Completed' },
    ],
  },
  Student: {
    totalOrders: '5',
    recentOrders: [
      { id: 'ORD001', amount: 'R55', status: 'Completed' },
      { id: 'ORD002', amount: 'R70', status: 'Pending' },
      { id: 'ORD003', amount: 'R45', status: 'Completed' },
    ],
  },
};

// --- Main Dashboard Component ---
// This component conditionally renders the correct dashboard based on user role.
const DashboardContent = ({ userRole }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate fetching data from a backend based on user role.
    // Replace with a real API call to your Supabase backend.
    const fetchData = async () => {
      // Mock network delay.
      await new Promise(resolve => setTimeout(resolve, 500));
      setData(mockDashboardData[userRole]);
    };
    fetchData();
  }, [userRole]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg text-gray-500 dark:text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  // Handle order actions for staff and students
  const handleOrderAction = (action, orderId) => {
    console.log(`Action: ${action} on Order ID: ${orderId}`);
    // Here you would implement your API calls to Supabase to view, update, or delete an order.
  };

  switch (userRole) {
    case 'Student':
      return (
        <div className="space-y-6">
          <DashboardCard title="Your Total Orders" value={data.totalOrders} />
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Your Recent Orders</h2>
            <RecentOrdersTable orders={data.recentOrders} userRole={userRole} onOrderAction={handleOrderAction} />
          </div>
        </div>
      );
    case 'Staff':
      return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard title="Active Orders" value={data.activeOrders} />
          <DashboardCard title="Pending Orders" value={data.pendingOrders} />
          <DashboardCard title="Menu Items" value={data.menuItems} />
          <div className="col-span-full">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Recent Orders</h2>
            <RecentOrdersTable orders={data.recentOrders} userRole={userRole} onOrderAction={handleOrderAction} />
          </div>
        </div>
      );
    case 'Admin':
      return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard title="Total Sales" value={data.totalSales} />
          <DashboardCard title="Total Orders" value={data.totalOrders} />
          <DashboardCard title="Menu Items" value={data.menuItems} />
          <div className="col-span-full">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Analytics</h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">Peak Hours</h3>
                <div className="h-48 bg-gray-200 rounded-md dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <p>Placeholder for Peak Hours Graph</p>
                </div>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">Revenue Trends</h3>
                <div className="h-48 bg-gray-200 rounded-md dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <p>Placeholder for Revenue Trends Graph</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

// --- The main App Component ---
// This component renders the entire application layout.
export default function App() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [theme, setTheme] = useState('light');
  const [userRole, setUserRole] = useState('Admin'); // Default role for demo
  const userName = "Team Member";
  const cartItemCount = 2;

  const toggleSidebar = () => setIsExpanded(!isExpanded);
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className={`${theme}`}>
      <div className="relative min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-950">
        <Sidebar
          isExpanded={isExpanded}
          toggleSidebar={toggleSidebar}
          userRole={userRole}
        />
        <div className={`transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-20'}`}>
          <Header
            onThemeToggle={toggleTheme}
            userRole={userRole}
            userName={userName}
            onRoleChange={setUserRole}
            cartItemCount={cartItemCount}
          />
          <main className="p-8 pt-24">
            <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
              {userRole} Dashboard
            </h1>
            <DashboardContent userRole={userRole} />
          </main>
        </div>
      </div>
    </div>
  );
}
