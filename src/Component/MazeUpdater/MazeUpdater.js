import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MazeUpdater.css'; // Import CSS file for component styles

import arrowUpIcon from '../../images/arrow-up.png';
import arrowDownIcon from '../../images/arrow-down.png';
import arrowLeftIcon from '../../images/arrow-left.png';
import arrowRightIcon from '../../images/arrow-right.png';

const MazeUpdater = () => {
  const [svgData, setSvgData] = useState('');
  const [moveDirection, setMoveDirection] = useState('X');
  const [moveAddr, setMoveAddr] = useState('');
  const [moveSgn, setMoveSgn] = useState('');
  const [successMove, setSuccessMove] = useState('');
  const [fadeEffect, setFadeEffect] = useState(false); // State for fade effect


  let var_maze_id ='';

  useEffect(() => {
  
  let var_tran_id = 0;
  let var_goal =1;
   
    const fetchData = async () => {
      try {

        if (var_goal==1) {
            const responseTranID = await axios.post('http://localhost:5000/api/getStartTranID');
            var_maze_id = responseTranID.data.maze_id;
            var_tran_id = responseTranID.data.tran_id;
        };

    
        const requestBody = {
          maze_id: var_maze_id,
          tran_id: var_tran_id
        };

        const response = await axios.post('http://localhost:5000/api/getTran', requestBody);
        const { move_addr,move_sgn,move_direction, success_move,goal, svg_image } = response.data;
        
        setMoveAddr(move_addr);
        setMoveSgn(move_sgn)
        setSvgData(svg_image);
        setMoveDirection(move_direction);
        setSuccessMove(success_move);
        // setGoal(goal);
        var_goal = goal
        
        setFadeEffect(true); // Trigger fade-in effect
        
        var_tran_id ++;

        
      } catch (error) {
        console.error('Error fetching SVG data:', error);
      }
    };

    // Fetch data initially
    fetchData();

    // Fetch data every second
    const interval = setInterval(fetchData, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);


  return (
    <div>      
      <div
        id="move-info-container"
        // 
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
      <div style={{ textAlign: 'left' }}>
      <div className='title'>Move Direction:</div>
        <div
          className={fadeEffect ? 'fade-in' : ''} 
          onAnimationEnd={() => setFadeEffect(false)} 
        >
        {moveDirection === 'N' && <img src={arrowUpIcon} alt='Up' className='arrow-icon' />}
        {moveDirection === 'S' && <img src={arrowDownIcon} alt='Down' className='arrow-icon' />}
        {moveDirection === 'W' && <img src={arrowLeftIcon} alt='Left' className='arrow-icon' />}
        {moveDirection === 'E' && <img src={arrowRightIcon} alt='Right' className='arrow-icon' />}
        {moveDirection !== 'N' && moveDirection !== 'S' && moveDirection !== 'W' && moveDirection !== 'E' && moveDirection}

        </div>
    </div>
      <div style={{ textAlign: 'center' }}>
      <div className='title'>Signature:</div>  {moveSgn.slice(0, 20) +'......'+moveSgn.slice(-5)}
      </div>
      <div style={{ textAlign: 'right' }}>
      <div className='title'>By:</div> {moveAddr.slice(0, 5) +'......'+moveAddr.slice(-5)}
      </div>
    </div>
      <div  dangerouslySetInnerHTML={{ __html: svgData }} />
    </div>
  );
};

export default MazeUpdater;
