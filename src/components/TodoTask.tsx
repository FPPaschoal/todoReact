import { Itask } from '../Interfaces'

interface TaskPorps {
  task: Itask
  deleteTask(DeleteTaskById: number): void
}

function TodoTask({ task, deleteTask }: TaskPorps) {
  return (
    <li className="m-2 flex h-10 items-center justify-between rounded-lg bg-black/10 pl-4 text-base even:bg-black/5">
      {task.task}
      <input
        type="button"
        value={'🗑️'}
        onClick={() => deleteTask(task.id)}
        className="mr-4 cursor-pointer rounded-3xl border-none bg-red-600 px-4 py-2 outline-none"
      ></input>
    </li>
  )
}
export default TodoTask
