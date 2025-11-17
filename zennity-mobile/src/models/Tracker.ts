/**
 * Tracker Model
 * Represents user's progress tracking for deals and goals
 */

export enum TrackerStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  EXPIRED = 'expired',
}

export enum GoalType {
  SPENDING = 'spending',
  TRANSACTION_COUNT = 'transaction_count',
  MILESTONE = 'milestone',
  APPLICATION = 'application',
  FEE_DUE = 'fee_due',
  POINTS_EXPIRY = 'points_expiry',
  CUSTOM = 'custom',
}

export interface TrackerProgress {
  current: number;
  target: number;
  unit: string; // e.g., "transactions", "₹", "points"
  percentage: number; // 0-100
}

export interface TrackerItem {
  id: string;
  title: string;
  description?: string;
  goalType: GoalType;
  status: TrackerStatus;

  // Progress
  progress: TrackerProgress;

  // Associated entities
  dealId?: string;
  cardId?: string;

  // Timing
  startDate: Date;
  endDate?: Date;
  daysRemaining?: number;
  deadline?: Date;

  // Milestones (for complex goals)
  milestones?: {
    id: string;
    description: string;
    target: number;
    completed: boolean;
  }[];

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  notes?: string;
}

export interface UpcomingAction {
  id: string;
  title: string;
  description: string;
  dueDate?: Date;
  daysUntil?: number;
  actionType: 'application' | 'fee_payment' | 'points_transfer' | 'renewal' | 'other';
  status: 'pending' | 'ready' | 'action_needed' | 'completed';
  cardId?: string;
  priority: 'low' | 'medium' | 'high';
  metadata?: Record<string, unknown>;
  userId: string;
}

export interface CalendarEvent {
  id: string;
  date: Date;
  title: string;
  type: 'tracker' | 'action' | 'deal_expiry' | 'card_anniversary';
  relatedId?: string;
  description?: string;
}
