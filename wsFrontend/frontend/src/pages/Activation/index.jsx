
import { activateUser } from "./api";
import { Alert } from "../../shared/components/Alert";
import { useRouteParamApiRequest } from "../../shared/hooks/useRouteParamApiRequest";

export function Activation() {
  const {data, error} = useRouteParamApiRequest('token', activateUser)

  return (
    <>
     {/* {apiProgress && (
        <span className="spinner-border" aria-hidden="true"></span>
     )}*/}

      {data?.message && (
        <Alert>{data.message}</Alert>
      )}

      {error && <Alert styleType="danger">{error}</Alert>}
    </>
  );
}
