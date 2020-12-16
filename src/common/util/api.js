import axios from 'axios';
import { API_HOST } from '../constant';

// TODO: server api의 반환값을 {resultCode, resultMessage, data}로 통일하기
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
    .then(res => {
      let response = res;

      if (response.data.resultCode !== undefined) {
        response = res.data;
      }

      if (response.resultCode !== ResultCode.Fail) {
        return {
          isSuccess: true,
          data: response.data,
        };
      } else {
        return {
          isSuccess: false,
          errorMessage: response.resultMessage,
        };
      }
    })
    .catch(error => {
      return {
        isSuccess: false,
        errorMessage: error.message,
      };
    });
}

const ResultCode = {
  Fail: -1,
};
