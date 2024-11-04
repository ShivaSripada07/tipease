import { Outlet } from "react-router-dom";
import UnauthorizedError from "./UnauthorizedError";

function PrivateRoute() {
  const token = localStorage.getItem("token");
  
  if (!token || token === "") {
    return <UnauthorizedError />;
  }

  return <Outlet />;
}

export default PrivateRoute;