import logo from "@/assets/logo-trackman.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-grey-800 text-white pl-40 py-6 flex items-center">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Trackman Logo" className="h-6 w-auto" />
      </div>

      <div className="hidden md:flex items-center gap-10 font-medium pl-20">
        <Link to="/facilities">
          <h3 className="cursor-pointer hover:text-gray-300">Facilities</h3>
        </Link>
        <h3 className="cursor-pointer text-gray-300">Locations</h3>
        <h3 className="cursor-pointer text-gray-300">Players</h3>
        <h3 className="cursor-pointer text-gray-300">Access Management</h3>
      </div>
    </nav>
  );
};

export default Navbar;
