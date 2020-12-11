import React from 'react';
import { render } from 'test-utils';
import SingleUpload from './SingleUpload';

it('충돌 없이 렌더링을 올바르게 수행한다', () => {
  render(<SingleUpload />);
});

it('fileList prop이 빈 배열인 경우 미리보기 이미지를 렌더링하지 않는다', () => {
  const mockFileList = [];
  const { queryByAltText } = render(<SingleUpload fileList={mockFileList} />);

  expect(queryByAltText('uploaded')).toBe(null);
});

it('fileList prop에 빈 배열이 아니지만 배열의 요소에 url 속성값이 없을 경우 미리보기 이미지를 렌더링하지 않는다', () => {
  const mockFileList = [{}];
  const { queryByAltText } = render(<SingleUpload fileList={mockFileList} />);

  expect(queryByAltText('uploaded')).toBe(null);
});

it('fileList prop에 빈 배열이 아니지만 배열의 요소에 response.url 속성값이 없을 경우 미리보기 이미지를 렌더링하지 않는다', () => {
  const mockFileList = [{ response: {} }];
  const { queryByAltText } = render(<SingleUpload fileList={mockFileList} />);

  expect(queryByAltText('uploaded')).toBe(null);
});

it('fileList prop에 file 객체를 요소로 가지는 배열과 file.url이 존재할 경우 미리보기 이미지를 렌더링한다', () => {
  const mockFileList = [{ url: 'test' }];
  const { getByAltText } = render(<SingleUpload fileList={mockFileList} />);

  expect(getByAltText('uploaded')).toBeInTheDocument();
});

it('fileList prop에 file 객체를 요소로 가지는 배열과 file.reponse.url이 존재할 경우 미리보기 이미지를 렌더링한다', () => {
  const mockFileList = [
    {
      response: {
        url: 'test',
      },
    },
  ];
  const { getByAltText } = render(<SingleUpload fileList={mockFileList} />);

  expect(getByAltText('uploaded')).toBeInTheDocument();
});
