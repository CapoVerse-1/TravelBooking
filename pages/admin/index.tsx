import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FaUsers, FaPlane, FaHotel, FaMoneyBillWave, FaTag } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/AdminLayout';

// Mock data for demonstration purposes
const mockStats = {
  totalUsers: 1245,
  totalBookings: 857,
  flightBookings: 512,
  hotelBookings: 345,
  revenue: 128750,
  activeDiscounts: 5,
};

const mockRecentBookings = [
  {
    id: 'b1',
    user: 'John Doe',
    type: 'flight',
    details: 'New York to London',
    date: '2023-07-10',
    amount: 520,
    status: 'completed',
  },
  {
    id: 'b2',
    user: 'Jane Smith',
    type: 'hotel',
    details: 'Grand Plaza Hotel, Paris',
    date: '2023-07-09',
    amount: 780,
    status: 'completed',
  },
  {
    id: 'b3',
    user: 'Robert Johnson',
    type: 'package',
    details: 'Dubai Vacation Package',
    date: '2023-07-08',
    amount: 1450,
    status: 'pending',
  },
  {
    id: 'b4',
    user: 'Emily Davis',
    type: 'flight',
    details: 'Los Angeles to Tokyo',
    date: '2023-07-07',
    amount: 890,
    status: 'completed',
  },
  {
    id: 'b5',
    user: 'Michael Brown',
    type: 'hotel',
    details: 'Ocean View Resort, Bali',
    date: '2023-07-06',
    amount: 650,
    status: 'cancelled',
  },
];

export default function AdminDashboard() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState(mockStats);
  const [recentBookings, setRecentBookings] = useState(mockRecentBookings);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    // Redirect if not admin
    if (!loading && !isAdmin) {
      router.replace('/login?callbackUrl=/admin');
    }
  }, [isAdmin, loading, router]);

  useEffect(() => {
    // Simulate API call to get dashboard data
    const timer = setTimeout(() => {
      setDataLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingTypeIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <FaPlane className="text-blue-500" />;
      case 'hotel':
        return <FaHotel className="text-green-500" />;
      case 'package':
        return <FaTag className="text-purple-500" />;
      default:
        return null;
    }
  };

  if (loading || !isAdmin) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <Head>
        <title>Admin Dashboard - TravelEase</title>
      </Head>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to the TravelEase admin dashboard</p>
      </div>

      {dataLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-100 text-primary-800 mr-4">
                  <FaUsers size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
                  <FaPlane size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Flight Bookings</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.flightBookings}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-800 mr-4">
                  <FaHotel size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Hotel Bookings</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.hotelBookings}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-800 mr-4">
                  <FaMoneyBillWave size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">{formatCurrency(stats.revenue)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-800 mr-4">
                  <FaTag size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Discounts</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.activeDiscounts}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-lg">Recent Bookings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-3">
                            {getBookingTypeIcon(booking.type)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{booking.details}</div>
                            <div className="text-sm text-gray-500 capitalize">{booking.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.user}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(booking.date)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(booking.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
} 