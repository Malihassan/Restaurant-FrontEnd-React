import { useCallback, useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  const sendRequest = useCallback(async (requestConfig,redirectionHandler) => {
    setIsLoading(true);
    setHasError(null);
    try {
      const respose = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? requestConfig.body : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
        credentials: "same-origin",
        
      });
     
      redirectionHandler(respose)
    } catch (error) {
      setHasError(error.message);
    }
    setIsLoading(false);
  }, []);
  return {
    hasError,
    isLoading,
    sendRequest,
  };
};

export default useFetch;
