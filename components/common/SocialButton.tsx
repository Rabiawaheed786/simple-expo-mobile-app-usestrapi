import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

interface SocialButtonProps {
  provider: 'google' | 'apple';
  onPress: () => void;
  title: string;
}

export const SocialButton: React.FC<SocialButtonProps> = ({ provider, onPress, title }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {provider === 'google' ? (
          <FontAwesome name="google" size={18} color="#4285F4" style={styles.icon} />
        ) : (
          <Ionicons name="logo-apple" size={20} color="#000000" style={styles.icon} />
        )}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});
