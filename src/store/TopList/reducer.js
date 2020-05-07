import * as actions from './actions.js';
import { createSelector } from 'reselect';

const initialState = {
  balance: {},
  topSelling: {},
  status: {
    busy: true,
    success: false,
    error: false
  }
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_TOP_DATA:
      return {
        ...state,
      };
    case actions.FETCH_TOP_DATA_REQUEST: {
      return {
        ...state,
        status: {
          busy: true,
          success: false,
          error: false,
        }
      };
    }
    case actions.FETCH_TOP_DATA_SUCCESS: {
      const { payload: {
        balance,
        topSelling
      } } = action;
      return {
        balance: { ...balance },
        topSelling: [...topSelling],
        status: {
          busy: false,
          success: true,
          error: false,
        }
      };
    }
    case actions.FETCH_TOP_DATA_ERROR:
      return {
        balance: {},
        topSelling: {},
        status: {
          busy: false,
          success: false,
          error: false,
        }
      };
    default:
      return state;
  }
}

export const getBalance = createSelector(
  state => state.dataList.balance,
  result => result
);

export const getTopSelling = createSelector(
  state => state.dataList.topSelling,
  result => result
);

export const getStatus = createSelector(
  state => state.dataList.status,
  result => result
);

