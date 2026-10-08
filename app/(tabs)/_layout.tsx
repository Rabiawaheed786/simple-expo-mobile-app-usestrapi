import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

interface TabItemProps {
  focused: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
}

const TabItem: React.FC<TabItemProps> = ({ focused, iconName, label }) => {
  if (focused) {
    return (
      <View style={styles.activePill}>
        <Ionicons name={iconName} size={18} color={Colors.white} />
        <Text style={styles.activeLabel}>{label}</Text>
      </View>
    );
  }

  return (
    <View style={styles.inactiveItem}>
      <Ionicons name={iconName} size={20} color={Colors.textSecondary} />
      <Text style={styles.inactiveLabel}>{label}</Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 84 : 68,
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          backgroundColor: Colors.white,
          borderTopColor: '#F1F5F9',
          borderTopWidth: 1,
          elevation: 4,
          shadowColor: Colors.black,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.04,
          shadowRadius: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabItem focused={focused} iconName="archive" label="Inbox" />
          ),
        }}
      />
      <Tabs.Screen
        name="today"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabItem focused={focused} iconName="calendar-outline" label="Today" />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabItem focused={focused} iconName="calendar-number-outline" label="Calendar" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabItem focused={focused} iconName="person-outline" label="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    gap: 6,
  },
  activeLabel: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  inactiveItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  inactiveLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
});
