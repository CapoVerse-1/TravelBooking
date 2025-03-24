import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FaPlane, FaHotel, FaTag, FaSearch, FaFilter, FaEllipsisH } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/AdminLayout';

interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  type: 'flight' | 'hotel' | 'package';
  details: string;
  dateBooked: string;
  travelDate: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
}

// Mock data for demonstration purposes
const mockBookings: Booking[] = [
  {
    id: 'b001',
    userId: 'u123',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    type: 'flight',
    details: 'New York (JFK) to London (LHR)',
    dateBooked: '2023-07-01',
    travelDate: '2023-08-15',
    amount: 520,
    status: 'confirmed',
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
  },
  {
    id: 'b002',
    userId: 'u456',
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    type: 'hotel',
    details: 'Grand Plaza Hotel, Paris - 5 nights',
    dateBooked: '2023-07-02',
    travelDate: '2023-09-10',
    amount: 780,
    status: 'confirmed',
    paymentMethod: 'PayPal',
    paymentStatus: 'paid',
  },
  {
    id: 'b003',
    userId: 'u789',
    userName: 'Robert Johnson',
    userEmail: 'robert@example.com',
    type: 'package',
    details: 'Dubai Vacation Package - Flight + Hotel + Tours',
    dateBooked: '2023-07-05',
    travelDate: '2023-10-05',
    amount: 1450,
    status: 'pending',
    paymentMethod: 'Credit Card',
    paymentStatus: 'pending',
  },
  {
    id: 'b004',
    userId: 'u101',
    userName: 'Emily Davis',
    userEmail: 'emily@example.com',
    type: 'flight',
    details: 'Los Angeles (LAX) to Tokyo (HND)',
    dateBooked: '2023-07-08',
    travelDate: '2023-08-20',
    amount: 890,
    status: 'confirmed',
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
  },
  {
    id: 'b005',
    userId: 'u202',
    userName: 'Michael Brown',
    userEmail: 'michael@example.com',
    type: 'hotel',
    details: 'Ocean View Resort, Bali - 7 nights',
    dateBooked: '2023-07-10',
    travelDate: '2023-09-25',
    amount: 650,
    status: 'cancelled',
    paymentMethod: 'Credit Card',
    paymentStatus: 'refunded',
  },
  {
    id: 'b006',
    userId: 'u303',
    userName: 'Sophia Wilson',
    userEmail: 'sophia@example.com',
    type: 'package',
    details: 'Rome Cultural Tour - Flight + Hotel + Guided Tours',
    dateBooked: '2023-07-12',
    travelDate: '2023-11-01',
    amount: 1250,
    status: 'confirmed',
    paymentMethod: 'PayPal',
    paymentStatus: 'paid',
  },
  {
    id: 'b007',
    userId: 'u404',
    userName: 'William Taylor',
    userEmail: 'william@example.com',
    type: 'flight',
    details: 'Chicago (ORD) to Berlin (BER)',
    dateBooked: '2023-07-15',
    travelDate: '2023-08-30',
    amount: 720,
    status: 'completed',
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
  },
  {
    id: 'b008',
    userId: 'u505',
    userName: 'Olivia Martinez',
    userEmail: 'olivia@example.com',
    type: 'hotel',
    details: 'Mountain Lodge, Aspen - 4 nights',
    dateBooked: '2023-07-18',
    travelDate: '2023-12-15',
    amount: 920,
    status: 'confirmed',
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
  },
];

