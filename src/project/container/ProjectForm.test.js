import { I18N } from 'common/constant';
import React from 'react';
import { render, screen, fireEvent, wait } from 'test-utils';
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

it('새로운 프로젝트를 생성할 경우 알맞은 UI를 렌더링한다', async () => {
  render(
    <ProjectForm
      isNew={true}
      visible={true}
      project={{}}
      onCreate={() => {}}
      onCancel={() => {}}
    />
  );

  expect(
    await screen.findByText(I18N.PROJECT_FORM_TITLE_CREATE)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(I18N.PROJECT_FORM_SUBMIT_CREATE)
  ).toBeInTheDocument();
});

it('기존 프로젝트를 수정할 경우 알맞은 UI를 렌더링한다', async () => {
  render(
    <ProjectForm
      isNew={false}
      visible={true}
      project={{}}
      onCreate={() => {}}
      onCancel={() => {}}
    />
  );

  expect(
    await screen.findByText(I18N.PROJECT_FORM_TITLE_EDIT)
  ).toBeInTheDocument();
  expect(
    await screen.findByText(I18N.PROJECT_FORM_SUBMIT_EDIT)
  ).toBeInTheDocument();
});

// TODO: thumbnail, headerImage, snapshot의 input에 file 객체가 제대로 들어갔는지 확인하기
// TODO: category와 snapshotColumn에 적합한 byRole quries 적용하기
it('project prop에 맞게 알맞은 폼 value를 설정한다', async () => {
  const project = {
    id: 'test-id',
    thumbnailImageUrl: 'test-thumbnailUrl',
    title: 'test-title',
    header: 'test-header',
    quickViewUrl: 'test-quickViewUrl',
    client: 'test-clinet',
    agency: 'test-agency',
    role: 'test-role',
    category: 'lab',
    headerImageUrl: 'test-headerImageUrl',
    snapshotColumn: 2,
    snapshotUrls: ['test-snapshotUrl1', 'test-snapshotUrl2'],
    videoUrls: ['test-videoUrl1', 'test-videoUrl2'],
  };

  render(
    <ProjectForm
      isNew={false}
      visible={true}
      project={project}
      onCreate={() => {}}
      onCancel={() => {}}
    />
  );

  expect(await screen.findByDisplayValue(project.title)).toBeInTheDocument();
  expect(await screen.findByDisplayValue(project.header)).toBeInTheDocument();
  expect(
    await screen.findByDisplayValue(project.quickViewUrl)
  ).toBeInTheDocument();
  expect(await screen.findByDisplayValue(project.client)).toBeInTheDocument();
  expect(await screen.findByDisplayValue(project.agency)).toBeInTheDocument();
  expect(await screen.findByDisplayValue(project.role)).toBeInTheDocument();
  // expect(await screen.findByRole('radio', { checked: true })).toBe(
  //   project.category
  // );
  // expect((await screen.findByRole('spinbutton')).value).toBe(
  //   project.snapshotColumn.toString()
  // );
  expect(
    await screen.findByDisplayValue(project.videoUrls[0])
  ).toBeInTheDocument();
  expect(
    await screen.findByDisplayValue(project.videoUrls[1])
  ).toBeInTheDocument();
});

it('visible prop이 false인 경우 폼 value를 리셋한다', async () => {
  const project = {
    id: 'test-id',
    thumbnailImageUrl: 'test-thumbnailUrl',
    title: 'test-title',
    header: 'test-header',
    quickViewUrl: 'test-quickViewUrl',
    client: 'test-clinet',
    agency: 'test-agency',
    role: 'test-role',
    category: 'lab',
    headerImageUrl: 'test-headerImageUrl',
    snapshotColumn: 2,
    snapshotUrls: ['test-snapshotUrl1', 'test-snapshotUrl2'],
    videoUrls: ['test-videoUrl1', 'test-videoUrl2'],
  };

  render(
    <ProjectForm
      isNew={false}
      visible={false}
      project={project}
      onCreate={() => {}}
      onCancel={() => {}}
    />
  );

  expect(screen.queryByDisplayValue(project.title)).not.toBeInTheDocument();
  expect(screen.queryByDisplayValue(project.header)).not.toBeInTheDocument();
  expect(
    screen.queryByDisplayValue(project.quickViewUrl)
  ).not.toBeInTheDocument();
  expect(screen.queryByDisplayValue(project.client)).not.toBeInTheDocument();
  expect(screen.queryByDisplayValue(project.agency)).not.toBeInTheDocument();
  expect(screen.queryByDisplayValue(project.role)).not.toBeInTheDocument();
  // expect(screen.queryByRole('radio', { checked: true })).toBe(
  //   'work'
  // );
  // expect((screen.queryByRole('spinbutton')).value).toBe(
  //   '1'
  // );
  expect(
    screen.queryByDisplayValue(project.videoUrls[0])
  ).not.toBeInTheDocument();
  expect(
    screen.queryByDisplayValue(project.videoUrls[1])
  ).not.toBeInTheDocument();
});

