import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthApi from '../api';
import { AuthDataContext } from '../AuthDataContext';
import { getUserDetails } from '../../api/user';

const useAuthDataContext = () => {
  const [state, setState] = useContext(AuthDataContext);
  const history = useHistory();

  const signIn = async (username, password) => {
    const user = await AuthApi.signIn(username, password);
    await setUser(user);
    return user;
  };

  const signOut = async () => {
    const response = await AuthApi.signOut();
    await setUser(null);
    goToPage('/');
    return response;
  };

  const signUp = async (username, password, attributes = {}) =>
    await AuthApi.signUp(username, password, attributes);

  const confirmSignUp = async (username, code) =>
    await AuthApi.confirmSignUp(username, code);

  const resendSignUp = async (username) => await AuthApi.resendSignUp(username);

  const resetPassword = async (username) =>
    await AuthApi.resetPassword(username);

  const confirmResetPassword = async (username, code, password) =>
    await AuthApi.confirmResetPassword(username, code, password);

  const goToPage = (page) => history.push(page ? page : state.landingPage);

  const setUserState = (user) =>
    setState((state) => ({
      ...state,
      user: user && user.data,
      isSignedIn: user && user.success,
    }));

  const setUser = async (user) => {
    // User must change password
    if (user && user.challengeName) {
      return;
    }

    if (user && user.success) {
      const result = await getUserDetails(user.data.sub);
      setUserState(result);
    } else {
      setUserState(user);
    }
  };

  return {
    isSignedIn: state.isSignedIn,
    user: state.user,
    signIn,
    signOut,
    signUp,
    goToPage,
    confirmSignUp,
    resendSignUp,
    resetPassword,
    confirmResetPassword,
  };
};

export default useAuthDataContext;
