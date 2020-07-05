import reducer, { INITIAL_STATE } from '../reducers/layoutReducer';
import * as types from '../actions/layoutTypes';

describe('layout reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should handle OPEN DRAWER', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.OPEN_DRAWER,
      }),
    ).toEqual({
      ...INITIAL_STATE,
      drawer: {
        open: true,
      },
    });
  });

  it('should handle CLOSE DRAWER', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.CLOSE_DRAWER,
      }),
    ).toEqual({
      ...INITIAL_STATE,
      drawer: {
        open: false,
      },
    });
  });

  it('should handle CLEAR USER', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.CLEAR_FLASH,
      }),
    ).toEqual({
      ...INITIAL_STATE,
      flash: {
        severity: '',
        message: '',
        open: false,
      },
    });
  });

  it('should handle SET SCHEDULE', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.SET_FLASH,
        payload: {
          flash: 'flash',
        },
      }),
    ).toEqual({
      ...INITIAL_STATE,
      flash: 'flash',
    });
  });
});
