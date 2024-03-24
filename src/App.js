import { useState, useMemo, useEffect } from "react";
import ImageSlider from './Component/ImageSlider/ImageSlider.js'


// import { generateMaze, solve } from "./util";
// import "./styles.scss";
// import logo from './logo.svg';
// import './App.css';
// import Maze from './Component/Maze/Maze.js';


function App() {

  // const [gameId, setGameId] = useState(1);
  // const [status, setStatus] = useState("playing");
  
  // const [size, setSize] = useState(10);

  // const [userPosition, setUserPosition] = useState([0, 0]);
  // const maze = useMemo(() => generateMaze(20, 10), [size, gameId]);


  // useEffect(() => {
  //   const lastRowIndex = maze.length - 1;
  //   const lastColIndex = maze[0].length - 1;
  //   if (userPosition[0] === lastRowIndex && userPosition[1] === lastColIndex) {
  //     setStatus("won");
  //   }
  // }, [userPosition[0], userPosition[1]]);


  // const handleMove = (e) => {
  //   e.preventDefault();
  //   if (status !== "playing") {
  //     return;
  //   }
  //   const key = e.code;

  //   const [i, j] = userPosition;
  //   if ((key === "ArrowUp" || key === "KeyW") && maze[i][j][0] === 1) {
  //     setUserPosition([i - 1, j]);
  //   }
  //   if ((key === "ArrowRight" || key === "KeyD") && maze[i][j][1] === 1) {
  //     setUserPosition([i, j + 1]);
  //   }
  //   if ((key === "ArrowDown" || key === "KeyS") && maze[i][j][2] === 1) {
  //     setUserPosition([i + 1, j]);
  //   }
  //   if ((key === "ArrowLeft" || key === "KeyA") && maze[i][j][3] === 1) {
  //     setUserPosition([i, j - 1]);
  //   }
  // };

  // // const handleUpdateSettings = () => {
  // //   setSize(Number(document.querySelector("input[name='mazeSize']").value));
  // //   setUserPosition([0, 0]);
  // //   setStatus("playing");
  // //   setGameId(gameId + 1);
  // // };
  return (
    <div className="App">
      
    <p>123</p>
    <ImageSlider/>

    </div>
  );
}

export default App;
