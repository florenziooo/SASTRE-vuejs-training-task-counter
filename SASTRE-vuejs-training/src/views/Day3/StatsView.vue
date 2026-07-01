<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
const router = useRouter()

const taskStore = useTaskStore()

const total   = computed(() => taskStore.tasks.length)
const done    = computed(() => taskStore.tasks.filter(t => t.done).length)
const pending = computed(() => total.value - done.value)
</script>

<template>
  <div class="stats-view">
    <button class="back-btn" @click="router.push('/day3/home')">← Back</button>
    <h1>📊 Stats</h1>
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-label">Total</span>
        <span class="stat-value">{{ total }}</span>
      </div>
      <div class="stat-card done">
        <span class="stat-label">Done</span>
        <span class="stat-value">{{ done }}</span>
      </div>
      <div class="stat-card pending">
        <span class="stat-label">Pending</span>
        <span class="stat-value">{{ pending }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.stats-view {
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

.stats-grid {
  display: flex;
  gap: 12px;
}

.stat-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px;
  background: var(--surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
}

.stat-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  font-family: 'Montserrat';
  color: var(--text);
  margin-top: 8px;
}

.stat-card.done .stat-value    { color: var(--brand); }
.stat-card.pending .stat-value { color: var(--warning); }
</style>
