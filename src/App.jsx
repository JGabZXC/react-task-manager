import SideBar from "./components/SideBar";
import Content from "./components/Content";

import ProjectProvider from "./store/ProjectContext";
import TaskProvider from "./store/TaskContext";

function App() {
  return (
    <TaskProvider>
      <ProjectProvider>
        <main className="flex bg-slate-100">
          <SideBar />
          <Content />
        </main>
      </ProjectProvider>
    </TaskProvider>
  );
}

export default App;
