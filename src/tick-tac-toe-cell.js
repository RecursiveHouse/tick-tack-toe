import React from "react";
import styled from "styled-components";
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
