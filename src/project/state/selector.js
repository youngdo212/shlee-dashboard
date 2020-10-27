import { createSelector } from 'reselect';

export const getProjectList = state => state.project.projectList;
export const getCurrentProjectId = state => state.project.currentProjectId;

export const getProjectListWithKey = createSelector(
  getProjectList,
  projectList => projectList.map(project => ({ ...project, key: project.id }))
);

export const getCurrentProject = createSelector(
  getProjectList,
  getCurrentProjectId,
  (projectList, currentProjectId) =>
    projectList.find(project => project.id === currentProjectId)
);
