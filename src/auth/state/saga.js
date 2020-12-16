import { message } from 'antd';
import { all, call, put, takeLeading } from 'redux-saga/effects';
import { actions } from '.';
import { callApi } from '../../common/util/api';
import { makeFetchSaga } from '../../common/util/fetch';

function* fetchLogin({ payload }) {
  const { isSuccess, errorMessage, data } = yield call(callApi, {
    method: 'post',
    url: '/auth/login',
    data: payload,
  });

  if (isSuccess && data) {
    yield put(actions.setUser(data));
  } else {
    message.error(errorMessage);
  }
}

function* fetchLogout() {
  const { isSuccess, errorMessage } = yield call(callApi, {
    url: '/auth/logout',
  });

  if (isSuccess) {
    yield put(actions.setUser(null));
  } else {
    message.error(errorMessage);
  }
}

function* fetchUser() {
  const { isSuccess, data, errorMessage } = yield call(callApi, {
    url: '/auth/user',
  });

  if (isSuccess) {
    yield put(actions.setUser(data));
  } else {
    message.error(errorMessage);
  }
}

export default function* () {
  yield all([
    takeLeading(
      actions.fetchLogin,
      makeFetchSaga({ fetchSaga: fetchLogin, canCache: false })
    ),
    takeLeading(
      actions.fetchLogout,
      makeFetchSaga({ fetchSaga: fetchLogout, canCache: false })
    ),
    takeLeading(
      actions.fetchUser,
      makeFetchSaga({ fetchSaga: fetchUser, canCache: false })
    ),
  ]);
}
