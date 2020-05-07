import { spawn, all } from 'redux-saga/effects';
import TopList from './TopList/saga';

export default function* () {
  yield all([
    spawn(TopList),
  ]);
}
