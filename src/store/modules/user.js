const state = {
    zhanghu: sessionStorage.getItem('zhanghu') ? sessionStorage.getItem('zhanghu') : '',
    //userpwd: sessionStorage.getItem('userpwd') ? sessionStorage.getItem('userpwd') : '',
};
const mutations = {
    zhanghu(state,zhanghu){
        state.zhanghu = zhanghu;
        sessionStorage.setItem('zhanghu', zhanghu);
    },
    // userpwd(state,userpwd){
    //     state.userpwd = userpwd;
    //     sessionStorage.setItem('userpwd', userpwd);
    // },
};
const actions = {
    zhanghu(ctx,zhanghu) {
        ctx.commit('zhanghu',zhanghu);
    },
    // userpwd(ctx,userpwd) {
    //     ctx.commit('userpwd',userpwd);
    // },
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