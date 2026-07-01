import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Task {
  id: number
  name: string
  done: boolean
  dueDate: string
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([
    { id: 1, name: 'Learn Vue Router',  done: true,  dueDate: '2026-07-01' },
    { id: 2, name: 'Build a SPA',       done: false, dueDate: '2026-07-05' },
    { id: 3, name: 'Add Pinia store',   done: false, dueDate: '2026-07-08' },
  ])

  return { tasks }
})
