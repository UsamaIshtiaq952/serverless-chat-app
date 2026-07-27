import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);

      navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>💬 ChatSphere</h1>

        <p className="subtitle">
          Welcome Back
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

             <div className="password-field">

  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <button
    type="button"
    className="toggle-password"
    onClick={() => setShowPassword(!showPassword)}
  >
    <span>{showPassword ? "🙈" : "👁️"}</span>
  </button>

</div>

          <button type="submit">
            Login
          </button>

        </form>

        <p className="switch-page">

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}