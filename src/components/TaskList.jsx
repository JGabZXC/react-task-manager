import { useContext } from "react";
import { ProjectContext } from "../store/ProjectContext";

export default function TaskList({ projectId }) {
  const {
    state: { tasks },
  } = useContext(ProjectContext);

  const filteredTasks = tasks.filter((task) => task.parentId === projectId);
  const sortedTasks = [...filteredTasks].sort((a, b) => b.id - a.id);
  console.log(sortedTasks);

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
                className="w-xs break-words text-slate-500 font-normal mb-2"
              >
                {task.name}
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
