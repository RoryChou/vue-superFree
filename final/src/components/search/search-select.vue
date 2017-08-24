<template>
  <div class="combo-persons-adult section-input">
    <div class="search-contents-title">{{title}}</div>
    <input class="search-contents-select" value="2" readonly="readonly"
           @click.stop="showSelections"
           v-model="num">
    <b :class="{active:isShowSelections}"></b>
    <error-box
      :errorContent="errorContent"
      v-show="isShowError"></error-box>
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
      title:String
    },
    data: function () {
      return {
        isShowSelections: false,
        currentCompleteIndex:0,
        num:0,
        isShowError: false,
        selectionLength:0
      }
    },
    watch:{
      num:function () {
        this.$emit('numChange',this.num,this.currentNum.name)
      }
    },
    created: function () {
      this.num = this.currentNum.value;
      this.selectionLength = this.maxNum;
    },
    mounted: function () {
      const vm = this;
      document.addEventListener('click', function () {
        vm.isShowSelections = false;
      });
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
        this.$emit('closeBoxes',this.currentNum.name)
      }
    }
  }
</script>
