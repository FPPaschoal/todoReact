import { Itask } from '../Interfaces'

interface TaskProps {
  task: Itask
  /** Event to delete the given task by ID */
  onDelete(taskId: number): void
}

/**
 * Render the task
 * @returns JSX.Element
 */
function TodoTask({ task, onDelete }: TaskProps) {
  return (
    <li className="m-2 flex h-10 items-center justify-between rounded-lg bg-black/10 pl-4 text-base even:bg-black/5">
      {task.task}
      <input
        type="button"
        value={'🗑️'}
        onClick={() => onDelete(task.id)}
        className="mr-4 cursor-pointer rounded-3xl border-none bg-red-600 px-4 py-2 outline-none"
      ></input>
    </li>
  )
}
export default TodoTask
