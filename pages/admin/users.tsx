import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FaUser, FaUserShield, FaSearch, FaFilter, FaEllipsisH, FaUserTimes, FaUserCheck } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/AdminLayout';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastLogin: string;
  bookingsCount: number;
  totalSpent: number;
}

// Mock data for demonstration purposes
const mockUsers: User[] = [
  {
    id: 'u123',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    role: 'user',
    status: 'active',
    joinDate: '2023-01-15',
    lastLogin: '2023-07-10',
    bookingsCount: 3,
    totalSpent: 1250,
  },
  {
    id: 'u456',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 (555) 987-6543',
    role: 'user',
    status: 'active',
    joinDate: '2023-02-20',
    lastLogin: '2023-07-12',
    bookingsCount: 5,
    totalSpent: 2780,
  },
  {
    id: 'u789',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    phone: '+1 (555) 246-8102',
    role: 'user',
    status: 'suspended',
    joinDate: '2023-03-10',
    lastLogin: '2023-06-28',
    bookingsCount: 1,
    totalSpent: 450,
  },
  {
    id: 'u101',
    name: 'Emily Davis',
    email: 'emily@example.com',
    phone: '+1 (555) 369-8520',
    role: 'user',
    status: 'active',
    joinDate: '2023-03-15',
    lastLogin: '2023-07-11',
    bookingsCount: 2,
    totalSpent: 890,
  },
  {
    id: 'u202',
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '+1 (555) 147-2583',
    role: 'admin',
    status: 'active',
    joinDate: '2023-01-10',
    lastLogin: '2023-07-12',
    bookingsCount: 0,
    totalSpent: 0,
  },
  {
    id: 'u303',
    name: 'Sophia Wilson',
    email: 'sophia@example.com',
    phone: '+1 (555) 852-7413',
    role: 'user',
    status: 'inactive',
    joinDate: '2023-04-05',
    lastLogin: '2023-05-20',
    bookingsCount: 1,
    totalSpent: 420,
  },
  {
    id: 'u404',
    name: 'William Taylor',
    email: 'william@example.com',
    phone: '+1 (555) 963-7410',
    role: 'user',
    status: 'active',
    joinDate: '2023-04-20',
    lastLogin: '2023-07-09',
    bookingsCount: 4,
    totalSpent: 1720,
  },
  {
    id: 'u505',
    name: 'Olivia Martinez',
    email: 'olivia@example.com',
    phone: '+1 (555) 159-7530',
    role: 'user',
    status: 'active',
    joinDate: '2023-05-15',
    lastLogin: '2023-07-08',
    bookingsCount: 2,
    totalSpent: 920,
  },
];

