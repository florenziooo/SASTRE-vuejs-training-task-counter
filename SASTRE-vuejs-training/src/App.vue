<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'

const route = useRoute()
const userStore = useUserStore()
const { currentUser, isLoggedIn } = storeToRefs(userStore)
const nameInput = ref('')

function handleLogin() {
  if (nameInput.value.trim()) {
    userStore.login(nameInput.value)
    nameInput.value = ''
  }
}
</script>

<template>
  <header class="topbar">
    <span class="app-title">Vue Training</span>
    <nav class="day-tabs">
      <RouterLink to="/day1" class="tab" active-class="active">Day 1</RouterLink>
      <RouterLink to="/day2" class="tab" active-class="active">Day 2</RouterLink>
      <RouterLink to="/day3" class="tab" active-class="active">Day 3</RouterLink>
      <RouterLink to="/day4" class="tab" active-class="active">Day 4</RouterLink>
    </nav>
    <div class="user-area">
      <template v-if="isLoggedIn">
        <span class="user-name">👤 {{ currentUser }}</span>
        <button class="logout-btn" @click="userStore.logout()">Logout</button>
      </template>
      <template v-else>
        <input v-model="nameInput" class="login-input" placeholder="Your name…" @keyup.enter="handleLogin" />
        <button class="login-btn" @click="handleLogin">Login</button>
      </template>
    </div>
  </header>

  <main class="app-body">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Lato:wght@400;700&display=swap');

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
  font-family: 'Lato';
}

h1, h2, h3 {
  font-family: 'Montserrat';
}
</style>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 28px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.app-title {
  color: var(--text);
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.day-tabs {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.tab {
  padding: 5px 16px;
  border: 1px solid transparent;
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--text-muted);
  font-family: 'Lato';
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
  text-decoration: none;
}

.tab:hover {
  background: var(--brand-bg);
  color: var(--brand-dark);
  border-color: var(--brand-border);
}

.tab.active {
  background: var(--brand);
  color: #fff;
  border-color: var(--brand);
}

.user-area {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
}

.login-input {
  padding: 5px 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  font-size: 13px;
  outline: none;
}

.login-input:focus {
  border-color: var(--brand);
}

.login-btn {
  padding: 5px 14px;
  background: var(--brand);
  color: #fff;
  border: none;
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.logout-btn {
  padding: 5px 14px;
  background: transparent;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  font-size: 13px;
  cursor: pointer;
}

.logout-btn:hover {
  border-color: var(--danger);
  color: var(--danger);
}

.app-body {
  min-width: 500px;
  margin: 40px auto;
  padding: 0 28px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
