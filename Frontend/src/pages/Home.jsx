import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  
  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="home-container">
      <h1 className="home-heading" style={{color:"black"}}>Welcome</h1>
      <h2 className="home-subheading">You can proceed with the registration process below.</h2>
      <div className="button-container">
        <button className="home-button register-btn" onClick={handleRegister}>
          Register
        </button>
        <button className="home-button login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
