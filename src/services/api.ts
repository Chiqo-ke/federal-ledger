import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

// ==================== Axios Instance with Interceptors ====================

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authentication token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Adding token to request:', config.url);
    } else {
      console.warn('No token found for request:', config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== Interfaces ====================

export interface Transaction {
  id: number;
  sender: string;
  recipient: string;
  amount: number;
  timestamp: string;
  signature?: string;
  transaction_id?: string;
  purpose?: string;
  ministry_id?: number;
  ministry_name?: string;
  project_id?: number;
  category?: string;
}

export interface KpiData {
  total_transactions: number;
  total_volume: number;
  pending_transactions: number;
}

export interface Ministry {
  id: number;
  name: string;
  code: string;
  ministry_type: string;
  description: string | null;
  wallet_address: string;
  allocated_budget: number;
  used_funds: number;
  remaining_balance: number;
  icon: string | null;
  color: string | null;
  is_active: boolean;
  created_at: string;
  active_projects: number;
  total_projects: number;
}

export interface MinistryCreate {
  name: string;
  ministry_type: string;
  description?: string;
  icon?: string;
  color?: string;
  allocated_budget?: number;
}

export interface Project {
  id: number;
  ministry_id: number;
  name: string;
  description: string | null;
  budget: number;
  spent: number;
  status: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

export interface ProjectCreate {
  ministry_id: number;
  name: string;
  description?: string;
  budget: number;
  start_date?: string;
  end_date?: string;
}

export interface ExpenseRequest {
  id: number;
  ministry_id: number;
  project_id: number | null;
  amount: number;
  purpose: string;
  category: string | null;
  status: string;
  requested_by: string;
  requested_at: string;
  approved_by: string | null;
  approved_at: string | null;
  rejected_by: string | null;
  rejected_at: string | null;
  rejection_reason: string | null;
  transaction_hash: string | null;
}

export interface ExpenseRequestCreate {
  ministry_id: number;
  project_id?: number;
  amount: number;
  purpose: string;
  category?: string;
}

export interface AuthTokens {
  access_token: string;
  token_type: string;
  refresh_token: string;
  wallet_address: string;
  office_name: string;
  role: string;
  ministry_id: number | null;
}

// ==================== Auth API ====================

export const login = async (office_name: string, password: string): Promise<AuthTokens> => {
  const response = await api.post('/token', { office_name, password });
  const data = response.data;
  
  // Store tokens in localStorage
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
  localStorage.setItem('user_role', data.role);
  localStorage.setItem('ministry_id', data.ministry_id?.toString() || '');
  localStorage.setItem('office_name', data.office_name);
  localStorage.setItem('wallet_address', data.wallet_address);
  
  return data;
};

export const register = async (
  office_name: string,
  password: string,
  role: string = 'citizen',
  ministry_id?: number
): Promise<any> => {
  const response = await api.post('/register', { office_name, password, role, ministry_id });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_role');
  localStorage.removeItem('ministry_id');
  localStorage.removeItem('office_name');
  localStorage.removeItem('wallet_address');
};

export const getAuthHeader = (): HeadersInit => {
  const token = localStorage.getItem('access_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('access_token');
};

export const getUserRole = (): string | null => {
  return localStorage.getItem('user_role');
};

export const getUserMinistryId = (): number | null => {
  const id = localStorage.getItem('ministry_id');
  return id ? parseInt(id) : null;
};

// ==================== Transaction API ====================

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await api.get('/transactions_all/');
    const data = response.data;
    return data.transactions_all?.map((tx: any, index: number) => ({
      id: index + 1,
      sender: tx.sender,
      recipient: tx.recipient,
      amount: tx.amount,
      timestamp: tx.timestamp,
      signature: tx.transaction_id || '',
      transaction_id: tx.transaction_id,
      purpose: tx.purpose,
      ministry_id: tx.ministry_id,
      ministry_name: tx.ministry_name,
      project_id: tx.project_id,
      category: tx.category
    })) || [];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

export const getKpis = async (): Promise<KpiData> => {
  try {
    const response = await api.get('/transactions_all/');
    const data = response.data;
    
    const transactions = data.transactions_all || [];
    const total_volume = transactions.reduce((sum: number, tx: any) => sum + (tx.amount || 0), 0);
    
    return {
      total_transactions: transactions.length,
      total_volume,
      pending_transactions: 0
    };
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    return {
      total_transactions: 0,
      total_volume: 0,
      pending_transactions: 0
    };
  }
};

export const getWalletCount = async (): Promise<number> => {
  try {
    const response = await api.get('/users/');
    const data = response.data;
    return data.users?.length || 0;
  } catch (error) {
    console.error('Error fetching wallet count:', error);
    return 0;
  }
};

export const getBlockCount = async (): Promise<number> => {
  try {
    const response = await api.get('/blockchain');
    const data = response.data;
    return data.blockchain_length || 0;
  } catch (error) {
    console.error('Error fetching block count:', error);
    return 0;
  }
};

// ==================== Ministry API ====================

export const getMinistries = async (): Promise<Ministry[]> => {
  const response = await api.get('/ministries');
  return response.data;
};

export const getMinistry = async (id: number): Promise<Ministry> => {
  const response = await api.get(`/ministries/${id}`);
  return response.data;
};

export const createMinistry = async (ministry: MinistryCreate): Promise<Ministry> => {
  const response = await api.post('/ministries', ministry);
  return response.data;
};

// Helper function to extract error message from API responses
export const getErrorMessage = (error: any): string => {
  if (error.response?.data?.detail) {
    const detail = error.response.data.detail;
    
    // If detail is an array of validation errors
    if (Array.isArray(detail)) {
      return detail.map((err: any) => {
        if (typeof err === 'object' && err.msg) {
          const field = err.loc ? err.loc[err.loc.length - 1] : '';
          return field ? `${field}: ${err.msg}` : err.msg;
        }
        return String(err);
      }).join(', ');
    }
    
    // If detail is a string
    if (typeof detail === 'string') {
      return detail;
    }
    
    // If detail is an object with msg property
    if (typeof detail === 'object' && detail.msg) {
      return detail.msg;
    }
  }
  
  return error.message || 'An error occurred';
};

export const allocateBudget = async (
  ministry_id: number,
  allocation: { amount: number; purpose: string; fiscal_year: number; approved_by?: string }
): Promise<any> => {
  const response = await api.post(`/ministries/${ministry_id}/allocate-budget`, allocation);
  return response.data;
};

export const getMinistryTransactions = async (ministry_id: number): Promise<any> => {
  const response = await api.get(`/ministries/${ministry_id}/transactions`);
  return response.data;
};

export const transferToMinistry = async (
  recipient_ministry_id: number,
  amount: number,
  purpose: string,
  approved_by?: string
): Promise<any> => {
  const response = await api.post('/ministries/transfer', {
    recipient_ministry_id,
    amount,
    purpose,
    approved_by
  });
  return response.data;
};

// ==================== Project API ====================

export const getMinistryProjects = async (ministry_id: number): Promise<Project[]> => {
  const response = await api.get(`/ministries/${ministry_id}/projects`);
  return response.data;
};

export const createProject = async (ministry_id: number, project: Omit<ProjectCreate, 'ministry_id'>): Promise<Project> => {
  const response = await api.post('/projects', { ...project, ministry_id });
  return response.data;
};

// ==================== Expense Request API ====================

export const getMinistryExpenses = async (
  ministry_id: number,
  status?: string
): Promise<ExpenseRequest[]> => {
  const params = status ? { status_filter: status } : {};
  const response = await api.get(`/ministries/${ministry_id}/expense-requests`, { params });
  return response.data;
};

export const createExpenseRequest = async (
  expense: ExpenseRequestCreate
): Promise<ExpenseRequest> => {
  const response = await api.post('/expense-requests', expense);
  return response.data;
};

export const approveExpense = async (expense_id: number): Promise<any> => {
  const response = await api.put(`/expense-requests/${expense_id}/approve`);
  return response.data;
};

export const rejectExpense = async (
  expense_id: number,
  rejection_reason: string
): Promise<any> => {
  const response = await api.put(`/expense-requests/${expense_id}/reject`, {
    status: 'rejected',
    rejection_reason
  });
  return response.data;
};

// ==================== Tax Payment API ====================

export interface TaxPayment {
  id: number;
  receipt_number: string;
  taxpayer_name: string;
  id_number: string;
  phone_number?: string;
  email?: string;
  tax_type: string;
  amount: number;
  payment_method?: string;
  status: string;
  transaction_hash?: string;
  created_at: string;
}

export interface TaxPaymentCreate {
  taxpayer_name: string;
  id_number: string;
  tax_type: string;
  amount: number;
  phone_number?: string;
  email?: string;
  payment_method?: string;
}

export interface TaxPaymentStats {
  total_payments: number;
  total_revenue: number;
  recent_payments_30days: number;
  by_tax_type: Array<{
    tax_type: string;
    count: number;
    total_amount: number;
  }>;
}

export const submitTaxPayment = async (payment: TaxPaymentCreate): Promise<TaxPayment> => {
  const response = await api.post('/tax-payments', payment);
  return response.data;
};

export const getTaxPayments = async (
  skip?: number,
  limit?: number,
  status?: string,
  tax_type?: string
): Promise<TaxPayment[]> => {
  const params: any = {};
  if (skip !== undefined) params.skip = skip;
  if (limit !== undefined) params.limit = limit;
  if (status) params.status = status;
  if (tax_type) params.tax_type = tax_type;
  
  const response = await api.get('/tax-payments', { params });
  return response.data;
};

export const getTaxPaymentById = async (payment_id: number): Promise<TaxPayment> => {
  const response = await api.get(`/tax-payments/${payment_id}`);
  return response.data;
};

export const getTaxPaymentByReceipt = async (receipt_number: string): Promise<TaxPayment> => {
  const response = await api.get(`/tax-payments/receipt/${receipt_number}`);
  return response.data;
};

export const getTaxPaymentStats = async (): Promise<TaxPaymentStats> => {
  const response = await api.get('/tax-payments/stats/summary');
  return response.data;
};

// ==================== WebSocket Connection ====================

let websocket: WebSocket | null = null;
let reconnectTimer: NodeJS.Timeout | null = null;

export const connectWebSocket = (
  wallet_address: string,
  onMessage: (data: any) => void
): WebSocket | null => {
  try {
    websocket = new WebSocket(`ws://127.0.0.1:8000/ws/${wallet_address}`);
    
    websocket.onopen = () => {
      console.log('WebSocket connected');
    };
    
    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    websocket.onclose = () => {
      console.log('WebSocket disconnected');
      // Auto-reconnect after 5 seconds
      if (reconnectTimer) clearTimeout(reconnectTimer);
      reconnectTimer = setTimeout(() => {
        console.log('Attempting to reconnect WebSocket...');
        connectWebSocket(wallet_address, onMessage);
      }, 5000);
    };
    
    return websocket;
  } catch (error) {
    console.error('Error creating WebSocket:', error);
    return null;
  }
};

export const disconnectWebSocket = () => {
  if (websocket) {
    websocket.close();
    websocket = null;
  }
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
};
