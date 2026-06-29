<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Task, Priority, Filter } from './types'
import TaskInput from './components/TaskInput.vue'
import StatsBar from './components/StatsBar.vue'
import FilterBar from './components/FilterBar.vue'
import TaskList from './components/TaskList.vue'

const tasks = ref<Task[]>([])
const activeFilter = ref<Filter>('all')

const totalCount   = computed(() => tasks.value.length)
const doneCount    = computed(() => tasks.value.filter(t => t.done).length)
const pendingCount = computed(() => tasks.value.filter(t => !t.done).length)

const filteredTasks = computed(() => {
  if (activeFilter.value === 'done')    return tasks.value.filter(t => t.done)
  if (activeFilter.value === 'pending') return tasks.value.filter(t => !t.done)
  return tasks.value
})

function addTask(name: string, priority: Priority) {
  tasks.value.push({ id: Date.now(), name, done: false, priority })
}

function toggleTask(id: number) {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.done = !task.done
}

function removeTask(id: number) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}

function clearDone() {
  tasks.value = tasks.value.filter(t => !t.done)
}
</script>

<template>
  <div class="app">
    <h1 class="app-title">Task Counter</h1>
    <TaskInput @add-task="addTask" />
    <StatsBar :total="totalCount" :done="doneCount" :pending="pendingCount" />
    <FilterBar v-model="activeFilter" :done-count="doneCount" @clear-done="clearDone" />
    <TaskList
      :tasks="filteredTasks"
      :all-tasks-empty="tasks.length === 0"
      @toggle="toggleTask"
      @remove="removeTask"
    />
  </div>
</template>

<!-- Global design tokens — available to all child components via CSS variables -->
<style>
:root {
  --brand:        #42b883;
  --brand-dark:   #2d9e6e;
  --brand-bg:     #ecfdf5;
  --brand-border: #6ee7b7;

  --danger:        #dc2626;
  --danger-bg:     #fef2f2;
  --danger-border: #fecaca;

  --warning:        #d97706;
  --warning-bg:     #fffbeb;
  --warning-border: #fde68a;

  --bg:      #f1f5f9;
  --surface: #ffffff;
  --border:  #e2e8f0;

  --text:       #1e293b;
  --text-muted: #64748b;
  --text-faint: #94a3b8;

  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-pill: 20px;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
}
</style>

<style scoped>
.app {
  max-width: 500px;
  margin: 48px auto;
  padding: 28px;
  background: var(--bg);
  border-radius: var(--radius-lg);
}

.app-title {
  color: var(--text);
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 20px;
  letter-spacing: -0.02em;
}
</style>
