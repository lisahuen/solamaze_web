import React, { useEffect, useState } from 'react';
import axios from 'axios';


const WinHistoryTable = ({ historyUpdateTrigger, goalIndicator }) => {
  const [winHistory, setWinHistory] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/getWinHistory');
        const data = await response.data;
        
        setWinHistory(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [goalIndicator]);

  return (
    <div className="win-history-container">
    <h2>Winning History</h2>
    <div className="table-container">
    <table className="win-history-table">
      <thead>
        <tr>
          <th>Finish Time</th>
          <th>Move to Win</th>
          <th>Winner Address</th>
          <th>Winner Signature</th>
        </tr>
      </thead>
      <tbody>
        {winHistory.map((item, index) => (
          <tr key={index}>
            <td>{item.finish_dt}</td>
             <td>{item.move}</td>
            <td>{item.winner_addr.slice(0, 15) + '......' + item.winner_addr.slice(-5)}</td>
            <td>{item.winner_sgn.slice(0, 30) + '......' + item.winner_sgn.slice(-5)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </div>
  );
};

export default WinHistoryTable;