import { combineReducers, createStore } from "redux";
import { authReducer } from "../reducers/authReducer";

// createStore only allows to receive 1 reducer, for that reason we use combineReducers,
// because allows me to combine multiple reducers.
const reducers = combineReducers({
    auth: authReducer,
});

export const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
