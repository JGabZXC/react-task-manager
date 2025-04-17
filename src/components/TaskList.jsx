import { useContext } from "react";
import { ProjectContext } from "../store/ProjectContext";

export default function TaskList({ projectId }) {
  const {
    state: { tasks },
  } = useContext(ProjectContext);

  const filteredTasks = tasks.filter((task) => task.parentId === projectId);

  console.log(filteredTasks);

  return (
    <ul className="list-disc pl-5 mt-2">
      {filteredTasks &&
        filteredTasks.map((task) => (
          <li key={task.id} className="text-stone-600 mb-2">
            {task.name}
          </li>
        ))}
    </ul>
  );
}
