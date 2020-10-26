import {
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Modal, Radio, Upload } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { API_HOST, I18N } from '../../common/constant';
import SingleUpload from '../component/SingleUpload';
import '../component/HeaderUpload.css';
import useFetchInfo from '../../common/hook/useFetchInfo';
import { actions } from '../state';
import { useSelector } from 'react-redux';

/**
 *
 * @param {object} param
 * @param {boolean} param.visible
 * @param {(values: object) => void} param.onCreate
 * @param {() => {}} param.onCancel
 */
export default function ProjectForm({ visible, onCreate, onCancel }) {
  const [form] = Form.useForm();
  const currentProjectId = useSelector(state => state.project.currentProjectId);
  const { isFetching, isFetched } = useFetchInfo(
    actions.fetchUpdateProject.toString(),
    currentProjectId
  );
  useEffect(() => {
    if (isFetched) {
      form.resetFields();
      onCancel();
    }
  }, [isFetched, form, onCancel]);

  function submit() {
    form
      .validateFields()
      .then(values => {
        if (isUploading(values)) {
          Modal.warn({
            title: I18N.PROJECT_FORM_VALIDATE_MESSAGE_UPLOADING,
          });
        } else {
          onCreate(normalizeValues({ id: currentProjectId, ...values }));
        }
      })
      .catch(error => {
        console.log('ProjectForm Validate Failed:', error);
      });
  }

  function close() {
    Modal.confirm({
      title: I18N.PROJECT_FORM_CANCEL_CONFIRM_TITLE,
      icon: <ExclamationCircleOutlined />,
      content: I18N.PROJECT_FORM_CANCEL_CONFIRM_CONTENT,
      okText: I18N.PROJECT_FORM_CANCEL_CONFIRM_OK,
      cancelText: I18N.PROJECT_FORM_CANCEL_CONFIRM_CANCEL,
      onOk() {
        form.resetFields();
        onCancel();
      },
    });
  }

  return (
    <Modal
      title={I18N.PROJECT_FORM_TITLE}
      visible={visible}
      okText={I18N.PROJECT_FORM_SUBMIT}
      onOk={submit}
      cancelText={I18N.PROJECT_FORM_CANCEL}
      onCancel={close}
      width={1000}
      confirmLoading={isFetching}
    >
      <Form
        form={form}
        name="projectForm"
        initialValues={initialValues}
        validateMessages={validateMessages}
        {...formLayout}
      >
        <Form.Item
          label={I18N.PROJECT_THUMBNAIL}
          name="thumbnail"
          valuePropName="fileList"
          getValueFromEvent={normalizeFile}
          rules={[{ required: true }]}
        >
          <SingleUpload />
        </Form.Item>
        <Form.Item
          label={I18N.PROJECT_TITLE}
          name="title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={I18N.PROJECT_HEADER} name="header">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label={I18N.PROJECT_QUICK_VIEW_URL} name="quickViewUrl">
          <Input />
        </Form.Item>
        <Form.Item label={I18N.PROJECT_CLIENT} name="client">
          <Input />
        </Form.Item>
        <Form.Item label={I18N.PROJECT_AGENCY} name="agency">
          <Input />
        </Form.Item>
        <Form.Item label={I18N.PROJECT_ROLE} name="role">
          <Input />
        </Form.Item>
        <Form.Item label={I18N.PROJECT_CATEGORY} name="category">
          <Radio.Group>
            <Radio value="work">Work</Radio>
            <Radio value="lab">Lab</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label={I18N.PROJECT_HEADER_IMAGE}
          name="headerImage"
          valuePropName="fileList"
          getValueFromEvent={normalizeFile}
          rules={[{ required: true }]}
        >
          <SingleUpload className="header-uploader" />
        </Form.Item>
        <Form.List name="videoUrls">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index !== 0 && {
                    wrapperCol: {
                      span: FORM_WRAPPER_COL_SPAN,
                      offset: FORM_LABEL_COL_SPAN,
                    },
                  })}
                  label={index === 0 ? I18N.PROJECT_VIDEO_URL : ''}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    noStyle
                    rules={[{ required: true, whitespace: true }]}
                  >
                    <Input style={{ width: '60%' }} />
                  </Form.Item>
                  <VideoUrlDeleteButton onClick={() => remove(field.name)} />
                </Form.Item>
              ))}
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ width: '100%' }}
                >
                  {I18N.PROJECT_FORM_ADD_VIDEO_URL}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item
          label={I18N.PROJECT_SNAPSHOT_COLUMN}
          name="snapshotColumn"
          rules={[{ required: true, type: 'number', min: 1 }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={I18N.PROJECT_SNAPSHOTS}
          name="snapshots"
          valuePropName="fileList"
          getValueFromEvent={normalizeFile}
        >
          <Upload
            accept="image/*"
            name="upload"
            action={`${API_HOST}/upload`}
            listType="picture-card"
            multiple={true}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>{I18N.PROJECT_FORM_UPLOAD}</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

const initialValues = {
  category: 'work',
  snapshotColumn: 1,
};

const validateMessages = {
  required: I18N.PROJECT_FORM_VALIDATE_MESSAGE_REQUIRED,
  whitespace: I18N.PROJECT_FORM_VALIDATE_MESSAGE_WHITESPACE,
  types: {
    number: I18N.PROJECT_FORM_VALIDATE_MESSAGE_TYPES_NUMBER,
  },
  number: {
    min: I18N.PROJECT_FORM_VALIDATE_MESSAGE_NUMBER_MIN,
  },
};

const FORM_LABEL_COL_SPAN = 6;
const FORM_WRAPPER_COL_SPAN = 18;

const formLayout = {
  labelCol: { span: FORM_LABEL_COL_SPAN },
  wrapperCol: { span: FORM_WRAPPER_COL_SPAN },
};

const VideoUrlDeleteButton = styled(MinusCircleOutlined)`
  margin: 0 8px;
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;

  &:hover {
    color: #777;
  }
`;

function normalizeFile(e) {
  if (Array.isArray(e)) return e;

  return e && e.fileList;
}

/**
 *
 * @param {object} values
 */
function normalizeValues({
  id,
  thumbnail,
  title,
  header,
  quickViewUrl,
  client,
  agency,
  role,
  category,
  headerImage,
  snapshotColumn,
  videoUrls,
  snapshots,
}) {
  const thumbnailImageUrl = thumbnail[0]?.response || '';
  const headerImageUrl = headerImage[0]?.response || '';
  const snapshotUrls = snapshots?.map(item => item.response) || [];

  return {
    id,
    thumbnailImageUrl,
    title,
    header,
    quickViewUrl,
    client,
    agency,
    role,
    category,
    headerImageUrl,
    snapshotColumn,
    videoUrls: videoUrls || [],
    snapshotUrls,
  };
}

function isUploading(values) {
  const { thumbnail, headerImage, snapshots } = values;

  return [...thumbnail, ...headerImage, ...(snapshots || [])].some(
    file => file.status === 'uploading'
  );
}
