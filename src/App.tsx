import { Outlet } from "react-router-dom";
import Navbar from "./components/ui/NavBar";

function App() {
  return (
    <main className=" mx-auto text-center">
      <Navbar />
      <Outlet />
    </main>
  );
}

export default App;
