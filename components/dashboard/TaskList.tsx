import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { TaskItem } from '@/types/task';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: TaskItem[];
  onToggleTask: (id: string) => void;
  onAddTask?: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onAddTask }) => {
  const highPriorityTasks = tasks.filter((t) => t.priority === 'HIGH PRIORITY');
  const mediumPriorityTasks = tasks.filter((t) => t.priority === 'MEDIUM PRIORITY');
  const upcomingTasks = tasks.filter((t) => t.priority === 'UPCOMING');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {tasks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="checkbox-outline" size={40} color={Colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>No tasks yet</Text>
            <Text style={styles.emptySubtitle}>Tap the + button below to create your first task!</Text>
          </View>
        ) : (
          <>
            {/* HIGH PRIORITY SECTION */}
            {highPriorityTasks.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>HIGH PRIORITY</Text>
                {highPriorityTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onToggle={onToggleTask} />
                ))}
              </View>
            )}

            {/* MEDIUM PRIORITY SECTION */}
            {mediumPriorityTasks.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>MEDIUM PRIORITY</Text>
                {mediumPriorityTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onToggle={onToggleTask} />
                ))}
              </View>
            )}

            {/* UPCOMING SECTION */}
            {upcomingTasks.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>UPCOMING</Text>
                {upcomingTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onToggle={onToggleTask} />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={onAddTask || (() => Alert.alert('New Task', 'Create new task feature triggered'))}
      >
        <Ionicons name="add" size={28} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 90,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 240,
    lineHeight: 20,
  },
});
