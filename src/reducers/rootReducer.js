import { combineReducers } from 'redux';
import layoutReducer from './layoutReducer';

const rootReducer = combineReducers({
  layout: layoutReducer,
});

export default rootReducer;
