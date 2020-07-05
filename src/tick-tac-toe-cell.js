import React from "react";
import styled from "styled-components";
import { Paper } from "@material-ui/core";

import { GlobalStateContext } from "./store";
import { hasWon } from "./game-mechanics";

const TickTacToeCellContainer = styled(Paper)`
  height: 100%;
`;

export const TickTacToeCell = ({ yIndex, xIndex, player, ...props }) => {
  const updateGameOnClick = (oldState) => {
    const updatedState = oldState.gameState.reduce(
      (newGameState, gameRow, index) => {
        const updatedRow =
          index === yIndex
            ? gameRow
                .slice(0, xIndex)
                .concat(player ? "X" : "0")
                .concat(gameRow.slice(xIndex + 1))
            : gameRow;
        return [...newGameState, updatedRow];
      },
      []
    );
    const winState = hasWon(updatedState);
    console.log(winState);
    return {
      ...oldState,
      turn: !oldState.turn,
      hasWon: winState,
      gameState: updatedState,
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
