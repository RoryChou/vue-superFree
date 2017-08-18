<template>
  <div class="combo-from section-input search-city">
    <div class="search-contents-title">出发地</div>
    <input type="text" class="input-city-from" placeholder="请输入出发地"
           @focus="showSuggestBox('combo-from')"
           @blur="hideSuggestBox()"
           @input="showCompleteBox('combo-from')"
           v-model="cityName">
    <error-box></error-box>
  </div>
</template>
<script>
  import axios from 'axios'
  import ErrorBox from '../list/error-box.vue'
  export  default {
    name: 'search-city',
    components:{ErrorBox},
    props:{
      currentCity:String,
      suggestUrl:String,
      suggestCitysLi:Number,
      isShowSuggestBox:Boolean,
      currentSuggestBox:String,
      currentCity:String,
      currentCity:String,
    },
    data: function () {
      return {
        currentCity:''
      }
    },
    watch:{
      currentCity: function () {
        this.$emit('cityChange',this.currentCity)
      }
    },
    created:function () {
      this.cityName = this.currentCity;
    },
    methods:{
      showSuggestBox: function (className) {
        //发送ajax请求
        var vm = this;
        axios.get('static/data/citys.json').then(function (res) {
          vm.citys = res.data;
          //初始化tab切换
          vm.suggestCitysLi = 0;
          //计算位置
          //vm.getPosition(className);
          vm.$emit('getPosition',className)
          //vm.isShowSuggestBox = true;
          vm.$emit('getPosition',className)
          vm.currentSuggestBox = className;
        }, function (error) {
          console.log('error', error)
        })
      },
      hideSuggestBox: function () {
        if (this.triggerBlur) {
          this.isShowSuggestBox = false;
        }
        this.triggerBlur = true;
      },
      showCompleteBox: function (className)  {
        //发送ajax请求
        var vm = this;
        //初始化index
        vm.currentCompleteIndex = 0;
        let keyword = this.comboFromContent;
        let type = 'TICKET';
        let url = 'http://s.lvmama.com/autocomplete/autoCompleteNew.do';
        let districtId = '';
        switch (className) {
          case 'combo-from':
            keyword = this.comboFromContent;
            break;
          case 'combo-to':
            keyword = this.comboToContent;
            break;
          case 'flight-from':
            keyword = this.flightFromContent;
            break;
          case 'flight-to':
            keyword = this.flightToContent;
            break;
          case 'hotel-to':
            keyword = this.hotelToContent;
            break;
          case 'hotel-keywords':
            keyword = this.hotelKeywordsContent;
            type = 'HOTEL';
            url = 'http://s.lvmama.com/autocomplete/autoCompleteHotel.do';
            districtId = '&districtId='+vm.districtId;
            break;
          default:
            return
        }
        //判断是否无内容
        if (keyword === '') {
          //关闭suggestBox,completeBOx
          vm.isShowCompleteBox = false;
          if(className === 'hotel-keywords'){
            this.showKeywordsBox(className)
          }else {
            this.showSuggestBox(className)
          }
        } else {
          jsonp(url + '?' + 'type='+ type +'&keyword=' + keyword + districtId, function (err, data) {
            if (err) {
              console.error(err.message);
            } else {
              vm.completeResults = data.matchList;
              //判断是否有结果
              if (vm.completeResults.length !== 0) {
                //计算位置
                vm.getPosition(className);
                vm.isShowCompleteBox = true;
                vm.currentCompleteBox = className;
              } else {
                vm.isShowCompleteBox = false;
              }
              //关闭suggestBox,completeBOx
              vm.isShowSuggestBox = false;
            }
          });
        }
      },
    }
  }
</script>
