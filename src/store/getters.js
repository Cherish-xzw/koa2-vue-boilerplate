const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.auth.token,
  userInfo: state => state.user.userInfo,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
};
export default getters;
