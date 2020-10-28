import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { I18N } from '../../common/constant';
import useBlockLoginUser from '../hook/useBlockLoginUser';
import { actions } from '../state';

export default function Login() {
  useBlockLoginUser();

  const dispatch = useDispatch();

  function submit(values) {
    dispatch(actions.fetchLogin(values));
  }
  return (
    <>
      <Row justify="center" style={{ marginTop: 150 }}>
        <Col>
          <Typography.Title>Sunghwan Lee</Typography.Title>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 50 }}>
        <Col>
          <Form name="login" onFinish={submit} style={{ width: 300 }}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: I18N.AUTH_FORM_VALIDATE_MESSAGE_REQUIRED_EMAIL,
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={I18N.AUTH_FORM_EMAIL_PLACEHOLDER}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: I18N.AUTH_FORM_VALIDATE_MESSAGE_REQUIRED_PASSWORD,
                },
              ]}
            >
              <Input
                type="password"
                prefix={<LockOutlined />}
                placeholder={I18N.AUTH_FORM_PASSWORD_PLACEHOLDER}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                {I18N.AUTH_FORM_SUBMIT_BUTTON}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
