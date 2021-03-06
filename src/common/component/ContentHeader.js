import React from 'react';
import { I18N, Path } from '../constant';
import styled from 'styled-components';
import { PageHeader } from 'antd';
import { Link, useLocation } from 'react-router-dom';

/**
 * Breadcrumb를 포함한 컴포넌트의 헤더 정보를 갖고있는 컴포넌트.
 */
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
  [Path.Dashboard]: I18N.BREADCRUMB_NAME_DASHBOARD,
  [Path.Project]: I18N.BREADCRUMB_NAME_PROJECT,
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
