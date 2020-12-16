import { Space, Spin } from 'antd';
import React from 'react';
import useFetchInfo from '../../common/hook/useFetchInfo';

/**
 * fetch 응답이 늦어질 경우 로딩 아이콘을 띄우는 레이블 컴포넌트
 *
 * @param {object} param
 * @param {string=} param.label
 * @param {string} param.actionType
 * @param {string=} param.fetchKey
 */
export default function FetchLabel({ label, actionType, fetchKey }) {
  const { isSlow } = useFetchInfo(actionType, fetchKey);
  return (
    <Space>
      {label}
      {isSlow && <Spin size="small" />}
    </Space>
  );
}
