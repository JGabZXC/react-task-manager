import { useContext, useState } from "react";

import { TaskContext } from "../store/TaskContext";

export default function TaskDescription({ selectedTask }) {
  const { addDescription } = useContext(TaskContext);

  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(
    selectedTask.description || ""
  );

  let content;

  function handleAddDescription() {
    setIsEditing((prev) => !prev);
  }

  function handleSaveDescription() {
    addDescription(selectedTask.id, description);
    setIsEditing((prev) => !prev);
  }

  if (!description) {
    content = (
      <button
        className="cursor-pointer hover:text-slate-200 transition-colors duration-300"
        type="button"
        onClick={handleAddDescription}
      >
        Add description
      </button>
    );
  }

  if (isEditing) {
    content = (
      <div className="flex flex-col gap-2">
        <textarea
          className="p-2 bg-slate-700 text-slate-200 rounded-md"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="cursor-pointer p-2 rounded-md text-slate-200 hover:bg-slate-500 transition-colors duration-300"
          type="button"
          onClick={handleSaveDescription}
        >
          Save description
        </button>
      </div>
    );
  } else if (description) {
    content = <p className="whitespace-pre-wrap">{description}</p>;
  }

  return <div>{content}</div>;
}
