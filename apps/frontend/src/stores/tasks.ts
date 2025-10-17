import { defineStore } from 'pinia';
import api from '@/api/axios';
import { useAuthStore } from './auth';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as any[],
  }),
  actions: {
    async fetchTasks() {
      const authStore = useAuthStore(); 
      if (!authStore.token) return; 

      try {
        const res = await api.get('/tasks', {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        this.tasks = res.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },

    async createTask(task: any) {
      const authStore = useAuthStore();
      const res = await api.post('/tasks', task, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      await this.fetchTasks();
    },

    async updateTask(id: string, task: any) {
      const authStore = useAuthStore();
      await api.patch(`/tasks/${id}`, task, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      await this.fetchTasks();
    },

    async deleteTask(id: string) {
      const authStore = useAuthStore();
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
      await this.fetchTasks();
    },
  },
});
