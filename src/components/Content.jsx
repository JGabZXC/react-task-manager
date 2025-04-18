import { useContext } from "react";
import { ProjectContext } from "../store/ProjectContext";
import { TaskContext } from "../store/TaskContext";

import NoSelectedTask from "./NoSelectedProject";
import SelectedProject from "./SelectedProject";
import SelectedTask from "./SelectedTask";

export default function Content() {
  const {
    state: { selectedProjectId, projects },
  } = useContext(ProjectContext);
  const {
    tasksState: { tasks, selectedTaskId },
  } = useContext(TaskContext);

  const filteredTasks = tasks.filter(
    (task) => task.parentId === selectedProjectId
  );

  // console.log(filteredTasks);

  let content = <NoSelectedTask />;
  if (selectedProjectId) {
    const selectedProject = projects.find(
      (project) => project.id === selectedProjectId
    );
    content = (
      <SelectedProject key={selectedProjectId} project={selectedProject} />
    );
  }

  return (
    <>
      <section className="flex-1 h-screen max-w-[50rem] p-4">{content}</section>
      {selectedTaskId && (
        <SelectedTask
          key={selectedTaskId}
          tasks={filteredTasks}
          taskId={selectedTaskId}
        />
      )}
    </>
  );
}
