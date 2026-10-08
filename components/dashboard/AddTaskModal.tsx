import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { TaskItem } from '@/types/task';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<TaskItem, 'id' | 'completed'>) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  visible,
  onClose,
  onAddTask,
}) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'HIGH PRIORITY' | 'MEDIUM PRIORITY' | 'UPCOMING'>('HIGH PRIORITY');
  const [badge, setBadge] = useState<'Today' | 'Tomorrow'>('Today');
  const [category, setCategory] = useState<'Work' | 'Personal'>('Work');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) {
      setError('Please enter a task title');
      return;
    }

    onAddTask({
      title: title.trim(),
      dueDate: badge,
      badge: badge,
      category: category,
      priority: priority,
    });

    setTitle('');
    setError('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>New Task</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close" size={24} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Title Input */}
          <Text style={styles.label}>Task Name</Text>
          <TextInput
            style={[styles.input, !!error && styles.inputError]}
            placeholder="e.g. Design wireframes for mobile app"
            placeholderTextColor={Colors.textMuted}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (error) setError('');
            }}
            autoFocus
          />
          {!!error && <Text style={styles.errorText}>{error}</Text>}

          {/* Priority selection */}
          <Text style={styles.label}>Priority</Text>
          <View style={styles.chipRow}>
            <TouchableOpacity
              style={[styles.chip, priority === 'HIGH PRIORITY' && styles.chipActive]}
              onPress={() => setPriority('HIGH PRIORITY')}
            >
              <Ionicons
                name="flame"
                size={16}
                color={priority === 'HIGH PRIORITY' ? Colors.white : Colors.error}
              />
              <Text
                style={[styles.chipText, priority === 'HIGH PRIORITY' && styles.chipTextActive]}
              >
                High
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.chip, priority === 'MEDIUM PRIORITY' && styles.chipActive]}
              onPress={() => setPriority('MEDIUM PRIORITY')}
            >
              <Ionicons
                name="flash"
                size={16}
                color={priority === 'MEDIUM PRIORITY' ? Colors.white : '#EA580C'}
              />
              <Text
                style={[styles.chipText, priority === 'MEDIUM PRIORITY' && styles.chipTextActive]}
              >
                Medium
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.chip, priority === 'UPCOMING' && styles.chipActive]}
              onPress={() => setPriority('UPCOMING')}
            >
              <Ionicons
                name="calendar-outline"
                size={16}
                color={priority === 'UPCOMING' ? Colors.white : Colors.textSecondary}
              />
              <Text
                style={[styles.chipText, priority === 'UPCOMING' && styles.chipTextActive]}
              >
                Upcoming
              </Text>
            </TouchableOpacity>
          </View>

          {/* Due date selection */}
          <Text style={styles.label}>Due Date</Text>
          <View style={styles.chipRow}>
            <TouchableOpacity
              style={[styles.chip, badge === 'Today' && styles.chipActive]}
              onPress={() => setBadge('Today')}
            >
              <Text style={[styles.chipText, badge === 'Today' && styles.chipTextActive]}>
                Today
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.chip, badge === 'Tomorrow' && styles.chipActive]}
              onPress={() => setBadge('Tomorrow')}
            >
              <Text style={[styles.chipText, badge === 'Tomorrow' && styles.chipTextActive]}>
                Tomorrow
              </Text>
            </TouchableOpacity>
          </View>

          {/* Category selection */}
          <Text style={styles.label}>Category</Text>
          <View style={styles.chipRow}>
            <TouchableOpacity
              style={[styles.chip, category === 'Work' && styles.chipActive]}
              onPress={() => setCategory('Work')}
            >
              <Ionicons
                name="briefcase-outline"
                size={16}
                color={category === 'Work' ? Colors.white : Colors.textSecondary}
              />
              <Text style={[styles.chipText, category === 'Work' && styles.chipTextActive]}>
                Work
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.chip, category === 'Personal' && styles.chipActive]}
              onPress={() => setCategory('Personal')}
            >
              <Ionicons
                name="person-outline"
                size={16}
                color={category === 'Personal' ? Colors.white : Colors.textSecondary}
              />
              <Text style={[styles.chipText, category === 'Personal' && styles.chipTextActive]}>
                Personal
              </Text>
            </TouchableOpacity>
          </View>

          {/* Submit button */}
          <TouchableOpacity style={styles.createButton} onPress={handleSubmit} activeOpacity={0.85}>
            <Ionicons name="add" size={20} color={Colors.white} />
            <Text style={styles.createButtonText}>Create Task</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 28,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
    marginTop: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    color: Colors.textPrimary,
    backgroundColor: '#FAFAFA',
  },
  inputError: {
    borderColor: Colors.borderError,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: '#F8FAFC',
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: Colors.white,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 12,
    marginTop: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  createButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
