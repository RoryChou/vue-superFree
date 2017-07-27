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
#三.html

#四.tool
##1.雪碧图当中的2x图片，目前有个小问题，就是所有的一倍图都要有对应的二倍图，且尺寸不能错，否则会报错
##2.默认的webpack模板居然没有sass的相关依赖包，所以一直报错，sass-loader,node-sass
##3.由于开发模式和生产模式需要的配置是不同的，所以需要两套配置文件，所以webpack-simple模板确实有问题
