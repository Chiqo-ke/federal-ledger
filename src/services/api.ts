const API_BASE_URL = 'http://127.0.0.1:8000';

export interface Transaction {
  id: number;
  sender: string;
  recipient: string;
  amount: number;
  timestamp: string;
  signature?: string;
  transaction_id?: string;
  purpose?: string;
}

export interface KpiData {
  total_transactions: number;
  total_volume: number;
  pending_transactions: number;
}

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions_all/`);
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
    const data = await response.json();
    // Map the backend data to our Transaction interface
    return data.transactions_all?.map((tx: any, index: number) => ({
      id: index + 1,
      sender: tx.sender,
      recipient: tx.recipient,
      amount: tx.amount,
      timestamp: tx.timestamp,
      signature: tx.transaction_id || '',
      transaction_id: tx.transaction_id,
      purpose: tx.purpose
    })) || [];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

export const getKpis = async (): Promise<KpiData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions_all/`);
    if (!response.ok) {
      throw new Error('Failed to fetch KPIs');
    }
    const data = await response.json();
    const transactions = data.transactions_all || [];
    
    // Calculate KPIs from transactions
    const totalTransactions = transactions.length;
    const totalVolume = transactions.reduce((sum: number, tx: any) => sum + (tx.amount || 0), 0);
    
    return {
      total_transactions: totalTransactions,
      total_volume: totalVolume,
      pending_transactions: 0, // No pending transactions in this implementation
    };
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    return {
      total_transactions: 0,
      total_volume: 0,
      pending_transactions: 0,
    };
  }
};

export const getWalletCount = async (): Promise<{ count: number }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/`, {
      credentials: 'omit' // Don't send credentials for now
    });
    if (!response.ok) {
      // If authentication is required, return mock data
      return { count: 0 };
    }
    const data = await response.json();
    return { count: data.users?.length || 0 };
  } catch (error) {
    console.error('Error fetching wallet count:', error);
    return { count: 0 };
  }
};

export const getBlockCount = async (): Promise<{ count: number }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/blockchain`);
    if (!response.ok) {
      throw new Error('Failed to fetch block count');
    }
    const data = await response.json();
    return { count: data.length || 0 };
  } catch (error) {
    console.error('Error fetching block count:', error);
    return { count: 0 };
  }
};
