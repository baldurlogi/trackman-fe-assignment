import { Outlet } from "react-router-dom";
import NavBar from "./components/ui/NavBar";

function App() {
  return (
    <main className=" mx-auto text-center">
      <NavBar />
      <Outlet />
    </main>
  );
}

export default App;