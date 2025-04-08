import SideBar from "./components/SideBar";
import Content from "./components/Content";

import ProjectProvider from "./store/ProjectContext";

function App() {
  return (
    <ProjectProvider>
      <main className="flex bg-slate-100">
        <SideBar />
        <Content />
      </main>
    </ProjectProvider>
  );
}

export default App;
