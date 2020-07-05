import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";
import { Paper } from "@material-ui/core";
import { GlobalStateContext } from "./store";

const TickTacToeCellContainer = styled(Paper)`
  height: 100%;
`;

const TickTacToeCell = ({ yIndex, xIndex, ...props }) => {
  const updateGameOnClick = (oldState) => {
    return {
      ...oldState,
      gameState: oldState.gameState.reduce((newGameState, gameRow, index) => {
        const updatedRow =
          index === yIndex
            ? gameRow
                .slice(0, xIndex)
                .concat(gameRow[xIndex] ? "rest" : "best")
                .concat(gameRow.slice(xIndex + 1))
            : gameRow;
        return [...newGameState, updatedRow];
      }, []),
    };
  };
  return (
    <GlobalStateContext.Consumer>
      {({ state, dispatch }) => {
        return (
          <td {...props} onClick={() => dispatch(updateGameOnClick)}>
            <TickTacToeCellContainer elevation={1}>
              {state.gameState[yIndex][xIndex]}
            </TickTacToeCellContainer>
          </td>
        );
      }}
    </GlobalStateContext.Consumer>
  );
};

const StyledTickTackToe = styled(TickTacToeCell)`
  width: 40px;
  height: 40px;
  color: black;
`;

function App() {
  const [globalState, setGlobalState] = useState({
    gameState: [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ],
  });

  const dispatch = (stateCreator) =>
    setGlobalState((state) => stateCreator(state));

  return (
    <GlobalStateContext.Provider value={{ dispatch, state: globalState }}>
      <div className="App">
        <table>
          <tbody>
            <tr>
              <StyledTickTackToe yIndex={0} xIndex={0} />
              <StyledTickTackToe yIndex={0} xIndex={1} />
              <StyledTickTackToe yIndex={0} xIndex={2} />
            </tr>
            <tr>
              <StyledTickTackToe yIndex={1} xIndex={0} />
              <StyledTickTackToe yIndex={1} xIndex={1} />
              <StyledTickTackToe yIndex={1} xIndex={2} />
            </tr>
            <tr>
              <StyledTickTackToe yIndex={2} xIndex={0} />
              <StyledTickTackToe yIndex={2} xIndex={1} />
              <StyledTickTackToe yIndex={2} xIndex={2} />
            </tr>
          </tbody>
        </table>
      </div>
    </GlobalStateContext.Provider>
  );
}

export default App;
