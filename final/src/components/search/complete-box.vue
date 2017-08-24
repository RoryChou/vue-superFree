<template>
  <ul class="drop-complete">
    <li class="drop-city"
        v-for="(item,index) in completeResults"
        :class="{current:currentCompleteIndex === index}"
        @click="chooseCity(item.searchValue||item.name)">{{item.searchValue}}
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
  .drop-complete {
    position: absolute;
    border: 1px solid #ccc\9;
    box-shadow: 0px 2px 4px #999;
    top:32px;
    left: 0px;
    width: (536px - 21*2);
    background-color: #fff;
    z-index: 30;
    padding: 10px 0;
    li {
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      padding: 0 16px;
      color:#666666;
      font-size: 14px;
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
