import axios from 'axios';
import authActions from './auth-actions';

//axios.defaults.baseURL = 'https://questify-backend.goit.global/';
axios.defaults.baseURL = 'https://goit-backend-23.herokuapp.com/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = credentials => async dispatch => {
  dispatch(authActions.registerRequest());

  try {
    const response = await axios.post('/api/users/signup', credentials);
    
    token.set(response.data.token);
    dispatch(authActions.registerSuccess(response.data));
  } catch (error) {
     dispatch(authActions.registerError(error.message));
    }
   
};

const logIn = credentials => async dispatch => {
  dispatch(authActions.loginRequest());

  try {
    const response = await axios.post('/api/users/login', credentials);

    token.set(response.data.token);
    dispatch(authActions.loginSuccess(response.data));
  } catch (error) {
    dispatch(authActions.loginError(error.message));
  }
};

const logOut = () => async dispatch => {
  dispatch(authActions.logoutRequest());

  try {
    await axios.post('/api/users/logout');

    token.unset();
    //данные никакие не передаём, это чтобы очистить state
    // (сбросить в начальное состояние)
    dispatch(authActions.logoutSuccess());
  } catch (error) {
    dispatch(authActions.logoutError(error.message));
  }
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { register, logIn, logOut };