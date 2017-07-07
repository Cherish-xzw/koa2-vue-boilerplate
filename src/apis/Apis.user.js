import yFetch from '../utils/yFetch';

const getCurrentUser = (id) => {
  return yFetch(`/auth/user/${id}`, 'GET')
}

const postLogin = (param = { name, password }) => {
  return yFetch('/auth/user', 'POST', param)
}

const postLogout = () => {
  return yFetch('/auth/logout', 'GET', null, { headers: { 'Accept': 'text/plain' } })
}

export {
  getCurrentUser,
  postLogin,
  postLogout
}
