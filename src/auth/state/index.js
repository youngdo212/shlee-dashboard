import { createAction, createReducer } from '@reduxjs/toolkit';
import { AuthStatus } from '../../common/constant';

export const actions = {
  setValue: createAction('auth/setValue', (key, value) => ({
    payload: { key, value },
  })),
  setUser: createAction('auth/setUser', user => ({
    payload: user,
  })),
  fetchLogin: createAction('auth/fetchLogin', ({ email, password }) => ({
    payload: { email, password },
  })),
  fetchLogout: createAction('auth/fetchLogout'),
  fetchUser: createAction('auth/fetchUser'),
};

const INITIAL_STATE = {
  status: null,
  user: null,
};

const reducer = createReducer(INITIAL_STATE, builder => {
  builder
    .addCase(actions.setValue, (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    })
    .addCase(actions.setUser, (state, action) => {
      state.user = action.payload;
      state.status = action.payload ? AuthStatus.Login : AuthStatus.NotLogin;
    });
});

export default reducer;
