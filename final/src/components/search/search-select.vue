<template>
  <div class="section-input" :class="{'error':isShowError}">
    <div class="search-contents-title" :style="infoStyle">{{title}}</div>
    <div class="search-contents-info">{{info}}</div>
    <input class="search-contents-select" value="2" readonly="readonly"
           @click="showSelections"
           v-model="num">
    <b :class="{active:isShowSelections}"></b>
    <error-box
      :errorContent="errorContent"
      v-show="isShowError"
      :arrowDirection="arrowDirection"></error-box>
    <ul class="search-contents-selections"
        v-show="isShowSelections">
      <li v-for="n in selectionLength"
          @click="num = n"
          :class="{current:currentCompleteIndex === n-1}">{{n}}
      </li>
    </ul>
  </div>
</template>
<script>
  import ErrorBox from '../list/error-box.vue'

  export  default {
    name:'search-select',
    components:{ErrorBox},
    props: {
      errorContent: String,
      currentNum: Object,
      maxNum:Number,
      title:String,
      info: {
        type: String,
        default: ''
      },
      isShowError: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        isShowSelections: false,
        currentCompleteIndex:0,
        num:0,
        selectionLength:0
      }
    },
    computed:{
      infoStyle: function () {
        if(this.info !== ''){
          return {
            left:'52px'
          }
        }
      },
      arrowDirection: function () {
        if(this.info !== ''){
          return 'tip-arrow-top'
        }
      }
    },
    watch:{
      num:function () {
        this.$emit('numChange',this.num,this.currentNum.name)
      }
    },
    beforeUpdate: function () {
      this.num = this.currentNum.value;
      this.selectionLength = this.maxNum;
    },
    created: function () {
      this.num = this.currentNum.value;
      this.selectionLength = this.maxNum;
    },
    mounted: function () {
      const vm = this;
      document.addEventListener('click', function () {
        vm.isShowSelections = false;
      },true);
      //下拉框内容选择
      document.addEventListener('keydown', function (e) {
        let which = e.which || e.keyCode;
        if (vm.isShowSelections && (which === 40 || which === 38)) {
          e.preventDefault();
        }
      });
      //键盘选中下拉框
      document.addEventListener('keyup', function (e) {
        if (!vm.isShowSelections) {
          return
        }
        let length = vm.selectionLength;
        let which = e.which || e.keyCode;

        //e.preventDefault();

        //下
        if (which === 40) {
          vm.currentCompleteIndex++;
          vm.currentCompleteIndex = vm.currentCompleteIndex % length;
        }
        //上
        if (which === 38) {
          vm.currentCompleteIndex--;
          vm.currentCompleteIndex = vm.currentCompleteIndex === -1 ? length - 1 : vm.currentCompleteIndex;
          vm.currentCompleteIndex = vm.currentCompleteIndex % length;
        }
        //enter
        if (which === 13) {
          vm.num = vm.currentCompleteIndex + 1;
          vm.isShowSelections = false;
        }
      });
    },
    methods:{
      showSelections: function () {
        this.isShowSelections = !this.isShowSelections;
        this.currentCompleteIndex = 0;
      }
    }
  }
</script>
<style lang="scss" scoped>
  /*search-select.scss*/
  @import "../../assets/scss/_var.scss";
  .error-box {
    left: 168px;
  }
  .main_search .change-box {
    .section-input {
      width: 160px;
    }
    b {
      position: absolute;
      right: 12px;
      top: 12px;
      background: url('../../assets/imgs/list/combo/sprite/icon-arrow.png') no-repeat center;
      height: 6px;
      width: 9px;
      transition: all 0.3s;
      &.active {
        transform: rotate(180deg);
      }
    }
    .search-contents-selections {
      //display: none;
      position: absolute;
      top: 31px;
      background-color: #fff;
      border: 1px solid #ccc\9;
      *border: 1px solid #ccc;
      box-shadow: 0px 2px 4px #999;
      z-index: 21;
      padding: 10px 0;
      li {
        cursor: pointer;
        width: 126px;
        height: 30px;
        line-height: 30px;
        padding: 0 17px;
        font-size: 14px;
        font-family:Arial;
        &:hover {
          background-color: #fef2f9;
          color: $color-lv-pink;
        }
        &.current {
          background-color: #fef2f9;
          color: $color-lv-pink;
        }
      }
    }
    input {
      width: 48px;
      padding-left: 12px;
    }
    .search-contents-title {
      left: 92px;
    }
    .section-input {
      input {
        padding-right: 100px;
      }
      .search-contents-title {
        left: 92px;
      }
      .search-contents-info {
        right: 32px;
      }
    }
  }

</style>
