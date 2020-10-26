import { createAction, createReducer } from '@reduxjs/toolkit';
import { FETCH_KEY } from '../../common/constant';

export const actions = {
  initialize: createAction('project/initialze'),
  setValue: createAction('project/setValue', (key, value) => ({
    payload: { key, value },
  })),
  addProject: createAction('project/addProject', project => ({
    payload: project,
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
  fetchCreateProject: createAction('project/fetchCreateProject', callback => ({
    payload: {
      callback,
    },
  })),
  fetchUpdateProject: createAction(
    'project/fetchUpdateProject',
    ({ values, fetchKey }) => ({
      payload: values,
      meta: {
        [FETCH_KEY]: fetchKey,
      },
    })
  ),
};

const INITIAL_STATE = {
  projectList: [],
  showProjectForm: false,
  currentProjectId: null,
};

const reducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(actions.initialize, () => INITIAL_STATE)
    .addCase(actions.setValue, (state, action) => {
      state[action.payload.key] = action.payload.value;
    })
    .addCase(actions.addProject, (state, action) => {
      state.projectList = [action.payload, ...state.projectList];
    });
});

export default reducer;
