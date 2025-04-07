import SideBar from "./components/SideBar";
import NoSelectedTask from "./components/NoSelectedProject";

import ProjectProvider from "./store/ProjectContext";

function App() {
  let content = <NoSelectedTask />;

  return (
    <ProjectProvider>
      <main className="flex">
        <SideBar />
        {content}
      </main>
    </ProjectProvider>
  );
}

export default App;
