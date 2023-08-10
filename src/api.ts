import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

export async function getTasks() {
  const res = await api.get('/tasks')

  return res.data
}

export async function deleteTask(id: number) {
  const res = await api.delete(`/tasks/${id}`)

  return res.data
}

export async function createTask(task: string) {
  const res = await api.post('/tasks', { task })

  return res.data
}
