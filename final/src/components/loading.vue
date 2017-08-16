<template>
  <div class="loading_box">
    <i class="icon_loading"></i>
    <span>请稍候，正在为您查询</span>
  </div>
</template>
<script>
  export default {
      name: 'loading'
  }
</script>
<style scoped>
  .loading_box {
    height: 46px;
    padding: 30px 0;
    width: 100%;
    text-align: center;
    border: 1px solid #ddd;
    background: #fff;
  }
  .icon_loading {
    display: inline-block;
    width: 46px;
    height: 46px;
    background: url(http://pic.lvmama.com/img/new_v/ui_scrollLoading/loadingGIF46px.gif) no-repeat center center;
    vertical-align: middle;
  }
  .loading_box span {
    display: inline-block;
    height: 46px;
    line-height: 46px;
    vertical-align: middle;
    font-family: "微软雅黑";
    font-size: 18px;
    color: #999;
    margin-left: 10px;
  }
</style>
