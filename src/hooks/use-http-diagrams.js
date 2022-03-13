import { useCallback, useState } from 'react';

const useHttpDiagrams = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const sendRequest = useCallback(async (requestConfig, handleResponse) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
            requestConfig.url, {
                method: requestConfig.method ? requestConfig.method: 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body): null
            }
        );
  
        if (!response.ok) {
          const err = await response.json();
          console.log(err.message);
          throw new Error(err.message);
        }

       const imageBlob = await response.blob();
       const imageObjectURL = URL.createObjectURL(imageBlob);
       handleResponse(imageObjectURL);
      
      } catch (err) {
        setError(err || 'Something went wrong!');
      }
      setIsLoading(false);
    }, []);
  
    return {
        isLoading,
        error,
        sendRequest
    };
};

export default useHttpDiagrams;