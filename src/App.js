import "./App.css";
import Navbar from "./components/navbar/Navbar";
import logo from "./logo.png";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App bg-black">
      <Navbar/>
      <Home/>
    </div>
  );
}

export default App;
