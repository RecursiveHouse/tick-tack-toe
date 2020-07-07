import { createContext } from "react";
import { makeBoard } from "./game-mechanics";

export const GAME_STATE_INIT = makeBoard(3);

export const GlobalStateContext = createContext({
  gameState: GAME_STATE_INIT,
});
