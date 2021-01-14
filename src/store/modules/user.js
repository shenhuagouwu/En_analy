const state = {
    zhanghu: sessionStorage.getItem('zhanghu') ? sessionStorage.getItem('zhanghu') : '',
};
const mutations = {
    zhanghu(state,zhanghu){
        state.zhanghu = zhanghu;
        sessionStorage.setItem('zhanghu', zhanghu);
    },
};
const actions = {
    zhanghu(ctx,zhanghu) {
        ctx.commit('zhanghu',zhanghu);
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