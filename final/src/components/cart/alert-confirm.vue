<template>
  <!--删除alert-->
  <div class="alert-delete-content">
    <span class="icon-notice"></span>
    <span class="icon-words">{{message}}</span>
  </div>
  <!--删除alert END-->
</template>
<script>
  export default{
    name: 'alert',
    props: ['message']
  }
</script>
<style lang="scss">
  @import "../../assets/scss/_var.scss";
  /*alert内容*/
  .alert-content {
    display: none;
    padding-left: 62px;
  .icon-notice {
  @include inlineblock;
    background: url('../../assets/imgs/cart/sprite/icon-notice-reverse.png') no-repeat center;
    height: 32px;
    width: 32px;
    vertical-align: top;
  }
  .icon-words {
  @include inlineblock;
    padding-left: 8px;
    width: 220px;
    line-height: 24px;
    font-size:14px;
    color:#333333;
  }
  }
  /*alert内容 END*/
</style>
