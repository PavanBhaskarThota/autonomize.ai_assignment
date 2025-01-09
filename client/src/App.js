import { useState } from "react";
import "./App.css";
import gitUser from "./services/gitUser";

function App() {
  const [username, setUserName] = useState("");

  const handleSubmit = async () => {
    console.log(username)
    if (username) {
      console.log(username)
      const user = await gitUser.getUser(username);
      console.log(user);
    }
  };
  return (
    <div className="App">
      <input
        type="text"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
