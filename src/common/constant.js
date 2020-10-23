export const API_HOST = process.env.REACT_APP_API_HOST;
export const Path = {
  Dashboard: '/',
  Project: '/project',
};
export const FetchStatus = {
  Request: 'Request',
  Success: 'Success',
  Fail: 'Fail',
};
export const FETCH_KEY = Symbol('FETCH_KEY');
export const FETCH_PAGE = Symbol('FETCH_PAGE');
