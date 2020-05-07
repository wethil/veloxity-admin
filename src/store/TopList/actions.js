export const FETCH_TOP_DATA = 'FETCH_TOP_DATA';
export function createFetchTopData(payload, callback) {
  return {
    type: FETCH_TOP_DATA,
    payload,
    callback,
  };
}

export const FETCH_TOP_DATA_REQUEST = 'FETCH_TOP_DATA_REQUEST';
export function createFetchTopDataRequest(payload, callback) {
  return {
    type: FETCH_TOP_DATA_REQUEST,
    payload,
    callback,
  };
}


export const FETCH_TOP_DATA_SUCCESS = 'FETCH_TOP_DATA_SUCCESS';
export function createFetchTopDataSuccess(payload, callback) {
  return {
    type: FETCH_TOP_DATA_SUCCESS,
    payload,
    callback,
  };
}


export const FETCH_TOP_DATA_ERROR = 'FETCH_TOP_DATA_ERROR';
export function createFetchTopDataError(payload, callback) {
  return {
    type: FETCH_TOP_DATA_ERROR,
    payload,
    callback,
  };
}


export function startWatching() {
  return {
    type: 'START_WATCHER_TASK',
  };
}

