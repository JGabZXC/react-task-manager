import { createContext, useState } from "react";

let id = 0;

// eslint-disable-next-line react-refresh/only-export-components
export const ProjectContext = createContext({
  projects: [],
  tasks: [],
  addProject: () => {},
});

export default function ProjectProvider({ children }) {
  const [projectsState, setProjectsState] = useState({
    projects: [],
    tasks: [],
  });

  const addProjectHandler = (name) => {
    const projectId = ++id;
    const newProject = {
      id: projectId,
      name,
    };

    setProjectsState((prevState) => ({
      ...prevState,
      projects: [...prevState.projects, newProject],
    }));
  };

  const projectsStateValue = {
    projects: projectsState.projects,
    tasks: projectsState.tasks,
    addProject: addProjectHandler,
  };

  return (
    <ProjectContext.Provider value={projectsStateValue}>
      {children}
    </ProjectContext.Provider>
  );
}
