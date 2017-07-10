import yFetch from '@/utils/yFetch';

const postLogin = (email, password) => {
  return yFetch('/user/login', 'POST', { email, password });
};

const postLogout = () => {
  return yFetch('/user/logout', 'GET', null, { headers: { Accept: 'text/plain' } });
};

const getUserInfo = () => {
  return yFetch('/user', 'GET');
};

export {
  postLogin,
  postLogout,
  getUserInfo
};
