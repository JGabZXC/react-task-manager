import { useState, useContext } from "react";
import { TaskContext } from "../store/TaskContext";

export default function AddSubTask({ selectedTask }) {
  const { addSubTask } = useContext(TaskContext);
  const [subTaskName, setSubTaskName] = useState("");

  function handleSubTaskNameChange(e) {
    setSubTaskName(e.target.value);
  }

  function handleAddSubTask() {
    if (!subTaskName) return;
    addSubTask(selectedTask.id, subTaskName);
    setSubTaskName("");
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <input
          type="text"
          className="p-2 bg-slate-700 text-slate-200 rounded-md"
          placeholder="Sub task name"
          value={subTaskName}
          onChange={handleSubTaskNameChange}
        />
        <button
          className="cursor-pointer p-2 rounded-md text-slate-300 hover:bg-slate-500 transition-colors duration-300"
          type="button"
          onClick={handleAddSubTask}
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
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
