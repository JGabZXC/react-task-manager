import { useContext } from "react";
import { TaskContext } from "../store/TaskContext";
import AddSubTask from "./AddSubTask";

export default function SubTask({ selectedTask }) {
  const {
    tasksState: { subTasks },
    subTaskIsDone,
  } = useContext(TaskContext);

  const selectedSubTask = subTasks.filter(
    (subTask) => subTask.parentId === selectedTask.id
  );

  function handleSubTaskIsDone(subTaskId) {
    subTaskIsDone(subTaskId);
  }

  return (
    <>
      <AddSubTask selectedTask={selectedTask} />
      <h2 className="text-lg text-slate-300 font-medium mt-2">Sub task list</h2>
      <ul className="text-slate-200">
        {selectedSubTask.length === 0 && (
          <li className="text-slate-500">No sub tasks added yet.</li>
        )}
        {selectedSubTask.length > 0 &&
          selectedSubTask.map((subTask) => (
            <li
              key={subTask.id}
              className="flex gap-2 py-1 px-2 items-center"
              onClick={() => handleSubTaskIsDone(subTask.id)}
            >
              {subTask.isDone ? <s>{subTask.name}</s> : subTask.name}
            </li>
          ))}
      </ul>
    </>
  );
}
