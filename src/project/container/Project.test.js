import React from 'react';
import { renderWithRouter } from 'test-utils';
import Project from './Project';

it('충돌 없이 올바르게 렌더링을 수행한다', () => {
  renderWithRouter(<Project />);
});
