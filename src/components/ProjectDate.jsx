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
      className="mb-1 cursor-pointer py-2 px-4 rounded-md border-2 transition-colors duration-300 border-slate-300 hover:bg-slate-500 hover:border-slate-500 hover:text-slate-100"
      onClick={handleContentChange}
    >
      Add date
    </button>
  );

  if (isEditing) {
    content = (
      <div>
        <input
          type="date"
          className="mb-1 py-2 px-4 rounded-md border-2 border-slate-300"
          value={date}
          onChange={handleDateChange}
        />
        <button
          className="ml-2 cursor-pointer py-2 px-4 rounded-md border-2 transition-colors duration-300 border-green-500 hover:bg-green-500 hover:border-green-500 hover:text-slate-100"
          onClick={handleSaveDate}
        >
          Save
        </button>
        <button
          className="ml-2 cursor-pointer py-2 px-4 rounded-md border-2 transition-colors duration-300 border-red-500 hover:bg-red-500 hover:border-red-500 hover:text-slate-100"
          onClick={handleCancelDate}
        >
          Cancel
        </button>
      </div>
    );
  } else if (date) {
    content = (
      <div>
        <span>Date: {date}</span>
        <button
          className="ml-2 cursor-pointer py-2 px-4 rounded-md border-2 transition-colors duration-300 border-blue-500 hover:bg-blue-500 hover:border-blue-500 hover:text-slate-100"
          onClick={handleContentChange}
        >
          Edit
        </button>
      </div>
    );
  }

  return <>{content}</>;
}
