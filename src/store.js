import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import userProfileReducer from './reducers/userProfileReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    userProfile: userProfileReducer,
});


const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;

