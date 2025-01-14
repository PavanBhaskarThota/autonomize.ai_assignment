import { useEffect, useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import git_image from "../Assets/github_image.png";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../Redux/slices/user.slice";

export const Home = () => {
  const [username, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allUsers, status, error } = useSelector((state) => state.user);

  const handleSubmit = () => {
    navigate(`/${username}`);
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
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

      {status === "loading" ? (
        <div className="loading" style={{ width: "100%", height: "20vh" }}>
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="all-users">
          {allUsers.map((user, i) => (
            <div
              className="follower-list"
              key={user.login}
              style={{
                width: "100%",
                borderTop: "0.5px solid lightgray",
                padding: "10px",
                gap: "20px",
              }}
            >
              <p onClick={() => navigate(`/${user.login}`)} display="flex">
                {/* <span>{i + 1 + ". "}</span> */}
                {user.name.split(" ")[0]}
              </p>

              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <img src={user.avatar_url} alt="user" />
                <button
                  className="delete-user-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
