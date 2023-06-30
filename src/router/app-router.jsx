import { Route, Routes } from "react-router-dom";
import { Sales, Dashboard, Login, Logout } from "../components";
import { ProtectedRoute } from "./protected-route";

export const AppRouter = () => {
  const seller = ["SELLER"];
  const admin = ["ADMIN", "SUPER_ADMIN"];
  const superAdmin = ["SUPER_ADMIN"];

  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/logout" element={<Logout />} />
      <Route element={<ProtectedRoute allowedRoles={[...seller, ...admin]} />}>
        <Route path="/sales" element={<Sales />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={[...admin]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route
        element={<ProtectedRoute allowedRoles={[...superAdmin]} />}
      ></Route>
    </Routes>
  );
};
