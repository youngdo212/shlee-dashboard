import { createSelector } from 'reselect';

export const getProjectList = state => state.project.projectList;

export const getProjectListWithKey = createSelector(
  getProjectList,
  projectList => projectList.map(project => ({ ...project, key: project.id }))
);
