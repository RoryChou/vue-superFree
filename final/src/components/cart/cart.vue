<template>
  <div>
    <!--顶部-->
    <div class="sft-header clearfix">
      <div class="sft-header-wrapper">
        <div class="sft-header-left">
          <a href="http://www.lvmama.com" class="sft-header-logo"></a>
          <a href="http://www.lvmama.com" class="sft-title">超级自由行</a>
        </div>
        <div class="sft-header-right">
          <p class="sft-hotLine-title">24小时服务热线</p>
          <p class="sft-hotLine">1010-6060</p>
        </div>
      </div>
    </div>
    <!--顶部END-->

    <!--主要内容-->
    <div class="wrap">
      <div class="cart-num-container">
        <i class="icon-cart"></i>
        购物车
        <span class="cart-num">{{totalPrpNum}}</span>
      </div>
      <div class="cart-top-bar">
        <span class="title-proinfo td">商品信息</span>
        <span class="title-rules td">退改规则</span>
        <span class="title-price-single td">单价</span>
        <span class="title-num td">数量</span>
        <span class="title-money td">金额</span>
        <span class="title-operate td">操作</span>
      </div>
      <loading v-show="isShowLoading"></loading>
      <div class="cart-section" v-bind="{id:idTransfer(item.sectionName)}" v-for="(item,itemIndex) in cartInfo">
        <div class="cart-section-title">
          <span class="icon-checkBox td" v-bind="{'data-checked':item.isChecked}" :class="{checked:item.isChecked}" @click="selectSection(item,itemIndex)"></span>
          <span class="cart-section-title-main td">{{item.sectionName}}</span>
          <div class="cart-section-money-total td">
            <i class="cart-section-money-total-title">套餐总价：</i>
            <i class="cart-section-money-total-num">
              ¥<b>{{item.totalMoney}}</b>
            </i>
          </div>
        </div>
        <div class="cart-section-details">
          <div class="cart-section-hotel-container">
            <div class="cart-section-pro-hotel" v-for="(detail,detailIndex) in item.hotelList">
              <div class="cart-section-pro-wrapper clearfix">
                <span class="icon-checkBox td" v-bind="{'data-checked':detail.isChecked}" :class="{checked:detail.isChecked}"
                      @click="selectDetail(detail,item,itemIndex)"></span>
                <span class="icon-hotel td"></span>
                <div class="hotel-date-container td">
                  <p class="hotel-date-start">
                    <span>{{detail.startDate}}</span>入住
                                </p>
                  <p class="hotel-date-end">
                    <span>{{detail.leaveDate}}</span>退房
                                </p>
                </div>
                <div class="hotel-info-container td">
                  <p class="hotel-name" v-bind="{title:detail.hotelName}">{{detail.hotelName}}</p>
                  <p class="hotel-stars">{{detail.hotelStars}}</p>
                </div>
                <div class="pro-details-container td">
                  <p class="hotel-room-type">{{detail.roomType}}</p>
                  <p class="hotel-room-info">
                    <span>1</span>间<span>3</span>晚
                  </p>
                </div>
                <span class="pro-sevice td">{{detail.hotelServe}}</span>
                <div class="pro-notice td">
                  <span class="js-tips" v-bind="{'tip-content':detail.notice}">{{detail.notice}}</span>
                </div>
                <span class="pro-price-single td">¥{{detail.singlePrice}}</span>
                <div class="select-container td">
                  <select class="pro-num" name="" v-model="detail.hotelNum">
                    <option v-for="num in optionMax(detail.inventory,detail.hotelNum,detailIndex,itemIndex,'Hotel')">{{num}}</option>
                  </select>
                  <p class="pro-num-notice" v-show="detail.inventory-detail.oldHotelNum<0">库存不足{{detail.oldHotelNum}}份</p>
                </div>

                <div class="pro-money td">
                  ¥<span>{{detail.singlePrice*detail.hotelNum}}</span>
                </div>
                <div class="pro-operations td">
                  <p class="cart-delete">删除</p>
                  <p class="cart-move">移入其他套餐</p>
                </div>
              </div>
            </div>
          </div>
          <div class="cart-section-flight-container">
            <div class="cart-section-pro-flight" v-for="(detail,detailIndex) in item.flightList">
              <div class="cart-section-pro-wrapper clearfix">
                <span class="icon-checkBox td" v-bind="{'data-checked':detail.isChecked}" :class="{checked:detail.isChecked}"
                      @click="selectDetail(detail,itemitemIndex)"></span>
                <span class="icon-flight td"></span>
                <div class="section-pro-flight-block clearfix" v-if="detail.go==={}">
                  <div class="flight-icon-route-go" :class="{'flight-icon-route-go':lineKey==='go','flight-icon-route-back':lineKey==='return'}">{{line.flightDirection}}</div>
                  <div class="flight-main-container td">
                    <p class="flight-main-citys">
                      <span class="flight-city-from">{{line.startPlace}}</span>
                      <i class="icon-flight-arrow"></i>
                      <span class="flight-city-to">{{line.targetPlace}}</span>
                    </p>
                    <p class="flight-date-start">{{line.date}}</p>
                  </div>
                  <div class="flight-info-container clearfix td">
                    <div class="flight-info-from">
                      <p class="flight-time-from">{{line.startTime}}</p>
                      <p class="flight-airport-from" title="浦东国际机场">{{line.startAirport}}</p>
                    </div>
                    <div class="icon-flight-arrow"></div>
                    <div class="flight-info-to">
                      <p class="flight-time-to">{{line.leaveTime}}
                        <em class="add-one-day js-tips" tip-content="航班到达日期为起飞日期<span class='tip-add-one'>+1天</span>。">+1</em>
                      </p>
                      <p class="flight-airport-to" title="上海浦东国际机场">{{line.targetAirport}}</p>
                    </div>
                  </div>
                  <div class="pro-details-container td">
                    <p class="flight-company">{{line.flightCompany}}</p>
                    <p class="flight-plane-info">
                      <span class="flight-plane-num">{{line.planeNum}}</span>
                      <span class="flight-plane-type" data-plan="32A" data-name="空客321" data-type="中" data-min="167"
                            data-max="167">{{line.planeType}}</span>
                    </p>
                  </div>
                  <span class="pro-sevice td">
                                    {{line.seatType}}
                                    <p :class="{'flight-ticket-type-kid':line.ticketType==='儿童','flight-ticket-type-adult':line.ticketType==='成人'}"></p>
                                </span>
                  <div class="pro-notice td">
                    <span class="tui-gai-qian">退改签</span>
                  </div>
                  <span class="pro-price-single td">¥{{line.singlePrice}}</span>
                  <div class="select-container td">
                    <select class="pro-num pro-num-flightGo" name="" v-model="line.flightNum">
                      <option v-for="num in optionMax(line.inventory,line.flightNum,detailIndex,itemIndex,'Flight',lineKey)">{{num}}</option>
                    </select>
                    <p class="pro-num-notice" v-show="line.inventory-line.oldFlightNum<0">库存不足{{line.oldFlightNum}}张</p>
                  </div>
                  <div class="pro-money td">
                    ¥<span>{{line.singlePrice*line.flightNum}}</span>
                  </div>
                  <div class="pro-operations td">
                    <p class="cart-delete">删除</p>
                    <p class="cart-move">移入其他套餐</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cart-section-ticket-container" >
            <div class="cart-section-pro-ticket" v-for="(detail,detailIndex) in item.ticketList">
              <div class="cart-section-pro-wrapper clearfix">
                <span class="icon-checkBox td" v-bind="{'data-checked':detail.isChecked}" :class="{checked:detail.isChecked}"
                      @click="selectDetail(detail,item,itemIndex)"></span>
                <span class="icon-ticket td"></span>
                <p class="ticket-date td">{{detail.date}}</p>
                <p class="ticket-name td">{{detail.viewName}}</p>
                <div class="pro-notice td">
                  <span class="js-tips" tip-content="不可退改!!!">{{detail.notice}}</span>
                </div>
                <span class="pro-price-single td">¥{{detail.singlePrice}}</span>
                <div class="select-container td">
                  <select class="pro-num" name="" v-model="detail.ticketNum">
                    <option v-for="num in optionMax(detail.inventory,detail.ticketNum,detailIndex,itemIndex,'Ticket')">{{num}}</option>
                  </select>
                  <p class="pro-num-notice" v-show="detail.inventory-detail.oldTicketNum<0">库存不足{{detail.oldTicketNum}}份</p>
                </div>
                <div class="pro-money td">
                  ¥<span>{{detail.singlePrice*detail.ticketNum}}</span>
                </div>
                <div class="pro-operations td">
                  <p class="cart-delete">删除</p>
                  <p class="cart-move">移入其他套餐</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--空购物车-->
      <div class="cart-empty-container" v-if="totalPrpNum === 0">
        <div class="cart-empty-icon"></div>
        <p class="cart-empty-words">购物车还是空的呢，快去挑选商品吧</p>
        <p class="cart-empty-words-signin">还未登录哦，<span class="login_btn">现在登录</span>看看您账户下的商品吧～</p>
        <a class="btn btn-orange btn-goshopping" href="">去选购</a>
      </div>
      <!--空购物车END-->
    </div>
    <!--主要内容END-->

    <!--底部结算bar-->
    <div class="sft-bottom-bar-container">
      <div class="sft-bottom-bar">
        <div class="sft-bottom-bar-tips">
          <div class="tip-arrow tip-arrow-top">
            <em>◆</em>
            <i>◆</i>
          </div>
          <i class="error-icon"></i>
          <p>一次只能购买一个套餐哦～</p>
        </div>
        <div class="sft-bottom-bar-wrapper clearfix">
          <div class="bottom-bar-left clearfix">
            <span class="cart-clear-all">清空购物车</span>
            <span class="cart-move">移入其他套餐</span>
            <span class="bottom-bar-clear">清除失效商品</span>
          </div>
          <router-link to="form" class="bottom-bar-button">
            立即预订

          </router-link>
          <div class="bottom-bar-right">
            <p class="bottom-bar-right-top">
              应付：<span>¥<b>5450</b></span>
            </p>
            <p class="bottom-bar-right-bottom">
                   <span class="money-total-old">
                       订单总价：<b>¥</b><i>6000</i>
                   </span>
              <span class="money-off">
                       套餐立减：<b>¥</b><i>240</i>
                   </span>
            </p>
          </div>

        </div>
      </div>
    </div>
    <!--底部结算bar END-->

    <!-- 查看退改签 -->
    <div class="tgq-info">
      <div class="tip-arrow"><em>◆</em><i>◆</i></div>
      <p class="tgq-loading">
        驴妈妈拼命加载中，请稍候...
    </p>
      <div class="tgq-info-part tgq-info-part-default">
        <dl class="clearfix">
          <dt>退票费</dt>
          <dd>
            <p class="clearfix"><i></i><span>取消座位时间计算手续费</span></p>
            <p class="clearfix"><i></i><span>按照当前舱位票面价收取退票费</span></p>
            <p class="clearfix"><i></i><span>起飞前2.0小时（含）以外收取当前舱位票面价的20.0%退票费，起飞前2.0小时以内及起飞后收取当前舱位票面价的30.0%退票费</span></p>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>签转费</dt>
          <dd>
            <p>可以改签</p>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>改期费</dt>
          <dd><p>按照当前舱位票面价收取变更费</p>
            <p>起飞前2.0小时（含）以外收取当前舱位票面价的20.0%退票费，起飞前2.0小时以内及起飞后收取当前舱位票面价的30.0%退票费</p></dd>
        </dl>
      </div>
      <div class="tgq-info-part tgq-info-part-ac">
        <dl class="clearfix">
          <dt>成人退票手续费</dt>
          <dd>
            <p class="clearfix"><i></i><span>起飞前2小时内：200元/人</span></p>
            <p class="clearfix"><i></i><span>起飞前2小时外：100元/人</span></p>
            <p class="clearfix"><i></i><span>起飞后：260元/人</span></p>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>成人同舱改期<br>手续费</dt>
          <dd>
            <p class="clearfix"><i></i><span>起飞前2小时内：200元/人</span></p>
            <p class="clearfix"><i></i><span>起飞前2小时外：免费</span></p>
            <p class="clearfix"><i></i><span>起飞后：200元/人</span></p>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>退改详情</dt>
          <dd><p>退票：以上为低折扣、高限制舱位、仅限网上订票，网上支付，不得签转、不得变更、不得退票，若退票仅限退还已经代为实际征收的机场建设费和燃油附加费。</p>
            <p>改签：以上为低折扣、高限制舱位、仅限网上订票，网上支付，不得签转、不得变更、不得退票，若退票仅限退还已经代为实际征收的机场建设费和燃油附加费。</p></dd>
        </dl>
        <dl class="clearfix">
          <dt>备注</dt>
          <dd><p>备注文案</p></dd>
        </dl>
      </div>
    </div>
    <!-- 查看退改签 END-->

    <!-- 查看机型 -->
    <div class="plane-info">
      <div class="tip-arrow"><em>◆</em><i>◆</i></div>
      <div class="plane-info-title">
        <span class="pi-plan">计划机型</span>
        <span class="pi-name">机型名称</span>
        <span class="pi-type">类型</span>
        <span class="pi-min">最少座位数</span>
        <span class="pi-max">最多座位数</span>
      </div>
      <div class="plane-info-detail">
        <span class="pi-plan"></span>
        <span class="pi-name"></span>
        <span class="pi-type"></span>
        <span class="pi-min"></span>
        <span class="pi-max"></span>
      </div>
      <img class="plane-info-loading" src="http://pic.lvmama.com/img/new_v/ui_scrollLoading/loading.gif" alt="">
    </div>
    <!-- //plane-info结束 -->

    <!--套餐弹出框-->
    <div class="alert-combos-container">
      <ul>
        <li class="combos-diy">
          <p class="combos-main">自选单品</p>
        </li>
        <li class="combos-my-1">
          <p class="combos-main">我的套餐1</p>
          <p class="combos-details">
                    <span class="combos-citys">
                        <b class="combos-citys-from">上海</b>
                        -
                        <b class="combos-citys-to">厦门</b>
                    </span>
            <span class="combos-days">4天3晚</span>
            <span class="combos-date-start">
                        <b>05月10日</b>出发
                    </span>
          </p>
        </li>
        <li class="combos-my-2">
          <p class="combos-main">我的套餐2</p>
          <p class="combos-details">
                    <span class="combos-citys">
                        <b class="combos-citys-from">上海</b>
                        -
                        <b class="combos-citys-to">厦门</b>
                    </span>
            <span class="combos-days">4天3晚</span>
            <span class="combos-date-start">
                        <b>05月10日</b>出发
                    </span>
          </p>
        </li>
        <li class="combos-my-3">
          <p class="combos-main">我的套餐3</p>
          <p class="combos-details">
                    <span class="combos-citys">
                        <b class="combos-citys-from">上海</b>
                        -
                        <b class="combos-citys-to">厦门</b>
                    </span>
            <span class="combos-days">4天3晚</span>
            <span class="combos-date-start">
                        <b>05月10日</b>出发
                    </span>
          </p>
        </li>
        <li class="combos-my-4">
          <p class="combos-main">我的套餐4</p>
          <p class="combos-details">
                    <span class="combos-citys">
                        <b class="combos-citys-from">上海</b>
                        -
                        <b class="combos-citys-to">厦门</b>
                    </span>
            <span class="combos-days">4天3晚</span>
            <span class="combos-date-start">
                        <b>05月10日</b>出发
                    </span>
          </p>
        </li>
      </ul>
    </div>
    <!--套餐弹出框 END-->

    <!--移入套餐失败toast-->
    <div class="alert-move-fail alert-toast">
      <div class="icon-lv-container">
        <i class="icon-lv-fail"></i>
      </div>
      <p>移入失败，请重新移入哦~</p>
    </div>
    <!--移入套餐失败toast END-->

    <!--无勾选toast-->
    <div class="alert-choose-none alert-toast">
      <div class="icon-lv-container">
        <i class="icon-lv-notice"></i>
      </div>
      <p>请选择商品哦~</p>
    </div>
    <!--无勾选toast END-->

    <!--只能买一个套餐toast-->
    <div class="alert-only alert-toast">
      <div class="icon-lv-container">
        <i class="icon-lv-notice"></i>
      </div>
      <p>一次只能购买 1 个套餐哦，请分开下单吧~</p>
    </div>
    <!--只能买一个套餐toast END-->

    <!--行程冲突toast-->
    <div class="alert-conflict alert-toast">
      <div class="icon-lv-container">
        <i class="icon-lv-notice"></i>
      </div>
      <p>您购买的行程不同，请分开下单吧</p>
    </div>
    <!--行程冲突toast END-->

    <!--删除alert-->
    <div class="alert-delete-content alert-content">
      <span class="icon-notice"></span>
      <span class="icon-words">删除该商品则无套餐组合优惠了，你确定要删除该商品吗？</span>
    </div>
    <!--删除alert END-->

    <!--清除失效alert-->
    <div class="alert-clear-content alert-content">
      <span class="icon-notice"></span>
      <span class="icon-words">您确定要清除所有失效商品吗？</span>
    </div>
    <!--清除失效alert END-->

    <!--产品数量不足alert-->
    <div class="alert-num-notEnough alert-content">
      <span class="icon-notice"></span>
      <span class="icon-words">
            我的套餐<b>1</b>中航班<i>HNBS</i>数量只能预订<em>2</em>张，<i>XX</i>酒店只剩<em>2</em>间,<i>XX</i>门票只剩<em>2</em>张您确认要继续预订吗？
        </span>
    </div>
    <!--产品数量不足alert END-->
  </div>
