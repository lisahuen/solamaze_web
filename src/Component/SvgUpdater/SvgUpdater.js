import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SvgUpdater = () => {
  const [svgData, setSvgData] = useState('');
  const [moveDirection, setMoveDirection] = useState('X');
  const [moveAddr, setMoveAddr] = useState('');
  const [moveSgn, setMoveSgn] = useState('');
  const [successMove, setSuccessMove] = useState('');
//   const [goal, setGoal] = useState(1);

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
      {console.log(svgData)}
       {moveDirection}          
      <div dangerouslySetInnerHTML={{ __html: svgData }} />
    </div>
  );
};

export default SvgUpdater;
