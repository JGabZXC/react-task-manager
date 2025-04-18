import { useContext, useState, useRef } from "react";
import { ProjectContext } from "../store/ProjectContext";

import ProjectList from "./ProjectList";
import Button from "./Button";
import Modal from "./Modal";

export default function SideBar() {
  const [inputValue, setInputValue] = useState("");
  const { addProject } = useContext(ProjectContext);
  const modalRef = useRef();

  function handleInputChange(event) {
    setInputValue(event.target.value);
    if (inputValue.length >= 30) {
      modalRef.current.open();
      setInputValue("");
    }
  }

  function handleAddProject() {
    inputValue.trim();
    if (!inputValue) return;
    addProject(inputValue);
    setInputValue("");
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
      <aside className="min-w-[25rem] bg-slate-800 h-screen p-4 text-slate-500">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            className="py-2 px-2 rounded-md border-2 border-slate-500"
            placeholder="New project..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button onClick={handleAddProject} disabled={inputValue.length >= 30}>
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Button>
        </div>
        <div>
          <h1 className="text-lg text-slate-400 font-semibold mb-2">
            Project List
          </h1>
          <ProjectList />
        </div>
      </aside>
    </>
  );
}
