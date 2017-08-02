<template>
  <div>
    <!--面包屑导航-->
    <div class="crumbs">
      <p class="crumbs-link">
        <a href="http://www.lvmama.com">首页</a> &gt;
        <a href="http://s.lvmama.com/group/H9?keyword=三亚">国内游</a> &gt;
        <a href="http://s.lvmama.com/group/H9?keyword=三亚">超级自由行</a> &gt;
        <a class="current">4天3晚-厦门-优选套餐</a>
      </p>
    </div>
    <!--面包屑导航END-->

    <!--旅游宝典-->
    <div class="baodian">
      <p class="title">
        旅游宝典
        <span class="s-title">我们为您推荐，热门路线玩法</span>
      </p>
      <ul class="clearfix">
        <li>
          <a href="">
            <img src="imgs/placehold/275x184.png" alt="">
            <p class="desc" title="">宝典主题宝典主题宝典主题宝典主题</p>
          </a>
        </li>
        <li>
          <a href="">
            <img src="imgs/placehold/275x184.png" alt="">
            <p class="desc" title="">宝典主题宝典主题宝典主题宝典主题</p>
          </a>
        </li>
        <li>
          <a href="">
            <img src="imgs/placehold/275x184.png" alt="">
            <p class="desc" title="">宝典主题宝典主题宝典主题宝典主题</p>
          </a>
        </li>
        <li>
          <a href="">
            <img src="imgs/placehold/275x184.png" alt="">
            <p class="desc" title="">宝典主题宝典主题宝典主题宝典主题</p>
          </a>
        </li>
      </ul>
    </div>
    <!--旅游宝典END-->
  </div>
</template>
<script>
  export default {
      name: 'list-top'
  }
</script>
<!--baodian.scss-->
<style lang="scss">
  @import "../../assets/scss/_var.scss";
  .crumbs {
    position: relative;
    padding: 10px 0;
    clear: both;
    line-height: 16px;
    color: #999;
    z-index: 2;
    min-height: 28px;
  }

  .crumbs-link {
    float: left;
    display: inline;
    line-height: 28px;
    width: 895px;
    font-family: "simsun";
  }

  .crumbs-link a {
    color: #666;
    font-family: "Microsoft YaHei";
  }

  .crumbs-link a:hover {
    color: #f60;
  }

  .crumbs-link a.current {
    color: #999;
    text-decoration: none;
  }

  .crumbs-link .icon-ihome {
    vertical-align: text-top;
    position: relative;
    top: -1px;
    margin-right: 2px;
  }

  .crumbs .other-info {
    float: right;
    display: inline;
    color: #bbb;
  }

  .crumbs .crumbs-link span, .crumbs .crumbs-link .crumbs-down-a {
    display: inline-block;
  }

  .crumbs .crumbs-link span {
    position: relative;
  }

  .crumbs-list {
    border: #F5F5F5 solid 1px;
    height: 28px;
  }

  .crumbs-list .crumbs-down-a {
    position: relative;
    padding: 0 15px 0 5px;
    z-index: 2;
  }

  .crumbs-down-a .icon_arrow {
    top: 12px;
    right: 7px;
  }

  .crumbs-down .icon_arrow {
    border-color: #fff #fff #9F9F9F #fff;
    top: 9px;
  }

  .crumbs-down {
    border: #CCC solid 1px;
    border-bottom: none;
    background: #fff;
    height: 27px;
    z-index: 3;
    position: relative;
  }

  .crumbs-down .crumbs-down-a {
    height: 27px;
    line-height: 26px;
    background: #fff;
  }

  .crumbs-down-info {
    padding: 0 10px;
    position: absolute;
    left: -1px;
    top: 26px;
    background: #fff;
    border: #ccc solid 1px;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 1;
    display: none;
  }

  .crumbs-down .crumbs-down-info a {
    margin-right: 5px;
  }

  .crumbs-down .crumbs-down-info {
    display: block;
  }

  .baodian {
    padding-top: 9px;
    padding-bottom: 9px;
    background-color: #fff;
    margin-bottom: 20px;
    .title {
      height: 29px;
      line-height: 29px;
      font-size: 22px;
      padding-left: 20px;
      .s-title {
        vertical-align: middle;
        @include inlineblock;
        height: 19px;
        line-height: 19px;
        font-size:14px;
        color:#666666;
        padding-left: 12px;
      }
    }
    ul {
      padding: 6px 10px;
      li {
        float: left;
        padding: 0 10px;
        @include hover();
        p {
          font-size:14px;
          color:#333333;
          width: 275px;
          @include etc();
        }
      }
      a {
        display: block;
        img {
          width: 275px;
          height: 184px;
        }
        &:hover {
          text-decoration: none;
          p {
            color: $color-hover-orange;
          }
        }
      }
    }
  }

</style>
<!--baodian.scss END-->
