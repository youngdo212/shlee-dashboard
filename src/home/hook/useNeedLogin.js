import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AuthStatus } from '../../common/constant';

export default function useNeedLogin() {
  const history = useHistory();
  const authStatus = useSelector(state => state.auth.status);

  useEffect(() => {
    if (authStatus === AuthStatus.NotLogin) {
      history.replace('/auth/login');
    }
  }, [authStatus, history]);
}
