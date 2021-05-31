import { combineReducers } from "redux";

import cellsReducers from "./cellsReducers";
import bundlesReducers from "./bundlesReducers";

const reducers = combineReducers({
  cells: cellsReducers,
  bundles: bundlesReducers,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
