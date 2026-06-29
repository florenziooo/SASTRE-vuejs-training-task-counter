<script setup lang="ts">
import type { Filter } from '../types'

defineProps<{
  modelValue: Filter
  doneCount: number
}>()

const emit = defineEmits<{
  'update:modelValue': [filter: Filter]
  'clear-done': []
}>()

const filters: Filter[] = ['all', 'done', 'pending']
</script>

<template>
  <div class="toolbar">
    <div class="filter-group">
      <button
        v-for="f in filters"
        :key="f"
        :class="['filter-btn', { active: modelValue === f }]"
        @click="emit('update:modelValue', f)"
      >
        {{ f.charAt(0).toUpperCase() + f.slice(1) }}
      </button>
    </div>
    <button
      class="clear-btn"
      :disabled="doneCount === 0"
      @click="emit('clear-done')"
    >
      Clear Done
    </button>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  gap: 8px;
}

.filter-group {
  display: flex;
  gap: 4px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  padding: 3px;
}

.filter-btn {
  padding: 5px 14px;
  border: none;
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: background 0.15s, color 0.15s;
}

.filter-btn:hover:not(.active) {
  background: var(--bg);
  color: var(--text);
}

.filter-btn.active {
  background: var(--brand);
  color: white;
  font-weight: 600;
}

.clear-btn {
  padding: 6px 14px;
  background: var(--danger-bg);
  color: var(--danger);
  border: 1px solid var(--danger-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  transition: opacity 0.15s;
  white-space: nowrap;
}

.clear-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.clear-btn:not(:disabled):hover {
  background: var(--danger-border);
}
</style>
