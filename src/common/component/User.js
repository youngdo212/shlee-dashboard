import { UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import { I18N } from '../constant';

/**
 *
 * @param {object} param
 * @param {string} param.name user name
 * @param {() => void} param.logout logout handler
 */
export default function User({ name, logout }) {
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
