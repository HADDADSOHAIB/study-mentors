import * as actions from '../actions/authCreators';
import * as types from '../actions/authTypes';

describe('auth creators', () => {
  it('setUser should call SET_USER', () => {
    const currentUser = 'user';
    const accountType = 'type';
    const categories = 'categories';
    const expectedAction = {
      type: types.SET_USER,
      payload: {
        currentUser,
        accountType,
        categories,
      },
    };

    expect(actions.setUser(currentUser, accountType, categories)).toEqual(expectedAction);
  });

  it('clearUser should call CLEAR_USER', () => {
    const expectedAction = {
      type: types.CLEAR_USER,
    };

    expect(actions.clearUser()).toEqual(expectedAction);
  });

  it('setSchedule should call SET_SCHEDULE', () => {
    const schedule = 'schedule';
    const expectedAction = {
      type: types.SET_SCHEDULE,
      payload: {
        schedule,
      },
    };

    expect(actions.setSchedule(schedule)).toEqual(expectedAction);
  });
});
