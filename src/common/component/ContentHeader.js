import React from 'react';
import { Path } from '../constant';
import styled from 'styled-components';
import { PageHeader } from 'antd';
import { Link, useLocation } from 'react-router-dom';

export default function ContentHeader() {
  const location = useLocation();
  const routes = getBreadcrumbRoutes(location.pathname);
  const title = breadcrumbNameMap[routes[routes.length - 1]?.path];

  function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={route.path}>{route.breadcrumbName}</Link>
    );
  }

  return <StyledPageHeader title={title} breadcrumb={{ routes, itemRender }} />;
}

const breadcrumbNameMap = {
  [Path.Dashboard]: '홈',
  [Path.Project]: '프로젝트',
};

const StyledPageHeader = styled(PageHeader)`
  background: #fff;
  margin-top: 3px;
`;

// TODO: 테스트 코드 작성
function getBreadcrumbRoutes(pathname) {
  const pathSnippets = pathname.split('/').filter(item => !!item);
  let breadcrumbUrls = pathSnippets.map(
    (_, index) => `/${pathSnippets.slice(0, index + 1).join('/')}`
  );
  breadcrumbUrls = ['/', ...breadcrumbUrls];
  const routes = breadcrumbUrls.map(url => ({
    path: url,
    breadcrumbName: breadcrumbNameMap[url],
  }));

  return routes;
}
