import Dashboard from '../../dashboard/container/Dashboard';
import Project from '../../project/container/Project';
import { Path } from '../constant';

const routes = [
  {
    exact: true,
    path: Path.Dashboard,
    component: Dashboard,
  },
  {
    exact: false,
    path: Path.Project,
    component: Project,
  },
];

export default routes;
