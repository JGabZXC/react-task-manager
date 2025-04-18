import { useContext, useState } from "react";
import { ProjectContext } from "../store/ProjectContext";

export default function ProjectDate({ project }) {
  console.log("<ProjectDate/> rendered");
  const { addDate } = useContext(ProjectContext);

  const [date, setDate] = useState(project?.dueDate || "");
  const [isEditing, setIsEditing] = useState(false);

  function handleContentChange() {
    setIsEditing((prev) => !prev);
  }

  function handleDateChange(event) {
    setDate(event.target.value);
  }

  function handleCancelDate() {
    setIsEditing(false);
    setDate(project?.dueDate || ""); // Reset to original date if needed
  }

  function handleSaveDate() {
    if (!date) return;
    addDate(project.id, date); // Assuming addDate takes project ID and date
    setIsEditing(false);
  }

  let content = (
    <button
      className="w-xs mb-2 cursor-pointer py-2 px-4 rounded-md border-2 text-slate-500 transition-colors duration-300 border-slate-300 hover:bg-slate-500 hover:border-slate-500 hover:text-slate-100"
      onClick={handleContentChange}
    >
      <div className="flex items-center justify-center gap-2">
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
        <p>Date</p>
      </div>
    </button>
  );

  if (isEditing) {
    content = (
      <div className="mb-2 flex items-center justify-between">
        <input
          type="date"
          className="w-xs py-2 px-4 rounded-md border-2 border-slate-300 text-slate-500"
          value={date}
          onChange={handleDateChange}
        />
        <div>
          <button
            className="cursor-pointer p-2 rounded-md text-slate-500 hover:bg-green-300 hover:text-slate-50 transition-colors duration-300"
            onClick={handleSaveDate}
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
            onClick={handleCancelDate}
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
  } else if (date) {
    content = (
      <div className="mb-2 flex items-center justify-between">
        <span className="text-slate-500 font-bold">Date: {date}</span>
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
    );
  }

  return <>{content}</>;
}
