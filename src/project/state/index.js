import { createAction, createReducer } from '@reduxjs/toolkit';

export const actions = {
  initialize: createAction('project/initialze'),
  setValue: createAction('project/setValue', (key, value) => ({
    payload: { key, value },
  })),
  fetchProjectList: createAction('project/fetchProjectList'),
  fetchRemoveProject: createAction('project/fetchRemoveProject', project => ({
    payload: project,
  })),
  fetchMoveProject: createAction('project/fetchMoveProject', (from, to) => ({
    payload: {
      from,
      to,
    },
  })),
};

const INITIAL_STATE = {
  projectList: [],
};

const reducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(actions.initialize, () => INITIAL_STATE)
    .addCase(actions.setValue, (state, action) => {
      state[action.payload.key] = action.payload.value;
    });
});

export default reducer;
