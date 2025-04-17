import { useContext, useState } from "react";
import { ProjectContext } from "../store/ProjectContext";

export default function AddTask({ projectId }) {
  const { addTask } = useContext(ProjectContext);
  const [taskName, setTaskName] = useState("");

  function handleInputChange(e) {
    setTaskName(e.target.value);
  }

  function handleAddTask() {
    if (taskName.trim() === "") return;
    addTask(projectId, taskName);
    setTaskName("");
  }

  return (
    <div className="flex flex-col mt-2">
      <label htmlFor="" className="text-xs text-stone-700 font-bold mb-1">
        Add Task
      </label>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="task name"
          className="w-xs p-2 border-2 border-slate-300 rounded-md"
          value={taskName}
          onChange={handleInputChange}
        />
        <button
          className="cursor-pointer rounded-md p-2 hover:bg-slate-500 hover:text-slate-50 transition-colors duration-300"
          onClick={handleAddTask}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
