import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useUser } from "../store";
import { AUTH_TYPES } from "../store/auth/utils/enum";
import { Layout } from "../components/ui/Layout/layout";

export const ProtectedRoute = ({ allowedRoles }) => {
  const { status, role } = useUser();
  const location = useLocation();

  const redirectPath = role === "SELLER" ? "/sales" : "/dashboard";

  return allowedRoles.includes(role) ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : status === AUTH_TYPES.GUEST ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Navigate to={redirectPath} state={{ from: location }} replace />
  );
};