it('폼 제출에 성공하면 onCreate 핸들러가 올바른 인자와 함께 호출된다', async () => {
  const callback = jest.fn();
  const project = {
    id: 'test-id',
    thumbnailImageUrl: 'test-thumbnailUrl',
    title: 'test-title',
    header: 'test-header',
    quickViewUrl: 'test-quickViewUrl',
    client: 'test-clinet',
    agency: 'test-agency',
    role: 'test-role',
    category: 'lab',
    headerImageUrl: 'test-headerImageUrl',
    snapshotColumn: 2,
    snapshotUrls: ['test-snapshotUrl1', 'test-snapshotUrl2'],
    videoUrls: ['test-videoUrl1', 'test-videoUrl2'],
  };

  render(
    <ProjectForm
      isNew={false}
      visible={true}
      project={project}
      onCreate={callback}
      onCancel={() => {}}
    />
  );

  fireEvent.click(await screen.findByText(I18N.PROJECT_FORM_SUBMIT_EDIT));

  await wait(() => {
    expect(callback.mock.calls[0][0]).toEqual(project);
  });
});

it('thumbnail이 없을 경우 폼 제출에 실패한다', async () => {
  const callback = jest.fn();
  const project = {
    id: 'test-id',
    title: 'test-title',
    header: 'test-header',
    quickViewUrl: 'test-quickViewUrl',
    client: 'test-clinet',
    agency: 'test-agency',
    role: 'test-role',
    category: 'lab',
    headerImageUrl: 'test-headerImageUrl',
    snapshotColumn: 2,
    snapshotUrls: ['test-snapshotUrl1', 'test-snapshotUrl2'],
    videoUrls: ['test-videoUrl1', 'test-videoUrl2'],
  };

  render(
    <ProjectForm
      isNew={false}
      visible={true}
      project={project}
      onCreate={callback}
      onCancel={() => {}}
    />
  );

  fireEvent.click(await screen.findByText(I18N.PROJECT_FORM_SUBMIT_EDIT));

  await wait(() => {
    expect(callback).toHaveBeenCalledTimes(0);
  });
});

it('title이 없을 경우 폼 제출에 실패한다', async () => {
  const callback = jest.fn();
  const project = {
    id: 'test-id',
    thumbnailImageUrl: 'test-thumbnailUrl',
    title: '',
    header: 'test-header',
    quickViewUrl: 'test-quickViewUrl',
    client: 'test-clinet',
    agency: 'test-agency',
    role: 'test-role',
    category: 'lab',
    headerImageUrl: 'test-headerImageUrl',
    snapshotColumn: 2,
    snapshotUrls: ['test-snapshotUrl1', 'test-snapshotUrl2'],
    videoUrls: ['test-videoUrl1', 'test-videoUrl2'],
  };

  render(
    <ProjectForm
      isNew={false}
      visible={true}
      project={project}
      onCreate={callback}
      onCancel={() => {}}
    />
  );

  fireEvent.click(await screen.findByText(I18N.PROJECT_FORM_SUBMIT_EDIT));

  await wait(() => {
    expect(callback).toHaveBeenCalledTimes(0);
  });
});

it('헤더 이미지가 없을 경우 폼 제출에 실패한다', async () => {
  const callback = jest.fn();
  const project = {
    id: 'test-id',
    thumbnailImageUrl: 'test-thumbnailUrl',
    title: 'test-title',
    header: 'test-header',
    quickViewUrl: 'test-quickViewUrl',
    client: 'test-clinet',
    agency: 'test-agency',
    role: 'test-role',
    category: 'lab',
    snapshotColumn: 2,
    snapshotUrls: ['test-snapshotUrl1', 'test-snapshotUrl2'],
    videoUrls: ['test-videoUrl1', 'test-videoUrl2'],
  };

  render(
    <ProjectForm
      isNew={false}
      visible={true}
      project={project}
      onCreate={callback}
      onCancel={() => {}}
    />
  );

  fireEvent.click(await screen.findByText(I18N.PROJECT_FORM_SUBMIT_EDIT));

  await wait(() => {
    expect(callback).toHaveBeenCalledTimes(0);
  });
});

