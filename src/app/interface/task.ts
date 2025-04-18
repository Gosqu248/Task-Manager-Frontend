export interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  createdAt: Date
}

export interface TaskRequest {
  title: string
  description: string
}
