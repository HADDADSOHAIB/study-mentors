import { combineReducers } from 'redux';
import layoutReducer from './layoutReducer';
import teacherReducer from './teacherReducer';
import authReducer from './authReducer';
import bookingReducer from './bookingReducer';

const rootReducer = combineReducers({
  layout: layoutReducer,
  teacher: teacherReducer,
  auth: authReducer,
  booking: bookingReducer,
});

export default rootReducer;
