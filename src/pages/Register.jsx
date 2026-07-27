import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/authService";
import { saveUser } from "../services/userService";
import { toast } from "react-toastify";



export default function Register() {
  const navigate = useNavigate();
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [phone, setPhone] = useState("");


const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
  !firstName ||
  !lastName ||
  !phone ||
  !email ||
  !password ||
  !confirmPassword
) {
  alert("Please fill all required fields.");
  return;
}

if (password !== confirmPassword) {
  alert("Passwords do not match.");
  return;
}

if (password.length < 6) {
  alert("Password must be at least 6 characters.");
  return;
}

    try {
      const userCredential = await signup(email,password);

await saveUser(userCredential.user, {
  firstName,
  lastName,
  phone,
  
});

     

toast.success("Account Created Successfully");

      navigate("/home");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>💬 ChatSphere</h1>

        <p className="subtitle">
          Create your account
        </p>

        <form onSubmit={handleSubmit}>
          <input
  type="text"
  placeholder="First Name"
  value={firstName}
  onChange={(e) => setFirstName(e.target.value)}
/>

<input
  type="text"
  placeholder="Last Name"
  value={lastName}
  onChange={(e) => setLastName(e.target.value)}
/>

<input
  type="tel"
  placeholder="Phone Number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>

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
    {showPassword ? "🙈" : "👁️"}
  </button>

</div>

         <div className="password-field">

  <input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
  />

  <button
    type="button"
    className="toggle-password"
    onClick={() =>
      setShowConfirmPassword(!showConfirmPassword)
    }
  >
    {showConfirmPassword ? "🙈" : "👁️"}
  </button>

</div>



          <button type="submit">
            Create Account
          </button>

        </form>

        <p className="switch-page">

          Already have an account?

          <Link to="/">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}