import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { TaskItem } from '@/types/task';

interface TaskCardProps {
  task: TaskItem;
  onToggle: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle }) => {
  return (
    <TouchableOpacity
      style={[styles.card, task.completed && styles.cardCompleted]}
      onPress={() => onToggle(task.id)}
      activeOpacity={0.7}
    >
      {/* Circle Checkbox */}
      <View style={styles.radioContainer}>
        <View style={[styles.radioOuter, task.completed && styles.radioOuterCompleted]}>
          {task.completed && <Ionicons name="checkmark" size={13} color={Colors.white} />}
        </View>
      </View>

      {/* Details */}
      <View style={styles.detailsContainer}>
        <Text style={[styles.title, task.completed && styles.titleCompleted]}>
          {task.title}
        </Text>

        <View style={styles.metaRow}>
          {/* Badge Tag */}
          {task.badge === 'Today' && (
            <View style={styles.badgeToday}>
              <Text style={styles.badgeTodayText}>Today</Text>
            </View>
          )}

          {task.badge === 'Tomorrow' && (
            <View style={styles.badgeTomorrow}>
              <Text style={styles.badgeTomorrowText}>Tomorrow</Text>
            </View>
          )}

          {/* Date */}
          {task.dueDate && !task.badge && (
            <Text style={styles.dateText}>{task.dueDate}</Text>
          )}

          {/* Category */}
          {task.category === 'Work' && (
            <View style={styles.categoryBadge}>
              <Ionicons name="briefcase-outline" size={13} color={Colors.textSecondary} />
              <Text style={styles.categoryText}>Work</Text>
            </View>
          )}

          {task.category === 'Personal' && (
            <View style={styles.categoryBadge}>
              <Ionicons name="person-outline" size={13} color={Colors.textSecondary} />
              <Text style={styles.categoryText}>Personal</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  cardCompleted: {
    opacity: 0.6,
    backgroundColor: '#F8FAFC',
  },
  radioContainer: {
    marginRight: 14,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterCompleted: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.textMuted,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badgeToday: {
    backgroundColor: Colors.tagTodayBg,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeTodayText: {
    color: Colors.tagTodayText,
    fontSize: 12,
    fontWeight: '700',
  },
  badgeTomorrow: {
    backgroundColor: '#9A3412',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeTomorrowText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  dateText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  categoryText: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginLeft: 4,
    fontWeight: '500',
  },
});