export default function BookingsAdmin() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(mockBookings);
  const [dataLoading, setDataLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    paymentStatus: 'all',
  });

  useEffect(() => {
    // Redirect if not admin
    if (!loading && !isAdmin) {
      router.replace('/login?callbackUrl=/admin/bookings');
    }
  }, [isAdmin, loading, router]);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setDataLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters and search
    let filtered = [...bookings];
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        booking =>
          booking.userName.toLowerCase().includes(term) ||
          booking.userEmail.toLowerCase().includes(term) ||
          booking.id.toLowerCase().includes(term) ||
          booking.details.toLowerCase().includes(term)
      );
    }
    
    // Apply type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(booking => booking.type === filters.type);
    }
    
    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(booking => booking.status === filters.status);
    }
    
    // Apply payment status filter
    if (filters.paymentStatus !== 'all') {
      filtered = filtered.filter(booking => booking.paymentStatus === filters.paymentStatus);
    }
    
    setFilteredBookings(filtered);
  }, [bookings, searchTerm, filters]);

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    // In a real app, this would call an API
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    );
    setBookings(updatedBookings);
  };

  const updatePaymentStatus = (id: string, paymentStatus: Booking['paymentStatus']) => {
    // In a real app, this would call an API
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, paymentStatus } : booking
    );
    setBookings(updatedBookings);
  };

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

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
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

  const getPaymentStatusColor = (status: Booking['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingTypeIcon = (type: Booking['type']) => {
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
        <title>Manage Bookings - Admin - TravelEase</title>
      </Head>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Bookings</h1>
        <p className="text-gray-600">View and manage all customer bookings</p>
      </div>

      {dataLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <>
          {/* Search and Filter Controls */}
          <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="relative w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
                >
                  <FaFilter className="text-gray-500" />
                  <span>Filters</span>
                </button>
                
                <div className="text-sm text-gray-600">
                  {filteredBookings.length} bookings found
                </div>
              </div>
            </div>
            
            {showFilters && (
              <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Booking Type</label>
                  <select
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                  >
                    <option value="all">All Types</option>
                    <option value="flight">Flight</option>
                    <option value="hotel">Hotel</option>
                    <option value="package">Package</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Booking Status</label>
                  <select
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                  <select
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={filters.paymentStatus}
                    onChange={(e) => setFilters({...filters, paymentStatus: e.target.value})}
                  >
                    <option value="all">All Statuses</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="mr-3">
                              {getBookingTypeIcon(booking.type)}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{booking.details}</div>
                              <div className="text-sm text-gray-500">ID: {booking.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{booking.userName}</div>
                          <div className="text-sm text-gray-500">{booking.userEmail}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            Travel: {formatDate(booking.travelDate)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Booked: {formatDate(booking.dateBooked)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {formatCurrency(booking.amount)}
                          <div className="text-sm text-gray-500">{booking.paymentMethod}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative group">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                booking.status
                              )}`}
                            >
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                            <div className="hidden group-hover:block absolute z-10 bg-white shadow-lg rounded-md p-2 mt-1 w-32">
                              <div className="flex flex-col text-sm">
                                <button 
                                  onClick={() => updateBookingStatus(booking.id, 'pending')}
                                  className="py-1 px-2 hover:bg-gray-100 rounded text-left"
                                >
                                  Pending
                                </button>
                                <button 
                                  onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                  className="py-1 px-2 hover:bg-gray-100 rounded text-left"
                                >
                                  Confirm
                                </button>
                                <button 
                                  onClick={() => updateBookingStatus(booking.id, 'completed')}
                                  className="py-1 px-2 hover:bg-gray-100 rounded text-left"
                                >
                                  Complete
                                </button>
                                <button 
                                  onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                  className="py-1 px-2 hover:bg-gray-100 rounded text-left"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative group">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(
                                booking.paymentStatus
                              )}`}
                            >
                              {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                            </span>
                            <div className="hidden group-hover:block absolute z-10 bg-white shadow-lg rounded-md p-2 mt-1 w-32">
                              <div className="flex flex-col text-sm">
                                <button 
                                  onClick={() => updatePaymentStatus(booking.id, 'pending')}
                                  className="py-1 px-2 hover:bg-gray-100 rounded text-left"
                                >
                                  Pending
                                </button>
                                <button 
                                  onClick={() => updatePaymentStatus(booking.id, 'paid')}
                                  className="py-1 px-2 hover:bg-gray-100 rounded text-left"
                                >
                                  Paid
                                </button>
                                <button 
                                  onClick={() => updatePaymentStatus(booking.id, 'refunded')}
                                  className="py-1 px-2 hover:bg-gray-100 rounded text-left"
                                >
                                  Refunded
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="relative group">
                            <button className="hover:bg-gray-100 p-1 rounded-full">
                              <FaEllipsisH className="text-gray-500" />
                            </button>
                            <div className="hidden group-hover:block absolute right-0 z-10 bg-white shadow-lg rounded-md p-2 mt-1 w-32">
                              <div className="flex flex-col text-sm">
                                <button className="py-1 px-2 hover:bg-gray-100 rounded text-left">
                                  View Details
                                </button>
                                <button className="py-1 px-2 hover:bg-gray-100 rounded text-left">
                                  Email Customer
                                </button>
                                <button className="py-1 px-2 hover:bg-gray-100 rounded text-left">
                                  Print Itinerary
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                        No bookings found matching your criteria. Try adjusting your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
} 