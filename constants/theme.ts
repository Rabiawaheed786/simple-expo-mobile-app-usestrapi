export const Colors = {
  primary: '#3B37DB', // Exact vibrant TaskFlow Blue-Indigo from Login image
  primaryHover: '#2E2AB5',
  primaryLight: '#EEF2FF',
  
  background: '#F8F9FA',
  cardBackground: '#FFFFFF',
  
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  
  border: '#E5E7EB',
  borderFocused: '#3B37DB',
  borderError: '#EF4444',
  
  error: '#EF4444',
  success: '#10B981',
  
  white: '#FFFFFF',
  black: '#000000',
  
  tagTodayBg: '#FEE2E2',
  tagTodayText: '#991B1B',
  tagTomorrowBg: '#FFEDD5',
  tagTomorrowText: '#9A3412',
};

export const Typography = {
  title: {
    fontSize: 26,
    fontWeight: '700' as const,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.textPrimary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.white,
  },
};
