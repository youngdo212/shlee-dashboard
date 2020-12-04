import React from 'react';
import { render } from 'test-utils';
import ProjectForm from './ProjectForm';

it('충돌 없이 렌더링을 올바르게 수행한다', () => {
  const onCreate = () => {};
  const onCancel = () => {};
  render(
    <ProjectForm
      isNew={true}
      visible={true}
      project={{}}
      onCreate={onCreate}
      onCancel={onCancel}
    />
  );
});
