const userInfo = {
  name: 'admin',
  password: '12345678',
};

const postLogin = async function(ctx) {
  const data = ctx.request.body;
  if (data.email === userInfo.email && data.password === userInfo.password) {
    ctx.body = {
      id: 1,
      success: true,
      message: '登录成功',
      token: '123123123123',
    };
  } else {
    ctx.body = {
      success: false,
      message: '请输入正确的用户名和密码',
    };
  }
};

const postLogout = async function(ctx) {
  ctx.body = {
    success: false,
    message: '登出成功',
  };
};

const getUserInfo = async function(ctx) {
  const data = ctx.request.body;
  if (data.id) {
    ctx.body = userInfo;
  } else {
    ctx.body = {
      code: 500,
      message: '参数错误',
    };
  }
};

export default {
  postLogin,
  postLogout,
  getUserInfo,
};
