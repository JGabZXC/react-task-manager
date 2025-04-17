import { useContext } from "react";
import { ProjectContext } from "../store/ProjectContext";

export default function ProjectList() {
  const {
    state: { selectedProjectId, projects },
    selectProject,
  } = useContext(ProjectContext);

  function handleSelectProject(projectId) {
    selectProject(projectId);
  }

  return (
    <ul>
      {projects.length === 0 && (
        <li className="text-xs text-slate-500 font-bold">
          No projects found. Try creating one
        </li>
      )}
      {projects.length > 0 &&
        projects.map((project) => {
          let cssClasses =
            "cursor-pointer px-2 py-1 hover:bg-slate-500 hover:text-slate-50 transition-colors duration-300 w-full text-left rounded-md mb-2";
          if (selectedProjectId === project.id)
            cssClasses += " bg-slate-700 font-medium";
          else cssClasses += " text-slate-500";
          return (
            <li key={project.id}>
              <button
                onClick={() => handleSelectProject(project.id)}
                className={cssClasses}
              >
                {project.name}
              </button>
            </li>
          );
        })}
    </ul>
  );
}
