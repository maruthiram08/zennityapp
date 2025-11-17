import React, { useState, useEffect } from 'react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { TextArea } from '../../components/common/TextArea';
import type { Attribute, AttributeOption } from '../../models/Attribute';
import { AttributeDataType } from '../../models/Attribute';
import { attributeService } from '../../services/attributeService';
import { Plus, X } from 'lucide-react';

interface AttributeFormProps {
  attribute?: Attribute | null;
  onSubmit: () => void;
  onCancel: () => void;
}

export const AttributeForm: React.FC<AttributeFormProps> = ({
  attribute,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    displayName: string;
    description: string;
    dataType: AttributeDataType;
    required: boolean;
    isActive: boolean;
    isSystem: boolean;
    group: string;
    order: number;
    placeholder: string;
    helpText: string;
    defaultValue: string;
    minValue: string;
    maxValue: string;
    minLength: string;
    maxLength: string;
    pattern: string;
  }>({
    name: '',
    displayName: '',
    description: '',
    dataType: AttributeDataType.TEXT,
    required: false,
    isActive: true,
    isSystem: false,
    group: '',
    order: 0,
    placeholder: '',
    helpText: '',
    defaultValue: '',
    minValue: '',
    maxValue: '',
    minLength: '',
    maxLength: '',
    pattern: '',
  });

  const [options, setOptions] = useState<AttributeOption[]>([]);
  const [newOption, setNewOption] = useState({ value: '', label: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (attribute) {
      setFormData({
        name: attribute.name,
        displayName: attribute.displayName,
        description: attribute.description || '',
        dataType: attribute.dataType,
        required: attribute.required,
        isActive: attribute.isActive,
        isSystem: attribute.isSystem,
        group: attribute.group || '',
        order: attribute.order,
        placeholder: attribute.placeholder || '',
        helpText: attribute.helpText || '',
        defaultValue: attribute.defaultValue || '',
        minValue: attribute.minValue?.toString() || '',
        maxValue: attribute.maxValue?.toString() || '',
        minLength: attribute.minLength?.toString() || '',
        maxLength: attribute.maxLength?.toString() || '',
        pattern: attribute.pattern || '',
      });

      if (attribute.options) {
        setOptions(attribute.options);
      }
    }
  }, [attribute]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddOption = () => {
    if (newOption.value && newOption.label) {
      setOptions([...options, { ...newOption }]);
      setNewOption({ value: '', label: '' });
    }
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data: any = {
        name: formData.name,
        displayName: formData.displayName,
        description: formData.description,
        dataType: formData.dataType,
        required: formData.required,
        isActive: formData.isActive,
        isSystem: formData.isSystem,
        group: formData.group,
        order: formData.order,
        placeholder: formData.placeholder,
        helpText: formData.helpText,
      };

      // Add validation rules if provided
      if (formData.defaultValue) data.defaultValue = formData.defaultValue;
      if (formData.minValue) data.minValue = Number(formData.minValue);
      if (formData.maxValue) data.maxValue = Number(formData.maxValue);
      if (formData.minLength) data.minLength = Number(formData.minLength);
      if (formData.maxLength) data.maxLength = Number(formData.maxLength);
      if (formData.pattern) data.pattern = formData.pattern;

      // Add options for select/multiselect
      if (
        (formData.dataType === AttributeDataType.SELECT ||
          formData.dataType === AttributeDataType.MULTISELECT) &&
        options.length > 0
      ) {
        data.options = options;
      }

      if (attribute) {
        await attributeService.update(attribute.id, data);
      } else {
        await attributeService.create(data);
      }

      onSubmit();
    } catch (error) {
      console.error('Error saving attribute:', error);
      alert('Failed to save attribute');
    } finally {
      setLoading(false);
    }
  };

  const dataTypeOptions = Object.values(AttributeDataType).map((type) => ({
    value: type,
    label: type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' '),
  }));

  const showOptions =
    formData.dataType === AttributeDataType.SELECT ||
    formData.dataType === AttributeDataType.MULTISELECT;

  const showNumberValidation =
    formData.dataType === AttributeDataType.NUMBER ||
    formData.dataType === AttributeDataType.CURRENCY ||
    formData.dataType === AttributeDataType.PERCENTAGE;

  const showTextValidation =
    formData.dataType === AttributeDataType.TEXT ||
    formData.dataType === AttributeDataType.TEXTAREA ||
    formData.dataType === AttributeDataType.EMAIL ||
    formData.dataType === AttributeDataType.URL ||
    formData.dataType === AttributeDataType.PHONE;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Field Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., rewards_multiplier"
          helpText="Internal field name (lowercase, underscores)"
          required
        />

        <Input
          label="Display Name"
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
          placeholder="e.g., Rewards Multiplier"
          required
        />
      </div>

      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Brief description of this attribute"
        rows={2}
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Data Type"
          name="dataType"
          value={formData.dataType}
          onChange={handleChange}
          options={dataTypeOptions}
          required
        />

        <Input
          label="Group"
          name="group"
          value={formData.group}
          onChange={handleChange}
          placeholder="e.g., Benefits, Fees"
          helpText="Optional group for organizing attributes"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          label="Display Order"
          name="order"
          type="number"
          value={formData.order}
          onChange={handleChange}
          required
        />

        <Input
          label="Placeholder"
          name="placeholder"
          value={formData.placeholder}
          onChange={handleChange}
          placeholder="Enter placeholder text"
        />

        <Input
          label="Default Value"
          name="defaultValue"
          value={formData.defaultValue}
          onChange={handleChange}
        />
      </div>

      <TextArea
        label="Help Text"
        name="helpText"
        value={formData.helpText}
        onChange={handleChange}
        placeholder="Help text shown below the input field"
        rows={2}
      />

      {/* Validation Rules */}
      {showNumberValidation && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Number Validation</h4>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Min Value"
              name="minValue"
              type="number"
              value={formData.minValue}
              onChange={handleChange}
            />
            <Input
              label="Max Value"
              name="maxValue"
              type="number"
              value={formData.maxValue}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      {showTextValidation && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Text Validation</h4>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Min Length"
              name="minLength"
              type="number"
              value={formData.minLength}
              onChange={handleChange}
            />
            <Input
              label="Max Length"
              name="maxLength"
              type="number"
              value={formData.maxLength}
              onChange={handleChange}
            />
          </div>
          <Input
            label="Pattern (Regex)"
            name="pattern"
            value={formData.pattern}
            onChange={handleChange}
            placeholder="e.g., ^[A-Z0-9]+$"
            className="mt-4"
          />
        </div>
      )}

      {/* Options for Select/Multiselect */}
      {showOptions && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Options</h4>
          <div className="space-y-2 mb-3">
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <span className="flex-1 text-sm">
                  <strong>{option.label}</strong> ({option.value})
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Value"
              value={newOption.value}
              onChange={(e) => setNewOption({ ...newOption, value: e.target.value })}
            />
            <Input
              placeholder="Label"
              value={newOption.label}
              onChange={(e) => setNewOption({ ...newOption, label: e.target.value })}
            />
            <Button type="button" onClick={handleAddOption} variant="secondary">
              <Plus size={18} />
            </Button>
          </div>
        </div>
      )}

      {/* Checkboxes */}
      <div className="flex gap-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="required"
            checked={formData.required}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-sm font-medium text-gray-700">Required Field</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-sm font-medium text-gray-700">Active</span>
        </label>

        {attribute && (
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isSystem"
              checked={formData.isSystem}
              onChange={handleChange}
              className="mr-2"
              disabled
            />
            <span className="text-sm font-medium text-gray-700">System Field</span>
          </label>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={loading}>
          {attribute ? 'Update' : 'Create'} Attribute
        </Button>
      </div>
    </form>
  );
};
