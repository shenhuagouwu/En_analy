import Cookies from 'js-cookie';
const state = {
    dataName: Cookies.get('dataName') ? Cookies.get('dataName') : ''
};
const mutations = {
    handleClick(state,dataName){
        state.dataName = dataName;
        Cookies.set('dataName', dataName);
        console.log("调用vuex后的dataName:" + dataName);
    }
};
const actions = {
    handleClick(ctx,dataName) {
        ctx.commit('handleClick',dataName);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};