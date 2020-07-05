import reducer, { INITIAL_STATE } from '../reducers/teacherReducer';
import * as types from '../actions/teacherTypes';

describe('teacher reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('should handle SELECT CATEGORY', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: types.SELECT_CATEGORY,
        payload: {
          category: 'category',
        },
      }),
    ).toEqual({
      ...INITIAL_STATE,
      selectedCategory: 'category',
      selectedProfilIndex: 0,
    });
  });

  it('should handle DECREASE SELECTED INDEX', () => {
    const state = {
      profils: ['teacher', 'teacher', 'teacher'],
      selectedProfilIndex: 1,
    };

    expect(
      reducer(state, {
        type: types.DECREASE_SELECTED_INDEX,
      }),
    ).toEqual({
      ...state,
      selectedProfilIndex: 0,
    });
  });

  it('should handle DECREASE SELECTED INDEX when index is zero', () => {
    const state = {
      profils: ['teacher', 'teacher', 'teacher'],
      selectedProfilIndex: 0,
    };

    expect(
      reducer(state, {
        type: types.DECREASE_SELECTED_INDEX,
      }),
    ).toEqual({
      ...state,
      selectedProfilIndex: 0,
    });
  });

  it('should handle INCREASE SELECTED INDEX', () => {
    const state = {
      profils: ['teacher', 'teacher', 'teacher'],
      selectedProfilIndex: 1,
    };

    expect(
      reducer(state, {
        type: types.INCREASE_SELECTED_INDEX,
      }),
    ).toEqual({
      ...state,
      selectedProfilIndex: 2,
    });
  });

  it('should handle INCREASE SELECTED INDEX when index is zero', () => {
    const state = {
      profils: ['teacher', 'teacher', 'teacher'],
      selectedProfilIndex: 2,
    };

    expect(
      reducer(state, {
        type: types.INCREASE_SELECTED_INDEX,
      }),
    ).toEqual({
      ...state,
      selectedProfilIndex: 2,
    });
  });
});
