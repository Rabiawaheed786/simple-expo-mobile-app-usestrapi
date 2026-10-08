/**
 * Centralized API client configuration for backend connectivity (e.g. Strapi / Express / Node.js)
 * Change BASE_URL to your backend API URL (e.g., http://localhost:1337 or http://10.0.2.2:1337)
 */

export const API_CONFIG = {
  USE_MOCK: true, // Default to true so app works standalone without external server
  BASE_URL: 'http://localhost:1337',
  TIMEOUT: 3000,
};

export class ApiError extends Error {
  status: number;
  isNetworkError: boolean;

  constructor(message: string, status: number = 400, isNetworkError: boolean = false) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.isNetworkError = isNetworkError;
  }
}

export const simulateNetworkDelay = (ms: number = 500): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const apiClient = {
  async post<T>(endpoint: string, payload: any, headers: Record<string, string> = {}): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timer);
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data?.error?.message || data?.message || 'Request failed',
          response.status,
          false
        );
      }

      return data as T;
    } catch (err: any) {
      clearTimeout(timer);
      if (err instanceof ApiError) throw err;
      
      // Fallback for network unreachable or local backend offline
      throw new ApiError(
        'Unable to connect to backend server: ' + (err?.message || 'Network request failed'),
        503,
        true
      );
    }
  },

  async get<T>(endpoint: string, token?: string): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: 'GET',
        headers,
        signal: controller.signal,
      });

      clearTimeout(timer);
      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(data?.error?.message || data?.message || 'Request failed', response.status, false);
      }

      return data as T;
    } catch (err: any) {
      clearTimeout(timer);
      if (err instanceof ApiError) throw err;
      throw new ApiError(
        'Unable to connect to backend server: ' + (err?.message || 'Network request failed'),
        503,
        true
      );
    }
  },
};
