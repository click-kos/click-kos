// Authentication utility functions

export interface UserData {
  name: string;
  email: string;
  role: string;
}

export const AUTH_STORAGE_KEY = 'isAuthenticated';
export const USER_STORAGE_KEY = 'user';

export const getAuthStatus = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
};

export const getUserData = (): UserData | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const userData = localStorage.getItem(USER_STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

export const setAuthStatus = (isAuthenticated: boolean, userData?: UserData): void => {
  if (typeof window === 'undefined') return;
  
  if (isAuthenticated && userData) {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  }
  
  // Dispatch custom event to notify other components
  window.dispatchEvent(new CustomEvent('authStateChanged'));
};

export const clearAuth = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
  
  // Dispatch custom event to notify other components
  window.dispatchEvent(new CustomEvent('authStateChanged'));
};

export const isAuthenticated = (): boolean => {
  return getAuthStatus() && getUserData() !== null;
}; 