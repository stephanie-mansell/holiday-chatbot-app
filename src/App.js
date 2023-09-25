import "./App.css";
import logo from "./assets/logo.svg";
import logotext from "./assets/logo-text.svg";
import ChatBox from "./components/ChatBox";
import Logo from "./components/Logo";
import { useEffect, useState } from "react";

function App() {
  const [backgroundUrl, setBackgroundUrl] = useState("");

  useEffect(() => {
    const unsplashKey = require("./unsplashKey.json");
    let endpoint = `https://api.unsplash.com/photos/random?collections=OI9sDnoqGc8&fit&client_id=${unsplashKey}`;

    fetch(endpoint)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setBackgroundUrl(response.urls.full);
      })
      .catch(() => {
        setBackgroundUrl(
          "https://source.unsplash.com/1920x1080/?beach+city+nightlife"
        );
      });
  }, []);

  return (
    <div
      className="App"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
      data-testid="app-test"
    >
      <header className="App-header">
        <Logo img={logo} className="App-logo" />
        <Logo img={logotext} className="logo-text" />
      </header>
      <ChatBox />
    </div>
  );
}

export default App;
