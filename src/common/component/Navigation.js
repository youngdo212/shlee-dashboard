import React from 'react';
import { Menu } from 'antd';

/**
 *
 * @param {object} param
 * @param {object[]} param.items
 * @param {() => void} param.onSelect
 * @param {string[]} param.selectedKeys
 */
export default function Navigation({ items, onSelect, selectedKeys }) {
  return (
    <Menu theme="dark" selectedKeys={selectedKeys} onSelect={onSelect}>
      {items.map(item => (
        <Menu.Item {...item} />
      ))}
    </Menu>
  );
}
