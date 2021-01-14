const state = {
    expiredTimeNum: sessionStorage.getItem('expiredTimeNum') ? sessionStorage.getItem('expiredTimeNum') : '',
};
const mutations = {
    changeExpiredtimenum(state,expiredTimeNum){
        state.expiredTimeNum = expiredTimeNum;
        sessionStorage.setItem('expiredTimeNum', expiredTimeNum);
    }
};
const actions = {
    changeExpiredtimenum(ctx,expiredTimeNum) {
        ctx.commit('changeExpiredtimenum',expiredTimeNum);
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};