export default function UsersAdmin() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [dataLoading, setDataLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all',
  });
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Redirect if not admin
    if (!loading && !isAdmin) {
      router.replace('/login?callbackUrl=/admin/users');
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
    let filtered = [...users];
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        user =>
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.id.toLowerCase().includes(term) ||
          user.phone.toLowerCase().includes(term)
      );
    }
    
    // Apply role filter
    if (filters.role !== 'all') {
      filtered = filtered.filter(user => user.role === filters.role);
    }
    
    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(user => user.status === filters.status);
    }
    
    setFilteredUsers(filtered);
  }, [users, searchTerm, filters]);

  const updateUserStatus = (id: string, status: User['status']) => {
    // In a real app, this would call an API
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, status } : user
    );
    setUsers(updatedUsers);
  };

  const updateUserRole = (id: string, role: User['role']) => {
    // In a real app, this would call an API
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, role } : user
    );
    setUsers(updatedUsers);
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

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'user':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewUser = (user: User) => {
    setCurrentUser(user);
    setShowUserModal(true);
  };

  const closeUserModal = () => {
    setShowUserModal(false);
    setCurrentUser(null);
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
        <title>Manage Users - Admin - TravelEase</title>
      </Head>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
        <p className="text-gray-600">Manage user accounts and permissions</p>
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
                  placeholder="Search users..."
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
                  {filteredUsers.length} users found
                </div>
              </div>
            </div>
            
            {showFilters && (
              <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User Role</label>
                  <select
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={filters.role}
                    onChange={(e) => setFilters({...filters, role: e.target.value})}
                  >
                    <option value="all">All Roles</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User Status</label>
                  <select
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Account
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bookings
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              {user.role === 'admin' ? (
                                <FaUserShield className="text-gray-500" />
                              ) : (
                                <FaUser className="text-gray-500" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">ID: {user.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{user.email}</div>
                          <div className="text-sm text-gray-500">{user.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            Joined: {formatDate(user.joinDate)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Last login: {formatDate(user.lastLogin)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {user.bookingsCount} bookings
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatCurrency(user.totalSpent)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative group">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                user.status
                              )}`}
                            >
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </span>
                            <div className="hidden group-hover:block absolute z-10 bg-white shadow-lg rounded-md p-2 mt-1 w-32">
                              <div className="flex flex-col text-sm">
                                <button 
                                  onClick={() => updateUserStatus(user.id, 'active')}
                                  className="py-1 px-2 hover:bg-gray-100 rounded text-left"
                                >
                                  <div className="flex items-center">
                                    <FaUserCheck className="mr-2 text-green-500" />
                                    Active
                                  </div>
                                </button>
                                <button 
                                  onClick={() => updateUserStatus(user.id, 'inactive')}
                                  className="py-1 px-2 hover:bg-gray-100 rounded text-left"
                                >
                                  <div className="flex items-center">
                                    <FaUser className="mr-2 text-gray-500" />
                                    Inactive
                                  </div>
                                </button>
                                <button 
                                  onClick={() => updateUserStatus(user.id, 'suspended')}
                                  className="py-1 px-2 hover:bg-gray-100 rounded text-left"
                                >
                                  <div className="flex items-center">
                                    <FaUserTimes className="mr-2 text-red-500" />
                                    Suspended
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative group">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(
                                user.role
                              )}`}
                            >
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                            <div className="hidden group-hover:block absolute z-10 bg-white shadow-lg rounded-md p-2 mt-1 w-32">
                              <div className="flex flex-col text-sm">
                                <button 
                                  onClick={() => updateUserRole(user.id, 'user')}
                                  className="py-1 px-2 hover:bg-gray-100 rounded text-left"
                                >
                                  <div className="flex items-center">
                                    <FaUser className="mr-2 text-blue-500" />
                                    User
                                  </div>
                                </button>
                                <button 
                                  onClick={() => updateUserRole(user.id, 'admin')}
                                  className="py-1 px-2 hover:bg-gray-100 rounded text-left"
                                >
                                  <div className="flex items-center">
                                    <FaUserShield className="mr-2 text-purple-500" />
                                    Admin
                                  </div>
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
                                <button 
                                  onClick={() => handleViewUser(user)}
                                  className="py-1 px-2 hover:bg-gray-100 rounded text-left"
                                >
                                  View Profile
                                </button>
                                <button className="py-1 px-2 hover:bg-gray-100 rounded text-left">
                                  View Bookings
                                </button>
                                <button className="py-1 px-2 hover:bg-gray-100 rounded text-left">
                                  Reset Password
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
                        No users found matching your criteria. Try adjusting your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* User Details Modal */}
      {showUserModal && currentUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-lg font-medium">User Profile</h3>
              <button 
                onClick={closeUserModal}
                className="text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            <div className="p-5">
              <div className="flex flex-col items-center mb-4">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                  {currentUser.role === 'admin' ? (
                    <FaUserShield size={32} className="text-gray-500" />
                  ) : (
                    <FaUser size={32} className="text-gray-500" />
                  )}
                </div>
                <h2 className="text-xl font-semibold">{currentUser.name}</h2>
                <div className="flex gap-2 mt-1">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(currentUser.status)}`}>
                    {currentUser.status.charAt(0).toUpperCase() + currentUser.status.slice(1)}
                  </span>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(currentUser.role)}`}>
                    {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">User ID</p>
                  <p>{currentUser.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{currentUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p>{currentUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Join Date</p>
                  <p>{formatDate(currentUser.joinDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Login</p>
                  <p>{formatDate(currentUser.lastLogin)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                  <p>{currentUser.bookingsCount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Spent</p>
                  <p>{formatCurrency(currentUser.totalSpent)}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 flex justify-end rounded-b-lg">
              <button
                onClick={closeUserModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}