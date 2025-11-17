import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Power, Settings } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { AttributeForm } from './AttributeForm';
import type { Attribute } from '../../models/Attribute';
import { attributeService } from '../../services/attributeService';

export const AttributesPage: React.FC = () => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(null);

  useEffect(() => {
    loadAttributes();
  }, []);

  const loadAttributes = async () => {
    try {
      setLoading(true);
      const data = await attributeService.getAll();
      setAttributes(data);
    } catch (error) {
      console.error('Error loading attributes:', error);
      alert('Failed to load attributes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingAttribute(null);
    setIsModalOpen(true);
  };

  const handleEdit = (attribute: Attribute) => {
    setEditingAttribute(attribute);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this attribute?')) {
      return;
    }

    try {
      await attributeService.delete(id);
      await loadAttributes();
    } catch (error) {
      console.error('Error deleting attribute:', error);
      alert('Failed to delete attribute');
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      await attributeService.toggleActive(id, !isActive);
      await loadAttributes();
    } catch (error) {
      console.error('Error toggling attribute:', error);
      alert('Failed to toggle attribute status');
    }
  };

  const handleFormSubmit = async () => {
    setIsModalOpen(false);
    await loadAttributes();
  };

  const getDataTypeLabel = (dataType: string) => {
    return dataType.charAt(0).toUpperCase() + dataType.slice(1).replace('_', ' ');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading attributes...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attribute Schema</h1>
          <p className="mt-1 text-sm text-gray-500">
            Define custom attributes and data types for credit cards
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus size={20} className="mr-2" />
          Create Attribute
        </Button>
      </div>

      {attributes.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Settings className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No attributes</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating your first attribute.
          </p>
          <div className="mt-6">
            <Button onClick={handleCreate}>
              <Plus size={20} className="mr-2" />
              Create Attribute
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Required
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Group
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
              {attributes.map((attribute) => (
                <tr key={attribute.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {attribute.displayName}
                      </div>
                      <div className="text-sm text-gray-500">{attribute.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {getDataTypeLabel(attribute.dataType)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {attribute.required ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {attribute.group || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {attribute.isActive ? (
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
                      onClick={() => handleToggleActive(attribute.id, attribute.isActive)}
                      className="text-blue-600 hover:text-blue-900"
                      title={attribute.isActive ? 'Deactivate' : 'Activate'}
                    >
                      <Power size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(attribute)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit size={18} />
                    </button>
                    {!attribute.isSystem && (
                      <button
                        onClick={() => handleDelete(attribute.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
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
        title={editingAttribute ? 'Edit Attribute' : 'Create Attribute'}
        size="lg"
      >
        <AttributeForm
          attribute={editingAttribute}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
