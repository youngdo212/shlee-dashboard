export const API_HOST = process.env.REACT_APP_API_HOST;
export const Path = {
  Dashboard: '/',
  Project: '/project',
};
export const FetchStatus = {
  Request: 'Request',
  Success: 'Success',
  Fail: 'Fail',
};
export const FETCH_KEY = Symbol('FETCH_KEY');
export const FETCH_PAGE = Symbol('FETCH_PAGE');
/* eslint-disable no-template-curly-in-string */
export const I18N = {
  LOGOUT: '로그아웃',
  NAVIGATION_TEXT_DASHBOARD: '대시보드',
  NAVIGATION_TEXT_PROJECT: '프로젝트',
  BREADCRUMB_NAME_DASHBOARD: '홈',
  BREADCRUMB_NAME_PROJECT: '프로젝트',
  PROJECT_LIST: '프로젝트 리스트',
  ADD_PROJECT: '프로젝트 추가',
  PROJECT_LIST_COLUMN_ACTION: 'Action',
  PROJECT_LIST_ITEM_EDIT: '수정',
  PROJECT_LIST_ITEM_REMOVE: '삭제',
  PROJECT_LIST_ITEM_REMOVE_CONFIRM_TITLE: '정말로 삭제 하시겠습니까?',
  PROJECT_LIST_ITEM_REMOVE_CONFIRM_CONTENT:
    '삭제된 프로젝트는 되돌릴 수 없습니다',
  PROJECT_LIST_ITEM_REMOVE_CONFIRM_OK: '삭제',
  PROJECT_LIST_ITEM_REMOVE_CONFIRM_CANCEL: '취소',
  PROJECT_FORM_TITLE: '프로젝트 생성',
  PROJECT_FORM_UPLOAD: 'Upload',
  PROJECT_FORM_SUBMIT: '생성',
  PROJECT_FORM_CANCEL: '취소',
  PROJECT_FORM_CANCEL_CONFIRM_TITLE: '정말 창을 닫으시겠습니까?',
  PROJECT_FORM_CANCEL_CONFIRM_CONTENT:
    '현재 작업중인 정보를 잃게 됩니다. 창을 닫으시겠습니까?',
  PROJECT_FORM_CANCEL_CONFIRM_OK: '닫기',
  PROJECT_FORM_CANCEL_CONFIRM_CANCEL: '취소',
  PROJECT_FORM_ADD_VIDEO_URL: 'Video url 추가',
  PROJECT_FORM_VALIDATE_MESSAGE_REQUIRED: '이 값은 필수입니다',
  PROJECT_FORM_VALIDATE_MESSAGE_WHITESPACE: '빈 값은 입력할 수 없습니다',
  PROJECT_FORM_VALIDATE_MESSAGE_TYPES_NUMBER:
    '${label} 값에는 숫자를 입력해야 합니다',
  PROJECT_FORM_VALIDATE_MESSAGE_NUMBER_MIN: '${min} 이상의 값을 입력하세요',
  PROJECT_FORM_VALIDATE_MESSAGE_UPLOADING: '아직 업로드 중인 파일이 있습니다',
  PROJECT_TITLE: 'Title',
  PROJECT_THUMBNAIL: 'Thumbnail',
  PROJECT_HEADER: 'Header',
  PROJECT_QUICK_VIEW_URL: 'Quick View Url',
  PROJECT_CLIENT: 'Client',
  PROJECT_AGENCY: 'Agency',
  PROJECT_ROLE: 'Role',
  PROJECT_CATEGORY: 'Category',
  PROJECT_HEADER_IMAGE: 'Header Image',
  PROJECT_VIDEO_URL: 'Video Url',
  PROJECT_SNAPSHOT_COLUMN: 'Snapshot Column',
  PROJECT_SNAPSHOTS: 'Snapshots',
};
/* eslint-enable no-template-curly-in-string */
