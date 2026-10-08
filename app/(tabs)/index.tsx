import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '@/constants/theme';
import { taskService } from '@/services/taskService';
import { TaskItem } from '@/types/task';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/dashboard/Header';
import { TaskList } from '@/components/dashboard/TaskList';
import { AddTaskModal } from '@/components/dashboard/AddTaskModal';

export default function DashboardScreen() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await taskService.getTasks();
    setTasks(data);
  };

  const handleToggleTask = async (id: string) => {
    const updated = await taskService.toggleTaskCompletion(id);
    setTasks(updated);
  };

  const handleAddTask = async (newTaskData: Omit<TaskItem, 'id' | 'completed'>) => {
    const created = await taskService.addTask(newTaskData);
    setTasks((prev) => [created, ...prev]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header user={user} />
        <TaskList
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onAddTask={() => setIsModalOpen(true)}
        />
        <AddTaskModal
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddTask={handleAddTask}
        />
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
    paddingTop: 8,
  },
});
