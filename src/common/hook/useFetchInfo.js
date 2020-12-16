import { shallowEqual, useSelector } from 'react-redux';
import { FetchStatus, FETCH_KEY } from '../constant';
import { getFetchKey } from '../util/fetch';

/**
 *
 * @param {string} actionType
 * @param {string=} fetchKey
 */
export default function useFetchInfo(actionType, fetchKey) {
  const _fetchKey = getFetchKey({
    type: actionType,
    meta: {
      [FETCH_KEY]: fetchKey,
    },
  });
  return useSelector(
    state => ({
      fetchStatus:
        state.common.fetchInfo.fetchStatusMap[actionType]?.[_fetchKey],
      isFetching:
        state.common.fetchInfo.fetchStatusMap[actionType]?.[_fetchKey] ===
        FetchStatus.Request,
      isFetched:
        state.common.fetchInfo.fetchStatusMap[actionType]?.[_fetchKey] ===
          FetchStatus.Fail ||
        state.common.fetchInfo.fetchStatusMap[actionType]?.[_fetchKey] ===
          FetchStatus.Success,
      isSlow: !!state.common.fetchInfo.isSlowMap[actionType]?.[_fetchKey],
    }),
    shallowEqual
  );
}
