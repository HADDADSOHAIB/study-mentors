import { combineReducers } from 'redux';
import layoutReducer from './layoutReducer';
import teacherReducer from './teacherReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  layout: layoutReducer,
  teacher: teacherReducer,
  auth: authReducer,
});

export default rootReducer;
