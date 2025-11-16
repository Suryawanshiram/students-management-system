import "./App.css";
import MemberList from "./components/MemberList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div
      className="App container w-100 min-vh-100 p-4"
      style={{ background: "#eef2f3" }}
    >
      <MemberList />
    </div>
  );
}

export default App;
