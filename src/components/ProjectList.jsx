import { useContext } from "react";
import { ProjectContext } from "../store/ProjectContext";

export default function ProjectList() {
  const { projects } = useContext(ProjectContext);
  return (
    <ul>
      {projects.length === 0 && <li>No projects found</li>}
      {projects.length > 0 &&
        projects.map((project, index) => {
          return <li key={index}>{project.name}</li>;
        })}
    </ul>
  );
}
