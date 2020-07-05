import * as actions from '../actions/layoutCreators';
import * as types from '../actions/layoutTypes';

describe('auth creators', () => {
  it('setFlash should call SET_FLASH', () => {
    const flash = 'flash';
    const expectedAction = {
      type: types.SET_FLASH,
      payload: {
        flash,
      },
    };

    expect(actions.setFlash(flash)).toEqual(expectedAction);
  });

  it('openDrawer should call OPEN_DRAWER', () => {
    const expectedAction = {
      type: types.OPEN_DRAWER,
    };

    expect(actions.openDrawer()).toEqual(expectedAction);
  });

  it('closeDrawer should call CLOSE_DRAWER', () => {
    const expectedAction = {
      type: types.CLOSE_DRAWER,
    };

    expect(actions.closeDrawer()).toEqual(expectedAction);
  });

  it('clearFlash should call CLEAR_FLASH', () => {
    const expectedAction = {
      type: types.CLEAR_FLASH,
    };

    expect(actions.clearFlash()).toEqual(expectedAction);
  });
});
