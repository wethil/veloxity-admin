import axios from 'axios';
import * as actions from './actions.js';

const { createFetchTopDataSuccess } = actions;

import {
  call,
  put,
  take,
  delay,
  race,
} from 'redux-saga/effects';


const getApi = () => axios.get('/api/data');

function* errorHandler(result) {
  const { createFetchTopDataError } = actions;
  yield put(createFetchTopDataError(result));
}

function* watchData() {
  while (true) {
    try {
      // Fetching posts at regular interval 4 seconds.
      const { data } = yield call(getApi);
      yield put(createFetchTopDataSuccess(data));
      yield delay(60000);
    } catch (err) {
      yield errorHandler();
      yield put({ type: 'STOP_WATCHER_TASK' });
    }
  }
}

export default function* () {
  yield take('START_WATCHER_TASK');
  yield race([call(watchData), take('STOP_WATCHER_TASK')]);
}
