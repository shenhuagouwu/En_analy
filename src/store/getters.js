const getters = {
    editorType: state => state.leftnav.editorType,
    dataName: state => state.printdata.dataName,
    zhanghu: state => state.user.zhanghu,
    logOut: state => state.user.logOut,
    Loading: state => state.loading.isLoading,
    expiredTimeNum: state => state.numType.expiredTimeNum,
};
export default getters;