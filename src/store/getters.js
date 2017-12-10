const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  twotoken: state => state.user.twotoken,
  name: state => state.user.name,
  issetpassword: state => state.user.issetpassword,
  status: state => state.user.status,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
