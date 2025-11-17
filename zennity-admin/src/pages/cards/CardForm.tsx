import React, { useState, useEffect } from 'react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { TextArea } from '../../components/common/TextArea';
import type { Card } from '../../models/Card';
import { CardTier, CardNetwork } from '../../models/Card';
import type { Attribute } from '../../models/Attribute';
import { AttributeDataType } from '../../models/Attribute';
import { cardService } from '../../services/cardService';
import { attributeService } from '../../services/attributeService';

interface CardFormProps {
  card?: Card | null;
  onSubmit: () => void;
  onCancel: () => void;
}

export const CardForm: React.FC<CardFormProps> = ({ card, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<any>({
    name: '',
    displayName: '',
    bankName: '',
    tier: CardTier.BASIC,
    network: CardNetwork.VISA,
    cardType: '',
    annualFee: 0,
    feeWaiver: '',
    creditLimit: '',
    rewardsRate: '',
    loungeAccess: false,
    loungeVisitsPerYear: '',
    activeOffersCount: 0,
    isActive: true,
    notes: '',
    metadata: {},
  });

  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAttributes();
  }, []);

  useEffect(() => {
    if (card) {
      setFormData({
        name: card.name,
        displayName: card.displayName || '',
        bankName: card.bankName,
        tier: card.tier,
        network: card.network,
        cardType: card.cardType,
        annualFee: card.annualFee,
        feeWaiver: card.feeWaiver || '',
        creditLimit: card.creditLimit || '',
        rewardsRate: card.rewardsRate || '',
        loungeAccess: card.loungeAccess || false,
        loungeVisitsPerYear: card.loungeVisitsPerYear || '',
        activeOffersCount: card.activeOffersCount,
        isActive: card.isActive,
        notes: card.notes || '',
        metadata: card.metadata || {},
      });
    }
  }, [card]);

  const loadAttributes = async () => {
    try {
      const data = await attributeService.getActive();
      setAttributes(data);
    } catch (error) {
      console.error('Error loading attributes:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleMetadataChange = (fieldName: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        [fieldName]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data: any = {
        name: formData.name,
        displayName: formData.displayName,
        bankName: formData.bankName,
        tier: formData.tier,
        network: formData.network,
        cardType: formData.cardType,
        annualFee: Number(formData.annualFee),
        feeWaiver: formData.feeWaiver,
        creditLimit: formData.creditLimit ? Number(formData.creditLimit) : undefined,
        rewardsRate: formData.rewardsRate,
        loungeAccess: formData.loungeAccess,
        loungeVisitsPerYear: formData.loungeVisitsPerYear
          ? Number(formData.loungeVisitsPerYear)
          : undefined,
        activeOffersCount: Number(formData.activeOffersCount),
        isActive: formData.isActive,
        notes: formData.notes,
        metadata: formData.metadata,
      };

      if (card) {
        await cardService.update(card.id, data);
      } else {
        await cardService.create(data);
      }

      onSubmit();
    } catch (error) {
      console.error('Error saving card:', error);
      alert('Failed to save card');
    } finally {
      setLoading(false);
    }
  };

  const renderDynamicField = (attribute: Attribute) => {
    const value = formData.metadata[attribute.name] || '';

    const commonProps = {
      label: attribute.displayName,
      helpText: attribute.helpText,
      required: attribute.required,
      placeholder: attribute.placeholder,
    };

    switch (attribute.dataType) {
      case AttributeDataType.TEXT:
      case AttributeDataType.EMAIL:
      case AttributeDataType.URL:
      case AttributeDataType.PHONE:
        return (
          <Input
            {...commonProps}
            type={attribute.dataType === AttributeDataType.EMAIL ? 'email' : 'text'}
            value={value}
            onChange={(e) => handleMetadataChange(attribute.name, e.target.value)}
          />
        );

      case AttributeDataType.NUMBER:
      case AttributeDataType.CURRENCY:
      case AttributeDataType.PERCENTAGE:
        return (
          <Input
            {...commonProps}
            type="number"
            value={value}
            onChange={(e) => handleMetadataChange(attribute.name, e.target.value)}
            min={attribute.minValue}
            max={attribute.maxValue}
          />
        );

      case AttributeDataType.TEXTAREA:
        return (
          <TextArea
            {...commonProps}
            value={value}
            onChange={(e) => handleMetadataChange(attribute.name, e.target.value)}
            rows={3}
          />
        );

      case AttributeDataType.BOOLEAN:
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={attribute.name}
              checked={value || false}
              onChange={(e) => handleMetadataChange(attribute.name, e.target.checked)}
              className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor={attribute.name} className="text-sm font-medium text-gray-700">
              {attribute.displayName}
            </label>
            {attribute.helpText && (
              <p className="ml-2 text-sm text-gray-500">({attribute.helpText})</p>
            )}
          </div>
        );

      case AttributeDataType.DATE:
        return (
          <Input
            {...commonProps}
            type="date"
            value={value}
            onChange={(e) => handleMetadataChange(attribute.name, e.target.value)}
          />
        );

      case AttributeDataType.SELECT:
        return (
          <Select
            {...commonProps}
            value={value}
            onChange={(e) => handleMetadataChange(attribute.name, e.target.value)}
            options={[
              { value: '', label: 'Select...' },
              ...(attribute.options || []),
            ]}
          />
        );

      case AttributeDataType.MULTISELECT:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {attribute.displayName}
              {attribute.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {attribute.options?.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`${attribute.name}-${option.value}`}
                    checked={(value || []).includes(option.value)}
                    onChange={(e) => {
                      const currentValues = value || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option.value]
                        : currentValues.filter((v: string) => v !== option.value);
                      handleMetadataChange(attribute.name, newValues);
                    }}
                    className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`${attribute.name}-${option.value}`}
                    className="text-sm text-gray-700"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
            {attribute.helpText && (
              <p className="mt-1 text-sm text-gray-500">{attribute.helpText}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const tierOptions = Object.values(CardTier).map((tier) => ({
    value: tier,
    label: tier.charAt(0).toUpperCase() + tier.slice(1),
  }));

  const networkOptions = Object.values(CardNetwork).map((network) => ({
    value: network,
    label: network.charAt(0).toUpperCase() + network.slice(1),
  }));

  // Group attributes
  const attributeGroups = attributes.reduce((groups, attr) => {
    const group = attr.group || 'Other';
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(attr);
    return groups;
  }, {} as Record<string, Attribute[]>);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Card Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., HDFC Regalia"
            required
          />

          <Input
            label="Display Name"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            placeholder="e.g., HDFC Regalia Credit Card"
          />

          <Input
            label="Bank Name"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="e.g., HDFC Bank"
            required
          />

          <Input
            label="Card Type"
            name="cardType"
            value={formData.cardType}
            onChange={handleChange}
            placeholder="e.g., Premium Rewards Card"
            required
          />

          <Select
            label="Tier"
            name="tier"
            value={formData.tier}
            onChange={handleChange}
            options={tierOptions}
            required
          />

          <Select
            label="Network"
            name="network"
            value={formData.network}
            onChange={handleChange}
            options={networkOptions}
            required
          />
        </div>
      </div>

      {/* Fees & Limits */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Fees & Limits</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Annual Fee (₹)"
            name="annualFee"
            type="number"
            value={formData.annualFee}
            onChange={handleChange}
            required
          />

          <Input
            label="Fee Waiver Conditions"
            name="feeWaiver"
            value={formData.feeWaiver}
            onChange={handleChange}
            placeholder="e.g., ₹2L annual spend"
          />

          <Input
            label="Credit Limit (₹)"
            name="creditLimit"
            type="number"
            value={formData.creditLimit}
            onChange={handleChange}
          />

          <Input
            label="Rewards Rate"
            name="rewardsRate"
            value={formData.rewardsRate}
            onChange={handleChange}
            placeholder="e.g., 1% on all spends"
          />
        </div>
      </div>

      {/* Benefits */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Benefits</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="loungeAccess"
              name="loungeAccess"
              checked={formData.loungeAccess}
              onChange={handleChange}
              className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="loungeAccess" className="text-sm font-medium text-gray-700">
              Lounge Access
            </label>
          </div>

          {formData.loungeAccess && (
            <Input
              label="Lounge Visits Per Year"
              name="loungeVisitsPerYear"
              type="number"
              value={formData.loungeVisitsPerYear}
              onChange={handleChange}
            />
          )}

          <Input
            label="Active Offers Count"
            name="activeOffersCount"
            type="number"
            value={formData.activeOffersCount}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Custom Attributes */}
      {Object.keys(attributeGroups).length > 0 && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Custom Attributes</h3>
          {Object.entries(attributeGroups).map(([groupName, attrs]) => (
            <div key={groupName} className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3 uppercase">
                {groupName}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {attrs.map((attr) => (
                  <div key={attr.id}>{renderDynamicField(attr)}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Notes */}
      <div className="border-t pt-6">
        <TextArea
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes about this card"
          rows={3}
        />
      </div>

      {/* Status */}
      <div className="border-t pt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
            Active Card
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={loading}>
          {card ? 'Update' : 'Create'} Card
        </Button>
      </div>
    </form>
  );
};
