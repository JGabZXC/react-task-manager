import { useContext, useState } from "react";
import { ProjectContext } from "../store/ProjectContext";
export default function Description({ project }) {
  ("<Description/> rendered");
  const { addDescription } = useContext(ProjectContext);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(project?.description || "");

  function handleContentChange() {
    setIsEditing((prev) => !prev);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSaveDescription() {
    if (!description) return;
    addDescription(project.id, description);
    setIsEditing(false); // Close the editing mode after saving
  }

  function handleCancelDescription() {
    setDescription(project?.description || ""); // Reset to original description if needed
    setIsEditing(false);
  }

  let content = (
    <button
      className="w-xs mb-2 cursor-pointer py-2 px-4 rounded-md border-2 transition-colors duration-300 text-slate-500 border-slate-300 hover:bg-slate-500 hover:border-slate-500 hover:text-slate-100"
      onClick={handleContentChange}
    >
      Add Description
    </button>
  );

  if (isEditing) {
    content = (
      <div className="flex items-center justify-between">
        <textarea
          className="block w-xs p-2 border rounded-lg text-md text-slate-500 border-slate-500 bg-gray-50 focus:outline-slate-700 focus:font-bold resize-none"
          value={description}
          onChange={handleDescriptionChange}
        />
        <div>
          <button
            className="cursor-pointer p-2 rounded-md text-slate-500 hover:bg-green-300 hover:text-slate-50 transition-colors duration-300"
            onClick={handleSaveDescription}
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
                d="m4.5 12.75 6 6 9-13.5"
              />
            </svg>
          </button>
          <button
            className="cursor-pointer p-2 rounded-md text-slate-500 hover:bg-red-300 hover:text-slate-50 transition-colors duration-300"
            onClick={handleCancelDescription}
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  } else if (description) {
    content = (
      <div className="flex justify-between">
        <p className="text-slate-500 font-medium whitespace-pre-wrap">
          {description}
        </p>
        <div>
          <button
            className="cursor-pointer p-2 rounded-md text-slate-500 hover:bg-slate-900 hover:text-slate-50 transition-color duration-300"
            onClick={handleContentChange}
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
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }
  return <>{content}</>;
}
