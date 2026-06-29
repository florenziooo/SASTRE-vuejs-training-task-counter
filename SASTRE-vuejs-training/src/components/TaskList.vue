<script setup lang="ts">
import TaskItem from './TaskItem.vue'
import type { Task } from '../types'

defineProps<{
  tasks: Task[]
  allTasksEmpty: boolean
}>()

const emit = defineEmits<{
  toggle: [id: number]
  remove: [id: number]
}>()
</script>

<template>
  <p v-if="tasks.length === 0" class="empty">
    {{ allTasksEmpty ? 'No tasks yet. Add one above!' : 'No tasks match this filter.' }}
  </p>
  <ul class="task-list">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="emit('toggle', $event)"
      @remove="emit('remove', $event)"
    />
  </ul>
</template>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.empty {
  text-align: center;
  color: var(--text-faint);
  font-style: italic;
  margin: 40px 0;
  font-size: 14px;
}
</style>
