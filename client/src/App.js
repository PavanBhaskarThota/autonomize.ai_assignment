import "./App.css";
import gitUser from "./services/gitUser";

function App() {
  const [username, setUserName] = useState('');

  const handleSubmit = async () => {
    const user = await gitUser.getUser(username);
  }
  return <div className="App">
    <input type="text" />
  </div>;
}

export default App;
