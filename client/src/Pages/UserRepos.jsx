import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Redux/slices/user.slice";
import "./styles.css";

export const UserRepos = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails, repos, status, error } = useSelector(
    (state) => state.user
  );
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (username) {
      dispatch(getUser(username));
    }
  }, [username]);

  const fetchFollowers = async () => {
    try {
      const response = await fetch(userDetails.followers_url);
      const data = await response.json();
      setFollowers(data);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  const searchFollowers = (username) => {
    setFollowers([]);
    navigate(`/${username}`);
  };

  if (status === "loading") {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  if (status === "failed") {
    return (
      <div className="loading">
        <h1>Failed to Get the Data</h1>
        <Link to="/">
          <h2>Go Back</h2>
        </Link>
      </div>
    );
  }

  return (
    <div className="repos">
      <button
        className="followers-button"
        style={{ margin: "20px 0" }}
        onClick={() => navigate(-1)}
      >
        {`< Back`}
      </button>
      {userDetails && (
        <div>
          <div className="user">
            <h1>{userDetails.name ? userDetails.name : userDetails.login}</h1>
            <img src={userDetails.avatar_url} alt="avatar" />
          </div>
          {followers.length === 0 && repos.message === undefined && (
            <button className="followers-button" onClick={fetchFollowers}>
              Followers
            </button>
          )}

          {followers.length > 0 ? (
            <div style={{ padding: "20px 0" }}>
              {followers.map((follower) => (
                <div key={follower.id} className="follower-list">
                  <p onClick={() => searchFollowers(follower.login)}>
                    {follower.login}
                  </p>
                  <img src={follower.avatar_url} alt="Avatar" />
                </div>
              ))}
            </div>
          ) : (
            <div className="repos-list">
              {repos.length > 0 ? (
                repos.map((repo) => (
                  <div key={repo.id} className="repo">
                    <div>
                      <img
                        src={repo.avatar_url || userDetails.avatar_url}
                        alt="Avatar"
                      />
                    </div>
                    <div>
                      <h2
                        style={{
                          fontWeight: "500",
                          textTransform: "capitalize",
                        }}
                      >
                        {repo.name}
                      </h2>
                      <p>{repo.description ? repo.description : "NA"}</p>
                    </div>
                  </div>
                ))
              ) : repos.message ? (
                <div>
                  <p>{repos.message}</p>
                </div>
              ) : (
                <div>
                  <h2>No Repos Found</h2>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
