
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const role = params.get("role");
    const uid = params.get("uid") || ""; // Add uid parameter with default empty string

    if (token && role) {
      login(token, role, uid);
      navigate(role === "creator" ? "/creator-dashboard" : "/");
    } else {
      navigate("/login");
    }
  }, [location, navigate, login]);

  return <div>Redirection...</div>;
};

export default AuthCallback;
