import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import ChatHome from "./components/Chathome";
import Feed from "./components/Feed";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Post from "./components/Post";
import Profile from "./components/Profile";
import Register from "./components/Register";

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/post" element={<Post />} />
          <Route path="/chathome" element={<ChatHome />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
