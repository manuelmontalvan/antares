<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 p-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-3xl font-extrabold text-gray-800">Tasks</h2>
      <div class="flex gap-3">
        <button
          @click="logout"
          class="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
        <button
          @click="showModal = true"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          New Task
        </button>
      </div>
    </div>

    <!-- Table Container -->
    <div class="overflow-x-auto rounded-lg shadow-lg">
      <table class="min-w-full bg-white rounded-lg">
        <thead class="bg-gray-100 border-b border-gray-200">
          <tr>
            <th class="px-6 py-3 text-left text-gray-600 font-medium">Title</th>
            <th class="px-6 py-3 text-left text-gray-600 font-medium">
              Description
            </th>
            <th class="px-6 py-3 text-left text-gray-600 font-medium">
              Status
            </th>
            <th class="px-6 py-3 text-left text-gray-600 font-medium">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="task in tasksStore.tasks"
            :key="task.id"
            class="border-b hover:bg-gray-50 transition"
          >
            <td class="px-6 py-4 text-gray-700 font-medium">
              {{ task.titulo }}
            </td>
            <td class="px-6 py-4 text-gray-600">{{ task.descripcion }}</td>
            <td class="px-6 py-4">
              <span
                :class="{
                  'text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full':
                    task.estado === 'Pendiente',
                  'text-blue-600 bg-blue-100 px-2 py-1 rounded-full':
                    task.estado === 'En Progreso',
                  'text-green-600 bg-green-100 px-2 py-1 rounded-full':
                    task.estado === 'Completada',
                }"
                class="font-semibold text-sm"
              >
                {{ task.estado }}
              </span>
            </td>
            <td class="px-6 py-4 flex gap-2">
              <button
                @click="editTask(task)"
                class="px-3 py-1 bg-yellow-400 text-white rounded-lg shadow hover:bg-yellow-500 transition"
              >
                Edit
              </button>
              <button
                @click="deleteTask(task.id)"
                class="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <TaskFormModal v-if="showModal" :task="selectedTask" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTasksStore } from "@/stores/tasks";
import { useAuthStore } from "@/stores/auth";
import TaskFormModal from "@/components/taskFormModal.vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const tasksStore = useTasksStore();
const authStore = useAuthStore();
const router = useRouter();

const showModal = ref(false);
const selectedTask = ref(null as any);

onMounted(() => tasksStore.fetchTasks());

const editTask = (task: any) => {
  selectedTask.value = { ...task };
  showModal.value = true;
};

const deleteTask = async (id: string) => {
  await tasksStore.deleteTask(id);
  Swal.fire("Deleted", "Task deleted successfully", "success");
};

const closeModal = () => {
  selectedTask.value = null;
  showModal.value = false;
};

const logout = () => {
  authStore.logout();
  router.push({ name: "login" });
};
</script>
