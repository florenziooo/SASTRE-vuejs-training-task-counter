<!--
=============================================================
  DAY 2 ASSIGNMENT — Reusable TaskCard Component
  Topic: Props, Emits, Slots, Component Lifecycle
  Files: TaskCard.vue (child)  +  TaskListView.vue (parent)
  Time: 60 minutes
=============================================================

OBJECTIVE
---------
Build a reusable TaskCard child component that accepts data as props
and communicates back to the parent via custom events (emits). The
parent renders a list of TaskCards and handles all state changes.

WHAT TO BUILD — TaskCard.vue (this file)
-----------------------------------------
  1. Accept a "task" prop: { id, name, done, dueDate }
  2. Display the task name and dueDate (via a named slot "meta")
  3. Emit "complete" event (payload: task.id) when Complete/Undo clicked
  4. Emit "delete" event (payload: task.id) when Delete clicked
  5. Show "Complete" when task.done is false, "Undo" when true
  6. Apply a visual style change when task.done is true

WHAT TO BUILD — TaskListView.vue (see that file)
-------------------------------------------------
  1. Hold a tasks ref array with at least 3 sample tasks
  2. Render a TaskCard for each task using v-for
  3. Handle @complete → toggle that task's done property
  4. Handle @delete → remove that task from the array
  5. Fill the "meta" named slot with the due date

REQUIREMENTS (Acceptance Criteria)
------------------------------------
  [x] TaskCard uses defineProps({ task: Object })
  [x] TaskCard uses defineEmits(['complete', 'delete'])
  [x] TaskCard has <slot name="meta" /> for optional metadata
  [x] Parent passes :task="task" and listens @complete @delete
  [x] Parent fills the slot with <template #meta>...</template>
  [x] Data flows DOWN (props) and events flow UP (emits)
  [x] Parent owns the state — TaskCard never mutates props directly

EXTENSION (additional points)
---------------------------------
  - Add a priority badge prop (low/medium/high) with colour coding
  - Add an edit mode: clicking the task name turns it into an input
  - Emit an "update" event when the edited name is saved

HINTS (read only if stuck)
---------------------------
  Hint 1: const props = defineProps({ task: { type: Object, required: true } })
  Hint 2: const emit = defineEmits(['complete', 'delete'])
  Hint 3: @click="emit('complete', props.task.id)"
  Hint 4: In the parent — @complete="handleComplete"
           function handleComplete(id) { find task by id, toggle done }
  Hint 5: Named slot in child  → <slot name="meta" />
           Fill in parent      → <template #meta>Due: {{ task.dueDate }}</template>
  Hint 6: NEVER do this inside TaskCard: props.task.done = !props.task.done
           That mutates a prop directly — Vue will warn you. Emit instead.
=============================================================
-->

<!-- ─── TaskCard.vue ─── -->
<script setup>
import { ref } from 'vue'

const props = defineProps({
  task: { type: Object, required: true }
})

const emit = defineEmits(['complete', 'delete', 'update'])

// ── Edit mode ──────────────────────────────────────────────
const editing = ref(false)
const editName = ref('')

function startEdit() {
  editName.value = props.task.name
  editing.value = true
}

function saveEdit() {
  const trimmed = editName.value.trim()
  if (trimmed && trimmed !== props.task.name) {
    emit('update', { id: props.task.id, name: trimmed })
  }
  editing.value = false
}

function cancelEdit() {
  editing.value = false
}
</script>

<template>
  <div class="task-card" :class="{ completed: props.task.done }">

    <div class="task-header">
      <div class="name-row">
        <span
          v-if="props.task.priority"
          class="badge"
          :class="`badge--${props.task.priority}`"
        >{{ props.task.priority }}</span>

        <input
          v-if="editing"
          v-model="editName"
          class="name-input"
          @keyup.enter="saveEdit"
          @keyup.escape="cancelEdit"
          @blur="saveEdit"
          autofocus
        />
        <span
          v-else
          class="name"
          :class="{ 'name--done': props.task.done }"
          @click="startEdit"
          title="Click to edit"
        >{{ props.task.name }}</span>
      </div>

      <slot name="meta" />
    </div>

    <div class="task-actions">
      <button class="btn-complete" @click="emit('complete', props.task.id)">
        {{ props.task.done ? 'Undo' : 'Complete' }}
      </button>
      <button class="btn-delete" @click="emit('delete', props.task.id)">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 14px 16px;
  margin-bottom: 12px;
  transition: border-color 0.2s, background 0.2s;
}
.task-card.completed {
  background: var(--brand-bg);
  border-color: var(--brand-border);
  opacity: 0.85;
}
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
/* ── Name row ── */
.name-row {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.name {
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: var(--text);
  cursor: pointer;
  border-bottom: 1px dashed transparent;
}
.name:hover {
  border-bottom-color: var(--text-faint);
}
.name--done {
  text-decoration: line-through;
  color: var(--text-muted);
}
.name-input {
  font-family: 'Lato', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
  border: 1px solid var(--brand);
  border-radius: var(--radius-sm);
  padding: 2px 6px;
  outline: none;
  min-width: 0;
  flex: 1;
}

/* ── Priority badge ── */
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: var(--radius-pill);
  font-size: 11px;
  font-weight: 700;
  font-family: 'Lato', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
}
.badge--low {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #86efac;
}
.badge--medium {
  background: var(--warning-bg);
  color: var(--warning);
  border: 1px solid var(--warning-border);
}
.badge--high {
  background: var(--danger-bg);
  color: var(--danger);
  border: 1px solid var(--danger-border);
}

/* ── Slot meta ── */
.meta {
  font-size: 12px;
  color: var(--text-faint);
}
.task-actions {
  display: flex;
  gap: 8px;
}
.btn-complete {
  padding: 5px 14px;
  background: var(--brand);
  color: #fff;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  font-size: 13px;
  font-weight: 700;
}
.btn-complete:hover {
  background: var(--brand-dark);
}
.btn-delete {
  padding: 5px 14px;
  background: var(--danger-bg);
  color: var(--danger);
  border: 1px solid var(--danger-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-family: 'Lato', sans-serif;
  font-size: 13px;
  font-weight: 700;
}
.btn-delete:hover {
  background: var(--danger-border);
}
</style>
