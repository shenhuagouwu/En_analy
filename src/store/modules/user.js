import Cookies from 'js-cookie';
const state = {
    userInfo: Cookies.get('userInfo') ? Cookies.get('userInfo') : '',
};
const mutations = {
    login(state,userInfo){
        state.userInfo = userInfo;
        Cookies.set('userInfo', userInfo);
        console.log("调用vuex后的用户账号:" + userInfo);
    },
};
const actions = {
    login(ctx,userInfo) {
        ctx.commit('login',userInfo);
    },
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};