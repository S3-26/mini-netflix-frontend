import { useState } from "react";
import axios from "axios";
import "./Login.css";
import API_BASE_URL from "../config/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data);
      window.location.href = "/home";
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  const handlesignup = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/signup`, {
        email,
        password,
      });
      setEmail("");
      setPassword("");
    } catch (err) {
      alert("Signup failed");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      <input
        className="login-input"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <button className="signup-button" onClick={handlesignup}>
        Signup
      </button>

      <div className="divider">OR</div>

      <button className="google-button" onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
