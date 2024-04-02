
// const Goal = ({winner_addr}) => {
// return <div id="goal">
//     <h2>Reach Destination!</h2>
//     <p>{winner_addr} won!</p>
//     <p><button>Continue Watching</button></p>
// </div>
// }


// export default Goal;



import React from 'react';

const Goal = ({ isOpen, onClose, children }) => {
  return (
    isOpen && (
      <div id="goal">
        <div className="modal-content">        
          {children}
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
      </div>
    )
  );
};

export default Goal;