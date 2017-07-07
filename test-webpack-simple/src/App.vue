<template>
  <div class="search-container">
    <ul class="search-tabs clearfix">
      <li class="tab-combo" @click="tabSwitch('combo')" :class="{current: currentLi === 'combo'}">
        <div class="tab-wrapper">
          <i></i>
          优选套餐
      </div>
      </li>
      <li class="tab-flight" @click="tabSwitch('flight')" :class="{current: currentLi === 'flight'}">
        <div class="tab-wrapper">
          <i></i>
          机票
      </div>
      </li>
      <li class="tab-hotel" @click="tabSwitch('hotel')" :class="{current: currentLi === 'hotel'}">
        <div class="tab-wrapper">
          <i></i>
          酒店
      </div>
      </li>
    </ul>
    <ul class="search-contents">
      <li class="search-contents-combo" v-show="currentLi === 'combo'">
        <div class="combo-from section-input search-city">
          <div class="search-contents-title">出发地</div>
          <div class="search-contents-icon-location"></div>
          <input type="text" class="input-city-from" placeholder="请输入出发地"
                 @focus="showSuggestBox('combo-from')"
                 @blur="hideSuggestBox()"
                 v-model="comboFromContent">
        </div>
        <div class="combo-to section-input search-city">
          <div class="search-contents-title">目的地</div>
          <input type="text" placeholder="请输入目的地" class="input-city-to"
                 @focus="showSuggestBox('combo-to')"
                 @blur="hideSuggestBox()"
                 v-model="comboToContent">
        </div>
        <div class="combo-date section-input search-date search-calendar-common">
          <div class="search-contents-title">出发日期</div>
          <div class="search-contents-icon-calendar"></div>
          <div class="search-contents-info"></div>
          <input type="text" readonly="readonly">
        </div>
        <div class="combo-days section-input">
          <div class="search-contents-title">游玩天数</div>
          <div class="search-contents-info"></div>
          <div class="num-minus"></div>
          <div class="num-add"></div>
          <input type="text" data-max="20" data-min="1" value="4天">
        </div>
        <div class="combo-persons-adult section-input">
          <div class="search-contents-title">成人数</div>
          <input class="search-contents-select" value="2" readonly="readonly">
          <b></b>
          <ul class="search-contents-selections">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
          </ul>
        </div>
        <div class="combo-persons-children section-input">
          <div class="search-contents-title">儿童数</div>
          <div class="search-contents-info">2-12岁</div>
          <input class="search-contents-select" value="0" readonly="readonly">
          <b></b>
          <ul class="search-contents-selections">
            <li>0</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
          </ul>
        </div>
        <div class="drop-suggestion-citys"
             v-show="isShowSuggestBox" :style="suggestBoxStyle">
          <div class="drop-title">热门城市</div>
          <ul class="city-hot clearfix">
            <li class="drop-city"
                v-for="city in citys.hot"
                @mousedown="chooseCity(city.districtName)">{{city.districtName}}</li>
          </ul>
          <ul class="letter-tabs clearfix">
              <li class="no-blur"
                  v-for="n in citysArr.length"
                  @mousedown="suggestCitysLi=(n-1);triggerBlur=false"
                  :class="{current:suggestCitysLi===(n-1)}"
                    >{{joinLetters(n-1)}}<i></i>
              </li>
          </ul>
          <ul class="letter-city-contents">
            <li  v-for="n in citysArr.length"
                 v-show="suggestCitysLi === (n-1)">
              <dl class="clearfix"
                  v-for="item in citysArr[(n-1)]"
                  v-show="isDlFilled(item)">
                <dt>{{item}}</dt>
                <dd class="drop-city"
                    v-for="city in citys[item]"
                    @mousedown="chooseCity(city.districtName)">{{city.districtName}}</dd>
              </dl>
            </li>
          </ul>
        </div>
        <div class="nova-tip-form">
          <span class="nova-icon-xs nova-icon-warning"></span>
          <ul class="tip-content">
          </ul>
        </div>
      </li >
      <li class="search-contents-flight" v-show="currentLi === 'flight'">
        <div class="flight-single current">
          <span></span>
          单程
      </div>
        <div class="flight-double">
          <span></span>
          往返
      </div>
        <div class="citys-wrapper clearfix">
          <div class="flight-from section-input search-city">
            <div class="search-contents-title">出发</div>
            <div class="search-contents-icon-location"></div>
            <input type="text" placeholder="请输入出发地">
          </div>
          <div class="flight-change"></div>
          <div class="flight-to section-input search-city">
            <div class="search-contents-title">到达</div>
            <input type="text" placeholder="请输入目的地">
          </div>
        </div>
        <div class="dates-wrapper clearfix">
          <div class="flight-date-start section-input search-date search-cascading">
            <div class="search-contents-title">出发日期</div>
            <div class="search-contents-icon-calendar"></div>
            <div class="search-contents-info"></div>
            <input type="text" readonly="readonly">
          </div>
          <div class="flight-date-return section-input search-date search-cascading disabled">
            <div class="search-contents-title">返程日期</div>
            <div class="search-contents-icon-calendar"></div>
            <div class="search-contents-info">周五</div>
            <input type="text" readonly="readonly">
          </div>
        </div>
        <div class="drop-suggestion-citys">
          <div class="drop-title">支持中文/拼音/简拼/三字码输入</div>
          <ul class="letter-tabs clearfix">
            <li class="current">ABCD<i></i></li>
            <li>EFGH<i></i></li>
            <li>JKLM<i></i></li>
            <li>NPQRS<i></i></li>
            <li>TUVWX<i></i></li>
            <li>YZ<i></i></li>
          </ul>
          <ul class="letter-city-contents">
            <li>
              <dl class="clearfix">
                <dt>A</dt>
              </dl>
              <dl class="clearfix">
                <dt>B</dt>
              </dl>
              <dl class="clearfix">
                <dt>C</dt>
              </dl>
              <dl class="clearfix">
                <dt>D</dt>
              </dl>
            </li>
            <li>
              <dl class="clearfix">
                <dt>E</dt>
              </dl>
              <dl class="clearfix">
                <dt>F</dt>
              </dl>
              <dl class="clearfix">
                <dt>G</dt>
              </dl>
              <dl class="clearfix">
                <dt>H</dt>
              </dl>
            </li>
            <li>
              <dl class="clearfix">
                <dt>J</dt>
              </dl>
              <dl class="clearfix">
                <dt>K</dt>
              </dl>
              <dl class="clearfix">
                <dt>L</dt>
              </dl>
              <dl class="clearfix">
                <dt>M</dt>
              </dl>
            </li>
            <li>
              <dl class="clearfix">
                <dt>N</dt>
              </dl>
              <dl class="clearfix">
                <dt>P</dt>
              </dl>
              <dl class="clearfix">
                <dt>Q</dt>
              </dl>
              <dl class="clearfix">
                <dt>R</dt>
              </dl>
              <dl class="clearfix">
                <dt>S</dt>
              </dl>
            </li>
            <li>
              <dl class="clearfix">
                <dt>T</dt>
              </dl>
              <dl class="clearfix">
                <dt>U</dt>
              </dl>
              <dl class="clearfix">
                <dt>V</dt>
              </dl>
              <dl class="clearfix">
                <dt>W</dt>
              </dl>
              <dl class="clearfix">
                <dt>S</dt>
              </dl>
            </li>
            <li>
              <dl class="clearfix">
                <dt>Y</dt>
              </dl>
              <dl class="clearfix">
                <dt>Z</dt>
              </dl>
            </li>
          </ul>
        </div>
        <div class="nova-tip-form">
          <span class="nova-icon-xs nova-icon-warning"></span>
          <ul class="tip-content"></ul>
        </div>
      </li>
      <li class="search-contents-hotel" v-show="currentLi === 'hotel'">
        <div class="hotel-to section-input search-city">
          <div class="search-contents-title">目的地</div>
          <input type="text" class="input-city-to" placeholder="请输入目的地">
        </div>
        <div class="hotel-keywords section-input search-keywords">
          <div class="search-contents-title">关键字</div>
          <input type="text" placeholder="酒店名称/商圈/地标" class="input-hotel-keywords">
        </div>
        <div class="hotel-date-start section-input search-date search-cascading-hotel">
          <div class="search-contents-title">入住日期</div>
          <div class="search-contents-icon-calendar"></div>
          <div class="search-contents-info"></div>
          <input type="text" readonly="readonly">
        </div>
        <div class="hotel-date-end section-input search-date search-cascading-hotel">
          <div class="search-contents-title">退房日期</div>
          <div class="search-contents-info"></div>
          <div class="search-contents-icon-calendar"></div>
          <input type="text" readonly="readonly">
        </div>
        <div class="drop-suggestion-citys">
          <div class="drop-title">热门城市</div>
          <ul class="city-hot clearfix">
          </ul>
          <ul class="letter-tabs clearfix">
            <li class="current">
              ABCD
              <i></i>
            </li>
            <li>EFGH<i></i></li>
            <li>JKLM<i></i></li>
            <li>NPQRS<i></i></li>
            <li>TUVWX<i></i></li>
            <li>YZ<i></i></li>
          </ul>
          <ul class="letter-city-contents">
            <li>
              <dl class="clearfix">
                <dt>A</dt>
              </dl>
              <dl class="clearfix">
                <dt>B</dt>
              </dl>
              <dl class="clearfix">
                <dt>C</dt>
              </dl>
              <dl class="clearfix">
                <dt>D</dt>
              </dl>
            </li>
            <li>
              <dl class="clearfix">
                <dt>E</dt>
              </dl>
              <dl class="clearfix">
                <dt>F</dt>
              </dl>
              <dl class="clearfix">
                <dt>G</dt>
              </dl>
              <dl class="clearfix">
                <dt>H</dt>
              </dl>
            </li>
            <li>
              <dl class="clearfix">
                <dt>J</dt>
              </dl>
              <dl class="clearfix">
                <dt>K</dt>
              </dl>
              <dl class="clearfix">
                <dt>L</dt>
              </dl>
              <dl class="clearfix">
                <dt>M</dt>
              </dl>
            </li>
            <li>
              <dl class="clearfix">
                <dt>N</dt>
              </dl>
              <dl class="clearfix">
                <dt>P</dt>
              </dl>
              <dl class="clearfix">
                <dt>Q</dt>
              </dl>
              <dl class="clearfix">
                <dt>R</dt>
              </dl>
              <dl class="clearfix">
                <dt>S</dt>
              </dl>
            </li>
            <li>
              <dl class="clearfix">
                <dt>T</dt>
              </dl>
              <dl class="clearfix">
                <dt>U</dt>
              </dl>
              <dl class="clearfix">
                <dt>V</dt>
              </dl>
              <dl class="clearfix">
                <dt>W</dt>
              </dl>
              <dl class="clearfix">
                <dt>S</dt>
              </dl>
            </li>
            <li>
              <dl class="clearfix">
                <dt>Y</dt>
              </dl>
              <dl class="clearfix">
                <dt>Z</dt>
              </dl>
            </li>
          </ul>
        </div>
        <div class="drop-suggestion-keywords">
          <div class="keywords-transport clearfix">
            <p class="keywords-title">交通枢纽</p>
            <p class="keywords-details">

            </p>
          </div>
          <div class="keywords-subway">
            <p class="keywords-title">地铁站</p>
            <p class="keywords-details">

            </p>
          </div>
        </div>
        <div class="nova-tip-form">
          <span class="nova-icon-xs nova-icon-warning"></span>
          <ul class="tip-content"></ul>
        </div>
      </li>
    </ul>
    <ul class="drop-complete" v-show="isShowCompleteBox"></ul>
    <div class="search-btn-wrapper">
      <a class="search-btn btn btn-pink">
        <span class="icon"></span>
        <span class="search-btn-words">搜索自由行套餐</span>
      </a>
    </div>
  </div>
