import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaPlane, FaHotel, FaBriefcase } from 'react-icons/fa';
import AdminLayout from '@/components/AdminLayout';

interface Discount {
  id: string;
  name: string;
  type: 'flight' | 'hotel' | 'package';
  percentage: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  description: string;
}

// Mock data
const initialDiscounts: Discount[] = [
  {
    id: 'd1',
    name: 'Summer Flight Sale',
    type: 'flight',
    percentage: 20,
    validFrom: '2023-06-01',
    validTo: '2023-08-31',
    isActive: true,
    description: 'Get 20% off on all flights during summer vacation',
  },
  {
    id: 'd2',
    name: 'Luxury Hotel Discount',
    type: 'hotel',
    percentage: 15,
    validFrom: '2023-05-15',
    validTo: '2023-12-31',
    isActive: true,
    description: 'Save 15% on luxury hotel bookings',
  },
  {
    id: 'd3',
    name: 'Vacation Package Deal',
    type: 'package',
    percentage: 25,
    validFrom: '2023-09-01',
    validTo: '2023-11-30',
    isActive: false,
    description: 'Save 25% when booking flight + hotel packages',
  },
  {
    id: 'd4',
    name: 'Last Minute Flight Deals',
    type: 'flight',
    percentage: 30,
    validFrom: '2023-06-01',
    validTo: '2023-06-30',
    isActive: true,
    description: 'Get 30% off on last minute flight bookings',
  },
  {
    id: 'd5',
    name: 'Weekend Getaway',
    type: 'package',
    percentage: 10,
    validFrom: '2023-07-01',
    validTo: '2023-12-31',
    isActive: true,
    description: 'Save 10% on weekend vacation packages',
  },
];

export default function DiscountsPage() {
  const { user, isAdmin, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [discounts, setDiscounts] = useState<Discount[]>(initialDiscounts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const [formData, setFormData] = useState<Partial<Discount>>({
    name: '',
    type: 'flight',
    percentage: 10,
    validFrom: '',
    validTo: '',
    isActive: true,
    description: '',
  });

  useEffect(() => {
    // Redirect if not admin
    if (!loading && !isAdmin) {
      router.replace('/login?callbackUrl=/admin/discounts');
    }
  }, [isAdmin, loading, router]);

  const openModal = (discount: Discount | null = null) => {
    if (discount) {
      setEditingDiscount(discount);
      setFormData({
        name: discount.name,
        type: discount.type,
        percentage: discount.percentage,
        validFrom: discount.validFrom,
        validTo: discount.validTo,
        isActive: discount.isActive,
        description: discount.description,
      });
    } else {
      setEditingDiscount(null);
      setFormData({
        name: '',
        type: 'flight',
        percentage: 10,
        validFrom: new Date().toISOString().split('T')[0],
        validTo: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
        isActive: true,
        description: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDiscount(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingDiscount) {
      // Update existing discount
      setDiscounts(prev => prev.map(d => 
        d.id === editingDiscount.id ? { ...d, ...formData } as Discount : d
      ));
    } else {
      // Add new discount
      const newDiscount: Discount = {
        id: `d${discounts.length + 1}`,
        name: formData.name || '',
        type: formData.type as 'flight' | 'hotel' | 'package',
        percentage: formData.percentage || 10,
        validFrom: formData.validFrom || new Date().toISOString().split('T')[0],
        validTo: formData.validTo || new Date().toISOString().split('T')[0],
        isActive: formData.isActive !== undefined ? formData.isActive : true,
        description: formData.description || '',
      };
      setDiscounts(prev => [...prev, newDiscount]);
    }
    
    closeModal();
  };

  const handleDeleteDiscount = (id: string) => {
    if (window.confirm('Are you sure you want to delete this discount?')) {
      setDiscounts(prev => prev.filter(d => d.id !== id));
    }
  };

  const toggleDiscountStatus = (id: string) => {
    setDiscounts(prev => prev.map(d => 
      d.id === id ? { ...d, isActive: !d.isActive } : d
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <FaPlane className="text-blue-500" />;
      case 'hotel':
        return <FaHotel className="text-green-500" />;
      case 'package':
        return <FaBriefcase className="text-purple-500" />;
      default:
        return null;
    }
  };

  if (loading || !isAuthenticated || !isAdmin) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>;
  }

  return (
    <AdminLayout>
      <Head>
        <title>Manage Discounts - TravelEase Admin</title>
      </Head>

      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Discounts</h1>
        <button
          onClick={() => openModal()}
          className="btn btn-primary flex items-center"
        >
          <FaPlus className="mr-2" /> Add Discount
        </button>
      </div>

      {/* Discounts table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valid Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {discounts.map((discount) => (
                <tr key={discount.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{discount.name}</div>
                    <div className="text-sm text-gray-500">{discount.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTypeIcon(discount.type)}
                      <span className="ml-2 capitalize">{discount.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-semibold text-primary-600">{discount.percentage}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaCalendarAlt className="mr-1" />
                      <span>
                        {new Date(discount.validFrom).toLocaleDateString()} - {new Date(discount.validTo).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        discount.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {discount.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => toggleDiscountStatus(discount.id)}
                      className={`${
                        discount.isActive ? 'text-gray-600' : 'text-green-600'
                      } hover:opacity-75 mr-3`}
                    >
                      {discount.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => openModal(discount)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteDiscount(discount.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Discount Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {editingDiscount ? 'Edit Discount' : 'Add New Discount'}
                  </h3>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Discount Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name || ''}
                          onChange={handleInputChange}
                          className="mt-1 form-input block w-full"
                          placeholder="Summer Sale"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                          Type
                        </label>
                        <select
                          name="type"
                          id="type"
                          value={formData.type || 'flight'}
                          onChange={handleInputChange}
                          className="mt-1 form-input block w-full"
                          required
                        >
                          <option value="flight">Flight</option>
                          <option value="hotel">Hotel</option>
                          <option value="package">Package</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">
                          Discount Percentage
                        </label>
                        <input
                          type="number"
                          name="percentage"
                          id="percentage"
                          value={formData.percentage || 10}
                          onChange={handleInputChange}
                          className="mt-1 form-input block w-full"
                          min="1"
                          max="99"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="validFrom" className="block text-sm font-medium text-gray-700">
                            Valid From
                          </label>
                          <input
                            type="date"
                            name="validFrom"
                            id="validFrom"
                            value={formData.validFrom || ''}
                            onChange={handleInputChange}
                            className="mt-1 form-input block w-full"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="validTo" className="block text-sm font-medium text-gray-700">
                            Valid To
                          </label>
                          <input
                            type="date"
                            name="validTo"
                            id="validTo"
                            value={formData.validTo || ''}
                            onChange={handleInputChange}
                            className="mt-1 form-input block w-full"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          value={formData.description || ''}
                          onChange={handleInputChange}
                          className="mt-1 form-input block w-full"
                          rows={3}
                          placeholder="Describe the discount"
                          required
                        ></textarea>
                      </div>

                      <div className="mb-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive || false}
                            onChange={handleInputChange}
                            className="form-checkbox h-4 w-4 text-primary-600"
                          />
                          <span className="ml-2 text-sm text-gray-700">Active</span>
                        </label>
                      </div>

                      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          {editingDiscount ? 'Update' : 'Add'}
                        </button>
                        <button
                          type="button"
                          onClick={closeModal}
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
} 