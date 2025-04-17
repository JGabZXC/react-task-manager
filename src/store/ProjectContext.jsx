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
  changeProjectName: () => {},
  addDate: () => {},
  addDescription: () => {},
  addTask: () => {},
});

export default function ProjectProvider({ children }) {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: null,
    projects: [],
    tasks: [],
  });

  // PROJECT HANDLER
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

  function changeProjectName(projectId, newName) {
    const project = projectsState.projects.find(
      (project) => project.id === projectId
    );

    project.name = newName;
    setProjectsState((prevState) => ({
      ...prevState,
      projects: prevState.projects.map((project) => {
        if (project.id === projectId) return { ...project, name: newName };
        return project;
      }),
    }));
  }

  // DATE HANDLER
  function addDateHandler(projectId, date) {
    setProjectsState((prevState) => {
      const project = prevState.projects.find(
        (project) => project.id === projectId
      );
      project.dueDate = date;
      return {
        ...prevState,
        projects: prevState.projects.map((project) => {
          if (project.id === projectId) return { ...project, dueDate: date };
          return project;
        }),
      };
    });
  }

  // DESCRIPTION HANDLER
  function addDescriptionHandler(projectId, description) {
    console.log("test");
    setProjectsState((prevState) => {
      const project = prevState.projects.find(
        (project) => project.id === projectId
      );

      project.description = description;
      return {
        ...prevState,
        projects: prevState.projects.map((project) => {
          if (project.id === projectId) return { ...project, description };
          return project;
        }),
      };
    });
  }

  // TASK HANDLER
  function addTaskHandler(projectId, taskName) {
    const taskId = ++id;
    const newTask = {
      id: taskId,
      parentId: projectId,
      name: taskName,
    };

    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  const projectsStateValue = {
    state: projectsState,
    addProject: addProjectHandler,
    selectProject: selectProjectHandler,
    cancelProject: cancelProjectHandler,
    deleteProjectHandler,
    changeProjectName,
    addDate: addDateHandler,
    addDescription: addDescriptionHandler,
    addTask: addTaskHandler,
  };

  return (
    <ProjectContext.Provider value={projectsStateValue}>
      {children}
    </ProjectContext.Provider>
  );
}
