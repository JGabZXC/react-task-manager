import { useContext } from "react";
import { TaskContext } from "../store/TaskContext";

export default function TaskList({ projectId }) {
  const {
    tasksState: { tasks, selectedTaskId },
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
        <ul className="mt-2">
          {sortedTasks &&
            sortedTasks.map((task) => {
              let classes = "";
              task.id, selectedTaskId;
              if (task.id === selectedTaskId)
                classes =
                  " cursor-pointer w-full break-words text-slate-200 font-normal mb-2 bg-slate-900 p-2 hover:bg-slate-700 hover:text-slate-50 rounded-md transition-colors duration-300";
              else
                classes =
                  "cursor-pointer w-full break-words text-slate-500 font-normal mb-2 odd:bg-slate-300 p-2 hover:bg-slate-700 hover:text-slate-50 rounded-md transition-colors duration-300";
              return (
                <li
                  key={task.id}
                  className={classes}
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
              );
            })}
        </ul>
      )}
    </>
  );
}
