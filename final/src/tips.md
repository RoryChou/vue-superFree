#一.CSS
##1.import变量scss看来没什么问题，不会造成重复加载。
##2.importscss代码段是会造成重复加载问题的，如何解决css模块化呢？
#二.js
##1.v-model中不能使用filter，可以用computed，但是就没有双向绑定了。

##2.filer中的每个参数都可以触发更新

##3.filter中的this是Undefined,需要用的东西应该通过传参传过来

##4.使用watch来监听input会不会有什么副作用？还有没有更好的办法？

##5.可以在指定位置写多句表达式
```html
 <input class="search-contents-select" value="0" readonly="readonly"
                 @click="isShowSelectionsKids = !isShowSelectionsKids;currentCompleteIndex = 1;"
                 @blur="isShowSelectionsKids = false"
                 v-model="comboKidsNum">
```
##6.vue的模板中，引用组件时，名字必须要与文件名一致。
```js
import SearchTitle from './search-title.vue' //此处的SearchTitle就不能乱写，必须是这个名字
```
##7.组件中的data必须是函数的原因：保证每次使用组件时，data都是唯一的
##8.在引用了重复的组件之前进行路由切换，重复部分依然会重新渲染，造成性能浪费
##9.利用重用的组件来引入公共的样式文件，如list-top组件中的样子。
##10.forEach循环无法使用break和return终止遍历，只能用抛出错误的方式
##11.infinite loop
```js
//触发vue的无限监听循环，不好
      sectionTotalMoney:function (item) {
        item.proList.forEach(function (value) {
            if(value.isChecked){
              item.totalMoney += value.proNum*value.singlePrice;
            }
        });
        return item.totalMoney;
      }
//计算section总价，好
      sectionTotalMoney:function (item) {
          let totalMoney = 0;
        item.proList.forEach(function (value) {
            if(value.isChecked){
              totalMoney += value.proNum*value.singlePrice;
            }
        });
        item.totalMoney = totalMoney;
        return item.totalMoney;
      }
```
##12.在生命周期中调用方法时，内部的响应式数据是无效的，即：响应式数据更新的两个必要条件：1.使用响应式数据2.在触发视图更新的方法中使用
```js
//在这种条件下调用方法是不好的，无法触发内部的更新
created: function () {
      let vm = this;
      axois.get('static/data/cart_info_new.json')
        .then(function (res) {
          vm.cartInfo = res.data.mainInfo;
          vm.totalProNumCalc();
          vm.isShowLoading = false;
          //注册所有checkbox属性,totalMoney属性
          vm.registerProperty()
        }, function (error) {
          console.log('error', error)
        })

    },
methods: {
    //注册所有checkbox
    registerProperty: function () {
      let vm = this;
      vm.cartInfo.forEach(function (value) {
        vm.$set(value, 'totalMoney', 0);
        vm.$set(value, 'isChecked', false);
        value.proList.forEach(function (proValue) {
          vm.$set(proValue, 'isChecked', false);
          if (proValue.proType === 'flightCombo') {
            let singlePrice = proValue.go.singlePrice + proValue.return.singlePrice;
            let proNum = proValue.go.proNum<proValue.return.proNum?proValue.go.proNum:proValue.return.proNum;
            vm.$set(proValue, 'singlePrice', singlePrice);
            vm.$set(proValue, 'proNum', proNum);
          }
        });
      })
    }
}
//需要显式调用
//<b>{{sectionTotalMoney(item, itemIndex)}}</b>
methods:{
    //计算section总价
    sectionTotalMoney: function (item) {
      let totalMoney = 0;
      //处理flightCombo的数据

      item.proList.forEach(function (value) {
        if (value.proType === 'flightCombo') {
          value.proNum = value.go.proNum<value.return.proNum?value.go.proNum:value.return.proNum;
        }
        if (value.isChecked) {
          totalMoney += value.proNum * value.singlePrice;
        }
      });
      item.totalMoney = totalMoney;
      return item.totalMoney;
    }
}
```
##13.在引入组件的时候，一定要写清楚相对路径
```js
//不好，会当做npm组件
import Alert from 'alert.vue';
//好,会寻找本地组件
import Alert from './alert.vue';
```
##14.Vue 异步执行 DOM 更新
```js
//dom异步更新，获取的元素尚未发生改变
deletePro: function () {
  //弹出确认窗口
  this.alertContent = '删除该商品则无套餐组合优惠了，你确定要删除该商品吗？';
  nova.dialog({
    title: null,  //标题
    content: $('.test'),
    okCallback: function () {
      alert(6666)
    },
    cancelCallback: true
  });
}

//使用nextTick或者setTimeout都可以强制dom更新
deletePro: function () {
  //弹出确认窗口
  this.alertContent = '删除该商品则无套餐组合优惠了，你确定要删除该商品吗？';
  this.$nextTick(function () {
    nova.dialog({
      title: null,  //标题
      content: $('.test'),
      okCallback: function () {
        alert(6666)
      },
      cancelCallback: true
    });
  })
}
```
##15.nova.dialog使用的content是复制过去的，然而复制过去的时候并没有复制到上面的事件。
##16.vue-router的命名很诡异
##17.使用时间捕获来解决各种input弹出框的问题，nice！
```js
//跳转前页面
this.$router
//跳转后页面
this.$route
```
#三.html
##1.模板中的自定义属性的值必须是字符串否侧报错
##2.v-bind当中的不能使用filter，可以使用method代替
```html
 //filter不行
 <div class="cart-section cart-section-diy" v-bind="{id:(item.sectionName|idTransfer)}" v-for="item in cartInfo">
 //method行
 <div class="cart-section cart-section-diy" v-bind="{id:idTransfer(item.sectionName)}" v-for="item in cartInfo">
```
##3.v-bind绑定除class属性的时候都不能用:简写方式
##4.v-for循环中国可以使用cumputed或者method
```html
 <option v-for="num in optionMax(detail.inventory)" v-bind="{selected:(num === detail.hotelNum)}">{{num}}</option>
```
##5.input上绑定keydown事件貌似可以省事

#四.tool
##1.雪碧图当中的2x图片，目前有个小问题，就是所有的一倍图都要有对应的二倍图，且尺寸不能错，否则会报错
##2.默认的webpack模板居然没有sass的相关依赖包，所以一直报错，sass-loader,node-sass
##3.由于开发模式和生产模式需要的配置是不同的，所以需要两套配置文件，所以webpack-simple模板确实有问题
