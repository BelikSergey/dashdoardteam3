const getIsAuthenticated = state => state.auth.isAuthenticated;
const getUserEmail = state => state.auth.user.email;//???
const getToken = state => state.auth.token;//???
const getLoading = state => state.auth.loading;
const getError = state => state.auth.error;

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getIsAuthenticated,
  getUserEmail,
  getToken,
  getLoading,
  getError,
};