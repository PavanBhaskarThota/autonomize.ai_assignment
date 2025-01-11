import { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import git_image from "../Assets/github_image.png";

export const Home = () => {
  const [username, setUserName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/${username}`);
  };

  return (
    <div className="App">
      <div>
        <img
          src={git_image}
          alt="git"
          style={{ width: "100px", height: "100px", borderRadius: "50px" }}
        />
      </div>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Search for a GitHub user by their username.
      </h1>
      <div className="input-container">
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          autoFocus
        />
        <button
          onClick={handleSubmit}
          disabled={!username}
          style={{ cursor: username ? "pointer" : "not-allowed" }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
