import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { API_HOST, I18N } from '../../common/constant';

/**
 * 한개의 이미지만 업로드 가능한 업로드 컴포넌트
 *
 * @param {object} param
 * @param {function=} param.onChange
 * @param {array=} param.fileList
 */
export default function SingleUpload({ onChange, fileList, ...restProps }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (fileList) {
      const [file] = fileList;
      setImageUrl(file?.url || file?.response?.url);
    }
  }, [fileList]);

  function handleChange(e) {
    if (e.file.status === 'uploading') {
      setLoading(true);
    } else if (e.file.status === 'done') {
      setLoading(false);
    }

    onChange && onChange(e);
  }

  return (
    <Upload
      name="upload"
      action={`${API_HOST}/upload`}
      accept="image/*"
      listType="picture-card"
      showUploadList={false}
      onChange={handleChange}
      fileList={fileList}
      {...restProps}
    >
      {!!imageUrl ? (
        <img alt="uploaded" src={imageUrl} style={{ width: '100%' }} />
      ) : (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>{I18N.PROJECT_FORM_UPLOAD}</div>
        </div>
      )}
    </Upload>
  );
}
