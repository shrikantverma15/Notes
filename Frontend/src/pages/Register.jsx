import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async () => {
    const payload = {
      name,
      email,
      password,
      gender,
      age,
    };

    try {
      await fetch("https://devnotes-m111.onrender.com/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      alert("User registered successfully");
      navigate("/login"); // Navigate to login page after successful registration
    } catch (error) {
      alert(`An error occurred: ${error}`);
    }
  };

  const handleNavigateToLogin = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Register</h1>
      <input
        style={styles.input}
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        style={styles.input}
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select style={styles.select} value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <input
        style={styles.input}
        type="number"
        placeholder="Enter age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button style={styles.button} onClick={handleSubmit}>Submit</button>
      <button style={styles.buttonSecondary} onClick={handleNavigateToLogin}>
        Already have an account? Login
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    fontSize: "16px",
  },
  select: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  buttonSecondary: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};
