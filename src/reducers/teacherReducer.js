import {
  INCREASE_SELECTED_INDEX,
  DECREASE_SELECTED_INDEX,
  INCREASE_FETCHED_DATA_COUNT,
  SELECT_CATEGORY,
} from '../actions/teacherTypes';

const INITIAL_STATE = {
  profils: [{ name: 'test 1' }, { name: 'test 2' }, { name: 'test 3' }, { name: 'test 4' }, { name: 'test 5' }, { name: 'test 6' }],
  selectedCategory: 'Maths',
  selectedProfilIndex: 0,
  fetchedDataCount: 20,
};

const teacherReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory: payload.category,
      };
    case INCREASE_SELECTED_INDEX:
      return {
        ...state,
        selectedProfilIndex: state.selectedProfilIndex < state.profils.length - 1
          ? state.selectedProfilIndex + 1 : state.selectedProfilIndex,
      };
    case DECREASE_SELECTED_INDEX:
      return {
        ...state,
        selectedProfilIndex: state.selectedProfilIndex > 0
          ? state.selectedProfilIndex - 1 : state.selectedProfilIndex,
      };
    case INCREASE_FETCHED_DATA_COUNT:
      return {
        ...state,
        fetchedDataCount: state.fetchedDataCount + 20,
      };
    default:
      return {
        ...state,
      };
  }
};

export default teacherReducer;
