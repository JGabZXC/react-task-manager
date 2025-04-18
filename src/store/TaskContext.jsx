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
});

export default function TaskProvider({ children }) {
  const [tasksState, setTasksState] = useState({
    tasks: [],
    selectedTaskId: null,
  });

  function addTaskHandler(projectId, taskName) {
    console.log(tasksState);
    const taskId = Date.now();
    const newTask = {
      id: taskId,
      parentId: projectId,
      name: taskName,
      isDone: false,
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

  const tasksStateValue = {
    tasksState: tasksState,
    deleteTasks,
    addTask: addTaskHandler,
    setSelectedTaskId,
    deleteSelectedTask,
    setSelectedTaskIdAsDone,
  };

  return (
    <TaskContext.Provider value={tasksStateValue}>
      {children}
    </TaskContext.Provider>
  );
}
