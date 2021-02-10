import { UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import { I18N } from '../constant';

interface UserProps {
  name: string;
  logout: () => void;
}

/**
 * dropdown기능을 가진 유저 정보를 나타내는 컴포넌트
 *
 * @param {object} param
 * @param {string} param.name user name
 * @param {MouseEventHandler} param.logout logout handler
 */
export default function User({ name, logout }: UserProps) {
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={logout}>{I18N.LOGOUT}</Menu.Item>
        </Menu>
      }
      trigger={['click']}
    >
      <Button type="text" icon={<UserOutlined />} style={{ height: '100%' }}>
        {name}
      </Button>
    </Dropdown>
  );
}