</template>

<script>
    import axios from 'axios'
  export default {
    name: 'app',
    data : function () {
        return {
            mes: 'welcome!',
            currentLi: 'combo',
            currentSuggestBox: '',
            isShowSuggestBox: false,
            isShowCompleteBox: false,
            comboFromContent: '',
            comboToContent: '',
            citys: {},
            suggestCitysLi: 0,
            triggerBlur: true,
            citysArr: [['A','B','C','D'],['E','F','G','H'],['J','K','L','M'],['N','P','Q','R','S'],['T','U','V','W','X'],['Y','Z']],
            suggestBoxStyle:{
                top:'0',
                left: '0'
            }
        }
    },
    mounted: function () {
        var vm = this;
        document.addEventListener('mousedown',function (e) {
            var classNames = e.target.className;
            if(!classNames.match(/no-blur/)){
                vm.triggerBlur = true;
                vm.hideSuggestBox();
            }
        })
    },
    computed: {
        classObject: function () {
            return {
                current: this.currentLi === 'asd'
            }
        }
    },
    filters : {
        joinLettersF: function (index) {
            /*let newArr = this.citysArr.map(function (x) {
                let str = '';
                for(let i=0;i<x.length;i++){
                    str += x[i]
                }
                return str
            });
            return newArr[index];*/
            console.log(this)
            return 1;
        }
    },
    methods:{
        tabSwitch : function (name){
            this.currentLi = name;
        },
        showSuggestBox: function (className) {
            //发送ajax请求
            var vm = this;
            axios.get('src/assets/data/citys.json').then(function (res) {
                vm.citys = res.data;
                //初始化tab切换
                vm.suggestCitysLi = 0;
                //计算位置
                vm.getPosition(className);
                vm.isShowSuggestBox = true;
                vm.currentSuggestBox = className;
            },function (error) {
                console.log('error',error)
            })
        },
        getPosition: function (className) {
            let targetBox = document.querySelector('.'+className);
            let top = targetBox.offsetTop+targetBox.clientHeight+3;
            let left = targetBox.offsetLeft;
            this.suggestBoxStyle.top = top+'px';
            this.suggestBoxStyle.left = left+'px';
        },
        hideSuggestBox: function () {
            if(this.triggerBlur){
                this.isShowSuggestBox = false;
            }
            this.triggerBlur = true;
        },
        joinLetters: function (index) {
            let newArr = this.citysArr.map(function (x) {
                let str = '';
                for(let i=0;i<x.length;i++){
                    str += x[i]
                }
                return str
            });
            return newArr[index];
        },
        chooseCity: function (res) {
            switch(this.currentSuggestBox)
            {
                case 'combo-from':
                    this.comboFromContent = res;
                    break;
                case 'combo-to':
                    this.comboToContent = res;
                    break;
                default:
                    return
            }
        },
        isDlFilled: function (index) {
            let arr = this.citys.hot && this.citys[index];
            if (arr){
                if(arr.length===0){
                    return false;
                }else {
                    return true;
                }
            }

        }
    }
}
</script>


