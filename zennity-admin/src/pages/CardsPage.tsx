import { useEffect, useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { api } from '../services/api';
import { Card, CardTier, CardNetwork } from '../types';
import { format } from 'date-fns';

const CardsPage = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const data = await api.getCards();
      setCards(data);
    } catch (error) {
      console.error('Failed to load cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this card?')) return;

    try {
      await api.deleteCard(id);
      setCards(cards.filter(c => c.id !== id));
    } catch (error) {
      console.error('Failed to delete card:', error);
      alert('Failed to delete card');
    }
  };

  const getTierBadge = (tier: CardTier) => {
    const colors = {
      [CardTier.BASIC]: 'bg-gray-500',
      [CardTier.SILVER]: 'bg-gray-400',
      [CardTier.GOLD]: 'bg-yellow-500',
      [CardTier.PLATINUM]: 'bg-gray-700',
      [CardTier.PREMIUM]: 'bg-purple-600',
    };

    return (
      <span className={`${colors[tier]} text-white px-2 py-1 rounded-full text-xs font-medium`}>
        {tier.toUpperCase()}
      </span>
    );
  };

  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.bankName.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-3xl font-bold text-gray-900">Cards Management</h1>
            <p className="text-gray-600 mt-2">Manage credit card catalog</p>
          </div>
          <button className="btn btn-primary flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add Card
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="card p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search cards by name or bank..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => (
          <div key={card.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
            {/* Card Visual */}
            <div
              className="h-48 p-6 text-white relative"
              style={{
                background: `linear-gradient(135deg, ${card.gradientColors[0]}, ${card.gradientColors[1]})`,
              }}
            >
              <div className="absolute top-4 right-4">
                {getTierBadge(card.tier)}
              </div>
              <div className="h-full flex flex-col justify-between">
                <div>
                  <p className="text-sm opacity-90">{card.bankName}</p>
                  <h3 className="text-xl font-bold mt-1">{card.name}</h3>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">{card.network.toUpperCase()}</span>
                  {card.activeOffersCount !== undefined && (
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                      {card.activeOffersCount} offers
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Card Info */}
            <div className="p-4">
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium text-gray-900">{card.cardType}</span>
                </div>
                {card.annualFee && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Annual Fee</span>
                    <span className="font-medium text-gray-900">₹{card.annualFee.toLocaleString()}</span>
                  </div>
                )}
                {card.feeDaysRemaining && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Fee Due In</span>
                    <span className="font-medium text-gray-900">{card.feeDaysRemaining} days</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-medium ${card.isActive ? 'text-success' : 'text-error'}`}>
                    {card.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  Added {format(new Date(card.createdAt), 'MMM dd, yyyy')}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="text-gray-600 hover:text-primary" title="View">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-primary" title="Edit">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="text-gray-600 hover:text-error"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCards.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-gray-500">No cards found</p>
        </div>
      )}
    </div>
  );
};

export default CardsPage;
