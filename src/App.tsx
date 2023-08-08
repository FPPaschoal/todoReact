import { useEffect, useState } from 'react'
import TodoTask from './components/TodoTask'
import { Itask } from './Interfaces'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const url = 'http://localhost:3000/tasks' // URL correta para o endpoint do servidor local

function App() {
  const [todoList, setTodoList] = useState<Itask[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => setTodoList(data));
    async function getTasks() {
      try {
        setLoading(true)
        const data = await fetch(url).then(res => res.json())
        setTodoList(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getTasks()
  }, [])

  const handlePost = (task: string) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
    }).then(res => res.json())
  }

  async function addTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const task = formData.get('task') as string

    if (task === '' || !task) {
      toast.error('Digite alguma Task')
    } else {
      const newTask = await handlePost(task) // Envia os dados atualizados para o servidor

      setTodoList([...todoList, newTask])

      toast.success('Task cadastrada com sucesso!')
    }
  }

  const deleteTask = async (taskId: number) => {
    // Filtra a tarefa pelo ID e atualiza o estado do todoList removendo a tarefa

    // Envia a requisição DELETE para o servidor com o ID da tarefa a ser deletada
    try {
      await fetch(`${url}/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      setTodoList(todoList.filter(task => task.id !== taskId))
      toast.success('Task Deletada!')
    } catch (error) {
      // console.log(error)
    }
  }

  // Pending UI

  return (
    <div className="h-screen pt-16">
      <div className="mx-auto mb-5 max-w-2xl rounded-[30px] bg-white px-7 pb-16 pt-10">
        <ToastContainer autoClose={2500} pauseOnHover={false}></ToastContainer>
        <header className="flex w-full items-center justify-around py-5">
          <h1 className="text-3xl">To Do List</h1>
        </header>

        <hr />

        <main className="m-auto mt-5 flex w-11/12 flex-col items-center rounded-3xl border-2 border-black/25 p-4">
          <form onSubmit={e => addTask(e)} className="flex w-11/12 items-center justify-evenly">
            <input
              type="text"
              name="task"
              className="h-11 w-10/12 rounded border-none bg-slate-200 pl-3 text-lg outline-none"
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
              todoList.map(task => <TodoTask key={task.id} task={task} deleteTask={deleteTask} />)
            ) : (
              <p className="pl-2">Nenhuma tarefa foi criada.</p>
            )}
          </ul>
        </main>
      </div>
    </div>
  )
}

export default App
