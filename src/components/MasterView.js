
import React from 'react';
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