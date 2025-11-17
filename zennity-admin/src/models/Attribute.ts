/**
 * Attribute Schema Model
 * Defines the metadata schema for credit cards
 */

export const AttributeDataType = {
  TEXT: 'text',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  DATE: 'date',
  SELECT: 'select',
  MULTISELECT: 'multiselect',
  TEXTAREA: 'textarea',
  EMAIL: 'email',
  URL: 'url',
  PHONE: 'phone',
  CURRENCY: 'currency',
  PERCENTAGE: 'percentage',
} as const;

export type AttributeDataType = typeof AttributeDataType[keyof typeof AttributeDataType];

export interface AttributeOption {
  value: string;
  label: string;
}

export interface Attribute {
  id: string;
  name: string; // Internal field name (e.g., "rewards_multiplier")
  displayName: string; // Display label (e.g., "Rewards Multiplier")
  description?: string;
  dataType: AttributeDataType;

  // For select/multiselect types
  options?: AttributeOption[];

  // Validation rules
  required: boolean;
  defaultValue?: any;
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string; // Regex pattern for validation

  // UI configuration
  placeholder?: string;
  helpText?: string;
  group?: string; // For organizing attributes into groups
  order: number; // Display order

  // Status
  isActive: boolean;
  isSystem: boolean; // System fields cannot be deleted

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

export interface AttributeGroup {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
