import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { uiReducer } from "../reducers/uiReducer";

// createStore only allows to receive 1 reducer, for that reason we use combineReducers,
// because allows me to combine multiple reducers.
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
});

// References
// https://github.com/zalmoxisus/redux-devtools-extension#usage
// https://www.npmjs.com/package/redux-thunk
const composeEnhancers =
    (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);
