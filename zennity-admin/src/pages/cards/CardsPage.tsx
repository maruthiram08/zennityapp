import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Power, Search } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { CardForm } from './CardForm';
import type { Card } from '../../models/Card';
import { cardService } from '../../services/cardService';

export const CardsPage: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);

  useEffect(() => {
    loadCards();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = cards.filter(
        (card) =>
          card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.cardType.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCards(filtered);
    } else {
      setFilteredCards(cards);
    }
  }, [searchQuery, cards]);

  const loadCards = async () => {
    try {
      setLoading(true);
      const data = await cardService.getAll();
      setCards(data);
      setFilteredCards(data);
    } catch (error) {
      console.error('Error loading cards:', error);
      alert('Failed to load cards');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCard(null);
    setIsModalOpen(true);
  };

  const handleEdit = (card: Card) => {
    setEditingCard(card);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this card?')) {
      return;
    }

    try {
      await cardService.delete(id);
      await loadCards();
    } catch (error) {
      console.error('Error deleting card:', error);
      alert('Failed to delete card');
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await cardService.toggleActive(id, !isActive);
      await loadCards();
    } catch (error) {
      console.error('Error toggling card:', error);
      alert('Failed to toggle card status');
    }
  };

  const handleFormSubmit = async () => {
    setIsModalOpen(false);
    await loadCards();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading cards...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Credit Cards</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage credit card data with custom attributes
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus size={20} className="mr-2" />
          Add Card
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search cards by name, bank, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {filteredCards.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400">💳</div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {searchQuery ? 'No cards found' : 'No cards'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery
              ? 'Try adjusting your search query'
              : 'Get started by adding your first card.'}
          </p>
          {!searchQuery && (
            <div className="mt-6">
              <Button onClick={handleCreate}>
                <Plus size={20} className="mr-2" />
                Add Card
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Card Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Network
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Annual Fee
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
              {filteredCards.map((card) => (
                <tr key={card.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {card.name}
                      </div>
                      <div className="text-sm text-gray-500">{card.cardType}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {card.bankName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 uppercase">
                      {card.tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 uppercase">
                      {card.network}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{card.annualFee.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {card.isActive ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleToggleActive(card.id, card.isActive)}
                      className="text-blue-600 hover:text-blue-900"
                      title={card.isActive ? 'Deactivate' : 'Activate'}
                    >
                      <Power size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(card)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(card.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCard ? 'Edit Card' : 'Add New Card'}
        size="xl"
      >
        <CardForm
          card={editingCard}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
