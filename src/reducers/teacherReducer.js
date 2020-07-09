import {
  INCREASE_SELECTED_INDEX,
  DECREASE_SELECTED_INDEX,
  INCREASE_FETCHED_DATA_COUNT,
  SELECT_CATEGORY,
  START_FETCHING_TEACHERS,
  SUCCESS_FETCHING_TEACHERS,
  ERROR_FETCHING_TEACHERS,
  START_FETCHING_SELECTED_TEACHER,
  ERROR_FETCHING_SELECTED_TEACHER,
  SUCCESS_FETCHING_SELECTED_TEACHER,
} from '../actions/teacherTypes';

const INITIAL_STATE = {
  profils: [],
  selectedCategory: 'Maths',
  selectedProfilIndex: 0,
  fetchedDataCount: 20,
  error: null,
  dataLoading: false,
  selectedTeacher: {
    teacher: null,
    categories: [],
  },
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
    case START_FETCHING_TEACHERS:
    case START_FETCHING_SELECTED_TEACHER:
      return {
        ...state,
        dataLoading: true,
      };
    case SUCCESS_FETCHING_TEACHERS:
      return {
        ...state,
        dataLoading: false,
        profils: payload.teachers,
        selectedProfilIndex: 0,
      };
    case ERROR_FETCHING_TEACHERS:
    case ERROR_FETCHING_SELECTED_TEACHER:
      return {
        ...state,
        dataLoading: false,
        error: payload.error,
      };
    case SUCCESS_FETCHING_SELECTED_TEACHER:
      return {
        ...state,
        dataLoading: false,
        selectedTeacher: {
          teacher: payload.teacher,
          categories: payload.categories,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

export { INITIAL_STATE };
export default teacherReducer;
