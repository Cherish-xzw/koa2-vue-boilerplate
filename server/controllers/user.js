const userInfo = {
  name: "admin",
  password: "12345678"
}

const getUserInfo = async function (ctx) {
  ctx.body = userInfo
}

const postUserAuth = async function (ctx) {
  const param = ctx.request.body
  if (param.name === userInfo.name && param.password === userInfo.password) {
    ctx.body = {
      id: 1,
      success: true,
      message: "登录成功",
      token: "123123123123"
    }
  } else {
    ctx.body = {
      success: false,
      message: "请输入正确的用户名和密码"
    }
  }
}

const postLogout = async function (ctx) {
  ctx.body = {
    success: false,
    message: "登出成功"
  }
}

export default {
  getUserInfo,
  postUserAuth,
  postLogout
}
