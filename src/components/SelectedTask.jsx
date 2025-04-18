import { useContext, useRef } from "react";
import { TaskContext } from "../store/TaskContext";

import Modal from "./Modal";

export default function SelectedTask({ tasks, taskId }) {
  const modalRef = useRef();
  const { setSelectedTaskId, deleteSelectedTask, setSelectedTaskIdAsDone } =
    useContext(TaskContext);

  const selectedTask = tasks.find((task) => task.id === taskId);

  function handleCloseTask() {
    setSelectedTaskId(null);
  }

  function handleDeleteTask() {
    modalRef.current.open();
  }

  function handleConfirmDeleteTask() {
    modalRef.current.close();
    deleteSelectedTask(selectedTask.id);
  }

  function handleMarkAsDone() {
    setSelectedTaskIdAsDone(selectedTask.id);
  }

  return (
    <>
      <Modal
        ref={modalRef}
        buttonCaption="Confirm delete"
        onConfirm={handleConfirmDeleteTask}
        danger={true}
      >
        <h2 className="text-slate-500 font-bold text-lg mb-4">
          Are you sure you want to delete this task?
        </h2>
        <p className="text-slate-500">
          "{selectedTask.name}" will be deleted permanently.
        </p>
        <p className="text-xs text-red-500">This action cannot be undone.</p>
      </Modal>
      <div className="flex-1 h-screen max-w-[45rem] p-4 bg-slate-800 text-slate-500">
        <div className="flex justify-between items-center mb-4">
          <h2 className="textl-xl text-slate-400 font-bold">
            {selectedTask.name}
          </h2>
          <div className="flex items-center">
            <button
              className="cursor-pointer p-2 text-slate-500 hover:text-slate-50 transition-color duration-300"
              onClick={handleMarkAsDone}
            >
              {selectedTask.isDone ? "Mark as undone" : "Mark as done"}
            </button>
            <button
              className="cursor-pointer p-2 rounded-md text-amber-300 hover:bg-amber-300 hover:text-slate-50 transition-color duration-300"
              onClick={handleCloseTask}
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
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <button
              className="cursor-pointer p-2 rounded-md text-red-300  hover:bg-red-300 hover:text-slate-50 transition-color duration-300"
              onClick={handleDeleteTask}
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
        <p>Description</p>
        <hr className="text-slate-500" />
        <p>Sub task list</p>
        <ul>
          <li></li>
        </ul>
      </div>
    </>
  );
}
