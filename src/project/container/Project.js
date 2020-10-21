import React from 'react';
import { useLocation } from 'react-router-dom';
import ContentHeader from '../../common/component/ContentHeader';

export default function Project() {
  const location = useLocation();
  return (
    <>
      <ContentHeader pathname={location.pathname} />
      <div>hello world</div>
    </>
  );
}
