import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './MazeUpdater.css'; // Import CSS file for component styles

import arrowUpIcon from '../../images/arrow-up.png';
import arrowDownIcon from '../../images/arrow-down.png';
import arrowLeftIcon from '../../images/arrow-left.png';
import arrowRightIcon from '../../images/arrow-right.png';
import arrowUpIconG from '../../images/arrow-up-g.png';
import arrowDownIconG from '../../images/arrow-down-g.png';
import arrowLeftIconG from '../../images/arrow-left-g.png';
import arrowRightIconG from '../../images/arrow-right-g.png';
import Goal from '../Goal/Goal.js';


const MazeUpdater = (props) => {
  const [svgData, setSvgData] = useState('');
  const [moveDirection, setMoveDirection] = useState('X');
  const [moveAddr, setMoveAddr] = useState('');
  const [moveSgn, setMoveSgn] = useState('');
  const [goal, setGoal] = useState(1);
  const [successMove, setSuccessMove] = useState('');
  const [fadeEffect, setFadeEffect] = useState(false); // State for fade effect
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  let var_maze_id ='';

  // const [specificVariable, setSpecificVariable] = useState('');

  // useEffect(() => {
  //   // Example code to update the specific variable
  //   const updateSpecificVariable = () => {
  //     const newValue = 'new value'; // Update the specific variable with the desired value
  //     setSpecificVariable(newValue);
  //     props.onSpecificVariableUpdate(newValue); // Call the onSpecificVariableUpdate function from props to trigger the update in the parent component
  //   };
  // });

  useEffect(() => {
  
  let var_tran_id = 0;
  let var_goal =1

  const fetchData = async () => {
      try {
       
            if (var_goal==1) {
                
                const responseTranID = await axios.post('http://localhost:5000/api/getStartTranID');
               
                if (responseTranID.data!="") {
                  var_maze_id= responseTranID.data.maze_id;
                  var_tran_id = responseTranID.data.tran_id;               
                }                
            };
        
            const requestBody = {
              maze_id: var_maze_id,
              tran_id: var_tran_id
            };

            const response = await axios.post('http://localhost:5000/api/getTran', requestBody);         

            if (response.data !='') {
         
              const { move_addr,move_sgn,move_direction, success_move,goal, svg_image } = response.data;
                      
              setMoveAddr(move_addr);
              setMoveSgn(move_sgn)
              setSvgData(svg_image);
              setMoveDirection(move_direction);
              setSuccessMove(success_move);
              setFadeEffect(true); // Trigger fade-in effect
              setGoal(goal);
              var_goal =goal;
              
              if (goal==1){
                setIsModalOpen(true);
                props.onGoalIndicatorUpdate(move_addr)
              }
              var_tran_id ++;        
            }
            else{
              var_goal =1;
            
         }
      } catch (error) {
        console.error('Error fetching SVG data:', error);
      }
    };
    
     if (!isModalOpen) {
      fetchData();
      const interval = setInterval(fetchData, 1000);
      return () => clearInterval(interval);
    }

  }, [isModalOpen]);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>      
      
      {/* <Gox`al winner_addr={moveAddr}></Goal> */}
      <div>
      <button onClick={openModal}>Open Modal</button>
      <Goal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Congratulations</h2>
        <h3>Winner: {moveAddr.slice(0, 5) +'......'+moveAddr.slice(-5)} </h3>
        {/* <p>Click 'X' button to continue watching the next maze </p> */}
      </Goal> 
    </div>    

      
      <>
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
          
        {moveDirection === 'N' && successMove!="1" && <img src={arrowUpIcon} alt='Up' className='arrow-icon' />}
        {moveDirection === 'N' && successMove=="1" && <img src={arrowUpIconG} alt='Up' className='arrow-icon' />}
        {moveDirection === 'S' && successMove!="1" && <img src={arrowDownIcon} alt='Down' className='arrow-icon' />}
        {moveDirection === 'S' && successMove=="1"&&  <img src={arrowDownIconG} alt='Down' className='arrow-icon' />}

        {moveDirection === 'W' && successMove!="1" &&  <img src={arrowLeftIcon} alt='Left' className='arrow-icon' />}
        {moveDirection === 'W' && successMove=="1" && <img src={arrowLeftIconG} alt='Left' className='arrow-icon' />}

        {moveDirection === 'E'  && successMove!="1" && <img src={arrowRightIcon} alt='Right' className='arrow-icon' />}
        {moveDirection === 'E' && successMove=="1" && <img src={arrowRightIconG} alt='Right' className='arrow-icon' />}

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

      </>
    </div>
  );
};

export default MazeUpdater;

