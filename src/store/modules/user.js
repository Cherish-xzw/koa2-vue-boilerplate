/* eslint no-param-reassign:0 */
import { postLogin, postLogout, getUserInfo } from '@/api/user';
import Cookies from 'js-cookie';

const user = {
  state: {
    auth: {
      token: Cookies.get('Admin-Token')
    },
    userInfo: {
      name: '',
      avatar: '',
      roles: []
    }
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.auth.token = token;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const email = userInfo.email.trim();
      return new Promise((resolve, reject) => {
        postLogin(email, userInfo.password).then(response => {
          const data = response.data;
          Cookies.set('Admin-Token', data.token);
          commit('SET_TOKEN', data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },


    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response.data;
          commit('SET_USER_INFO', data);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        postLogout(state.auth.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_USER_INFO', {});
          Cookies.remove('Admin-Token');
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        Cookies.remove('Admin-Token');
        resolve();
      });
    }
  }
};

export default user;
