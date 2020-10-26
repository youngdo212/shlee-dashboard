import {
  ExclamationCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, Modal, Space } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentHeader from '../../common/component/ContentHeader';
import { actions } from '../state';
import { getProjectListWithKey } from '../state/selector';
import FetchLabel from '../component/FetchLabel';
import DraggableTable from '../component/DraggableTable';
import '../component/HeaderUpload.css';
import ProjectForm from './ProjectForm';
import { I18N } from '../../common/constant';
import useFetchInfo from '../../common/hook/useFetchInfo';

export default function Project() {
  const dispatch = useDispatch();
  const projectList = useSelector(getProjectListWithKey);
  const showProjectForm = useSelector(state => state.project.showProjectForm);
  const currentProjectId = useSelector(state => state.project.currentProjectId);

  useEffect(() => {
    dispatch(actions.fetchProjectList());
    return () => dispatch(actions.initialize());
  }, [dispatch]);

  const { isFetching } = useFetchInfo(actions.fetchCreateProject.toString());

  const columns = [
    {
      title: I18N.PROJECT_TITLE,
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: I18N.PROJECT_HEADER,
      dataIndex: 'header',
      key: 'header',
      ellipsis: true,
    },
    {
      title: I18N.PROJECT_CLIENT,
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: I18N.PROJECT_AGENCY,
      dataIndex: 'agency',
      key: 'agency',
    },
    {
      title: I18N.PROJECT_ROLE,
      dataIndex: 'role',
      key: 'role',
      ellipsis: true,
    },
    {
      title: I18N.PROJECT_LIST_COLUMN_ACTION,
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => {}}>
            {I18N.PROJECT_LIST_ITEM_EDIT}
          </Button>
          <Button
            danger
            size="small"
            onClick={() =>
              Modal.confirm({
                title: I18N.PROJECT_LIST_ITEM_REMOVE_CONFIRM_TITLE,
                icon: <ExclamationCircleOutlined />,
                content: I18N.PROJECT_LIST_ITEM_REMOVE_CONFIRM_CONTENT,
                okText: I18N.PROJECT_LIST_ITEM_REMOVE_CONFIRM_OK,
                okType: 'danger',
                cancelText: I18N.PROJECT_LIST_ITEM_REMOVE_CONFIRM_CANCEL,
                onOk() {
                  dispatch(actions.fetchRemoveProject(record));
                },
              })
            }
          >
            {I18N.PROJECT_LIST_ITEM_REMOVE}
          </Button>
        </Space>
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
              label={I18N.PROJECT_LIST}
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
          <Button
            type="primary"
            icon={isFetching ? <LoadingOutlined /> : <PlusOutlined />}
            disabled={isFetching}
            onClick={() =>
              dispatch(
                actions.fetchCreateProject(() => {
                  dispatch(actions.setValue('showProjectForm', true));
                })
              )
            }
          >
            {I18N.ADD_PROJECT}
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
      <ProjectForm
        visible={showProjectForm}
        onCreate={values =>
          dispatch(
            actions.fetchUpdateProject({ values, fetchKey: currentProjectId })
          )
        }
        onCancel={() => dispatch(actions.setValue('showProjectForm', false))}
      />
    </>
  );
}
