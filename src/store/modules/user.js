import Cookies from 'js-cookie';
const state = {
    username: Cookies.get('username') ? Cookies.get('username') : '',
    userpwd: Cookies.get('userpwd') ? Cookies.get('userpwd') : '',
};
const mutations = {
    account(state,username){
        state.username = username;
        Cookies.set('username', username);
        console.log("调用vuex后的用户账号:" + username);
    },
    password(state,userpwd){
        state.userpwd = userpwd;
        Cookies.set('userpwd', userpwd);
        console.log("调用vuex后的用户账号:" + userpwd);
    }
};
const actions = {
    account(ctx,username) {
        ctx.commit('account',username);
    },
    password(ctx,userpwd) {
        ctx.commit('password',userpwd);
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};