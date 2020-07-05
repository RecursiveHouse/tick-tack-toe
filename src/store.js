import { createContext } from "react";

export const GAME_STATE_INIT = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

export const GlobalStateContext = createContext({
  gameState: GAME_STATE_INIT,
});
