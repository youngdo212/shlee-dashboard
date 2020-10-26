import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import React, { useState } from 'react';
import { API_HOST, I18N } from '../../common/constant';

/**
 *
 * @param {object} param
 * @param {function=} param.onChange
 */
export default function SingleUpload({ onChange, ...restProps }) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  function handleChange(e) {
    if (e.file.status === 'uploading') {
      setLoading(true);
    } else if (e.file.status === 'done') {
      getBase64(e.file.originFileObj, imageUrl => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
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

function getBase64(file, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(file);
}
