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


#四.tool
##1.雪碧图当中的2x图片，目前有个小问题，就是所有的一倍图都要有对应的二倍图，且尺寸不能错，否则会报错
##2.默认的webpack模板居然没有sass的相关依赖包，所以一直报错，sass-loader,node-sass
##3.由于开发模式和生产模式需要的配置是不同的，所以需要两套配置文件，所以webpack-simple模板确实有问题
