import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaChartBar, FaUsers, FaTag, FaSuitcase, FaCog, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation items
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: FaChartBar },
    { name: 'Discounts', href: '/admin/discounts', icon: FaTag },
    { name: 'Bookings', href: '/admin/bookings', icon: FaSuitcase },
    { name: 'Users', href: '/admin/users', icon: FaUsers },
    { name: 'Settings', href: '/admin/settings', icon: FaCog },
  ];

  const isActive = (path: string) => {
    return router.pathname === path || (path !== '/admin' && router.pathname.startsWith(path));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for mobile */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-gray-800 text-white">
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
            <span className="text-xl font-bold">TravelEase Admin</span>
            <button onClick={toggleSidebar} className="text-white">
              <FaTimes size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    isActive(item.href)
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      isActive(item.href) ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                    } mr-3 h-6 w-6`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={logout}
              className="w-full flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <FaSignOutAlt className="mr-3 h-6 w-6 text-gray-400" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-gray-800 lg:text-white lg:pt-5">
        <div className="flex items-center justify-center px-4 h-16">
          <span className="text-xl font-bold">TravelEase Admin</span>
        </div>
        <div className="mt-5 flex flex-col flex-grow">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  isActive(item.href)
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
              >
                <item.icon
                  className={`${
                    isActive(item.href) ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                  } mr-3 h-6 w-6`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="w-full flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <FaSignOutAlt className="mr-3 h-6 w-6 text-gray-400" />
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top navbar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm lg:hidden">
          <div className="h-16 flex items-center justify-between px-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open sidebar</span>
              <FaBars className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="font-semibold text-xl text-gray-800">TravelEase Admin</div>
            <div className="flex items-center">
              <div className="ml-3 relative">
                <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 