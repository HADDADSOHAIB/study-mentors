import {
  SELECT_CATEGORY,
  INCREASE_FETCHED_DATA_COUNT,
  INCREASE_SELECTED_INDEX,
  DECREASE_SELECTED_INDEX,
} from './teacherTypes';

const selectCategory = category => ({
  type: SELECT_CATEGORY,
  payload: {
    category,
  },
});

const increaseFetchedDataCount = () => ({
  type: INCREASE_FETCHED_DATA_COUNT,
});

const increaseSelectedIndex = () => ({
  type: INCREASE_SELECTED_INDEX,
});

const decreaseSelectedIndex = () => ({
  type: DECREASE_SELECTED_INDEX,
});

export {
  selectCategory,
  increaseFetchedDataCount,
  increaseSelectedIndex,
  decreaseSelectedIndex,
};
