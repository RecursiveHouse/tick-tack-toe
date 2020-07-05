export const winStates = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
];

export const validateWin = (gameState) => {
  return winStates.filter((winState) => {
    console.log(
      gameState,
      gameState[winState[0][0]][winState[0][1]] ===
        gameState[winState[1][0]][winState[1][1]] &&
        gameState[winState[1][0]][winState[1][1]] ===
          gameState[winState[2][0]][winState[2][1]]
    );

    return (
      " " !== gameState[winState[0][0]][winState[0][1]] &&
      gameState[winState[0][0]][winState[0][1]] ===
        gameState[winState[1][0]][winState[1][1]] &&
      gameState[winState[1][0]][winState[1][1]] ===
        gameState[winState[2][0]][winState[2][1]]
    );
  });
};

export const hasWon = (gameState) => {
  return validateWin(gameState).reduce(
    (result, winState) => result || winState,
    false
  );
};