<style lang="scss">
  $color-lv-pink: #e38;
  $color-lv-pink-hover: #a81c54;
  $color-lv-orange: #f90;
  $color-hover-orange: #f60;
  $color-bg-orange: #fff9ef;


  @mixin etc() {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @mixin inlineblock() {
    display: inline-block;
    *display: inline;
    *zoom: 1
  }
  @mixin opacity($per){
    opacity: $per;
    filter: alpha(opacity=$per*100);
    *zoom:1;
  }
  @mixin hover($height:-5px,$time:0.3s){
    transition: all $time;
    &:hover {
      transform: translateY($height);
    }
  }
  .search-wrapper {
      position: relative;
      height: 540px;
      overflow: hidden;
      .banner-title {
          position: absolute;
          left: 50%;
          margin-left: -110px;
          top: 32px;
          background: url("assets/imgs/banner-title.png");
          width: 209px;
          height: 49px;
      }
      background: url("assets/imgs/banner.jpg") no-repeat center;
  }
  .search-container {
      position: absolute;
      top: 120px;
      left: 50%;
      margin-left: -(685px/2);
      width: 585px;
      height: 306px;
      *z-index: 1;
      background-color: rgba(0,0,0,0.6);
      background-color: #444\9;
      *background-color: #444;
      padding: 25px 50px;
      border-radius:8px;
      .search-tabs {
          margin-left: -22px;
          margin-bottom: 18px;
          li {
              cursor: pointer;
              float: left;
              padding: 0 47px;
              height: 22px;
              line-height: 22px;
              font-size: 18px;
              margin-bottom: 13px;
              color: #fff;
              border-right: 1px solid #777;
              @include opacity(0.75);
              .tab-wrapper {
                  width: 107px;
                  text-align: center;
                  padding-bottom: 9px;
              }
              i {
                  @include inlineblock;
                  height: 24px;
                  width: 24px;
                  vertical-align: top;
                  margin-right: 5px;
              }
              &.current {
                  @include opacity(1);
                  font-weight: 600;
                  .tab-wrapper {
                      border-bottom: 2px solid #fff;
                  }
              }
              &:hover {
                  @include opacity(1);
              }
          }
          .tab-combo {
              i {
                  background: url("assets/imgs/icon-tab-combo.png");
              }
              &.current {
                  i {
                      background: url("assets/imgs/icon-tab-combo-cur.png");
                  }
              }
          }
          .tab-flight {
              i {
                  background: url("assets/imgs/icon-tab-flight.png");
              }
              &.current {
                  i {
                      background: url("assets/imgs/icon-tab-flight-cur.png");
                  }
              }
          }
          .tab-hotel {
              border: 0;
              i {
                  background: url("assets/imgs/icon-tab-hotel.png");
                  height: 25px;
                  width: 23px;
              }
              &.current {
                  i {
                      background: url("assets/imgs/icon-tab-hotel-cur.png");
                  }
              }
          }
          .tab-ticket {
              border: 0;
              i {
                  background: url("assets/imgs/icon-tab-ticket.png");
                  width: 26px;
                  height: 26px;
              }
              &.current {
                  i {
                      background: url("assets/imgs/icon-tab-ticket-cur.png");
                  }
              }
          }
      }
      .search-contents {
          display: block;
          margin-left: -15px;
          border-radius:3px;
          *padding-top: 9px;
          .section-input {
              float: left;
              position: relative;
              height: 38px;
              background-color: #fff;
              width: 283px;
              margin: 0 0 15px 15px;
              border-radius: 3px;
              border: 1px solid #fff;
              *z-index: 1;
              &.error {
                  border: 1px solid #f30;
                  background-color: #ffe8e8;
              }
              input {
                  position: absolute;
                  z-index: 10;
                  padding-left: 85px;
                  padding-right: 37px;
                  top: 0;
                  height: 38px;
                  line-height: 38px;
                  background: url(assets/imgs/alpha.gif) repeat;
                  font-size: 16px;
                  width: 137px;
                  color: #333;
                  outline: none;
              }
              .search-contents-icon-location {
                  position: absolute;
                  top: 10px;
                  height: 20px;
                  z-index: 9;
                  right: 10px;
                  width: 16px;
                  background: url("assets/imgs/icon-loaction.png");
              }
              .search-contents-icon-calendar {
                  @extend .search-contents-icon-location;
                  top: 13px;
                  height: 15px;
                  background: url("assets/imgs/icon-calendar.png");
              }
              .search-contents-title {
                  position: absolute;
                  z-index: 9;
                  left: 0px;
                  padding-left: 10px;
                  height: 38px;
                  line-height: 38px;
                  width: 75px;
                  font-size: 14px;
                  color: #999;
              }
              .search-contents-info {
                  position: absolute;
                  z-index: 9;
                  right: 47px;
                  height: 38px;
                  line-height: 38px;
                  color: #999;
              }
              .num-add {
                  position: absolute;
                  z-index: 11;
                  cursor: pointer;
                  width: 26px;
                  height: 26px;
                  top: 6px;
                  right: 10px;
                  background: url("assets/imgs/icon-num-add.png");
                  &.disabled {
                      background: url("assets/imgs/icon-num-add.png");
                  }
              }
              .num-minus {
                  @extend .num-add;
                  right: 175px;
                  background: url("assets/imgs/icon-num-minus.png");
                  &.disabled {
                      background: url("assets/imgs/icon-num-minus-not.png");
                  }
              }
              .search-contents-select {
                  width: 100px;
                  padding-right: 100px;
              }
              .search-contents-selections {
                  display: none;
                  position: absolute;
                  top: 41px;
                  background-color: #fff;
                  border: 1px solid #ccc\9;
                  *border: 1px solid #ccc;
                  box-shadow: 0px 2px 4px #999;
                  z-index: 10;
                  padding: 10px 0;
                  li {
                      cursor: pointer;
                      width: 250px;
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
          }
          .search-date {
              input {
                  width: 100px;
              }
              .search-contents-info {
                  right: 36px;
              }
          }
          .nova-tip-form {
              display: none;
              position: absolute;
              top:244px;
              left: 50px;
              margin-top: -16px;
              color: #fff;
              .tip-content {
                  height: 18px;
                  overflow: hidden;
                  li {
                      display: block;
                      height: 18px;
                  }
              }
          }
      }
      .search-contents-combo {
          .section-input {
              //margin: 10px;
          }
          .combo-from,.combo-to {
              input {
                  padding-right: 63px;
              }
          }
          .combo-date {
              input {
                  padding-right: 100px;
              }
          }
          .combo-days {
              input {
                  width: 40px;
                  padding-left: 139px;
                  padding-right: 106px;
              }
          }
          .combo-persons-adult {
              b {
                  position: absolute;
                  top: 17px;
                  right: 10px;
                  background: url("assets/imgs/icon-select.png");
                  width: 12px;
                  height: 8px;
                  transition: all 0.3s;
                  &.active {
                      transform: rotate(180deg);
                  }
              }
          }
          .combo-persons-children {
              @extend .combo-persons-adult;
          }
      }
      .search-contents-flight {
          //display: none;
          .search-city {
              width: 253px;
              input {
                  padding-right: 32px;
              }
          }
          .search-date {
              width: 283px;
              margin-left: 0;
              input {
                  padding-right: 99px;
              }
          }
          .flight-single {
              float: left;
              padding: 15px;
              padding-bottom: 18px;
              font-size: 16px;
              color: #fff;
              cursor: pointer;
              span {
                  background: url("assets/imgs/flight-not.png");
                  @include inlineblock;
                  width: 22px;
                  height: 22px;
                  vertical-align: top;
              }
              &.current {
                  span {
                      background: url("assets/imgs/flight-choose.png");
                  }
              }
          }
          .flight-double {
              @extend .flight-single;
              margin-right: 300px;
          }
          .citys-wrapper {
              width: 313px;
              float: left;
              .flight-change {
                  position: absolute;
                  width: 25px;
                  height: 61px;
                  left: 308px;
                  top: 150px;
                  color: #fff;
                  cursor: pointer;
                  background: url("assets/imgs/flight-change.png");
                  &:hover {
                      background: url("assets/imgs/flight-change-hover.png");
                  }
              }
          }
          .dates-wrapper {
              width: 240px;
              float: left;
              .flight-date-return {
                  &.search-cascading {
                      input {
                          background: url(assets/imgs/alpha.gif) repeat;
                      }
                      color: #333;
                      .search-contents-icon-calendar,.search-contents-info {
                          display: block;
                      }
                  }
                  &.disabled {
                      input {
                          background-color: #eee;
                          @include opacity(0.5);
                      }
                      color: #999;
                      .search-contents-icon-calendar,.search-contents-info {
                          display: none;
                      }
                  }
              }
          }
      }
      .search-contents-hotel{
          //display: none;
          .hotel-to {
              width: 224px;
              input {
                  padding-right: 3px;
              }
          }
          .hotel-keywords {
              width: 342px;
              input {
                  width: 223px;
              }
          }
          .search-date {
              input {
                  padding-right: 99px;
              }
          }
          .nova-tip-form {
              top: 190px;
          }
      }
      .search-contents-ticket{
          display: none;
          .ticket-keywords {
              width: 583px;
              input {
                  padding: 0 10px;
                  width: 563px;
              }
          }
          .nova-tip-form {
              top: 190px;
          }
      }
      .search-btn-wrapper {
          position: absolute;
          width: 100%;
          top:268px;
          left: 0;
          text-align: center;
          .search-btn {
              @include inlineblock;
              color: #fff;
              border-radius:5px;
              width:300px;
              height:48px;
              font-size:20px;
              line-height: 48px;
              cursor: pointer;
              .icon {
                  @include inlineblock;
                  background: url("assets/imgs/search-btn.png");
                  width: 16px;
                  height: 19px;
                  vertical-align: middle;
                  margin-right: 5px;
              }
          }
      }
      .drop-suggestion-citys {
          //display: none;
          position: absolute;
          border: 1px solid #ccc\9;
          box-shadow: 0px 2px 4px #999;
          top:100px;
          left: 30px;
          width: (536px - 21*2);
          padding: 13px 21px;
          background-color: #fff;
          z-index: 100;
          .drop-title {
              color: #999;
              font-size: 14px;
              height: 19px;
              line-height: 19px;
              margin-bottom: 10px;
          }
          .city-hot {
              border-bottom: 1px dotted #ddd;
              padding-bottom: 8px;
              li {
                  cursor: pointer;
                  float: left;
                  color: #666;
                  font-size: 12px;
                  height: 16px;
                  line-height: 16px;
                  margin-right: 20px;
                  &:hover {
                      color: $color-hover-orange;
                  }
              }
          }
          .letter-tabs {
              border-bottom: 1px solid #ccc;
              height: 36px;
              li {
                  position: relative;
                  float: left;
                  cursor: pointer;
                  height: 35px;
                  width: 69px;
                  text-align: center;
                  line-height: 35px;
                  font-family:Arial;
                  font-size: 14px;
                  i {
                      display: none;
                      position: absolute;
                      bottom: -2px;
                      left: 30px;
                      background: url("assets/imgs/icon-arrow.png");
                      width: 11px;
                      height: 6px;
                  }
                  &.current {
                      font-family:Arial;
                      color: $color-lv-pink;
                      font-weight: 600;
                      border-bottom: 2px solid $color-lv-pink;
                      i {
                          display: inline;
                      }
                  }
              }
          }
          .letter-city-contents {
              padding: 8px 15px;
              dl {
                  position: relative;
                  padding: 5px 0px;
                  padding-left: 12px;
                  min-height: 16px;
                  dt {
                      position: absolute;
                      top:8px;
                      left: 0;
                      font-family:Arial;
                      font-weight: 700;
                      float: left;
                      color: $color-lv-pink;
                      height: 16px;
                      font-size: 14px;
                      line-height: 16px;
                  }
                  dd {
                      cursor: pointer;
                      float: left;
                      margin: 2px 10px;
                      height: 16px;
                      font-size: 12px;
                      line-height: 16px;
                      &:hover {
                          color: $color-hover-orange;
                      }
                  }
              }
          }
      }
      .drop-suggestion-keywords {
          @extend .drop-suggestion-citys;
          padding: 8px 0;
          width: 409px;
          .keywords-transport {
              border-bottom: 1px dashed #ccc;
              padding-bottom: 5px;
              padding-top: 5px;
          }
          .keywords-title {
              float: left;
              width: 90px;
              height: 36px;
              font-size:12px;
              color:#999999;
              text-align: center;
          }
          .keywords-details {
              float: left;
              width: 309px;
              span {
                  *white-space: nowrap;
                  margin-right: 20px;
                  cursor: pointer;
                  float: left;
                  height: 22px;
                  font-size: 12px;
                  line-height: 22px;
                  &:hover {
                      color: $color-hover-orange;
                  }
              }
          }
      }
      .drop-complete {
          @extend .drop-suggestion-citys;
          z-index: 200;
          padding: 10px 0;
          li {
              cursor: pointer;
              height: 30px;
              line-height: 30px;
              padding: 0 16px;
              color:#666666;
              span {
                  @include inlineblock;
                  &.name {
                      width: 234px;
                  }
                  &.hotelCount {
                      width: 76px;
                  }
                  &.type {
                      display: none;
                      width: 76px;
                      text-align: center;
                  }
              }
              &:hover {
                  background-color: #fef2f9;
                  color: $color-lv-pink;
                  .type {
                      @include inlineblock;
                  }
              }
              &.current {
                  background-color: #fef2f9;
                  color: $color-lv-pink;
                  .type {
                      @include inlineblock;
                  }
              }
          }
          &.error {
              border: 1px solid #f30;
              background-color: #ffe8e8;
              color: #f30;
              height: 28px;
          }
      }
  }
</style>
