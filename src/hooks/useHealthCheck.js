import { useEffect, useState } from "react";

const useHealthCheck = () => {
  const [isHealthy, setIsHealthy] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/healthcheck`
        );
        if (!response.ok) {
          throw new Error("Health check failed");
        }
        setIsHealthy(true);
      } catch (err) {
        setIsHealthy(false);
        setError(err.message);
      }
    };

    checkHealth();
  }, []);

  return { isHealthy, error };
};

export default useHealthCheck;
