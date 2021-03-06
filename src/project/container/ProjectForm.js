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
import useFetchInfo from '../../common/hook/useFetchInfo';
import { actions } from '../state';

/**
 * 신규 프로젝트 생성 및 기존 프로젝트 수정 시 사용되는 폼 컴포넌트
 *
 * @param {object} param
 * @param {boolean} param.isNew
 * @param {object} param.project
 * @param {boolean} param.visible
 * @param {(values: object) => void} param.onCreate
 * @param {() => void} param.onCancel
 */
export default function ProjectForm({
  isNew,
  project,
  visible,
  onCreate,
  onCancel,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    const values = createValues(project);
    form.setFieldsValue(values);
  }, [project, form]);

  useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [visible, form]);

  function submit() {
    form
      .validateFields()
      .then(values => {
        if (isUploading(values)) {
          Modal.warn({
            title: I18N.PROJECT_FORM_VALIDATE_MESSAGE_UPLOADING,
          });
        } else {
          onCreate(normalizeValues({ ...values }));
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
        onCancel();
      },
    });
  }

  const { isFetching } = useFetchInfo(
    actions.fetchUpdateProject.toString(),
    project.id
  );

  return (
    <Modal
      title={
        isNew ? I18N.PROJECT_FORM_TITLE_CREATE : I18N.PROJECT_FORM_TITLE_EDIT
      }
      visible={visible}
      okText={
        isNew ? I18N.PROJECT_FORM_SUBMIT_CREATE : I18N.PROJECT_FORM_SUBMIT_EDIT
      }
      onOk={submit}
      cancelText={I18N.PROJECT_FORM_CANCEL}
      onCancel={close}
      width={1000}
      confirmLoading={isFetching}
      forceRender
    >
      <Form
        form={form}
        name="projectForm"
        initialValues={INITIAL_VALUES}
        validateMessages={validateMessages}
        {...formLayout}
      >
        <Form.Item hidden={true} name="id">
          <Input />
        </Form.Item>
        <Form.Item
          label={I18N.PROJECT_THUMBNAIL}
          name="thumbnail"
          valuePropName="fileList"
          getValueFromEvent={normalizeFile({ maxLength: 1 })}
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
          getValueFromEvent={normalizeFile({ maxLength: 1 })}
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
          getValueFromEvent={normalizeFile()}
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

const INITIAL_VALUES = {
  id: null,
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

/**
 *
 * @param {object} param
 * @param {number=} param.maxLength
 */
function normalizeFile({ maxLength = 0 } = {}) {
  return function (e) {
    if (Array.isArray(e)) return e.slice(-1 * maxLength);

    return e && e.fileList.slice(-1 * maxLength);
  };
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
  const thumbnailImageUrl = getUrlListFromFileList(thumbnail)[0] || '';
  const headerImageUrl = getUrlListFromFileList(headerImage)[0] || '';
  const snapshotUrls = getUrlListFromFileList(snapshots);

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

/**
 *
 * @param {object} project
 * @param {any} project.id
 * @param {any=} project.thumbnailImageUrl
 * @param {any=} project.title
 * @param {any=} project.header
 * @param {any=} project.quickViewUrl
 * @param {any=} project.client
 * @param {any=} project.agency
 * @param {any=} project.role
 * @param {any=} project.category
 * @param {any=} project.headerImageUrl
 * @param {any=} project.snapshotColumn
 * @param {any=} project.snapshotUrls
 * @param {any=} project.videoUrls
 */
function createValues(project) {
  // 1. 프로젝트를 생성한 경우 {id: 1}
  // 2. 프로젝트를 수정하는 경우 {id: xxx, title, thumbnailImageUrl, header, ...}
  if (project.id) {
    return {
      id: project.id,
      thumbnail: createFileListByUrl(project.thumbnailImageUrl),
      title: project.title || '',
      header: project.header || '',
      quickViewUrl: project.quickViewUrl || '',
      client: project.client || '',
      agency: project.agency || '',
      role: project.role || '',
      category: project.category || 'work',
      headerImage: createFileListByUrl(project.headerImageUrl),
      snapshotColumn: project.snapshotColumn || 1,
      snapshots: createFileListByUrl(project.snapshotUrls),
      videoUrls: project.videoUrls || [],
    };
  } else {
    return INITIAL_VALUES;
  }
}

/**
 *
 * @param {string | string[]=} urls
 * @returns {array}
 */
function createFileListByUrl(urls) {
  if (!urls) return [];

  const FileFormat = {
    uid: -1,
    status: 'done',
    url: '',
  };

  if (Array.isArray(urls)) {
    return urls.map((url, index) => ({
      ...FileFormat,
      uid: (index + 1) * -1,
      url,
    }));
  } else {
    return [{ ...FileFormat, url: urls }];
  }
}

/**
 *
 * @param {array} fileList
 * @returns {array}
 */
function getUrlListFromFileList(fileList) {
  if (!fileList) return [];

  return fileList.map(file => {
    if (file.response) {
      return file.response.url;
    } else if (file.url) {
      return file.url;
    } else {
      return null;
    }
  });
}
