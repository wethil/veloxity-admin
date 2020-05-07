import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import TopListReducer from './TopList/reducer';

export default function rootReducer(history) {
  const reducerMap = {
    dataList: TopListReducer,
    router: connectRouter(history),
  };

  return combineReducers(reducerMap);
}
