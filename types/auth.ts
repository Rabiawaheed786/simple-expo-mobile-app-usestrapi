export interface User {
  id: string | number;
  username?: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface LoginCredentials {
  identifier?: string;
  email?: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupCredentials {
  username?: string;
  fullName?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  jwt?: string;
  token?: string;
  user: User;
  message?: string;
}
