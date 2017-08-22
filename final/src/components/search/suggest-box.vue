<template>
  <div class="drop-suggestion-citys">
    <div class="drop-title">热门城市</div>
    <ul class="city-hot clearfix">
      <li class="drop-city"
          v-for="city in citys.hot"
          @click="chooseCity(city.districtName)">{{city.districtName}}
      </li>
    </ul>
    <ul class="letter-tabs clearfix">
      <li class="no-blur"
          v-for="n in citysArr.length"
          @click="suggestCitysLi=(n-1);"
          :class="{current:suggestCitysLi===(n-1)}">
        {{joinLetters(n - 1)}}<i></i>
      </li>
    </ul>
    <ul class="letter-city-contents">
      <li v-for="n in citysArr.length"
          v-show="suggestCitysLi === (n-1)">
        <dl class="clearfix"
            v-for="item in citysArr[(n-1)]"
            v-show="isDlFilled(item)">
          <dt>{{item}}</dt>
          <dd class="drop-city"
              v-for="city in citys[item]"
              @click="chooseCity(city.districtName)">{{city.districtName}}
          </dd>
        </dl>
      </li>
    </ul>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'suggest-box',
    props: {
      suggestUrl: String,
      fresh: Number
    },
    data: function () {
      return {
        citys:{},
        suggestCitysLi:0,
        citysArr: [['A', 'B', 'C', 'D'], ['E', 'F', 'G', 'H'], ['J', 'K', 'L', 'M'], ['N', 'P', 'Q', 'R', 'S'], ['T', 'U', 'V', 'W', 'X'], ['Y', 'Z']]
      }
    },
    created: function () {
      //获取数据
      this.getData(this.suggestUrl)
    },
    watch: {
      fresh: function () {
        //初始化tab切换
        this.suggestCitysLi = 0;
      }
    },
    methods: {
      getData: function (url) {
        const vm = this;
        axios.get(url)
          .then(function (res) {
            vm.citys = res.data;
          }, function (error) {
            console.log('error', error)
          })
      },
      joinLetters: function (index) {
        let newArr = this.citysArr.map(function (x) {
          let str = '';
          for (let i = 0; i < x.length; i++) {
            str += x[i]
          }
          return str
        });
        return newArr[index];
      },
      isDlFilled: function (index) {
        let arr = this.citys.hot && this.citys[index];
        if (arr) {
          if (arr.length === 0) {
            return false;
          } else {
            return true;
          }
        }
      },
      chooseCity: function (city) {
        this.$emit('chooseCity',city);
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/var";
  .drop-suggestion-citys {
    //display: none;
    position: absolute;
    border: 1px solid #ccc\9;
    box-shadow: 0px 2px 4px #999;
    top:32px;
    left: 0px;
    width: (536px - 21*2);
    padding: 13px 21px;
    background-color: #fff;
    z-index: 20;
    .drop-title {
      color: #999;
      font-size: 14px;
      height: 19px;
      line-height: 19px;
      margin-bottom: 10px;
    }
    .city-hot {
      border-bottom: 1px dotted #ddd;
      padding-bottom: 8px;
      li {
        cursor: pointer;
        float: left;
        color: #666;
        font-size: 12px;
        height: 16px;
        line-height: 16px;
        margin-right: 20px;
        &:hover {
          color: $color-hover-orange;
        }
      }
    }
    .letter-tabs {
      border-bottom: 1px solid #ccc;
      height: 36px;
      li {
        position: relative;
        float: left;
        cursor: pointer;
        height: 35px;
        width: 69px;
        text-align: center;
        line-height: 35px;
        font-family:Arial;
        font-size: 14px;
        i {
          display: none;
          position: absolute;
          bottom: -2px;
          left: 30px;
          background: url("../../assets/imgs/list/hotel/sprite/icon-arrow-current.png");
          width: 11px;
          height: 6px;
        }
        &.current {
          font-family:Arial;
          color: $color-lv-pink;
          font-weight: 600;
          border-bottom: 2px solid $color-lv-pink;
          i {
            display: inline;
          }
        }
      }
    }
    .letter-city-contents {
      padding: 8px 15px;
      dl {
        position: relative;
        padding: 5px 0px;
        padding-left: 12px;
        min-height: 16px;
        dt {
          position: absolute;
          top:8px;
          left: 0;
          font-family:Arial;
          font-weight: 700;
          float: left;
          color: $color-lv-pink;
          height: 16px;
          font-size: 14px;
          line-height: 16px;
        }
        dd {
          cursor: pointer;
          float: left;
          margin: 2px 10px;
          height: 16px;
          font-size: 12px;
          line-height: 16px;
          &:hover {
            color: $color-hover-orange;
          }
        }
      }
    }
  }
</style>
