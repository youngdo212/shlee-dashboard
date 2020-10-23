import axios from 'axios';
import { API_HOST } from '../constant';

/**
 *
 * @param {object} param
 * @param {'get' | 'post' | 'put' | 'delete'=} param.method
 * @param {string} param.url
 * @param {object=} param.params
 * @param {object=} param.data
 */
export function callApi({ method = 'get', url, params, data }) {
  return axios({
    method,
    url,
    baseURL: API_HOST,
    params,
    data,
    withCredentials: true,
  })
    .then(response => {
      return {
        isSuccess: true,
        data: response.data,
      };
    })
    .catch(error => {
      return {
        isSuccess: false,
        errorMessage: error.message,
      };
    });
}
