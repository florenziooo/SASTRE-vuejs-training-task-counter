<!--
=============================================================
  DAY 2 ASSIGNMENT — TaskListView.vue (Parent Component)
  This file renders a list of TaskCard components.
=============================================================
-->
<script setup>
import { ref } from 'vue'
import TaskCard from '../../components/TaskCard.vue'

// TODO 1: Create a ref() tasks array with at least 3 sample tasks
// Each task: { id, name, done, dueDate }
const tasks = ref([
  { id: 1, name: 'pagupit', done: false, dueDate: '2025-07-10', priority: 'high' },
  { id: 2, name: 'write unit tests', done: false, dueDate: '2025-07-12', priority: 'medium' },
  { id: 3, name: 'asdasd', done: true, dueDate: '2025-07-08', priority: 'low' },
])

function handleComplete(id) {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.done = !task.done
}

function handleDelete(id) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}

function handleUpdate({ id, name }) {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.name = name
}
</script>

<template>
  <div class="task-list-view">
    <h3 class="section-title">My Tasks</h3>

    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @complete="handleComplete"
      @delete="handleDelete"
      @update="handleUpdate"
    >
      <template #meta>
        <span class="due-date">Due: {{ task.dueDate }}</span>
      </template>
    </TaskCard>

    <p v-if="tasks.length === 0" class="empty">No tasks yet.</p>
  </div>
</template>

<style scoped>
.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 20px;
  letter-spacing: -0.01em;
}

.due-date {
  font-size: 12px;
  color: var(--text-faint);
}

.empty {
  text-align: center;
  color: var(--text-faint);
  font-style: italic;
  margin: 40px 0;
  font-size: 14px;
}

</style>
