import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';

const middlewares = [ReduxThunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export default createStore(rootReducer, applyMiddleware(...middlewares));
