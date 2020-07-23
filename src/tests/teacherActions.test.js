import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../actions/teacherCreators';
import * as types from '../actions/teacherTypes';

jest.mock('axios');
axios.get.mockResolvedValue({
  data: {
    teachers: ['teacher1', 'teacher2', 'teacher3'],
  },
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('teacher creators', () => {
  it('creates SUCCESS_FETCHING_TEACHERS when fetching teachers has been done', () => {
    const expectedActions = [
      { type: types.START_FETCHING_TEACHERS },
      { type: types.SUCCESS_FETCHING_TEACHERS, payload: { teachers: ['teacher1', 'teacher2', 'teacher3'] } },
    ];
    const store = mockStore({ showsList: [] });

    return store.dispatch(actions.fetchTeachers('category')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('selectCategory should call SELECT_CATEGORY', () => {
    const category = 'category';
    const expectedAction = {
      type: types.SELECT_CATEGORY,
      payload: {
        category,
      },
    };

    expect(actions.selectCategory(category)).toEqual(expectedAction);
  });

  it('increaseFetchedDataCount should call INCREASE_FETCHED_DATA_COUNT', () => {
    const expectedAction = {
      type: types.INCREASE_FETCHED_DATA_COUNT,
    };

    expect(actions.increaseFetchedDataCount()).toEqual(expectedAction);
  });

  it('increaseSelectedIndex should call INCREASE_SELECTED_INDEX', () => {
    const expectedAction = {
      type: types.INCREASE_SELECTED_INDEX,
    };

    expect(actions.increaseSelectedIndex()).toEqual(expectedAction);
  });

  it('decreaseSelectedIndex should call DECREASE_SELECTED_INDEX', () => {
    const expectedAction = {
      type: types.DECREASE_SELECTED_INDEX,
    };

    expect(actions.decreaseSelectedIndex()).toEqual(expectedAction);
  });

  it('startFetchingTeachers should call START_FETCHING_TEACHERS', () => {
    const expectedAction = {
      type: types.START_FETCHING_TEACHERS,
    };

    expect(actions.startFetchingTeachers()).toEqual(expectedAction);
  });

  it('succesFetchingTeachers should call SUCCESS_FETCHING_TEACHERS', () => {
    const teachers = ['teachers'];
    const expectedAction = {
      type: types.SUCCESS_FETCHING_TEACHERS,
      payload: {
        teachers,
      },
    };

    expect(actions.succesFetchingTeachers(teachers)).toEqual(expectedAction);
  });

  it('errorFetchingTeachers should call ERROR_FETCHING_TEACHERS', () => {
    const error = 'error';
    const expectedAction = {
      type: types.ERROR_FETCHING_TEACHERS,
      payload: {
        error,
      },
    };

    expect(actions.errorFetchingTeachers(error)).toEqual(expectedAction);
  });
});
