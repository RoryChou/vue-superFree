<template>
  <ul class="drop-complete">
    <li class="drop-city"
        v-for="(item,index) in completeResults"
        :class="{current:currentCompleteIndex === index}"
        @mousedown="chooseCity(item.searchValue||item.name)">{{item.searchValue}}
      <span class="name" v-show="jsonpType==='HOTEL'">{{item.name}}</span>
      <span class="hotelCount" v-show="jsonpType==='HOTEL'&&item.hotelCount!==0">约{{item.hotelCount}}家酒店</span>
      <span class="type" v-show="jsonpType==='HOTEL'">{{item.type}}</span>
    </li>
  </ul>
</template>
<script>
  import axios from 'axios'
  import jsonp from 'jsonp'
  export default {
    name: 'complete-box',
    props: {
      currentCity: String,
      jsonpType: {
        type: String,
        default: 'TICKET'
      },
      keySelect: ''
    },
    data: function () {
      return {
        completeResults:[],
        currentCompleteIndex: 0
      }
    },
    watch: {
      currentCity: function () {
        //获取数据
        this.getData(this.currentCity,this.jsonpType)
      },
      keySelect: function () {
        let e = this.keySelect;
        let length = this.completeResults.length;
        let which = e.which || e.keyCode;

        //e.preventDefault();

        //下
        if (which === 40) {
          this.currentCompleteIndex++;
          this.currentCompleteIndex = this.currentCompleteIndex % length;
        }
        //上
        if (which === 38) {
          this.currentCompleteIndex--;
          this.currentCompleteIndex = this.currentCompleteIndex === -1 ? length - 1 : this.currentCompleteIndex;
          this.currentCompleteIndex = this.currentCompleteIndex % length;
        }
        //enter
        if (which === 13) {
          this.chooseCity(this.completeResults[this.currentCompleteIndex].searchValue||this.completeResults[this.currentCompleteIndex].name);
        }
      }
    },
    methods: {
      getData: function (words,jsonpType)  {
        //发送ajax请求
        const vm = this;
        //初始化index
        vm.currentCompleteIndex = 0;
        let keyword = words;
        let type = jsonpType;
        let url = 'http://s.lvmama.com/autocomplete/autoCompleteNew.do';
        let districtId = '';
        if(jsonpType === 'HOTEL'){
          districtId = '&districtId='+vm.districtId;
          url = 'http://s.lvmama.com/autocomplete/autoCompleteHotel.do';
        }

        //判断是否无内容
        if (keyword === '') {
          //关闭suggestBox,completeBOx
          vm.$emit('closeCompleteBox')
        } else {
          jsonp(url + '?' + 'type='+ type +'&keyword=' + keyword + districtId, function (err, data) {
            if (err) {
              console.error(err.message);
            } else {
              vm.completeResults = data.matchList;
              //判断是否有结果
              if (vm.completeResults.length === 0) {
                vm.$emit('closeCompleteBox')
              }
            }
          });
        }
      },
      chooseCity: function (city) {
        this.$emit('chooseCity',city)
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
  .drop-complete {
    @extend .drop-suggestion-citys;
    z-index: 30;
    padding: 10px 0;
    li {
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      padding: 0 16px;
      color:#666666;
      span {
        @include inlineblock;
        &.name {
          width: 234px;
        }
        &.hotelCount {
          width: 76px;
        }
        &.type {
          display: none;
          width: 76px;
          text-align: center;
        }
      }
      &:hover {
        background-color: #fef2f9;
        color: $color-lv-pink;
        .type {
          @include inlineblock;
        }
      }
      &.current {
        background-color: #fef2f9;
        color: $color-lv-pink;
        .type {
          @include inlineblock;
        }
      }
    }
    &.error {
      border: 1px solid #f30;
      background-color: #ffe8e8;
      color: #f30;
      height: 28px;
    }
  }
</style>
