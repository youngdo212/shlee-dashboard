import { createAction, createReducer } from '@reduxjs/toolkit';
import { FetchStatus } from '../constant';

export const actions = {
  setFetchStatus: createAction('common/setFetchStatus', payload => ({
    payload,
  })),
  setIsSlow: createAction('common/setIsSlow', payload => ({
    payload,
  })),
};

const INITIAL_STATE = {
  fetchInfo: {
    fetchStatusMap: {},
    isSlowMap: {},
    totalCountMap: {},
    errorMessageMap: {},
    nextPageMap: {},
  },
};

const reducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(actions.setFetchStatus, (state, action) => {
      const { actionType, status, fetchKey } = action.payload;

      if (!state.fetchInfo.fetchStatusMap[actionType]) {
        state.fetchInfo.fetchStatusMap[actionType] = {};
      }

      state.fetchInfo.fetchStatusMap[actionType][fetchKey] = status;

      if (status === FetchStatus.Request) return;

      if (state.fetchInfo.isSlowMap[actionType]) {
        state.fetchInfo.isSlowMap[actionType][fetchKey] = false;
      }
    })
    .addCase(actions.setIsSlow, (state, action) => {
      const { actionType, isSlow, fetchKey } = action.payload;
      if (!state.fetchInfo.isSlowMap[actionType]) {
        state.fetchInfo.isSlowMap[actionType] = {};
      }

      state.fetchInfo.isSlowMap[actionType][fetchKey] = isSlow;
    });
});

export default reducer;
