import logo from "@/assets/logo-trackman.png";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="w-full bg-grey-800 text-white px-4 sm:px-6 lg:px-10 py-6 flex items-center">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Trackman Logo" className="h-6 w-auto" />
      </div>
      <div className="hidden md:flex items-center gap-10 font-medium pl-20">
        <Link
          className="hover:text-grey-200 focus-visible:ring-2 focus-visible:ring-orange-400 rounded"
          to="/facilities"
        >
          <h3>Facilities</h3>
        </Link>
        <h3 className="text-grey-200">Locations</h3>
        <h3 className="text-grey-200">Players</h3>
        <h3 className="text-grey-200">Access Management</h3>
      </div>
    </nav>
  );
}
