import { useEffect, useState } from 'react';
import { Tag, CreditCard, Users, TrendingUp, Activity, Clock } from 'lucide-react';
import { api } from '../services/api';
import { DashboardStats } from '../types';

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await api.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Deals',
      value: stats?.totalDeals || 0,
      change: '+12%',
      icon: Tag,
      color: 'bg-primary',
    },
    {
      title: 'Active Deals',
      value: stats?.activeDeals || 0,
      change: '+8%',
      icon: Activity,
      color: 'bg-success',
    },
    {
      title: 'Total Cards',
      value: stats?.totalCards || 0,
      change: '+5%',
      icon: CreditCard,
      color: 'bg-secondary',
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      change: '+23%',
      icon: Users,
      color: 'bg-info',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to Zennity Admin Portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-success flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* This Week */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            This Week
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">New Deals Added</p>
                <p className="text-sm text-gray-500">Added to the platform</p>
              </div>
              <span className="text-2xl font-bold text-primary">{stats?.dealsThisWeek || 0}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">New Users</p>
                <p className="text-sm text-gray-500">Signed up this week</p>
              </div>
              <span className="text-2xl font-bold text-info">{stats?.usersThisWeek || 0}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Active Cards</p>
                <p className="text-sm text-gray-500">In user portfolios</p>
              </div>
              <span className="text-2xl font-bold text-secondary">{stats?.totalCards || 0}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="btn btn-primary flex items-center justify-center">
              <Tag className="w-4 h-4 mr-2" />
              Add Deal
            </button>
            <button className="btn btn-primary flex items-center justify-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Add Card
            </button>
            <button className="btn btn-secondary flex items-center justify-center">
              <Users className="w-4 h-4 mr-2" />
              View Users
            </button>
            <button className="btn btn-secondary flex items-center justify-center">
              <Activity className="w-4 h-4 mr-2" />
              Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
