import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App";
import FacilitiesListPage from "@/pages/FacilitiesListPage";
import FacilityCreatePage from "@/pages/FacilityCreatePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/facilities" replace /> },
      { path: "/facilities", element: <FacilitiesListPage /> },
      { path: "/facilities/new", element: <FacilityCreatePage /> },
    ],
  },
]);

export default router;
