import './App.css';
import MasterView from './components/MasterView'
import { BrowserRouter } from "react-router-dom";
import {SocketContext, Socket} from './socket';

function App() {
  return (
    <SocketContext.Provider value={Socket}>
      <BrowserRouter>
        <div className="App">
          <MasterView />
        </div>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export default App;
