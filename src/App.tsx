import { Outlet } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import SkipLink from "./components/ui/SkipLink";

function App() {
  return (
    <>
      <SkipLink />
      <NavBar />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto text-left focus:outline-none"
      >
        <Outlet />
      </main>
    </>
  );
}

export default App;