</template>
<script>
  import axois from 'axios';
  import jsonp from 'jsonp';
  import Loading from '../loading';
  export default {
    name: 'cartPage',
    components:{Loading},
    data: function () {
      return {
        cartInfo: [],
        totalPrpNum: 0,
        isShowLoading: true
      }
    },
    created: function () {
      let vm = this;
      axois.get('static/data/cartInfo.json').then(function (res) {
        vm.cartInfo = res.data.mainInfo;
        vm.totalProNumCalc();
        vm.isShowLoading = false;
        //注册所有checkbox属性
        vm.registerIscheck()
      }, function (error) {
        console.log('error', error)
      })

    },
    mounted: function () {
      //this.totalProNumCalc();

    },
    watch: {},
    computed: {},
    filters: {

    },
    methods: {
      //计算商品总数量
      totalProNumCalc: function () {
        for(let i = 0;i < this.cartInfo.length;i++){
            this.totalPrpNum += this.cartInfo[i].hotelList.length+this.cartInfo[i].flightList.length+this.cartInfo[i].ticketList.length
        }
      },
      //注册所有checkbox
      registerIscheck:function () {
        let vm = this;
        vm.cartInfo.forEach(function (value) {
          for(let i in value){
            vm.$set(value,'isChecked',false)
            if(typeof value[i] === "object"){
              value[i].forEach(function (valueDetail) {
                vm.$set(valueDetail,'isChecked',false)
              })
            }
          }
        })
      },
      selectSection: function (item,itemIndex,move) {
          if(move === undefined){
            item.isChecked = !item.isChecked;
          }else {
            item.isChecked = move;
          }

          //section全选
          for(let i in item){
            if(typeof item[i] === "object"){
              item[i].forEach(function (value) {
                value.isChecked = item.isChecked;
              })
            }
          }
          if(itemIndex !== -1){
            this.clearSection(itemIndex)
          }
      },
      selectDetail: function (detail,item,itemIndex) {
        detail.isChecked = !detail.isChecked;
        //判断是否触发全选
        let flag = true;
        for(let i in item){
          if(typeof item[i] === "object"){
            for(let j=0;j < item[i].length;j++){
              if(!item[i][j].isChecked) {
                flag = false
              }
            }
          }
        }
        item.isChecked = flag;

        this.clearSection(itemIndex)
      },
      //清除其他section
      clearSection:function (itemIndex) {
          let vm = this;
        this.cartInfo.forEach(function (value, index) {
          if(index !== itemIndex) {
            value.isChecked = false;
            vm.selectSection(value,-1,false);
          }
        })
      },
      idTransfer: function (name) {
        if(name === '自选单品'){
          return 'combos-diy'
        }else {
          let id = 'combos-my-'+name.slice(4);
          return id
        }
      },
      optionMax: function (inventory,num,detailIndex,itemIndex,type,line) {
        let  listName,numName,lineName;
        if(type === 'Hotel'){
            listName = 'hotelList';
            numName = 'hotelNum';
        }else if(type === 'Flight'){
            listName = 'flightList';
            numName = 'flightNum';
            lineName = line;
        }else {
          listName = 'ticketList';
          numName = 'ticketNum';
        }
        //限制最大数量9
        let res = inventory>=9?9:inventory;
        //库存不足时，设置为库存
        if(inventory<num){
          //TODO 修改数据库
          let listObj = this.cartInfo[itemIndex][listName][detailIndex];
          if(lineName===undefined) {
            this.cartInfo[itemIndex][listName][detailIndex][numName] = inventory;
          }else {
            this.cartInfo[itemIndex][listName][detailIndex][lineName][numName] = inventory;
            listObj = listObj[lineName];
          }
          //增加oldNum
          this.$set(listObj,'old'+ type +'Num',num)
        }
        return res;
      }
    }
  }
