<!--
=============================================================
  DAY 3 ASSIGNMENT — HomeView.vue
  Shows the task list with router-link navigation to each task
=============================================================
-->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()
const route     = useRoute()

const showErrorBanner = computed(() => route.query.error === 'notfound')
</script>

<template>
  <div class="home-view">
    <h1>📝 My Tasks</h1>
    <div class="error-banner" v-if="showErrorBanner">
      ⚠️ Task not found. Redirected back to home.
    </div>

    <nav class="page-nav">
      <RouterLink to="/day3/about">About</RouterLink>
      <RouterLink to="/day3/stats">Stats</RouterLink>
    </nav>

    <ul class="task-list">
      <li v-for="task in taskStore.tasks" :key="task.id">
        <RouterLink :to="`/day3/task/${task.id}`">
          <span :class="{ done: task.done }">{{ task.name }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.home-view {
  max-width: 520px;
  margin: 40px auto;
  padding: 0 4px;
}

h1 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 20px;
}

.error-banner {
  background: var(--warning-bg);
  border: 1px solid var(--warning-border);
  border-radius: var(--radius-md);
  padding: 10px 14px;
  margin-bottom: 16px;
  color: var(--warning);
  font-size: 13px;
}

.page-nav {
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
}

.page-nav a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  border: 1px solid transparent;
  transition: all 0.15s;
}

.page-nav a:hover {
  background: var(--brand-bg);
  color: var(--brand-dark);
  border-color: var(--brand-border);
}

.page-nav a.active {
  background: var(--brand-bg);
  color: var(--brand-dark);
  border-color: var(--brand-border);
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-list li {
  background: var(--surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  transition: border-color 0.15s;
}

.task-list li:hover { border-color: var(--brand); }

.task-list a {
  display: block;
  padding: 12px 16px;
  text-decoration: none;
  color: var(--text);
  font-size: 14px;
  font-weight: 700;
}

.done {
  text-decoration: line-through;
  color: var(--text-faint);
}
</style>
