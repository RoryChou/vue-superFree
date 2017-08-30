<template>
  <div class="section-input"
       :class="[{disabled:isDisabled},randomClass]" >
    <div class="search-contents-title">{{titleText}}</div>
    <div class="search-contents-info">{{date | getWeekday}}</div>
    <input type="text" readonly="readonly" class="input-date-from"
           v-model="date">
  </div>
</template>
<script>
  import {randomString} from '../../assets/js/utils'
  export  default {
    name:'search-date',
    props: {
      dateObj:Object,
      titleText:'',
      isDisabled:{
        type: Boolean,
        default: false
      },
      isShowCalendar:{
        type: Boolean,
        default: true
      }
    },
    filters: {
      getWeekday: function (date) {
        const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        let dateObj = new Date(date);
        let weekDay = week[dateObj.getDay()];
        return weekDay;
      }
    },
    data: function () {
      return {
        date:'',
        randomClass:''
      }
    },
    beforeUpdate: function () {
      console.log('beforeUpdate')
      this.date = this.dateObj.value;
    },
    created: function () {
      console.log('created')
      this.date = this.dateObj.value;
      this.randomClass = randomString();
    },
    mounted: function () {
      //初始化日历
      this.isShowCalendar&& this.calendarInit();
    },
    watch: {
      date: function () {
        this.$emit('dateChange',this.date,this.dateObj.name)
      }
    },
    methods: {
      calendarInit: function () {
        const vm = this;
        let triggerClass = "."+this.randomClass;
        lv.calendar({
          autoRender: false,
          trigger: triggerClass,
          triggerEvent: "click",
          bimonthly: true,
          //定位偏移
          monthNext: 10,
          monthPrev: 10,
          dayPrev: 0,
          template: "small",
          //点击选择日期后的回调函数 默认返回值: calendar对象
          selectDateCallback: function () {
            for (var i in this.selected) {
              vm.date = i;
            }
          }
        });
      },

    }
  }
</script>
