import { Alert } from "../../shared/components/Alert";
import { getUser } from "./api";
import { useRouteParamApiRequest } from "../../shared/hooks/useRouteParamApiRequest";
import { ProfileCard } from "./components/ProfileCard";

export function User() {
  const { data: user, error } = useRouteParamApiRequest("id", getUser);

  return (
    <>
      {/* {apiProgress && (
         <span className="spinner-border" aria-hidden="true"></span>
      )}*/}

      {user && <ProfileCard user={user} />}

      {error && <Alert styleType="danger">{error}</Alert>}
    </>
  );
}
