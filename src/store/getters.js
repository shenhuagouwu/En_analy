const getters = {
    editorType: state => state.leftnav.editorType,
    dataName: state => state.printdata.dataName,
    username: state => state.user.username,
    userpwd: state => state.user.userpwd,
    logOut: state => state.user.logOut,
};
export default getters;