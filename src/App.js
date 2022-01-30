import './App.css';
import MasterView from './components/MasterView'
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MasterView />
      </div>
    </BrowserRouter>
  );
}

export default App;