it('video url이 빈 공간으로 존재할 경우 폼 제출에 실패한다', async () => {
  const callback = jest.fn();
  const project = {
    id: 'test-id',
    thumbnailImageUrl: 'test-thumbnailUrl',
    title: 'test-title',
    header: 'test-header',
    quickViewUrl: 'test-quickViewUrl',
    client: 'test-clinet',
    agency: 'test-agency',
    role: 'test-role',
    category: 'lab',
    headerImageUrl: 'test-headerImageUrl',
    snapshotColumn: 2,
    snapshotUrls: ['test-snapshotUrl1', 'test-snapshotUrl2'],
    videoUrls: ['test-videoUrl1', ''],
  };

  render(
    <ProjectForm
      isNew={false}
      visible={true}
      project={project}
      onCreate={callback}
      onCancel={() => {}}
    />
  );

  fireEvent.click(await screen.findByText(I18N.PROJECT_FORM_SUBMIT_EDIT));

  await wait(() => {
    expect(callback).toHaveBeenCalledTimes(0);
  });
});

it('video url에 띄어 쓰기만 존재할 경우 폼 제출에 실패한다', async () => {
  const callback = jest.fn();
  const project = {
    id: 'test-id',
    thumbnailImageUrl: 'test-thumbnailUrl',
    title: 'test-title',
    header: 'test-header',
    quickViewUrl: 'test-quickViewUrl',
    client: 'test-clinet',
    agency: 'test-agency',
    role: 'test-role',
    category: 'lab',
    headerImageUrl: 'test-headerImageUrl',
    snapshotColumn: 2,
    snapshotUrls: ['test-snapshotUrl1', 'test-snapshotUrl2'],
    videoUrls: ['test-videoUrl1', ' '],
  };

  render(
    <ProjectForm
      isNew={false}
      visible={true}
      project={project}
      onCreate={callback}
      onCancel={() => {}}
    />
  );

  fireEvent.click(await screen.findByText(I18N.PROJECT_FORM_SUBMIT_EDIT));

  await wait(() => {
    expect(callback).toHaveBeenCalledTimes(0);
  });
});

it('snapshot column이 1이상의 숫자가 아닐 경우 폼 제출에 실패한다', async () => {
  const callback = jest.fn();
  const project = {
    id: 'test-id',
    thumbnailImageUrl: 'test-thumbnailUrl',
    title: 'test-title',
    header: 'test-header',
    quickViewUrl: 'test-quickViewUrl',
    client: 'test-clinet',
    agency: 'test-agency',
    role: 'test-role',
    category: 'lab',
    headerImageUrl: 'test-headerImageUrl',
    snapshotColumn: 'wrong',
    snapshotUrls: ['test-snapshotUrl1', 'test-snapshotUrl2'],
    videoUrls: ['test-videoUrl1', 'test-videoUrl2'],
  };

  render(
    <ProjectForm
      isNew={false}
      visible={true}
      project={project}
      onCreate={callback}
      onCancel={() => {}}
    />
  );

  fireEvent.click(await screen.findByText(I18N.PROJECT_FORM_SUBMIT_EDIT));

  await wait(() => {
    expect(callback).toHaveBeenCalledTimes(0);
  });
});

it('프로젝트 폼을 닫을 경우 onClose 함수가 호출된다', async () => {
  const callback = jest.fn();
  render(
    <ProjectForm
      isNew={true}
      visible={true}
      project={{}}
      onCreate={() => {}}
      onCancel={callback}
    />
  );

  // 모달의 취소 버튼 클릭
  fireEvent.click(await screen.findByText(I18N.PROJECT_FORM_CANCEL));
  // 모달의 컴펌 확인 버튼 클릭
  fireEvent.click(await screen.findByText(I18N.PROJECT_FORM_CANCEL_CONFIRM_OK));

  expect(callback).toHaveBeenCalledTimes(1);
});
