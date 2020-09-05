<template>
  <router-view />
</template>

<script>
export default {
    name: 'longwordPage'
}
</script>

<style lang="scss" scoped>
.searchtime {
    /deep/ .timebox {
        padding: 3px 10px!important;
        height: 30px!important;
        line-height: 24px!important;
        .el-input__icon {
            line-height: 24px!important;
        }
        &.el-date-editor .el-range-separator {
            line-height: 24px!important;
        }
        &.el-date-editor .el-range__icon{
            line-height: 24px!important;
        }
    }
    /deep/ .searchbtn {
        font-size: 14px;
        height: 30px!important;
        padding: 0px 10px;
    }
}
</style>
