export type Priority = 'low' | 'medium' | 'high'

export type Filter = 'all' | 'done' | 'pending'

export interface Task {
  id: number
  name: string
  done: boolean
  priority: Priority
}
