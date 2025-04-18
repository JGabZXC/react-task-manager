import { useContext, useState, useRef } from "react";
import { TaskContext } from "../store/TaskContext";

import Modal from "./Modal";

export default function AddTask({ projectId }) {
  const modalRef = useRef();
  const { addTask } = useContext(TaskContext);
  const [taskName, setTaskName] = useState("");
  const [isError, setIsError] = useState(false);

  function handleInputChange(e) {
    setTaskName(e.target.value);

    if (e.target.value.length >= 30) {
      modalRef.current.open();
      setIsError(true);
      setTaskName("");
    } else {
      setIsError(false);
    }
  }

  function handleAddTask() {
    if (taskName.trim() === "") {
      setIsError(true);
      return;
    }
    addTask(projectId, taskName);
    setTaskName("");
  }

  return (
    <>
      <Modal ref={modalRef} buttonCaption="Okay">
        <h2 className="text-xl font-medium text-slate-700 my-4">
          Longer characters
        </h2>
        <p className="text-slate-500 mb-4">
          Oops... try entering character less than 30 characters.
        </p>
      </Modal>
      <div className="flex flex-col mt-2">
        <label
          htmlFor=""
          className={
            isError
              ? "text-xs text-red-500 font-normal mb-1"
              : "text-xs text-slate-500 font-normal mb-1"
          }
        >
          Add Task
        </label>
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="task name"
            className={
              isError
                ? "w-xs text-red-300 p-2 rounded-md border-2 border-red-300 focus:outline-red-700 focus:text-red-700 focus:font-bold"
                : "w-xs text-slate-500 p-2 rounded-md border-2 border-slate-300 focus:outline-slate-700 focus:text-slate-700 focus:font-bold"
            }
            value={taskName}
            onChange={handleInputChange}
          />
          <button
            className="cursor-pointer rounded-md p-2 text-slate-500 hover:bg-slate-500 hover:text-slate-50 transition-colors duration-300"
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
    </>
  );
}
