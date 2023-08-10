import { useEffect, useRef, useState } from 'react'
import TodoTask from '../components/TodoTask'
import { Itask } from '../Interfaces'
import { toast } from 'react-toastify'
import { getTasks, createTask, deleteTask } from '../api'

function Root() {
  const [todoList, setTodoList] = useState<Itask[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => setTodoList(data));
    async function fetchTasks() {
      // Pending UI
      try {
        setLoading(true)
        const data = await getTasks()
        setTodoList(data)
      } catch (error) {
        toast.error('Houve um erro ao buscar as Tasks!')
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const task = formData.get('task') as string

    if (task.trim() === '' || !task) {
      toast.error('Digite alguma Task')
      return
    }

    try {
      setLoading(true)

      form.reset()
      inputRef.current?.focus()

      const newTask = await createTask(task) // Envia os dados atualizados para o servidor
      setTodoList([...todoList, newTask])

      toast.success('Task cadastrada com sucesso!')
    } catch (error) {
      toast.error('Houve um erro ao adicionar a task!')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (taskId: number) => {
    try {
      setLoading(true)
      // Envia a requisição DELETE para o servidor com o ID da tarefa a ser deletada
      await deleteTask(taskId)

      // Filtra a tarefa pelo ID e atualiza o estado do todoList removendo a tarefa
      setTodoList(todoList.filter(task => task.id !== taskId))
      toast.success('Task Deletada!')
    } catch (error) {
      toast.error('Houve um erro ao deletar a Task!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="m-auto mt-5 flex w-11/12 flex-col items-center rounded-3xl border-2 border-black/25 p-4">
      <form onSubmit={e => handleSubmit(e)} className="flex w-11/12 items-center justify-evenly">
        <input
          ref={inputRef}
          type="text"
          name="task"
          className="h-11 w-10/12 rounded border-none bg-slate-200 pl-3 text-lg"
        />
        <button
          type="submit"
          className="rounded-3xl border-none bg-red-500 px-6 py-3 text-base text-white outline-none"
        >
          Adicionar
        </button>
      </form>

      <ul className="mt-3 w-11/12 max-w-4xl list-none">
        {loading ? (
          <p>Carregando...</p>
        ) : todoList.length ? (
          todoList.map(task => <TodoTask key={task.id} task={task} onDelete={handleDelete} />)
        ) : (
          <p className="pl-2">Nenhuma tarefa foi criada.</p>
        )}
      </ul>
    </main>
  )
}

export default Root
