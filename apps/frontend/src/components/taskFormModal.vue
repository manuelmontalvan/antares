<template>
  <div class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white/90 backdrop-blur-md rounded-lg shadow-xl w-full max-w-md p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">Task Form</h2>
      <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
        <input
          v-model="form.titulo"
          type="text"
          placeholder="Title"
          required
          class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          v-model="form.descripcion"
          placeholder="Description"
          class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="4"
        ></textarea>
        <select
          v-model="form.estado"
          class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En Progreso">En Progreso</option>
          <option value="Completada">Completada</option>
        </select>

        <div class="flex justify-end gap-2 mt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, watch } from "vue";
import { useTasksStore } from "../stores/tasks";
import Swal from "sweetalert2";
const props = defineProps({ task: Object });
const tasksStore = useTasksStore();
const form = reactive({ titulo: "", descripcion: "", estado: "Pendiente" });
watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      form.titulo = newTask.titulo;
      form.descripcion = newTask.descripcion;
      form.estado = newTask.estado;
    } else {
      form.titulo = "";
      form.descripcion = "";
      form.estado = "Pendiente";
    }
  },
  { immediate: true }
);
const onSubmit = async () => {
  try {
    if (props.task && props.task.id) {
      await tasksStore.updateTask(props.task.id, form);
      Swal.fire("Updated", "Task updated successfully", "success");
    } else {
      await tasksStore.createTask(form);
      Swal.fire("Created", "Task created successfully", "success");
    }
    form.titulo = "";
    form.descripcion = "";
    form.estado = "Pendiente";
    // close modal
    emit("close");
  } catch (e) {
    Swal.fire("Error", "Something went wrong", "error");
  }
};
const emit = defineEmits(["close"]);
</script>
