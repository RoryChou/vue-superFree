<template>
  <div class="drop-suggestion-keywords">
    <div class="keywords-transport clearfix">
      <p class="keywords-title">交通枢纽</p>
      <p class="keywords-details">
      <span v-for="item in keywordsObj.metro"
            @mousedown="chooseCity(item.searchValue)">{{item.searchValue}}</span>
      </p>
    </div>
    <div class="keywords-subway">
      <p class="keywords-title">地铁站</p>
      <p class="keywords-details">
      <span v-for="item in keywordsObj.traffic"
            @mousedown="chooseCity(item.searchValue)">{{item.searchValue}}</span>
      </p>
    </div>
  </div>
</template>
<script>
  import jsonp from 'jsonp'
  export default {
    name: 'suggest-keywords',
    props: {

    },
    data: function () {
      return {
        keywordsObj:{},
        districtId:9
      }
    },
    created: function () {
      //获取数据
      this.getData()
    },
    methods: {
      getData: function () {
        const vm = this;
        jsonp('http://s.lvmama.com/autocomplete/autoCompleteHotel.do?type=REC&districtId=' + vm.districtId, function (err, data) {
          if (err) {
            console.error(err.message);
          } else {
            vm.keywordsObj = data;
          }
        });
      },
      chooseCity: function (city) {
        this.$emit('chooseCity',city);
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/var";
  .drop-suggestion-keywords {
    position: absolute;
    border: 1px solid #ccc\9;
    box-shadow: 0px 2px 4px #999;
    top:31px;
    left: 0px;
    background-color: #fff;
    z-index: 20;
    padding: 8px 0;
    width: 409px;
    .keywords-transport {
      border-bottom: 1px dashed #ccc;
      padding-bottom: 5px;
      padding-top: 5px;
    }
    .keywords-title {
      float: left;
      width: 90px;
      height: 36px;
      font-size:12px;
      color:#999999;
      text-align: center;
    }
    .keywords-details {
      float: left;
      width: 309px;
      span {
        *white-space: nowrap;
        margin-right: 20px;
        cursor: pointer;
        float: left;
        height: 22px;
        font-size: 12px;
        line-height: 22px;
        &:hover {
          color: $color-hover-orange;
        }
      }
    }
  }
</style>
