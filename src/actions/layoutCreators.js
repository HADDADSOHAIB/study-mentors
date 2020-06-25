import {
  OPEN_DRAWER,
  CLOSE_DRAWER,
  SET_FLASH,
  CLEAR_FLASH,
} from './layoutTypes';

const openDrawer = () => ({
  type: OPEN_DRAWER,
});

const closeDrawer = () => ({
  type: CLOSE_DRAWER,
});

const setFlash = flash => ({
  type: SET_FLASH,
  payload: {
    flash,
  },
});

const clearFlash = () => ({
  type: CLEAR_FLASH,
});

export {
  openDrawer,
  closeDrawer,
  setFlash,
  clearFlash,
};
