import React from 'react';
import { render } from 'test-utils';
import SingleUpload from './SingleUpload';

it('충돌 없이 렌더링을 올바르게 수행한다', () => {
  render(<SingleUpload />);
});
