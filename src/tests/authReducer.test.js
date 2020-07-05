import reducer, { INITIAL_STATE } from '../reducers/authReducer';
import * as types from '../actions/authTypes';

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should handle SET USER', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.SET_USER,
        payload: {
          currentUser: 'user',
          accountType: 'type',
          categories: 'categories',
        },
      }),
    ).toEqual({
      ...INITIAL_STATE,
      currentUser: 'user',
      accountType: 'type',
      categories: 'categories',
    });
  });

  it('should handle CLEAR USER', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.CLEAR_USER,
      }),
    ).toEqual({
      ...INITIAL_STATE,
      currentUser: {},
      accountType: '',
      categories: [],
    });
  });

  it('should handle SET SCHEDULE', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.SET_SCHEDULE,
        payload: {
          schedule: 'schedule',
        },
      }),
    ).toEqual({
      ...INITIAL_STATE,
      currentUser: {
        ...INITIAL_STATE.currentUser,
        schedule: 'schedule',
      },
    });
  });
});
