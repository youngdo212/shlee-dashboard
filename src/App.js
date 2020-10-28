import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import useRemoveLoadingIcon from './common/hook/useRemoveLoadingIcon';
import { Route, Switch } from 'react-router-dom';
import routes from './common/routes/index';
import { useDispatch, useSelector } from 'react-redux';
import { actions as authActions } from './auth/state';

function App() {
  useRemoveLoadingIcon();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.fetchUser());
  }, [dispatch]);

  const authStatus = useSelector(state => state.auth.status);
  return (
    <>
      {authStatus && (
        <Switch>
          {routes.map(route => (
            <Route key={route.path} {...route} />
          ))}
        </Switch>
      )}
    </>
  );
}

export default App;
