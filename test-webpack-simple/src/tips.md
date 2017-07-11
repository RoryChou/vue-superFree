#一.CSS

#二.js
##1.v-model中不能使用filter，可以用computed，但是就没有双向绑定了。
```js

```
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
#三.html

#四.tool
