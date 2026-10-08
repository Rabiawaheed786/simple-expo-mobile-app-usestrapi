import { TaskItem } from '../types/task';
import { simulateNetworkDelay } from './api';

class TaskService {
  private tasks: TaskItem[] = [
    {
      id: 't1',
      title: 'Finalize Q3 Marketing Report',
      dueDate: 'Today',
      badge: 'Today',
      category: 'Work',
      completed: false,
      priority: 'HIGH PRIORITY',
    },
    {
      id: 't2',
      title: 'Call the dentist for appointment',
      dueDate: 'Tomorrow',
      badge: 'Tomorrow',
      category: 'Personal',
      completed: false,
      priority: 'HIGH PRIORITY',
    },
    {
      id: 't3',
      title: 'Prepare project presentation',
      dueDate: 'Tomorrow',
      badge: 'Tomorrow',
      category: 'Work',
      completed: false,
      priority: 'MEDIUM PRIORITY',
    },
    {
      id: 't4',
      title: 'Review team code submissions',
      dueDate: 'Oct 25',
      category: 'Work',
      completed: false,
      priority: 'MEDIUM PRIORITY',
    },
    {
      id: 't5',
      title: 'Review new design mockups',
      dueDate: 'Oct 26',
      category: 'Work',
      completed: false,
      priority: 'UPCOMING',
    },
    {
      id: 't6',
      title: 'Buy groceries for the week',
      dueDate: 'Oct 27',
      category: 'Personal',
      completed: false,
      priority: 'UPCOMING',
    },
    {
      id: 't7',
      title: 'Pay utility bills',
      dueDate: 'Oct 28',
      category: 'Personal',
      completed: false,
      priority: 'UPCOMING',
    },
  ];

  async getTasks(): Promise<TaskItem[]> {
    await simulateNetworkDelay(300);
    return [...this.tasks];
  }

  async toggleTaskCompletion(id: string): Promise<TaskItem[]> {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    return [...this.tasks];
  }

  async addTask(newTask: Omit<TaskItem, 'id' | 'completed'>): Promise<TaskItem> {
    await simulateNetworkDelay(400);
    const item: TaskItem = {
      ...newTask,
      id: 't_' + Date.now(),
      completed: false,
    };
    this.tasks.unshift(item);
    return item;
  }
}

export const taskService = new TaskService();
