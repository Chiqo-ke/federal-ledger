// Helper functions for authentication token management

export const getAccessToken = (): string | null => {
  return localStorage.getItem('access_token');
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refresh_token');
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem('access_token', token);
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem('refresh_token', token);
};

export const clearAuthTokens = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  localStorage.removeItem('user_role');
  localStorage.removeItem('ministry_id');
  localStorage.removeItem('office_name');
  localStorage.removeItem('wallet_address');
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= expirationTime;
  } catch (error) {
    return true;
  }
};

export const getTokenPayload = (token: string): any => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    return null;
  }
};

export const hasValidToken = (): boolean => {
  const token = getAccessToken();
  if (!token) return false;
  return !isTokenExpired(token);
};

// Extract user info from JWT token
export const getUserFromToken = (): {
  office_name?: string;
  role?: string;
  wallet_address?: string;
  ministry_id?: number;
} | null => {
  const token = getAccessToken();
  if (!token) return null;
  
  const payload = getTokenPayload(token);
  return payload ? {
    office_name: payload.sub,
    role: payload.role,
    wallet_address: payload.wallet_address,
    ministry_id: payload.ministry_id
  } : null;
};
