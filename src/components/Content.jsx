import { useContext } from "react";
import { ProjectContext } from "../store/ProjectContext";

import NoSelectedTask from "./NoSelectedProject";
import SelectedProject from "./SelectedProject";

export default function Content() {
  const {
    state: { selectedProjectId, projects },
  } = useContext(ProjectContext);

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
    <section className="flex-1 h-screen max-w-[50rem] p-4">{content}</section>
  );
}
