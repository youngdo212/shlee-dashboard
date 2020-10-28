import Login from '../../auth/container/Login';
import Home from '../../home/container/Home';
import { Path } from '../constant';

const routes = [
  {
    exact: false,
    path: Path.Login,
    component: Login,
  },
  {
    exact: false,
    path: Path.Home,
    component: Home,
  },
];

export default routes;
