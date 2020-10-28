import React from 'react';
import { Layout } from 'antd';
import { TableOutlined, DashboardOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import User from '../../common/component/User';
import routes from '../../common/routes/home';
import Navigation from '../../common/component/Navigation';
import { I18N, Path } from '../../common/constant';
import { useDispatch, useSelector } from 'react-redux';
import { actions as authActions } from '../../auth/state';
import useNeedLogin from '../hook/useNeedLogin';

function Home() {
  useNeedLogin();

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  function selectMenu({ key }) {
    history.push(key);
  }

  return (
    <Layout>
      <LeftPanel>
        <Logo>Sunghwan Lee</Logo>
        <Navigation
          items={navigationItems}
          onSelect={selectMenu}
          selectedKeys={[location.pathname]}
        />
      </LeftPanel>
      <RightPanel>
        <Header>
          <User
            name={user?.name}
            logout={() => dispatch(authActions.fetchLogout())}
          />
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
  [Path.Dashboard]: I18N.NAVIGATION_TEXT_DASHBOARD,
  [Path.Project]: I18N.NAVIGATION_TEXT_PROJECT,
};

const navigationItems = routes.map(route => ({
  key: route.path,
  icon: navigationIconMap[route.path],
  children: navigationTextMap[route.path],
}));

const { Content } = Layout;

const LeftPanel = styled(Layout.Sider)`
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

export default Home;
