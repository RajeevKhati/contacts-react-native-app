import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { createTable } from "../database/contactsQueries";
import rootReducer from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

//creating database table
createTable();

export default store;
