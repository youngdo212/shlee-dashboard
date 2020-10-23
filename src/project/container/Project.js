import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Space } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ContentHeader from '../../common/component/ContentHeader';
import { actions } from '../state';
import { getProjectListWithKey } from '../state/selector';
import FetchLabel from '../component/FetchLabel';
import DraggableTable from '../component/DraggableTable';

export default function Project() {
  const dispatch = useDispatch();
  const projectList = useSelector(getProjectListWithKey);

  useEffect(() => {
    dispatch(actions.fetchProjectList());
    return () => dispatch(actions.initialize());
  }, [dispatch]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: text => <Link to="#">{text}</Link>,
    },
    {
      title: 'Header',
      dataIndex: 'header',
      key: 'header',
      ellipsis: true,
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Agency',
      dataIndex: 'agency',
      key: 'agency',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="정말로 삭제 하시겠습니까?"
          onConfirm={() => dispatch(actions.fetchRemoveProject(record))}
          okText="삭제"
          cancelText="취소"
        >
          <Button danger size="small">
            삭제
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <ContentHeader />
      <Card
        title={
          <Space>
            <FetchLabel
              label="프로젝트 리스트"
              actionType={actions.fetchProjectList.toString()}
            />
            <FetchLabel actionType={actions.fetchRemoveProject.toString()} />
            <FetchLabel actionType={actions.fetchMoveProject.toString()} />
          </Space>
        }
        bordered={false}
        style={{ margin: 24 }}
        bodyStyle={{ padding: 0 }}
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            프로젝트 추가
          </Button>
        }
      >
        <DraggableTable
          columns={columns}
          dataSource={projectList}
          pagination={false}
          onMove={(from, to) => dispatch(actions.fetchMoveProject(from, to))}
        />
      </Card>
    </>
  );
}
