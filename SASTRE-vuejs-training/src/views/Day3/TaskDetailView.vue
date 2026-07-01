<!--
=============================================================
  DAY 3 ASSIGNMENT — TaskDetailView.vue
  Displays full details for a single task
=============================================================
-->
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'

const route  = useRoute()
const router = useRouter()

const taskStore = useTaskStore()

const task = computed(() => taskStore.tasks.find(t => t.id === Number(route.params.id)))

function goBack() {
  router.push('/day3/home')
}

</script>

<template>
  <div class="detail-view">

    <div v-if="task">
      <button class="back-btn" @click="goBack">← Back</button>
      <h1>{{ task.name }}</h1>
      <p>Status: {{ task.done ? 'Done' : 'Pending' }}</p>
      <p>Due: {{ task.dueDate }}</p>
    </div>

    <div v-else>
      <p>Task not found.</p>
      <button @click="goBack">Go Back</button>
    </div>
  </div>
</template>

<style scoped>
.detail-view {
  max-width: 520px;
  margin: 40px auto;
  padding: 0 4px;
}

.back-btn {
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 5px 14px;
  cursor: pointer;
  margin-bottom: 24px;
  color: var(--text-muted);
  font-family: 'Lato';
  font-size: 13px;
  font-weight: 700;
  transition: all 0.15s;
}

.back-btn:hover {
  background: var(--brand-bg);
  color: var(--brand-dark);
  border-color: var(--brand-border);
}

h1 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 16px;
}

p {
  color: var(--text-muted);
  font-size: 14px;
  margin: 6px 0;
}
</style>
