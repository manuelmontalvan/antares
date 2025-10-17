import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './pages/loginView.vue';
import TasksView from './pages/tasksView.vue';
import { useAuthStore } from './stores/auth';


const routes = [
{ path: '/', name: 'login', component: LoginView },
{ path: '/tasks', name: 'tasks', component: TasksView, meta: { requiresAuth: true } },
];


const router = createRouter({
history: createWebHistory(),
routes,
});


router.beforeEach((to, from, next) => {
const authStore = useAuthStore();
if (to.meta.requiresAuth && !authStore.isAuthenticated) {
next({ name: 'login' });
} else if (to.name === 'login' && authStore.isAuthenticated) {
next({ name: 'tasks' }); // ⚡ evita que el usuario logueado vuelva al login
} else {
next();
}
});


export default router;