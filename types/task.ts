export type PriorityLevel = 'HIGH PRIORITY' | 'MEDIUM PRIORITY' | 'UPCOMING';

export interface TaskItem {
  id: string;
  title: string;
  dueDate: string;
  badge?: 'Today' | 'Tomorrow';
  category?: 'Work' | 'Personal';
  completed: boolean;
  priority: PriorityLevel;
}
