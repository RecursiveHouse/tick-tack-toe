import React, { useState } from "react";
import styled from "styled-components";
import "./App.css";
import { GlobalStateContext } from "./store";
import { TickTacToeCell } from "./tick-tac-toe-cell";
import { GAME_STATE_INIT } from "./store";
import { Button } from "@material-ui/core";

const StyledTickTackToe = styled(TickTacToeCell)`
  width: 40px;
  height: 40px;
  color: black;
`;

const PlayerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
`;

const PlayerButton = styled(Button)`
  opacity: ${(props) => (props.turn ? 70 : 100)}%;
`;

function App() {
  const [globalState, setGlobalState] = useState({
    gameState: GAME_STATE_INIT,
    turn: true,
  });

  const dispatch = (stateCreator) =>
    setGlobalState((state) => stateCreator(state));

  return (
    <GlobalStateContext.Provider value={{ dispatch, state: globalState }}>
      <div className="App">
        <table>
          <tbody>
            <tr>
              <StyledTickTackToe
                player={globalState.turn}
                yIndex={0}
                xIndex={0}
              />
              <StyledTickTackToe
                player={globalState.turn}
                yIndex={0}
                xIndex={1}
              />
              <StyledTickTackToe
                player={globalState.turn}
                yIndex={0}
                xIndex={2}
              />
            </tr>
            <tr>
              <StyledTickTackToe
                player={globalState.turn}
                yIndex={1}
                xIndex={0}
              />
              <StyledTickTackToe
                player={globalState.turn}
                yIndex={1}
                xIndex={1}
              />
              <StyledTickTackToe
                player={globalState.turn}
                yIndex={1}
                xIndex={2}
              />
            </tr>
            <tr>
              <StyledTickTackToe
                player={globalState.turn}
                yIndex={2}
                xIndex={0}
              />
              <StyledTickTackToe
                player={globalState.turn}
                yIndex={2}
                xIndex={1}
              />
              <StyledTickTackToe
                player={globalState.turn}
                yIndex={2}
                xIndex={2}
              />
            </tr>
          </tbody>
        </table>
        <PlayerContainer>
          <PlayerButton turn={!globalState.turn}>Player One</PlayerButton>
          <PlayerButton turn={globalState.turn}>Player Two</PlayerButton>
        </PlayerContainer>
      </div>
    </GlobalStateContext.Provider>
  );
}

export default App;
