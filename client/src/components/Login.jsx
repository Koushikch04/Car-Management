import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authError, authSuccess } = useSelector((state) => state.auth);
  console.log(authSuccess);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (authSuccess) {
      navigate("/cars");
    }
  }, [authSuccess, navigate]);

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {authError && <div className="error-message">{authError}</div>}
      {authSuccess && <div className="success-message">{authSuccess}</div>}
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Donot have an account?<Link to={"/signup"}>Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
