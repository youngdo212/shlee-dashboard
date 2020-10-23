import { message } from 'antd';
import { all, call, put, select, takeLeading } from 'redux-saga/effects';
import { actions } from '.';
import { callApi } from '../../common/util/api';
import { arrayMove } from '../../common/util/array';
import { makeFetchSaga } from '../../common/util/fetch';
import { getProjectList } from './selector';

function* fetchProjectList() {
  const { data } = yield call(callApi, {
    url: '/project',
  });

  if (data) {
    yield put(actions.setValue('projectList', data));
  }
}

function* fetchRemoveProject({ payload }) {
  const oldProjectList = yield select(getProjectList);
  const newProjectList = oldProjectList.filter(item => item.id !== payload.id);

  yield put(actions.setValue('projectList', newProjectList));

  const { isSuccess, errorMessage } = yield call(callApi, {
    method: 'delete',
    url: `/project/${payload.id}`,
  });

  if (!isSuccess) {
    yield put(actions.setValue('projectList', oldProjectList));
    message.error(errorMessage);
  }
}

function* fetchMoveProject({ payload }) {
  const { from, to } = payload;
  const oldProjectList = yield select(getProjectList);
  const newProjectList = arrayMove(oldProjectList, from, to);

  yield put(actions.setValue('projectList', newProjectList));

  // TODO: 서버에서 순서 변경 처리 방법 변경하기
  const fetchResults = yield all(
    newProjectList.map((project, index) =>
      call(callApi, {
        method: 'put',
        url: `/project/${project.id}/sort-index`,
        data: {
          index,
        },
      })
    )
  );

  if (fetchResults.some(result => !result.isSuccess)) {
    yield put(actions.setValue('projectList', oldProjectList));
    message.error(fetchResults[0].errorMessage);
  }
}

export default function* () {
  yield all([
    takeLeading(
      actions.fetchProjectList,
      makeFetchSaga({ fetchSaga: fetchProjectList, canCache: false })
    ),
    takeLeading(
      actions.fetchRemoveProject,
      makeFetchSaga({ fetchSaga: fetchRemoveProject, canCache: false })
    ),
    takeLeading(
      actions.fetchMoveProject,
      makeFetchSaga({ fetchSaga: fetchMoveProject, canCache: false })
    ),
  ]);
}
