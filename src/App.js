import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { TableOutlined, DashboardOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import User from './common/component/User';
import routes from './common/routes';
import Navigation from './common/component/Navigation';
import { Path } from './common/constant';
import useRemoveLoadingIcon from './common/hook/useRemoveLoadingIcon';

function App() {
  const history = useHistory();
  const location = useLocation();

  function selectMenu({ key }) {
    history.push(key);
  }

  useRemoveLoadingIcon();

  return (
    <Layout>
      <Sider>
        <Logo>Sunghwan Lee</Logo>
        <Navigation
          items={navigationItems}
          onSelect={selectMenu}
          selectedKeys={[location.pathname]}
        />
      </Sider>
      <RightPanel>
        <Header>
          <User name="영도" logout={() => {}} />
        </Header>
        <Content>
          <Switch>
            {routes.map(route => (
              <Route key={route.path} {...route} />
            ))}
          </Switch>
        </Content>
        <Footer>Shlee Dashboard ©2020 Created by mando</Footer>
      </RightPanel>
    </Layout>
  );
}

const navigationIconMap = {
  [Path.Dashboard]: <DashboardOutlined />,
  [Path.Project]: <TableOutlined />,
};

const navigationTextMap = {
  [Path.Dashboard]: '대시보드',
  [Path.Project]: '프로젝트',
};

const navigationItems = routes.map(route => ({
  key: route.path,
  icon: navigationIconMap[route.path],
  children: navigationTextMap[route.path],
}));

const { Content } = Layout;

const Sider = styled(Layout.Sider)`
  overflow: 'auto';
  height: 100vh;
  position: fixed;
  left: 0;
`;

const Logo = styled.div`
  height: 32px;
  margin: 16px;
  color: #fff;
  text-align: center;
  font-size: 1.3rem;
`;

const Header = styled(Layout.Header)`
  background: #fff;
  text-align: right;
  padding: 0 20px;
  height: 48px;
  line-height: 48px;
`;

const RightPanel = styled(Layout)`
  margin-left: 200px;
`;

const Footer = styled(Layout.Footer)`
  text-align: center;
`;

export default App;
