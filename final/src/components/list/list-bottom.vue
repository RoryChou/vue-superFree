<template>
  <div>
    <!-- 点击加载更多 -->
    <div class="click-more" v-if="currentList !== 'hotel'">
      点击查看更多{{content}}
    </div>
    <!-- 点击加载更多END -->

    <!--到底了-->
    <div class="nomore" v-if="currentList !== 'hotel'">
      <span>已经到底了哦~</span>
    </div>
    <!--到底了END-->

    <!-- 搜索无结果 -->
    <div class="noresult" v-if="currentList !== 'hotel'">
      <span class="hlIcon hlIcon-warning"></span>
      <div class="noresult-content">
        <h3 class="noresult-title">抱歉，没有找到符合条件的{{content}}</h3>
        <p class="noresult-explain">您可以调整行程或筛选条件后重新搜索试试哦~</p>
      </div>
    </div>
    <!-- 搜索无结果 结束 -->
  </div>
</template>
<script>
  export default {
    name: 'list-bottom',
    data: function () {
      return {
        currentList: 'combo'
      }
    },
    props:['content']
  }
</script>
<style lang="scss">
  /*list-bottom.scss*/
  @import "../../assets/scss/_var.scss";
  .click-more {
    background:#ffffff;
    width: 100%;
    height:32px;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
    font-size:14px;
    color:#899bad;
    margin-top: 10px;
    margin-bottom: 10px;
    &:hover {
      color: $color-hover-orange;
    }
  }

  .nomore {
    position: relative;
    width: 100%;
    border-bottom: 1px solid #ddd;
    height: 12px;
    margin: 30px 0;
    span {
      position: absolute;
      height: 24px;
      width: 122px;
      top:0;
      left: 50%;
      margin-left: -90px;
      padding: 0 29px;
      font-size:18px;
      color:#bbbbbb;
      background-color: #f5f5f5;
    }
  }

  .noresult {
    border: 1px solid #ddd;
    position: relative;
    padding: 50px 0 50px 200px;
    background: #fff;
    margin-bottom: 15px;
  }

  .noresult-title {
    font-size: 16px;
    font-weight: normal;
    font-family: "Microsoft Yahei";
    padding-left: 20px;
  }

  .noresult-explain {
    position: relative;
    padding-left: 20px;
    color: #999;
  }

  .noresult-explain span {
    position: absolute;
    left: 0;
    top: 0;
  }
</style>

