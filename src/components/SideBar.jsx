import { useContext, useState } from "react";

import ProjectList from "./ProjectList";
import { ProjectContext } from "../store/ProjectContext";

export default function SideBar() {
  const [inputValue, setInputValue] = useState("");
  const { addProject } = useContext(ProjectContext);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleAddProject() {
    addProject(inputValue);
    setInputValue("");
  }

  return (
    <aside className="min-w-[25rem] bg-slate-800 h-screen p-4 text-slate-50">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="py-2 px-2 rounded-md border-2 border-slate-500"
          placeholder="New project..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="cursor-pointer py-2 px-4 rounded-md border-2 border-slate-500 hover:bg-slate-500 transition-colors duration-300"
          onClick={handleAddProject}
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <div>
        <h1 className="text-2xl font-semibold mb-2">Project List</h1>
        <ProjectList />
      </div>
    </aside>
  );
}
