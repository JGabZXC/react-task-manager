import { useContext, useState } from "react";
import { ProjectContext } from "../store/ProjectContext";
export default function Description({ project }) {
  console.log("<Description/> rendered");
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
      className="mb-2 cursor-pointer py-2 px-4 rounded-md border-2 transition-colors duration-300 border-slate-300 hover:bg-slate-500 hover:border-slate-500 hover:text-slate-100"
      onClick={handleContentChange}
    >
      Add Description
    </button>
  );

  if (isEditing) {
    content = (
      <div className="flex items-center justify-between">
        <textarea
          class="block w-1/2 p-2 border rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 text-gray-900 border-gray-300 bg-gray-50 resize-none"
          value={description}
          onChange={handleDescriptionChange}
        />
        <div>
          <button
            className="ml-2 cursor-pointer py-2 px-4 rounded-md border-2 transition-colors duration-300 border-green-500 hover:bg-green-500 hover:border-green-500 hover:text-slate-100"
            onClick={handleSaveDescription}
          >
            Save
          </button>
          <button
            className="ml-2 cursor-pointer py-2 px-4 rounded-md border-2 transition-colors duration-300 border-red-500 hover:bg-red-500 hover:border-red-500 hover:text-slate-100"
            onClick={handleCancelDescription}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  } else if (description) {
    content = (
      <div className="flex justify-between">
        <p className="text-stone-700 font-medium whitespace-pre-wrap">
          {description}
        </p>
        <div>
          <button
            className=" ml-2 cursor-pointer py-2 px-4 rounded-md border-2 transition-colors duration-300 border-blue-500 hover:bg-blue-500 hover:border-blue-500 hover:text-slate-100"
            onClick={handleContentChange}
          >
            Edit Description
          </button>
        </div>
      </div>
    );
  }
  return <>{content}</>;
}
