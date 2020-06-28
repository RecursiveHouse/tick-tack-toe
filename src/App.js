import React, {useState, createContext} from 'react';
import styled from 'styled-components';
import './App.css';


export const GlobalStateContext = createContext();

const TickTacToeCell = ({ yIndex, xIndex }) => {
  const displayState = oldState => {
    return ({...oldState, [yIndex]: (oldState[yIndex].slice(0, xIndex).concat([((oldState[yIndex][xIndex]) ? "rest" : "tests")]).concat(oldState[yIndex].slice(xIndex + 1)))})
  }
  return (
    <GlobalStateContext.Consumer>{({ state, dispatch })  => {
      return <td onClick={() => dispatch(displayState)}>{state[yIndex][xIndex]}</td>}

      }</GlobalStateContext.Consumer>
  );
}

const TickTacToeStyle = styled(TickTacToeCell)`
  width: 40px;
  height: 40px;
  color: black;
  border: solid black 1px;
`;


function App() {
  const [globalState, setGlobalState] = useState({
    0: ["test", "test", "test"], 
    1: ["test", "test", "test"],
    2: ["test", "test", "test"],
  });

  const dispatch = (stateCreator) => setGlobalState(state => stateCreator(state));


  return (
    <GlobalStateContext.Provider value={{dispatch, state: globalState}}>
      <div className="App">
        <table>
          <tbody>
            <tr>
              <TickTacToeStyle yIndex={0} xIndex={0}/>
              <TickTacToeStyle yIndex={0} xIndex={1}/>
              <TickTacToeStyle yIndex={0} xIndex={2}/>
            </tr>
            <tr>
              <TickTacToeStyle yIndex={1} xIndex={0}/>
              <TickTacToeStyle yIndex={1} xIndex={1}/>
              <TickTacToeStyle yIndex={1} xIndex={2}/>

            </tr>
            <tr>
              <TickTacToeStyle yIndex={2} xIndex={0}/>
              <TickTacToeStyle yIndex={2} xIndex={1}/>
              <TickTacToeStyle yIndex={2} xIndex={2}/>

            </tr>
          </tbody>
        </table>
      </div>
    </GlobalStateContext.Provider>
  );
}

export default App;
