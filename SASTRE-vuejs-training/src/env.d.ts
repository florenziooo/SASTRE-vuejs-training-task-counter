/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module '@/stores/userStore' {
  import type { Ref, ComputedRef } from 'vue'
  export const useUserStore: () => {
    currentUser: Ref<string>
    isLoggedIn: ComputedRef<boolean>
    login: (name: string) => void
    logout: () => void
  }
}

declare module '@/stores/taskStore1' {
  import type { Ref, ComputedRef } from 'vue'
  interface Task { id: number; name: string; done: boolean }
  export const useTaskStore: () => {
    tasks: Ref<Task[]>
    totalCount: ComputedRef<number>
    doneCount: ComputedRef<number>
    pendingCount: ComputedRef<number>
    addTask: (name: string) => void
    toggleTask: (id: number) => void
    removeTask: (id: number) => void
  }
}
