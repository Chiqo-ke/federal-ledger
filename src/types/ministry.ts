export type MinistryType = 
  | 'construction'
  | 'education'
  | 'health'
  | 'transportation'
  | 'energy';

export type UserRole = 
  | 'super_admin'
  | 'ministry_admin'
  | 'ministry_officer'
  | 'citizen';

export interface Ministry {
  id: string;
  name: string;
  type: MinistryType | string; // Allow custom ministry types
  allocatedBudget?: number;
  usedFunds?: number;
  remainingBalance?: number;
  icon: string;
  color: string;
  description: string;
  activeProjects?: number;
}

export interface MinistryProject {
  id: string;
  ministryId: string;
  name: string;
  budget: number;
  spent: number;
  status: 'active' | 'completed' | 'pending' | 'paused';
  startDate: string;
  description: string;
}

export interface ExpenseRequest {
  id: string;
  ministryId: string;
  projectId?: string;
  amount: number;
  purpose: string;
  requestedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  approvedBy?: string;
  approvedAt?: string;
}

export interface MinistryReport {
  id: string;
  ministryId: string;
  title: string;
  type: 'expenditure' | 'progress' | 'audit' | 'urgent';
  content: string;
  attachments?: string[];
  submittedBy: string;
  submittedAt: string;
  status: 'pending' | 'reviewed' | 'approved';
}

export const MINISTRIES: Record<MinistryType, Omit<Ministry, 'id' | 'allocatedBudget' | 'usedFunds' | 'remainingBalance'>> = {
  construction: {
    name: 'Ministry of Construction',
    type: 'construction',
    icon: 'Building2',
    color: '#f59e0b',
    description: 'Infrastructure development and public works'
  },
  education: {
    name: 'Ministry of Education',
    type: 'education',
    icon: 'GraduationCap',
    color: '#3b82f6',
    description: 'Educational institutions and programs'
  },
  health: {
    name: 'Ministry of Health',
    type: 'health',
    icon: 'Heart',
    color: '#ef4444',
    description: 'Public health services and medical facilities'
  },
  transportation: {
    name: 'Ministry of Transportation',
    type: 'transportation',
    icon: 'Truck',
    color: '#8b5cf6',
    description: 'Transport infrastructure and public transit'
  },
  energy: {
    name: 'Ministry of Energy',
    type: 'energy',
    icon: 'Zap',
    color: '#10b981',
    description: 'Energy production and distribution'
  }
};
