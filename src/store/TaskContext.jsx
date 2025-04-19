import { createContext, useState } from "react";

export const TaskContext = createContext({
  selectedTaskId: null,
  tasks: [],
  subTasks: [],
  deleteTasks: () => {},
  addTask: () => {},
  setSelectedTaskId: () => {},
  deleteSelectedTask: () => {},
  setSelectedTaskIdAsDone: () => {},
  addDescription: () => {},
  addSubTask: () => {},
  subTaskIsDone: () => {},
});

export default function TaskProvider({ children }) {
  const [tasksState, setTasksState] = useState({
    tasks: [],
    subTasks: [],
    selectedTaskId: null,
  });

  function addTaskHandler(projectId, taskName) {
    const taskId = Date.now();
    const newTask = {
      id: taskId,
      parentId: projectId,
      name: taskName,
      isDone: false,
      description: "",
    };

    setTasksState((prevState) => {
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function setSelectedTaskIdAsDone(taskId) {
    setTasksState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.map((task) => {
          if (task.id === taskId) return { ...task, isDone: !task.isDone };
          return task;
        }),
      };
    });
  }

  function deleteTasks(parentId) {
    setTasksState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.parentId !== parentId),
      };
    });
  }

  function setSelectedTaskId(taskId) {
    setTasksState((prevState) => ({
      ...prevState,
      selectedTaskId: taskId,
    }));
  }

  function deleteSelectedTask(taskId) {
    setTasksState((prevState) => {
      return {
        ...prevState,
        selectedTaskId: null,
        tasks: prevState.tasks.filter((task) => task.id !== taskId),
      };
    });
  }

  // DESCRIPTION
  function addDescription(taskId, description) {
    setTasksState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.map((task) => {
        if (task.id === taskId) return { ...task, description: description };
        return task;
      }),
    }));
  }

  // SUB TASKS
  function addSubTask(taskId, subTaskname) {
    const subTaskId = Date.now();
    const newSubTask = {
      id: subTaskId,
      parentId: taskId,
      name: subTaskname,
      isDone: false,
    };

    setTasksState((prevState) => ({
      ...prevState,
      subTasks: [...prevState.subTasks, newSubTask],
    }));
  }

  function subTaskIsDone(subTaskId) {
    setTasksState((prevState) => ({
      ...prevState,
      subTasks: prevState.subTasks.map((subTask) => {
        if (subTask.id === subTaskId)
          return { ...subTask, isDone: !subTask.isDone };
        return subTask;
      }),
    }));
  }

  const tasksStateValue = {
    tasksState: tasksState,
    deleteTasks,
    addTask: addTaskHandler,
    setSelectedTaskId,
    deleteSelectedTask,
    setSelectedTaskIdAsDone,
    addDescription,
    addSubTask,
    subTaskIsDone,
  };

  return (
    <TaskContext.Provider value={tasksStateValue}>
      {children}
    </TaskContext.Provider>
  );
}
