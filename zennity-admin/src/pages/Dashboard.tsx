import React, { useState, useEffect } from 'react';
import { CreditCard, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cardService } from '../services/cardService';
import { attributeService } from '../services/attributeService';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalCards: 0,
    activeCards: 0,
    totalAttributes: 0,
    activeAttributes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [cards, attributes] = await Promise.all([
        cardService.getAll(),
        attributeService.getAll(),
      ]);

      setStats({
        totalCards: cards.length,
        activeCards: cards.filter((c) => c.isActive).length,
        totalAttributes: attributes.length,
        activeAttributes: attributes.filter((a) => a.isActive).length,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Total Cards',
      value: stats.totalCards,
      active: stats.activeCards,
      icon: CreditCard,
      color: 'bg-blue-500',
      link: '/cards',
    },
    {
      name: 'Custom Attributes',
      value: stats.totalAttributes,
      active: stats.activeAttributes,
      icon: Settings,
      color: 'bg-purple-500',
      link: '/attributes',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your credit cards metadata management
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              to={stat.link}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 ${stat.color} rounded-md p-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                          {stat.active} active
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/cards"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <CreditCard className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-900">Manage Cards</h3>
              <p className="text-sm text-gray-500">Add, edit, or delete credit cards</p>
            </div>
          </Link>

          <Link
            to="/attributes"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <Settings className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-900">Configure Attributes</h3>
              <p className="text-sm text-gray-500">Define custom card attributes</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Getting Started */}
      {stats.totalCards === 0 && stats.totalAttributes === 0 && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-blue-900 mb-2">Getting Started</h2>
          <p className="text-sm text-blue-700 mb-4">
            Welcome to Zennity Cards Metadata Manager! Here's how to get started:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
            <li>First, define custom attributes for your credit cards (optional)</li>
            <li>Then, start adding your credit cards with all the details</li>
            <li>Use the dynamic form fields based on your custom attributes</li>
          </ol>
        </div>
      )}
    </div>
  );
};
