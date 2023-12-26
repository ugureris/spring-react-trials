import {useParams} from "react-router-dom"
import {useState, useEffect} from "react";

export function useRouteParamApiRequest(param, httpFunction){
    const params = useParams();
    // const [apiProgress, setApiProgress] = useState();
    const pathParam = params[param];
     const [data, setData] = useState();
     const [error, setError] = useState();
   
     useEffect(() => {
       async function sendRequest() {
       //  setApiProgress(true);
         try {
           const response = await httpFunction(pathParam);
           setData(response.data);
         } catch (axiosError) {
           setError(axiosError.response.data.message);
           
         } finally {
     //      setApiProgress(false);
         }
       }
       sendRequest();
     }, [pathParam]);
     
     return {data,error}
}