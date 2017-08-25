<template>
  <div class="error-box" :style="position">
    <div class="tip-arrow" :class="arrowDirection">
      <em>◆</em>
      <i>◆</i>
    </div>
    <i class="error-icon"></i>
    <p>{{errorContent}}</p>
  </div>
</template>
<script>
  export  default {
    name:'error-box',
    props: {
      errorContent: String,
      arrowDirection:{
        type:String,
        default: 'tip-arrow-left'
      }
    },
    computed: {
      position: function () {
        if(this.arrowDirection === 'tip-arrow-top'){
          return {
            left: 0,
            top: '38px'
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  /*error-box.scss*/
  @import "../../assets/scss/_var.scss";
  .error-box {
    position: absolute;
    //display: none;
    top: -4px;
    left: 256px;
    background:#ffffff;
    border:1px solid #dddddd;
    box-shadow:0 2px 4px 0 #aaa;
    width:165px;
    height:34px;
    z-index: 20;
    .error-icon {
      @include inlineblock;
      background: url('../../assets/imgs/list/hotel/sprite/icon-error.png') no-repeat center;
      height: 14px;
      width: 14px;

      margin-left: 10px;
      vertical-align: middle;
    }
    p {
      @include inlineblock;
      font-size:12px;
      line-height: 34px;
      text-align: right;
    }
  }
  .error-box-bottom {
    @extend .error-box;
    display: block;
    top: 38px;
    left: 40px;
  }
</style>
