const state = {
    username: sessionStorage.getItem('username') ? sessionStorage.getItem('username') : '',
    userpwd: sessionStorage.getItem('userpwd') ? sessionStorage.getItem('userpwd') : '',
};
const mutations = {
    username(state,username){
        state.username = username;
        sessionStorage.setItem('username', username);
        console.log("调用vuex后的用户账号:" + username);
    },
    userpwd(state,userpwd){
        state.userpwd = userpwd;
        sessionStorage.setItem('userpwd', userpwd);
        console.log("调用vuex后的用户账号:" + userpwd);
    },
};
const actions = {
    username(ctx,username) {
        ctx.commit('username',username);
    },
    userpwd(ctx,userpwd) {
        ctx.commit('userpwd',userpwd);
    },
    logOut() {
        sessionStorage.clear();
    }  
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};