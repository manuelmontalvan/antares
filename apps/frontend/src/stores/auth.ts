import { defineStore } from 'pinia'
import api from '@/api/axios'

interface LoginResponse {
  accessToken: string
}

export const useAuthStore = defineStore('auth', { // 'auth' es el ID
  state: () => ({
    token: localStorage.getItem('token') || '',
    username: '',
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(username: string, password: string) {
      const res = await api.post<LoginResponse>('/auth/login', { username, password })
      this.token = res.data.accessToken
      this.username = username;
      localStorage.setItem('token', this.token);
    
      console.log('Login response:', res.data)

    },
    logout() {
      this.token = ''
      this.username = ''
      localStorage.removeItem('token')
    },
  },
})
