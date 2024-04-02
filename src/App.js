import { useState, useMemo, useEffect } from "react";
import MazeUpdater from './Component/MazeUpdater/MazeUpdater.js';
import logoImage from './images/logo.png';
import WinHistoryTable from './Component/WinHistoryTable/WinHistoryTable.js'



function App() {

  
  const Logo = () => {
    return (
      <div className="image-logo">
        {/* <img src="../public/logo.png" alt="Logo" className="centered-image" /> */}
        <img src={logoImage} className="image-logo" alt="Stylized atom" />
      </div>
    );
  };


  const [historyUpdateTrigger, setHistoryUpdateTrigger] = useState(0);
  const [goalIndicator, setGoalIndicator] = useState('');

  const updateHistory = () => {
    setHistoryUpdateTrigger((prevTrigger) => prevTrigger + 1);
  };

  const updateGoalIndicator = (newValue) => {
    setGoalIndicator(newValue);
  };


  return (
    <div>
      
      {/* <h1>Maze Runner in Solana</h1> */}
        <Logo/>

        
        <div id="maze-container">      
         <MazeUpdater onHistoryUpdate={updateHistory} onGoalIndicatorUpdate={updateGoalIndicator} />
        </div>
  
        <WinHistoryTable
        historyUpdateTrigger={historyUpdateTrigger}
        goalIndicator={goalIndicator}
      />

        
      
    </div>
  );
}

export default App;
