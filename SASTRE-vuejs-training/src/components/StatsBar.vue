<script setup lang="ts">
defineProps<{
  total: number
  done: number
  pending: number
}>()
</script>

<template>
  <div class="stats">
    <div class="stat">
      <span class="stat-value">{{ total }}</span>
      <span class="stat-label">Total</span>
    </div>
    <div class="stat-divider" />
    <div class="stat done">
      <span class="stat-value">{{ done }}</span>
      <span class="stat-label">Done</span>
    </div>
    <div class="stat-divider" />
    <div class="stat pending">
      <span class="stat-value">{{ pending }}</span>
      <span class="stat-label">Pending</span>
    </div>
  </div>
</template>

<style scoped>
.stats {
  display: flex;
  align-items: stretch;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: 16px;
}

.stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
}

.stat-divider {
  width: 1px;
  background: var(--border);
  margin: 10px 0;
}

.stat-value {
  font-size: 22px;
  font-weight: 700;
  color: var(--text);
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 4px;
}

.stat.done .stat-value {
  color: var(--brand);
}

.stat.pending .stat-value {
  color: var(--warning);
}
</style>
