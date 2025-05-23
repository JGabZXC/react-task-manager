import { useContext, useState, useRef } from "react";
import { ProjectContext } from "../store/ProjectContext";

import Modal from "./Modal";
import TaskList from "./TaskList";
import ProjectDate from "./ProjectDate";
import Description from "./Description";
import AddTask from "./AddTask";

export default function SelectedProject({ project }) {
  const { cancelProject, deleteProjectHandler, changeProjectName } =
    useContext(ProjectContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState(project.name);
  const modalRef = useRef();
  const modalDelete = useRef();

  function handleInputChange(event) {
    setEditedProjectName(event.target.value);
    if (event.target.value.length >= 30) {
      modalRef.current.open();
      setEditedProjectName(project.name);
    }
  }

  function handleDeleteProject() {
    modalDelete.current.open();
    // () => deleteProjectHandler(project.id)
  }

  function handleConfirmDelete() {
    modalDelete.current.close();
    deleteProjectHandler(project.id);
  }

  function handleEditProjectName() {
    if (!editedProjectName) return;
    if (isEditing) {
      changeProjectName(project.id, editedProjectName);
    }
    setIsEditing((prev) => !prev);
  }

  function handleCancelProject() {
    cancelProject();
  }

  return (
    <>
      <Modal ref={modalRef} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-slate-700 my-4">
          Longer characters
        </h2>
        <p className="text-slate-600 mb-4">
          Oops... try entering character less than 30 characters.
        </p>
      </Modal>
      <Modal
        ref={modalDelete}
        buttonCaption="Yes"
        onConfirm={handleConfirmDelete}
        danger={true}
      >
        <h2 className="text-xl font-bold text-slate-700 my-4">Are you sure?</h2>
        <p className="text-slate-600 mb-4">
          This action cannot be undone. Do you want to proceed?
        </p>
      </Modal>
      <div className="flex justify-between items-center border-b-2 border-slate-950 pb-2">
        {isEditing ? (
          <input
            className="w-xs text-slate-500 p-2 rounded-md border-2 border-slate-300 focus:outline-slate-700 focus:text-slate-700 focus:font-bold"
            value={editedProjectName}
            onChange={handleInputChange}
          />
        ) : (
          <h1 className="text-xl font-bold text-slate-500">
            {editedProjectName}
          </h1>
        )}
        <div className="flex gap-4">
          <button
            className="cursor-pointer p-2 rounded-md text-slate-500 border-2 border-slate-500 hover:bg-slate-900 hover:border-slate-900 hover:text-slate-50 transition-color duration-300"
            onClick={handleEditProjectName}
          >
            {isEditing ? "Save" : "Edit Project Name"}
          </button>
          <button
            className="cursor-pointer p-2 rounded-md text-amber-300 border-2 border-amber-300 hover:bg-amber-300 hover:text-slate-50 transition-color duration-300"
            onClick={handleCancelProject}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>

          <button
            className="cursor-pointer p-2 rounded-md text-red-300 border-2 border-red-300 hover:bg-red-300 hover:text-slate-50 transition-color duration-300"
            onClick={handleDeleteProject}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
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
      <div className="flex flex-col my-4">
        <ProjectDate project={project} />
        <Description project={project} />
      </div>
      <div>
        <h2 className="text-md font-medium mt-4 text-slate-500">Tasks</h2>
        <AddTask projectId={project.id} />
        <TaskList projectId={project.id} />
      </div>
    </>
  );
}
