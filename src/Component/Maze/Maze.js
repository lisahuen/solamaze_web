import "./Maze.scss";

export default function Maze(props) {

    const makeClassName = (i, j) => {
        const rows = props.maze.length;
        const cols = props.maze[0].length;
        let arr = [];
        if (props.maze[i][j][0] === 0) {
          arr.push("topWall");
        }
        if (props.maze[i][j][1] === 0) {
          arr.push("rightWall");
        }
        if (props.maze[i][j][2] === 0) {
          arr.push("bottomWall");
        }
        if (props.maze[i][j][3] === 0) {
          arr.push("leftWall");
        }
        if (i === rows - 1 && j === cols - 1) {
          arr.push("destination");
        }
        if (i === props.userPosition[0] && j === props.userPosition[1]) {
          arr.push("currentPosition");
        }
    
        // if (cheatMode && solution.has(String(i) + "-" + String(j))) {
        //   arr.push("sol");
        // }
        return arr.join(" ");
      };
      
return (

    <table id="maze">        
        <tbody>
          {props.maze.map((row, i) => (
            <tr key={`row-${i}`}>
              {row.map((cell, j) => (
                   <td key={`cell-${i}-${j}`} className={makeClassName(i, j)}>
                  <div />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
)

};