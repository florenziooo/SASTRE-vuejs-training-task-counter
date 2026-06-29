<script setup lang="ts">
import { ref } from 'vue'
import type { Priority } from '../types'

const emit = defineEmits<{
  'add-task': [name: string, priority: Priority]
}>()

const taskName = ref('')
const taskPriority = ref<Priority>('medium')

function submit() {
  if (!taskName.value.trim()) return
  emit('add-task', taskName.value.trim(), taskPriority.value)
  taskName.value = ''
}
</script>

<template>
  <div class="input-row">
    <input
      v-model="taskName"
      @keyup.enter="submit"
      placeholder="Add a new task..."
      class="task-input"
    />
    <select v-model="taskPriority" class="priority-select">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <button @click="submit" class="add-btn">Add Task</button>
  </div>
</template>

<style scoped>
.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.task-input {
  flex: 1;
  padding: 9px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text);
  background: var(--surface);
  transition: border-color 0.15s;
}

.task-input:focus {
  outline: none;
  border-color: var(--brand);
  box-shadow: 0 0 0 3px var(--brand-bg);
}

.task-input::placeholder {
  color: var(--text-faint);
}

.priority-select {
  padding: 9px 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text);
  background: var(--surface);
  cursor: pointer;
}

.priority-select:focus {
  outline: none;
  border-color: var(--brand);
}

.add-btn {
  padding: 9px 18px;
  background: var(--brand);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.15s;
  white-space: nowrap;
}

.add-btn:hover {
  background: var(--brand-dark);
}
</style>
