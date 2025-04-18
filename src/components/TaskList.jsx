import { useContext } from "react";
import { TaskContext } from "../store/TaskContext";

export default function TaskList({ projectId }) {
  const {
    tasksState: { tasks },
    setSelectedTaskId,
  } = useContext(TaskContext);

  const filteredTasks = tasks.filter((task) => task.parentId === projectId);
  const sortedTasks = [...filteredTasks].sort((a, b) => b.id - a.id);

  function handleSelectTask(taskId) {
    setSelectedTaskId(taskId);
  }

  return (
    <>
      {filteredTasks.length === 0 ? (
        <p className="text-xs text-slate-500 font-bold">
          No task found, try creating one 🙂
        </p>
      ) : (
        <ul className="list-disc mt-2 pl-5">
          {sortedTasks &&
            sortedTasks.map((task) => (
              <li
                key={task.id}
                className="cursor-pointer w-xs break-words text-slate-500 font-normal mb-2"
                onClick={() => handleSelectTask(task.id)}
              >
                {task.isDone ? (
                  <span className="text-slate-400 line-through">
                    {task.name}
                  </span>
                ) : (
                  task.name
                )}
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
