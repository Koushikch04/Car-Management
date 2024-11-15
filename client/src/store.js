import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./reducers/authReducer";
import carReducer from "./reducers/carReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  cars: carReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
