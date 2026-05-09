import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function OAuthSuccess() {
  const [params] = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/home";
    }
  }, []);

  return <p>Logging you in...</p>;
}

export default OAuthSuccess;
