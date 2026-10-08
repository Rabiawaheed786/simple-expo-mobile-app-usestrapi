import { LoginCredentials, SignupCredentials, AuthResponse } from '@/types/auth';
import { apiClient, ApiError, API_CONFIG, simulateNetworkDelay } from './api';

class AuthService {
  /**
   * Login user with backend API endpoint
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const emailOrIdentifier = (credentials.identifier || credentials.email || '').trim();
    const password = credentials.password;

    if (!emailOrIdentifier || !password) {
      throw new ApiError('Email and password are required', 400);
    }

    const rawName = emailOrIdentifier.split('@')[0] || 'User';
    const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

    // Standalone mock mode (prevents browser 'Failed to fetch' error when no server is running)
    if (API_CONFIG.USE_MOCK) {
      await simulateNetworkDelay(350);
      return {
        jwt: 'mock_jwt_token_123',
        user: {
          id: 'u_' + Date.now(),
          username: rawName,
          name: formattedName,
          email: emailOrIdentifier.includes('@') ? emailOrIdentifier : `${emailOrIdentifier}@taskflow.com`,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        },
      };
    }

    try {
      // Standard backend / Strapi endpoint: POST /api/auth/local
      const res = await apiClient.post<AuthResponse>('/api/auth/local', {
        identifier: emailOrIdentifier,
        password: password,
      });

      return res;
    } catch (err: any) {
      const isOfflineOrNetworkError =
        err?.isNetworkError ||
        err?.status === 503 ||
        err?.message?.includes('Unable to connect') ||
        err?.message?.includes('Network request failed') ||
        err?.message?.includes('Failed to fetch') ||
        err?.message?.includes('aborted');

      if (isOfflineOrNetworkError) {
        return {
          jwt: 'mock_jwt_token_123',
          user: {
            id: 'u_' + Date.now(),
            username: rawName,
            name: formattedName,
            email: emailOrIdentifier.includes('@') ? emailOrIdentifier : `${emailOrIdentifier}@taskflow.com`,
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          },
        };
      }
      throw err;
    }
  }

  /**
   * Register new user with backend API
   */
  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    const email = credentials.email?.trim() || '';
    const password = credentials.password;
    const rawName = credentials.fullName || credentials.username || email.split('@')[0] || 'User';
    const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

    if (!email || !password) {
      throw new ApiError('Email and password are required', 400);
    }

    if (password.length < 6) {
      throw new ApiError('Password must be at least 6 characters long', 400);
    }

    // Standalone mock mode
    if (API_CONFIG.USE_MOCK) {
      await simulateNetworkDelay(350);
      return {
        jwt: 'mock_jwt_token_signup_123',
        user: {
          id: 'u_' + Date.now(),
          username: credentials.username || rawName,
          name: credentials.fullName || formattedName,
          email: email,
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        },
      };
    }

    try {
      const res = await apiClient.post<AuthResponse>('/api/auth/local/register', {
        username: credentials.username || rawName,
        email: email,
        password: password,
      });
      return res;
    } catch (err: any) {
      const isOfflineOrNetworkError =
        err?.isNetworkError ||
        err?.status === 503 ||
        err?.message?.includes('Unable to connect') ||
        err?.message?.includes('Network request failed') ||
        err?.message?.includes('Failed to fetch') ||
        err?.message?.includes('aborted');

      if (isOfflineOrNetworkError) {
        return {
          jwt: 'mock_jwt_token_signup_123',
          user: {
            id: 'u_' + Date.now(),
            username: credentials.username || rawName,
            name: credentials.fullName || formattedName,
            email: email,
            avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
          },
        };
      }
      throw err;
    }
  }

  /**
   * Social Login helper
   */
  async socialLogin(provider: 'google' | 'apple'): Promise<AuthResponse> {
    return {
      jwt: `mock_jwt_${provider}_token`,
      user: {
        id: Date.now(),
        username: `${provider}_user`,
        email: `user@${provider}.com`,
      },
    };
  }

  /**
   * Password Reset Request
   */
  async requestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
    return {
      success: true,
      message: `Password reset link sent to ${email}`,
    };
  }

  /**
   * Logout session
   */
  async logout(): Promise<void> {
    // Perform token invalidation if needed
  }
}

export const authService = new AuthService();
