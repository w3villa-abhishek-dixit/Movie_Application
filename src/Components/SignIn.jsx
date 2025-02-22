import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const googleClientId = "672553672556-67jd3vjlugts7n7v4g9oc26ls5q9vcr8.apps.googleusercontent.com";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", email); // Store username
      alert("Login Successful!");
      navigate("/home"); // ✅ Navigate to home **without refreshing**
      window.dispatchEvent(new Event("storage")); // ✅ Notify Navbar to update state
    } else {
      alert("Invalid credentials!");
    }
  };

  const handleGoogleSuccess = (response) => {
    const user = jwtDecode(response.credential);
    googleLogin(user);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", user.name); // Store Google username
    alert(`Welcome, ${user.name}!`);
    navigate("/home"); // ✅ Navigate to home **without refreshing**
    window.dispatchEvent(new Event("storage")); // ✅ Notify Navbar to update state
  };

  const handleGoogleFailure = (error) => {
    console.log("Google Login Failed:", error);
    alert("Google Login Failed. Try again.");
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow-lg" style={{ width: "450px" }}>
          <h2 className="text-center mb-4">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign In</button>
          </form>

          <div className="text-center mt-3">
            <p>OR</p>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />
          </div>

          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignIn;
