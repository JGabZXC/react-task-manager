import { createContext, useState } from "react";

let id = 0;

// eslint-disable-next-line react-refresh/only-export-components
export const ProjectContext = createContext({
  selectedProjectId: null,
  projects: [],
  tasks: [],
  addProject: () => {},
  selectProject: () => {},
  cancelProject: () => {},
  deleteProjectHandler: () => {},
});

export default function ProjectProvider({ children }) {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: null,
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

  function selectProjectHandler(projectId) {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: projectId,
    }));
  }

  function cancelProjectHandler() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: null,
    }));
  }

  function deleteProjectHandler(projectId) {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: null,
      projects: prevState.projects.filter(
        (project) => project.id !== projectId
      ),
    }));
  }

  const projectsStateValue = {
    state: projectsState,
    addProject: addProjectHandler,
    selectProject: selectProjectHandler,
    cancelProject: cancelProjectHandler,
    deleteProjectHandler,
  };

  return (
    <ProjectContext.Provider value={projectsStateValue}>
      {children}
    </ProjectContext.Provider>
  );
}
