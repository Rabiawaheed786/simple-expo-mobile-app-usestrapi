import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/theme';
import { CustomInput } from '@/components/common/CustomInput';
import { CustomButton } from '@/components/common/CustomButton';
import { SocialButton } from '@/components/common/SocialButton';
import { Checkbox } from '@/components/common/Checkbox';
import { authService } from '@/services/authService';
import { AuthResponse } from '@/types/auth';

interface LoginFormProps {
  onLoginSuccess: (authData: AuthResponse) => void;
  onNavigateToSignup: () => void;
  onForgotPassword?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onLoginSuccess,
  onNavigateToSignup,
  onForgotPassword,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');
    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.login({
        email: email.trim(),
        identifier: email.trim(),
        password,
        rememberMe,
      });

      if (response && response.user) {
        onLoginSuccess(response);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('alex@taskflow.com');
    setPassword('password123');
    setErrorMessage('');
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await authService.socialLogin(provider);
      if (response && response.user) {
        onLoginSuccess(response);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || `Failed to sign in with ${provider}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      {/* Top TaskFlow Logo Circle */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Ionicons name="checkmark" size={32} color={Colors.white} />
        </View>
      </View>

      {/* Title Header */}
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue to TaskFlow</Text>

      {/* Error Message */}
      {!!errorMessage && (
        <View style={styles.errorBanner}>
          <Ionicons name="alert-circle-outline" size={18} color={Colors.error} />
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      {/* Email Input */}
      <CustomInput
        label="Email Address"
        iconName="mail-outline"
        placeholder="name@company.com"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errorMessage) setErrorMessage('');
        }}
      />

      {/* Password Input */}
      <CustomInput
        label="Password"
        iconName="lock-closed-outline"
        placeholder="••••••••"
        isPassword
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errorMessage) setErrorMessage('');
        }}
        rightAction={
          <TouchableOpacity onPress={onForgotPassword} activeOpacity={0.7}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        }
      />

      {/* Checkbox */}
      <Checkbox
        label="Remember me for 30 days"
        checked={rememberMe}
        onChange={setRememberMe}
      />

      {/* Demo Credentials Helper */}
      <TouchableOpacity
        onPress={handleFillDemo}
        style={styles.demoHelper}
        activeOpacity={0.7}
      >
        <Ionicons name="sparkles" size={14} color={Colors.primary} />
        <Text style={styles.demoHelperText}>Auto-fill demo credentials</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <CustomButton
        title="Sign In"
        onPress={handleLogin}
        loading={loading}
        style={styles.signInBtn}
      />

      {/* Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Social Row */}
      <View style={styles.socialRow}>
        <SocialButton
          provider="google"
          title="Google"
          onPress={() => handleSocialLogin('google')}
        />
        <SocialButton
          provider="apple"
          title="Apple"
          onPress={() => handleSocialLogin('apple')}
        />
      </View>

      {/* Signup Prompt */}
      <View style={styles.footerRow}>
        <Text style={styles.footerText}>{"Don't have an account? "}</Text>
        <TouchableOpacity onPress={onNavigateToSignup} activeOpacity={0.7}>
          <Text style={styles.signUpLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 28,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: Colors.error,
    fontSize: 13,
    marginLeft: 8,
    flex: 1,
  },
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
  demoHelper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryLight,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 4,
    marginBottom: 10,
    gap: 6,
  },
  demoHelperText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  signInBtn: {
    marginTop: 4,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    paddingHorizontal: 12,
    letterSpacing: 0.5,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
});
