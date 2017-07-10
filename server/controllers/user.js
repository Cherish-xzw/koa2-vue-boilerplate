const userInfo = {
  email: "admin@upchina.com",
  password: "111111"
}

const postLogin = async function (ctx) {
  const data = ctx.request.body
  console.log(data)
  if (data.email === userInfo.email && data.password === userInfo.password) {
    ctx.body = {
      data: {
        id: 1,
        success: true,
        message: '登录成功',
        token: '123123123123'
      }
    }
  } else {
    ctx.body = {
      data: {
        success: false,
        message: '请输入正确的用户名和密码'
      }
    }
  }
}

const postLogout = async function (ctx) {
  ctx.body = {
    data: {
      success: false,
      message: '登出成功'
    }
  }
}

const getUserInfo = async function (ctx) {
  ctx.body = {
    data: {
      name: 'admin',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      roles: ['admin']
    }
  }
}

export default {
  postLogin,
  postLogout,
  getUserInfo
}
