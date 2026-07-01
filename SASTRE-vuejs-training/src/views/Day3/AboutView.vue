<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="about-view">
    <button class="back-btn" @click="router.push('/day3/home')">← Back</button>
    <h1>About</h1>
    <p>Vue Training — Day 3: Dynamic Routes, Navigation Guards, Programmatic Navigation.</p>
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

.about-view {
  max-width: 520px;
  margin: 40px auto;
  padding: 0 4px;
}

h1 {
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 12px;
}

p {
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.6;
}
</style>
