
import React, {useEffect} from 'react';
import TitlePage from './content/TitlePage';
import CreatePage from './content/CreatePage';
import LobbyPage from './content/LobbyPage';
import GamePage from './content/GamePage';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function MasterView() {

  useEffect(() => {
    if (window.sessionStorage.getItem("abc") === null) {
      window.sessionStorage.setItem("abc", Math.random().toString(16).substring(2,10));
    }
    console.log(window.sessionStorage.getItem("abc")); // access it
  },[]);

  return (
    <Routes>
      <Route path="/" element={<TitlePage />} />
      <Route path="create" element={<CreatePage />} />
      <Route path="lobby" element={<LobbyPage />} />
      <Route path="game" element={<GamePage />} />
    </Routes>
  );
}

export default MasterView;