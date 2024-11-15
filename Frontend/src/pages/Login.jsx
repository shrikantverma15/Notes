import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false); // Track login failure

  const navigate = useNavigate();

  const handleLogin = async () => {
    const payload = {
      email,
      password,
    };
    try {
      const response = await fetch(
        "https://devnotes-m111.onrender.com/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert(`${data.message}`);
        navigate("/notes");
      } else {
        // If login failed, show "Go to Register" button
        alert("Invalid email or password");
        setLoginFailed(true);
      }
    } catch (error) {
      alert(`An error occurred during login: ${error}`);
    }
  };

  return (
    <form>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="button" onClick={handleLogin}>
        Login
      </button>

      {/* Conditionally render the Register button if login fails */}
      {loginFailed && (
        <button
          type="button"
          onClick={() => navigate("/register")}
          style={{
            marginTop: "1rem",
            backgroundColor: "#f44336",
            color: "#ffffff",
            border: "none",
            borderRadius: "5px",
            padding: "0.75rem",
            cursor: "pointer",
          }}
        >
          Go to Register
        </button>
      )}
    </form>
  );
}
