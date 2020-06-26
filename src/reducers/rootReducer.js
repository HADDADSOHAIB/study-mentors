import { combineReducers } from 'redux';
import layoutReducer from './layoutReducer';
import teacherReducer from './teacherReducer';

const rootReducer = combineReducers({
  layout: layoutReducer,
  teacher: teacherReducer,
});

export default rootReducer;
