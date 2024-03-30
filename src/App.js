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
  
  return (
    <div>
      
      {/* <h1>Maze Runner in Solana</h1> */}
        <Logo/>
        <div id="maze-container">
         <MazeUpdater/> 
        </div>
        <WinHistoryTable/>
      
    </div>
  );
}

export default App;
