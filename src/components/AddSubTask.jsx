import { useState, useContext, useRef } from "react";
import { TaskContext } from "../store/TaskContext";

import Modal from "./Modal";

export default function AddSubTask({ selectedTask }) {
  const { addSubTask } = useContext(TaskContext);
  const [subTaskName, setSubTaskName] = useState("");
  const modalRef = useRef();

  function handleSubTaskNameChange(e) {
    setSubTaskName(e.target.value);

    if (e.target.value.length >= 30) {
      modalRef.current.open();
      setSubTaskName("");
    }
  }

  function handleAddSubTask() {
    if (!subTaskName) return;
    addSubTask(selectedTask.id, subTaskName);
    setSubTaskName("");
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
    </>
  );
}
