export const makeBoard = (size) =>
  letIn(makeArrayOf(size), (makeArrayOfSize) =>
    compose(makeArrayOfSize, makeArrayOfSize)("")
  );

export const playerHasWin = (player) => (board) =>
  checkBoardForWin(board) === player;

export const checkBoardForWin = (board) =>
  compose(checkPlayerStateForWin(board.length), boardToPlayerState);

const checkPlayerStateForWin = (boardSize) => (playerState) =>
  Object.keys(playerState).reduce(
    (winner, player) =>
      checkPlayerState(boardSize)(playerState[player]) ? player : winner,
    undefined
  );

const checkPlayerState = (boardSize) => ({ column, row }) =>
  letIn({ eqBoardSize: eq(boardSize), gt0: gt(0) }, ({ eqBoardSize, gt0 }) =>
    letIn(
      {
        columnStraight: column.some(eqBoardSize),
        rowStraight: row.some(eqBoardSize),
        diagonalStraight: column.all(gt0) && row.all(gt0),
      },
      (columnStraight, rowStraight, diagonalStraight) =>
        columnStraight || rowStraight || diagonalStraight
    )
  );

/* Player State looks something like this, but can accept any string as a name
 *
 * {
 *  x: { column: [0, 0, 0]
 *     , row: [0, 0, 0]
 *     }
 *  o: { column: [0, 0, 0]
 *     , row: [0, 0, 0]
 *     }
 * }
 */
const boardToPlayerState = (board) =>
  board.reduce(
    (playerState, row, rowIndex) =>
      attributeSquareToPlayer(row)(rowIndex)(playerState),
    {}
  );

const attributeSquareToPlayer = (row) => (rowIndex) => (acc) =>
  row.reduce(
    (acc, player, columnIndex) =>
      modifyObject(acc)(player)((playerValue) =>
        playerValue === undefined
          ? {
              columns: modifyArray(
                columnIndex,
                add(1),
                makeArrayOf(row.length - 1)(0)
              ),
              rows: modifyArray(
                rowIndex,
                add(1),
                makeArrayOf(row.length - 1)(0)
              ),
            }
          : {
              columns: modifyArray(columnIndex, add(1), playerValue.column),
              rows: modifyArray(rowIndex, add(1), playerValue.row),
            }
      ),
    acc
  );

const makeArrayOf = (size) => (contents) =>
  Array.from(Array(size), constt(contents));
const add = (a) => (b) => a + b;
const gt = (a) => (b) => a > b;
const eq = (a) => (b) => a === b;
// NOTE: all of these are in my helper library
const constt = (a) => () => a;
const modifyObject = (obj) => (key) => (fn) => ({
  ...obj,
  [key]: fn(obj[key]),
});
const modifyArray = (idx, fn, arr) =>
  arr.slice(0, idx) + fn(arr[idx]) + arr.slice(idx + 1);
const compose = (f) => (g) => (x) => f(g(x));
const letIn = (expr, functionBody) => functionBody(expr);
