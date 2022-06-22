import { Prop } from "context types/common.types";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../../context";
const RequireAuth = ({ children }: Prop): JSX.Element => {
  const location = useLocation();
  const authState = useAuth();
  return (
    <>
      {authState?.currentUserState.user ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
