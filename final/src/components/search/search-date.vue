<template>
  <div class="section-input search-calendar-common">
    <div class="search-contents-title">出发日期</div>
    <div class="search-contents-info">{{date | getWeekday}}</div>
    <input type="text" readonly="readonly" class="input-date-from"
           v-model="date">
  </div>
</template>
<script>
  export  default {
    name:'search-date',
    props: {
      dateObj:Object
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
        date:''
      }
    },
    created: function () {
      this.date = this.dateObj.value;
    },
    mounted: function () {
      //初始化日历
      this.calendarInit();
    },
    watch: {
      date: function () {
        this.$emit('dateChange',this.date,this.dateObj.name)
      }
    },
    methods: {
      calendarInit: function () {
        const vm = this;
        lv.calendar({
          //date: self.dateNow(),
          autoRender: false,
          trigger: ".search-calendar-common",
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
      }
    }
  }
</script>
