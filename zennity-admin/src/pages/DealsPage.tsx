import { useEffect, useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Filter } from 'lucide-react';
import { api } from '../services/api';
import { Deal, DealType, DealCategory, DealComplexity } from '../types';
import { format } from 'date-fns';

const DealsPage = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    try {
      const data = await api.getDeals();
      setDeals(data);
    } catch (error) {
      console.error('Failed to load deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this deal?')) return;

    try {
      await api.deleteDeal(id);
      setDeals(deals.filter(d => d.id !== id));
    } catch (error) {
      console.error('Failed to delete deal:', error);
      alert('Failed to delete deal');
    }
  };

  const getDealTypeBadge = (type: DealType) => {
    const colors = {
      [DealType.HOT]: 'bg-error text-white',
      [DealType.TRANSFER]: 'bg-secondary text-white',
      [DealType.WELCOME]: 'bg-success text-white',
      [DealType.STACKING]: 'bg-primary text-white',
      [DealType.BANK_BONUS]: 'bg-warning text-white',
      [DealType.MILES_SALE]: 'bg-info text-white',
    };

    const emojis = {
      [DealType.HOT]: '⚡',
      [DealType.TRANSFER]: '✈️',
      [DealType.WELCOME]: '🎁',
      [DealType.STACKING]: '🎯',
      [DealType.BANK_BONUS]: '🏦',
      [DealType.MILES_SALE]: '💰',
    };

    return (
      <span className={`${colors[type]} px-2 py-1 rounded-full text-xs font-medium`}>
        {emojis[type]} {type.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  const filteredDeals = deals.filter(deal =>
    deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    deal.bankName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Deals Management</h1>
            <p className="text-gray-600 mt-2">Manage all credit card deals and offers</p>
          </div>
          <button
            onClick={() => {
              setSelectedDeal(null);
              setShowModal(true);
            }}
            className="btn btn-primary flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Deal
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search deals by title or bank..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          <button className="btn btn-secondary flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Deals Table */}
      <div className="card overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Days Left
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDeals.map((deal) => (
              <tr key={deal.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{deal.title}</div>
                    <div className="text-sm text-gray-500">{deal.subtitle}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getDealTypeBadge(deal.type)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{deal.bankName || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{deal.value}</div>
                  {deal.rewardAmount && (
                    <div className="text-xs text-gray-500">{deal.rewardAmount}%</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {deal.daysLeft !== undefined ? (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        deal.daysLeft <= 3
                          ? 'bg-error/10 text-error'
                          : deal.daysLeft <= 7
                          ? 'bg-warning/10 text-warning'
                          : 'bg-success/10 text-success'
                      }`}
                    >
                      {deal.daysLeft} days
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(deal.createdAt), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      className="text-gray-600 hover:text-primary"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDeal(deal);
                        setShowModal(true);
                      }}
                      className="text-gray-600 hover:text-primary"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(deal.id)}
                      className="text-gray-600 hover:text-error"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredDeals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No deals found</p>
          </div>
        )}
      </div>

      {/* Modal would go here - simplified for now */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">
              {selectedDeal ? 'Edit Deal' : 'Add New Deal'}
            </h2>
            <p className="text-gray-600 mb-4">Deal form would go here...</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealsPage;
