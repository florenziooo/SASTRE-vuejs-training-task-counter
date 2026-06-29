<script setup lang="ts">
import type { Task } from '../types'

defineProps<{ task: Task }>()

const emit = defineEmits<{
  toggle: [id: number]
  remove: [id: number]
}>()
</script>

<template>
  <li class="task-item">
    <input
      type="checkbox"
      :checked="task.done"
      @change="emit('toggle', task.id)"
      class="task-checkbox"
    />
    <span :class="['task-name', { done: task.done }]">{{ task.name }}</span>
    <span :class="['priority-badge', task.priority]">{{ task.priority }}</span>
    <button @click="emit('remove', task.id)" class="remove-btn">Remove</button>
  </li>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  background: var(--surface);
  border-radius: var(--radius-md);
  margin-bottom: 8px;
  border: 1px solid var(--border);
  transition: border-color 0.15s;
}

.task-item:hover {
  border-color: #cbd5e1;
}

.task-checkbox {
  width: 16px;
  height: 16px;
  accent-color: var(--brand);
  cursor: pointer;
  flex-shrink: 0;
}

.task-name {
  flex: 1;
  font-size: 14px;
  color: var(--text);
  transition: color 0.15s;
}

.task-name.done {
  text-decoration: line-through;
  color: var(--text-faint);
}

.priority-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  text-transform: capitalize;
  white-space: nowrap;
  border: 1px solid transparent;
}

.priority-badge.low {
  background: var(--brand-bg);
  color: var(--brand-dark);
  border-color: var(--brand-border);
}

.priority-badge.medium {
  background: var(--warning-bg);
  color: var(--warning);
  border-color: var(--warning-border);
}

.priority-badge.high {
  background: var(--danger-bg);
  color: var(--danger);
  border-color: var(--danger-border);
}

.remove-btn {
  padding: 4px 10px;
  background: var(--danger-bg);
  color: var(--danger);
  border: 1px solid var(--danger-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: background 0.15s;
  flex-shrink: 0;
}

.remove-btn:hover {
  background: var(--danger-border);
}
</style>
