import {
  SET_FLASH,
  CLEAR_FLASH,
  OPEN_DRAWER,
  CLOSE_DRAWER,
} from '../actions/layoutTypes';

const INITIAL_STATE = {
  flash: {
    severity: '',
    message: '',
    open: false,
  },
  drawer: {
    open: true,
  },
};

const layoutReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case OPEN_DRAWER:
      return {
        ...state,
        drawer: {
          open: true,
        },
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        drawer: {
          open: false,
        },
      };
    case CLEAR_FLASH:
      return {
        ...state,
        flash: {
          severity: '',
          message: '',
          open: false,
        },
      };
    case SET_FLASH:
      return {
        ...state,
        flash: payload.flash,
      };
    default:
      return {
        ...state,
      };
  }
};

export default layoutReducer;
