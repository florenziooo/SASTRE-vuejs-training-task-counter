<!--
=============================================================
  DAY 1 Task — Reactive Task Counter App
  Topic: Vue 3 Composition API (ref, computed, v-model, v-for)
  Time: 60 minutes
=============================================================

OBJECTIVE
---------
Build a reactive task management app that demonstrates Vue 3's
reactivity system. You will use ref(), computed(), v-model, v-for,
and event handling — the core building blocks of every Vue app.

WHAT TO BUILD
-------------
A single-file Vue component (this file) that:

  1. Has a text input + "Add Task" button to create new tasks.
  2. Displays the task list, each item with:
       - A checkbox to mark it as done
       - The task name (strike-through when done)
       - A "Remove" button
  3. Shows a live stats bar:
       Total Tasks | Done: X | Pending: X
  4. Shows an empty state message when there are no tasks.

REQUIREMENTS (Acceptance Criteria)
------------------------------------
  [x] Use ref() for the text input value
  [x] Use ref() for the tasks array
  [x] Use computed() for total, done, and pending counts
  [x] Use v-model on the text input
  [x] Use v-for with :key to render the task list
  [x] Use @keyup.enter on the input to also trigger addTask
  [x] Prevent adding empty/whitespace-only tasks
  [x] Clear the input after adding a task

EXTENSION (Additional Points)
---------------------------------
  - Add a filter bar: All | Done | Pending — filters the visible list
  - Add a "Clear All Done" button that removes all completed tasks
  - Add a task priority: Low / Medium / High (use a <select> dropdown)

HINTS (read only if stuck)
---------------------------
  Hint 1: import { ref, computed } from 'vue'
  Hint 2: tasks.value.push({ id: Date.now(), name: '...', done: false })
  Hint 3: computed(() => tasks.value.filter(t => t.done).length)
  Hint 4: For :class strikethrough — :class="{ done: task.done }"
  Hint 5: v-model on a checkbox binds to a boolean — v-model="task.done"
  Hint 6: To prevent empty tasks — if (!newTaskName.value.trim()) return

FILE STRUCTURE (this is a single-file component)
-------------------------------------------------
  <script setup>  — all your reactive logic goes here
  <template>      — your HTML markup
  <style scoped>  — your CSS (scoped = only applies to this component)
=============================================================
-->

<script setup lang="ts">
import { ref, computed } from 'vue'

type Priority = 'low' | 'medium' | 'high'

interface Task {
  id: number
  name: string
  done: boolean
  priority: Priority
}

type Filter = 'all' | 'done' | 'pending'

// TODO 1: Create a ref for the text input value (initial value: '')
const newTaskName = ref('')
const newTaskPriority = ref<Priority>('medium')

// TODO 2: Create a ref for the tasks array (initial value: [])
const tasks = ref<Task[]>([])

// TODO 3: Create computed() values for total, done, and pending counts
const totalCount  = computed(() => tasks.value.length)
const doneCount   = computed(() => tasks.value.filter(t => t.done).length)
const pendingCount = computed(() => tasks.value.filter(t => !t.done).length)

// TODO 4: Write the addTask() function
// - Prevent empty tasks
// - Push a new task object to tasks.value: { id, name, done }
// - Clear the input
function addTask() {
  if (!newTaskName.value.trim()) return
  tasks.value.push({ id: Date.now(), name: newTaskName.value.trim(), done: false, priority: newTaskPriority.value })
  newTaskName.value = ''
}

// TODO 5: Write toggleTask(id) — flip task.done for the matching task
function toggleTask(id: number) {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.done = !task.done
}

// TODO 6: Write removeTask(id) — filter out the task with this id
function removeTask(id: number) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}

// EXTENSION: Clear all done
function clearDone() {
  tasks.value = tasks.value.filter(t => !t.done)
}

// EXTENSION: Filter bar
const activeFilter = ref<Filter>('all')

const filteredTasks = computed(() => {
  if (activeFilter.value === 'done')    return tasks.value.filter(t => t.done)
  if (activeFilter.value === 'pending') return tasks.value.filter(t => !t.done)
  return tasks.value
})
</script>

<template>
  <div class="app">
    <h1>Task Counter</h1>

    <div class="input-row">
      <input v-model="newTaskName" @keyup.enter="addTask" placeholder="Add a new task..." />
      <select v-model="newTaskPriority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button @click="addTask">Add Task</button>
    </div>

    <div class="stats">
      Total: {{ totalCount }} | Done: {{ doneCount }} | Pending: {{ pendingCount }}
    </div>

    <div class="actions-row">
      <button class="clear-done-btn" :disabled="doneCount === 0" @click="clearDone">
        Clear All Done
      </button>
    </div>

    <div class="filter-bar">
      <button
        v-for="f in (['all', 'done', 'pending'] as Filter[])"
        :key="f"
        :class="{ active: activeFilter === f }"
        @click="activeFilter = f as Filter"
      >{{ f.charAt(0).toUpperCase() + f.slice(1) }}</button>
    </div>

    <p v-if="filteredTasks.length === 0" class="empty">
      {{ tasks.length === 0 ? 'No tasks yet. Add one above!' : 'No tasks match this filter.' }}
    </p>

    <ul class="task-list">
      <li v-for="task in filteredTasks" :key="task.id">
        <input type="checkbox" v-model="task.done" @change="toggleTask(task.id)" />
        <span :class="['task-name', { done: task.done }]">{{ task.name }}</span>
        <span :class="['priority-badge', task.priority]">{{ task.priority }}</span>
        <button @click="removeTask(task.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.app {
  max-width: 480px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
  padding: 24px;
  background: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

h1 { color: #1B2A4A; margin-bottom: 20px; }

.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.input-row input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.input-row button {
  padding: 8px 16px;
  background: #42B883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.stats {
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: #e9f7f0;
  border-radius: 6px;
}

.empty {
  text-align: center;
  color: #aaa;
  font-style: italic;
  margin: 32px 0;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid #eee;
}

.task-list li span.task-name {
  flex: 1;
  font-size: 14px;
}

/* TODO: Apply this class to task names when task.done is true */
.done {
  text-decoration: line-through;
  color: #aaa;
}

.task-list li button {
  padding: 4px 10px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.filter-bar {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
}

.filter-bar button {
  padding: 5px 14px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  color: #555;
  cursor: pointer;
  font-size: 13px;
}

.filter-bar button.active {
  background: #42B883;
  color: white;
  border-color: #42B883;
  font-weight: bold;
}

.actions-row {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.clear-done-btn {
  padding: 5px 14px;
  background: #fff7ed;
  color: #c2410c;
  border: 1px solid #fed7aa;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.clear-done-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.input-row select {
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
}

.priority-badge {
  font-size: 11px;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 10px;
  text-transform: capitalize;
  white-space: nowrap;
}

.priority-badge.low {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.priority-badge.medium {
  background: #fefce8;
  color: #ca8a04;
  border: 1px solid #fde68a;
}

.priority-badge.high {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
</style>
