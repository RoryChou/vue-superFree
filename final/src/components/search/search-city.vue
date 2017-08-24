<template>
  <div class="section-input"
       @click.stop>
    <div class="search-contents-title">{{title}}</div>
    <input type="text" class="input-city-from"
           :placeholder="titleComputed"
           @focus="isShowSuggest = true;freshNum++"
           @input="isShowComplete = true"
           v-model="cityName">
    <error-box
      v-show="isShowError"
      :errorContent="errorContent"></error-box>
    <suggest-box
      v-show="isShowSuggest"
      :fresh="freshNum"
      :suggestUrl="suggestUrl"
      v-on:chooseCity="setCity"></suggest-box>

    <complete-box
      :currentCity="cityName"
      :keySelect="keySelect"
      v-show="isShowComplete"
      v-on:chooseCity="setCity"
      v-on:closeCompleteBox="isShowComplete = false"></complete-box>
  </div>
</template>
<script>
  //FIXME suggestBox与completeBox可以不作为组件使用
  import axios from 'axios'
  import ErrorBox from '../list/error-box.vue'
  import SuggestBox from './suggest-box.vue'
  import CompleteBox from './complete-box.vue'
  import jsonp from 'jsonp'
  export  default {
    name: 'search-city',
    components:{ErrorBox,SuggestBox,CompleteBox},
    props:{
      title:String,
      currentCity:Object,
      suggestUrl:String,
      errorContent:String,
      isShowError: Boolean,
      closeBoxException:String
    },
    data: function () {
      return {
        isShowSuggest:false,//FIXME 待优化
        isShowComplete:false,
        cityName:'',
        freshNum: 1, //强制触发suggestBox的更新
        keySelect: null
      }
    },
    computed: {
      titleComputed: function(){
        return '请输入'+ this.title
      }
    },
    watch:{
      cityName: function () {
        this.$emit('cityChange',this.cityName,this.currentCity.name)
      },
      isShowSuggest: function () {
        if(this.isShowSuggest){
          this.isShowComplete = false
        }
      },
      isShowComplete: function () {
        if(this.isShowComplete){
          this.isShowSuggest = false
        }
      },
      closeBoxException: function () {
        if(this.closeBoxException !== ''&&this.closeBoxException !== this.currentCity.name){
          //关闭弹窗
          this.isShowSuggest = false;
          this.isShowComplete = false;
        }
      }
    },
    created:function () {
      this.cityName = this.currentCity.value;
    },
    mounted: function () {
      const vm = this;
      document.addEventListener('click', function () {
        vm.isShowSuggest = false;
        vm.isShowComplete = false;
      });
      //下拉框内容选择
      document.addEventListener('keydown', function (e) {
        let which = e.which || e.keyCode;
        if (vm.isShowComplete && (which === 40 || which === 38)) {
          e.preventDefault();
        }
      });
      //键盘选中下拉框
      document.addEventListener('keyup', function (e) {
        if (!vm.isShowComplete) {
          return
        }
        //操作下拉框
        vm.keySelect = e;
      });
    },
    methods:{
      showCompleteBox: function (className)  {
        //发送ajax请求
        var vm = this;
        //初始化index
        vm.currentCompleteIndex = 0;
        let keyword = this.cityName;
        let type = 'TICKET';
        let url = 'http://s.lvmama.com/autocomplete/autoCompleteNew.do';
        let districtId = '';
        if(className === 'hotel-keywords'){
          type = 'HOTEL';
          url = 'http://s.lvmama.com/autocomplete/autoCompleteHotel.do';
          districtId = '&districtId='+vm.districtId;
        }
        /*switch (className) {
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
        }*/
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
      setCity: function (city) {
        this.cityName = city;
        //隐藏suggestbox
        this.isShowSuggest = false;
        //隐藏completebox
        this.isShowComplete = false;
      },
      //分发错误信息
      setError: function () {

      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/var";

</style>