</script>

<style>
  @import "http://pic.lvmama.com/styles/flight/v4/tip.css";
  @import "http://pic.lvmama.com/styles/v5/modules/tip.css";
  @import "http://pic.lvmama.com/styles/lv/dialog.css";
  @import "http://pic.lvmama.com/styles/v5/modules/dialog.css";
  @import "http://pic.lvmama.com/styles/common/poplogin.css";
</style>
<style lang="scss">
  /*cartPage.scss*/
  @import "../../assets/scss/var";

  body {
    background-color: #f5f5f5;
    min-width: 1200px;
    b {
      font-weight: normal;
    }
    .alert-combos-wrapper {
      .nova-dialog-body {
        padding: 0;
      }
    }
    .nova-dialog-footer {
      .btn {
        margin-left: 10px;
      }
    }
    .icon-checkBox {
      cursor: pointer;
      background: url('../../assets/imgs/cart/sprite/icon-checkBox.png') no-repeat center;
      height: 15px;
      width: 15px;
      margin-left: 30px;
      float: left;
      &:hover {
        background: url('../../assets/imgs/cart/sprite/icon-checkBox-hover.png') no-repeat center;
      }
      &.checked {
        background: url('../../assets/imgs/cart/sprite/icon-checkBox-checked.png') no-repeat center;
      }
    }
    .choose-all {
      cursor: pointer;
      &:hover {
        color: $color-hover-orange;
      }
    }
    .fix-bottom {
      position: fixed;
      bottom: 0;
      width: 100%;
      min-width: 1200px;
      z-index: 100;
      background: #ffffff;
      height: 70px;
      box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.09);
      margin-top: 55px;
    }
    .loading_box {
      border: 0;
      border-bottom: 1px solid #e3e3e3;
      height: 46px;
      padding: 30px 0;
      width: 100%;
      text-align: center;
      background: #fff;
      span {
        font-size: 16px;
        display: inline-block;
        height: 46px;
        line-height: 46px;
        vertical-align: middle;
        font-family: "微软雅黑";
        //font-size: 18px;
        color: #999;
        margin-left: 10px;
      }
    }
    .icon_loading {
      display: inline-block;
      width: 46px;
      height: 46px;
      background: url(http://pic.lvmama.com/img/new_v/ui_scrollLoading/loadingGIF46px.gif) no-repeat center center;
      vertical-align: middle;
    }
  }

  .wrap {
    .td {
      float: left;
    }
  }

  /*顶部*/
  .sft-header {
    background: #ffffff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
    height: 80px;
    position: relative;
    margin-bottom: 17px;
    .sft-header-wrapper {
      width: 1200px;
      position: absolute;
      left: 50%;
      margin-left: -600px;
    }
    .sft-header-left {
      float: left;
      margin-top: 9px;
      a {
        @include inlineblock;
      }
      .sft-header-logo {
        background: url('http://s1.lvjs.com.cn/img/logo/v2/lv_logo.png') no-repeat center;
        width: 175px;
        height: 57px;
        margin-right: 15px;
        vertical-align: bottom;
      }
      .sft-title {
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        color: #666666;
        padding-left: 14px;
        border-left: 1px solid #ccc;
        vertical-align: middle;
      }
    }
    .sft-header-right {
      float: right;
      margin-top: 19px;
      .sft-hotLine-title {
        font-size: 14px;
        color: #666666;
      }
      .sft-hotLine {
        font-size: 18px;
        color: #ff83bb;
        font-weight: 600;
        text-align: right;
      }
    }
  }

  /*顶部END*/

  /*购物车图标*/
  .cart-num-container {
    height: 22px;
    font-size: 16px;
    color: #333333;
    margin-bottom: 14px;
    .icon-cart {
      @include inlineblock;
      background: url('../../assets/imgs/cart/sprite/icon-cart.png') no-repeat center;
      height: 22px;
      width: 22px;
      vertical-align: -2px;
    }
    .cart-num {
      color: #f60;
      font-weight: 600;
    }
  }

  /*购物车图标END*/

  /*顶部操作Bar*/
  .cart-top-bar {
    background-color: #fff;
    height: (40px - 12*2);
    padding: 12px 0;
    margin-bottom: 10px;
    .icon-checkBox {
      height: 16px;
    }
    .choose-all {
      color: #333;
    }
    .td {
      height: 16px;
      line-height: 16px;
      color: #999;
    }
    .choose-all {
      margin-left: 20px;
      color: #333;
    }
    .title-proinfo {
      margin-left: 130px;
    }
    .title-rules {
      margin-left: 529px;
    }
    .title-price-single {
      margin-left: 39px;
    }
    .title-num {
      margin-left: 42px;
    }
    .title-money {
      margin-left: 121px;
    }
    .title-operate {
      margin-left: 56px;
    }
  }

  /*顶部操作Bar END*/

  /*cart-section*/
  .cart-section {
    background-color: #fff;
    margin-bottom: 20px;
    &.current-section {
      transition: box-shadow 400ms;
      box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.1);
    }
    .cart-section-title {
      height: 16px;
      line-height: 16px;
      padding: 14px 0;
      border-bottom: 1px solid #ddd;
      .icon-checkBox-disabled {
        float: left;
        cursor: not-allowed;
        margin-left: 30px;
        background: url('../../assets/imgs/cart/sprite/icon-checkBox-not.png') no-repeat center;
        width: 15px;
        height: 15px;
      }
      .cart-section-title-main {
        font-size: 14px;
        margin-left: 20px;
        color: #333333;
        font-weight: 600;
        font-family: "Microsoft YaHei";
      }
      .cart-section-money-total {
        float: right;
        margin-right: 151px;
        i {
          @include inlineblock;
        }
        .cart-section-money-total-title {
          font-size: 14px;
          color: #666666;
          vertical-align: 2px;
        }
        .cart-section-money-total-num {
          font-size: 18px;
          color: #ff6600;
          b {
            font-size: 20px;
            font-weight: 600;
          }
        }
      }
    }
    .cart-section-details {
      background-color: #fff;
      .cart-section-pro-wrapper {
        padding: 14px 0;
        margin: 0 22px;
        border-top: 1px dotted #e3e3e3;
      }
      &>div:first-child {
        &>div:first-child{
          .cart-section-pro-wrapper {
            border-top: 0;
          }
        }
      }
      .cart-section-pro-hotel {
        .icon-checkBox {
          margin-top: 15px;
          margin-left: 8px;
        }
        .icon-hotel {
          margin-top: 8px;
          margin-left: 20px;
          background: url('../../assets/imgs/cart/sprite/icon-hotel.png') no-repeat center;
          height: 32px;
          width: 32px;
        }
        .hotel-date-container {
          margin-left: 21px;
          width: 174px;
          p {
            font-size: 14px;
            color: #333333;
            height: 24px;
            line-height: 24px;
          }
        }
        .hotel-info-container {
          p {
            width: 200px;
            @include etc;
            font-size: 14px;
            color: #333333;
            height: 24px;
            line-height: 24px;
          }
          .hotel-stars {
            font-size: 12px;
            color: #999999;
          }
          .hotel-name:hover {
            color: #f60;
            cursor: pointer;
          }
        }
        .pro-details-container {
          margin-left: 16px;
          p {
            width: 72px;
            @include etc();
            font-size: 12px;
            color: #333333;
            line-height: 24px;
            height: 24px;
          }
          .flight-plane-num {
            @include inlineblock;
            width: 46px;
          }
        }
        .pro-sevice {
          margin-left: 50px;
          width: 76px;
          font-size: 12px;
          color: #666666;
          height: 24px;
          line-height: 24px;
          .flight-ticket-type-adult {
            background: url('../../assets/imgs/cart/sprite/adult.png') no-repeat center;
            height: 16px;
            width: 28px;
            margin-top: 4px;
          }
          .flight-ticket-type-kid {
            @extend .flight-ticket-type-adult;
            background: url('../../assets/imgs/cart/sprite/kid.png') no-repeat center;
          }
        }
        .pro-notice {
          font-size: 12px;
          color: #666666;
          line-height: 24px;
          height: 24px;
          width: 87px;
          span {
            border-bottom: 1px dashed #999;
            color: #666666;
          }
        }
        .pro-price-single {
          width: 70px;
          font-size: 14px;
          color: #333333;
          line-height: 24px;
          height: 24px;
        }
        .select-container {
          float: left;
          width: 77px;
          .pro-num {
            border: 1px solid #dddddd;
            width: 77px;
            height: 28px;
            line-height: 28px;
          }
          .pro-num-notice {
            width: 77px;
            text-align: center;
            height: 16px;
            line-height: 16px;
            font-size: 12px;
            color: #666666;
            margin-top: 8px;
          }
        }
        .pro-money {
          width: 84px;
          margin-left: 58px;
          font-size: 14px;
          color: #ff6600;
          line-height: 24px;
          height: 24px;
          span {
            font-size: 16px;
          }
        }
        .pro-operations {
          width: 72px;
          font-size: 12px;
          color: #666666;
          p {
            height: 20px;
            line-height: 20px;
            cursor: pointer;
            &:hover {
              color: $color-hover-orange;
            }
          }
        }
        &.active {
          background-color: #fffdf8;
        }
        &.pro-disabled {
          background: #f9f9f9;
          color: #999999;
          p, i, b, span, div, em, .pro-num-notice {
            color: #999999;
            border-color: #e3e3e3;
          }
          .pro-num {
            color: #999999;
          }
          select {
            background-color: #fff;
          }
          .icon-checkBox-disabled {
            float: left;
            font-size: 14px;
            color: #999999;
            width: 30px;
            height: 24px;
            line-height: 24px;
            background: none;
            margin-left: 3px;
            margin-right: -10px;
            margin-top: 10px;
          }
          &.cart-section-pro-hotel {
            .icon-hotel {
              background: url('../../assets/imgs/cart/sprite/icon-hotel-not.png') no-repeat center;
            }
          }
          &.cart-section-pro-flight {
            .icon-flight {
              background: url('../../assets/imgs/cart/sprite/icon-flight-not.png') no-repeat center;
            }
          }
          &.cart-section-pro-ticket {
            .icon-ticket {
              background: url('../../assets/imgs/cart/sprite/icon-ticket-not.png') no-repeat center;
            }
          }

        }
      }
      .cart-section-pro-flight {
        @extend .cart-section-pro-hotel;
        .flight-person-type {
          float: left;
          margin-top: 42px;
          margin-left: -30px;
          font-size: 12px;
          color: #899BAD;
          margin-bottom: -6px;
        }
        .cart-section-pro-wrapper {
          padding-bottom: 4px;
        }
        .icon-flight {
          margin-top: 8px;
          margin-left: 20px;
          background: url('../../assets/imgs/cart/sprite/icon-flight.png') no-repeat center;
          height: 32px;
          width: 32px;
        }
        .section-pro-flight-block {
          padding-left: 75px;
          *padding-left: 0px;
          padding-bottom: 10px;
        }
        .flight-icon-route-go {
          margin-right: 8px;
          border-radius: 16px;
          width: 40px;
          height: 16px;
          line-height: 16px;
          font-size: 12px;
          color: #44bcea;
          text-align: center;
          border: 1px solid #85d2f0;
          margin-bottom: 6px;
          margin-left: 21px;
        }
        .flight-icon-route-back {
          @extend .flight-icon-route-go;
          border: 1px solid #6fd2a0;
          color: #00cc66;
        }
        .flight-main-container {
          margin-left: 21px;
          width: 174px;
        }
        .flight-main-citys {
          .icon-flight-arrow {
            @include inlineblock;
            margin: 0;
            float: none;
            margin-left: 4px;
            margin-right: 4px;
            vertical-align: 2px;
          }
        }
        .flight-info-container {
          width: 200px;
        }
        .flight-info-from {
          float: left;
        }
        .flight-time-from {
          font-size: 16px;
          color: #333333;
          height: 24px;
          line-height: 24px;
          text-align: right;
        }
        .flight-airport-from, .flight-airport-to {
          font-size: 12px;
          color: #666666;
          width: 73px;
          @include etc;
        }
        .icon-flight-arrow {
          float: left;
          background: url('../../assets/imgs/cart/sprite/icon-cart-arrow.png') no-repeat center;
          height: 4px;
          width: 13px;
          margin: 10px;
        }
        .flight-info-to {
          float: left;
        }
        .flight-time-to {
          font-size: 16px;
          color: #333333;
          height: 24px;
          line-height: 24px;
        }
      }
      .cart-section-pro-ticket {
        @extend .cart-section-pro-hotel;
        .cart-section-pro-wrapper {
          padding-top: 16px;
          padding-bottom: 10px;
        }
        .icon-checkBox {
          margin-top: 5px;
        }
        .icon-ticket {
          margin-top: -4px;
          margin-left: 20px;
          background: url('../../assets/imgs/cart/sprite/icon-ticket.png') no-repeat center;
          height: 32px;
          width: 32px;
        }
        .ticket-date {
          width: 174px;
          margin-left: 20px;
          height: 24px;
          line-height: 24px;
          font-size: 14px;
        }
        .ticket-name {
          width: 414px;
          height: 24px;
          line-height: 24px;
          font-size: 14px;
          &:hover {
            color: #f60;
            cursor: pointer;
          }
        }
        &.pro-disabled {
          .icon-checkBox-disabled {
            margin-top: 0px;
          }
        }
      }
    }
  }

  .cart-section-my {
    .cart-section-title-main {
      b {
        font-weight: 600;
      }
    }
    .cart-section-my-info {
      float: left;
      font-size: 14px;
      color: #666666;
      font-weight: 600;
      margin-left: 10px;
      span {
        margin-right: 4px;
      }
      b {
        font-weight: 600;
      }
    }
  }

  /*cart-section END*/

  /*底部结算bar*/
  .sft-bottom-bar-container {
    position: relative;
    background: #ffffff;
    height: 70px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.09);
    margin-top: 55px;
  }

  .sft-bottom-bar {
    .sft-bottom-bar-tips {
      position: absolute;
      background: #fff;
      border: 1px solid #ddd;
      box-shadow: 0 0px 2px 0 #aaa;
      width: 187px;
      height: 30px;
      top: -40px;
      left: 50%;
      margin-left: -600px;
      .tip-arrow-top {
        top: 23px;
        em {
          top: 3px;
        }
      }
      .error-icon {
        @include inlineblock;
        background: url('../../assets/imgs/cart/sprite/icon-notice.png') no-repeat center;
        height: 14px;
        width: 14px;
        vertical-align: middle;
        margin-left: 10px;
      }
      p {
        @include inlineblock;
        height: 28px;
        line-height: 28px;
        vertical-align: middle;
      }
    }
    .sft-bottom-bar-wrapper {
      position: absolute;
      width: 1200px;
      left: 50%;
      margin-left: -600px;
      top: 0;
    }
    .bottom-bar-left {
      float: left;
      height: 16px;
      margin-top: 28px;
      span {
        float: left;
      }
      .choose-all, .cart-clear-all, .cart-move, .bottom-bar-clear {
        margin-left: 20px;
        height: 16px;
        line-height: 16px;
        cursor: pointer;
        &:hover {
          color: $color-hover-orange;
        }
      }
    }
    .bottom-bar-right {
      float: right;
      .bottom-bar-right-top {
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        color: #666666;
        text-align: right;
        span {
          @include inlineblock;
          font-size: 20px;
          color: #ff6600;
        }
        b {
          font-size: 32px;
          font-weight: 600;
        }
      }
      .bottom-bar-right-bottom {
        height: 24px;
        line-height: 24px;
        .money-total-old, .money-off {
          color: #666666;
          margin-left: 6px;
          b {
            font-size: 12px;
            color: #333;
          }
          i {
            font-size: 14px;
            color: #333;
          }
        }
      }
    }
    .bottom-bar-button {
      float: right;
      background: #ff8800;
      width: 152px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      font-size: 18px;
      color: #ffffff;
      cursor: pointer;
      margin-left: 24px;
      &:hover {
        background-color: $color-hover-orange;
      }
      &.disabled {
        background: #ff8800;
        opacity: 0.5;
      }
    }
  }

  /*底部结算bar END*/

  /*套餐弹出框*/
  .alert-combos-container {
    height: 316px;
    overflow: auto;
    padding: 20px 30px;
    display: none;
    li {
      display: block;
      background: #f5f5f5;
      border-radius: 4px;
      width: 391px;
      height: 38px;
      padding: 14px;
      cursor: pointer;
      margin-top: 15px;
      &:hover {
        background-color: $color-lv-orange;
        color: #fff;
        .combos-main, .combos-details {
          color: #fff;
        }
      }
      .combos-main {
        font-weight: 600;
        font-size: 16px;
        color: #666666;
        height: 21px;
        line-height: 21px;
        margin-bottom: 3px;
      }
      .combos-details {
        height: 16px;
        line-height: 16px;
        color: #666;
      }
    }
    .combos-diy {
      .combos-main {
        font-weight: 600;
        font-size: 16px;
        color: #666666;
        height: 38px;
        line-height: 38px;
      }
    }
  }

  /*套餐弹出框 END*/

  /*空购物车*/
  .cart-empty-container {
    background-color: #fff;
    width: 1200px;
    height: 240px;
    padding-top: 57px;
    div, p, a {
      display: block;
      margin: 0 auto;
    }
    .cart-empty-icon {
      background: url('../../assets/imgs/cart/sprite/icon-cart-empty.png') no-repeat center;
      height: 69px;
      width: 104px;
      margin-bottom: 26px;
    }
    .cart-empty-words {
      font-size: 16px;
      color: #666666;
      height: 21px;
      line-height: 21px;
      width: 256px;
      margin-bottom: 10px;
    }
    .cart-empty-words-signin {
      font-size: 12px;
      color: #999999;
      width: 256px;
      margin-bottom: 19px;
      span {
        color: #2299ee;
        cursor: pointer;
        &:hover {
          color: #f60;
        }
      }
    }
    .btn-goshopping {
      width: 81px;
      height: 30px;
      padding: 0;
      line-height: 30px;

    }
  }

  /*空购物车 END*/

  /*移入套餐toast*/
  .alert-toast {
    display: none;
    background: #ffffff;
    width: 421px;
    height: 158px;
    padding-top: 10px;
    .icon-lv-container {
      text-align: center;
      i {
        @include inlineblock;
        &.icon-lv-fail {
          background: url('../../assets/imgs/cart/sprite/icon-lv-fail.png') no-repeat center;
          height: 81px;
          width: 89px;
        }
        &.icon-lv-notice {
          background: url('../../assets/imgs/cart/sprite/icon-lv-notice.png') no-repeat center;
          height: 82px;
          width: 89px;
        }
      }
    }
    p {
      text-align: center;
      font-size: 16px;
      color: #333333;
      height: 28px;
      line-height: 28px;
    }
  }

  /*移入套餐toast END*/

  /*alert内容*/
  .alert-content {
    display: none;
    padding-left: 62px;
    .icon-notice {
      @include inlineblock;
      background: url('../../assets/imgs/cart/sprite/icon-notice-reverse.png') no-repeat center;
      height: 32px;
      width: 32px;
      vertical-align: top;
    }
    .icon-words {
      @include inlineblock;
      padding-left: 8px;
      width: 220px;
      line-height: 24px;
      font-size: 14px;
      color: #333333;
    }
  }

  /*alert内容 END*/
</style>
