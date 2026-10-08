import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../../constants/colors';
import { taskService } from '../../services/taskService';
import { TaskItem } from '../../types/task';
import { TaskCard } from '../../components/dashboard/TaskCard';

export default function TodayScreen() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const all = await taskService.getTasks();
    setTasks(all.filter((t) => t.badge === 'Today' || t.dueDate === 'Today'));
  };

  const handleToggleTask = async (id: string) => {
    await taskService.toggleTaskCompletion(id);
    loadTasks();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{"Today's Schedule"}</Text>
        <Text style={styles.subtitle}>Tasks scheduled for today</Text>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {tasks.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No tasks due today 🎉</Text>
            </View>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={handleToggleTask} />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
    marginBottom: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  emptyBox: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
