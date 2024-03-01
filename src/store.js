import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Placeholder reducer
const rootReducer = combineReducers({
  // reducers will go here
});

// Create store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
