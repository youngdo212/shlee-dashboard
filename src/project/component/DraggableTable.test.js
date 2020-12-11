import { I18N } from 'common/constant';
import React from 'react';
import { render, screen } from 'test-utils';
import DraggableTable from './DraggableTable';

it('충돌 없이 렌더링을 올바르게 수행한다', async () => {
  const columns = [
    {
      title: I18N.PROJECT_TITLE,
      dataIndex: 'title',
      key: 'title',
    },
  ];
  const data = [
    {
      title: 'test',
      key: 0,
    },
  ];

  render(
    <DraggableTable onMove={() => {}} columns={columns} dataSource={data} />
  );

  expect(await screen.findByText(I18N.PROJECT_TITLE)).toBeInTheDocument();
  expect(await screen.findByText('test')).toBeInTheDocument();
});
