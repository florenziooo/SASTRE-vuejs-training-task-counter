<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Task, Priority, Filter } from '../types'
import TaskInput from '../components/TaskInput.vue'
import StatsBar from '../components/StatsBar.vue'
import FilterBar from '../components/FilterBar.vue'
import TaskList from '../components/TaskList.vue'

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

<style scoped>
.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 20px;
  letter-spacing: -0.01em;
}
</style>

<template>
  <div class="day1-view">
    <h3 class="section-title">My Tasks</h3>
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
