<template>
  <div>
    <search-title></search-title>
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
          <div class="combo-from section-input search-city" :class="{error:isErrorComboFrom}">
            <div class="search-contents-title">出发地</div>
            <div class="search-contents-icon-location"></div>
            <input type="text" class="input-city-from" placeholder="请输入出发地"
                   @focus="showSuggestBox('combo-from')"
                   @blur="hideSuggestBox()"
                   @input="showCompleteBox('combo-from')"
                   v-model="comboFromContent">
          </div>
          <div class="combo-to section-input search-city" :class="{error:isErrorComboTo}">
            <div class="search-contents-title">目的地</div>
            <input type="text" placeholder="请输入目的地" class="input-city-to"
                   @focus="showSuggestBox('combo-to')"
                   @blur="hideSuggestBox()"
                   @input="showCompleteBox('combo-to')"
                   v-model="comboToContent">
          </div>
          <div class="combo-date section-input search-date search-calendar-common">
            <div class="search-contents-title">出发日期</div>
            <div class="search-contents-icon-calendar"></div>
            <div class="search-contents-info">{{comboFromDate | getWeekday}}</div>
            <input type="text" readonly="readonly"
                   v-model="comboFromDate">
          </div>
          <div class="combo-days section-input">
            <div class="search-contents-title">游玩天数</div>
            <div class="search-contents-info">{{comboFromDate | returnDateCalc(comboDays)}}</div>
            <div class="num-minus"
                 @click="numCalc(-1,1,20) " :class="{disabled:parseInt(comboDays)===1}"></div>
            <div class="num-add"
                 @click="numCalc(1,1,20)" :class="{disabled:comboDays==='20天'}"></div>
            <input type="text"
                   v-model="comboDays"
                   @blur="numCalc(0,1,20)"
                   @input="inputComboDays(1,20)"
                   @focus="focusComboDays">
          </div>
          <div class="combo-persons-adult section-input" :class="{error:isErrorComboAdults}">
            <div class="search-contents-title">成人数</div>
            <input class="search-contents-select" value="2" readonly="readonly"
                   @click="isShowSelections = !isShowSelections;currentCompleteIndex = 0"
                   @blur="isShowSelections = false"
                   v-model="comboAdultNum">
            <b :class="{active:isShowSelections}"></b>
            <ul class="search-contents-selections" v-show="isShowSelections">
              <li v-for="n in 9"
                  @mousedown="chooseSelections(n)"
                  :class="{current:currentCompleteIndex === n-1}">{{n}}
                        </li>
            </ul>
          </div>
          <div class="combo-persons-children section-input" :class="{error:isErrorComboKids}">
            <div class="search-contents-title">儿童数</div>
            <div class="search-contents-info">2-12岁</div>
            <input class="search-contents-select" value="0" readonly="readonly"
                   @click="isShowSelectionsKids = !isShowSelectionsKids;currentCompleteIndex = 0;"
                   @blur="isShowSelectionsKids = false"
                   v-model="comboKidsNum">
            <b :class="{active:isShowSelectionsKids}"></b>
            <ul class="search-contents-selections" v-show="isShowSelectionsKids">
              <li v-for="n in 7"
                  @mousedown="chooseSelectionsKids(n-1)"
                  :class="{current:currentCompleteIndex === n-1}">{{n - 1}}
                        </li>
            </ul>
          </div>
          <div class="drop-suggestion-citys"
               v-show="isShowSuggestBox" :style="suggestBoxStyle">
            <div class="drop-title">热门城市</div>
            <ul class="city-hot clearfix">
              <li class="drop-city"
                  v-for="city in citys.hot"
                  @mousedown="chooseCity(city.districtName)">{{city.districtName}}
                        </li>
            </ul>
            <ul class="letter-tabs clearfix">
              <li class="no-blur"
                  v-for="n in citysArr.length"
                  @mousedown="suggestCitysLi=(n-1);triggerBlur=false"
                  :class="{current:suggestCitysLi===(n-1)}">
                {{joinLetters(n - 1)}}<i></i>
              </li>
            </ul>
            <ul class="letter-city-contents">
              <li v-for="n in citysArr.length"
                  v-show="suggestCitysLi === (n-1)">
                <dl class="clearfix"
                    v-for="item in citysArr[(n-1)]"
                    v-show="isDlFilled(item)">
                  <dt>{{item}}</dt>
                  <dd class="drop-city"
                      v-for="city in citys[item]"
                      @mousedown="chooseCity(city.districtName)">{{city.districtName}}
                                </dd>
                </dl>
              </li>
            </ul>
          </div>
          <div class="nova-tip-form" v-show="isComboError">
            <span class="nova-icon-xs nova-icon-warning"></span>
            <ul class="tip-content">
              <li v-show="isErrorComboFrom">出发地不能为空</li>
              <li v-show="isErrorComboTo">目的地不能为空</li>
              <li v-show="isErrorComboAdults">总人数不能超过9人哦</li>
              <li v-show="isErrorComboKids">儿童数最多为{{comboAdultNum * 2}}人哦</li>
            </ul>
          </div>
        </li>
        <li class="search-contents-flight" v-show="currentLi === 'flight'">
          <div class="flight-single"
               :class="{current:flightType === 'single'}"
               @click="changeFlightType('single')">
            <span></span>
            单程
        </div>
          <div class="flight-double"
               :class="{current:flightType === 'double'}"
               @click="changeFlightType('double')">
            <span></span>
            往返
        </div>
          <div class="citys-wrapper clearfix" >
            <div class="flight-from section-input search-city" :class="{error:isErrorFlightFrom}">
              <div class="search-contents-title">出发</div>
              <div class="search-contents-icon-location"></div>
              <input type="text" placeholder="请输入出发地"
                     @focus="showSuggestBox('flight-from')"
                     @blur="hideSuggestBox()"
                     @input="showCompleteBox('flight-from')"
                     v-model="flightFromContent">
            </div>
            <div class="flight-change" @click="switchFlightCity"></div>
            <div class="flight-to section-input search-city" :class="{error:isErrorFlightTo}">
              <div class="search-contents-title">到达</div>
              <input type="text" placeholder="请输入目的地"
                     @focus="showSuggestBox('flight-to')"
                     @blur="hideSuggestBox()"
                     @input="showCompleteBox('flight-to')"
                     v-model="flightToContent">
            </div>
          </div>
          <div class="dates-wrapper clearfix">
            <div class="flight-date-start section-input search-date search-cascading">
              <div class="search-contents-title">出发日期</div>
              <div class="search-contents-icon-calendar"></div>
              <div class="search-contents-info">{{flightFromDate | getWeekday}}</div>
              <input type="text" readonly="readonly"
                     @mousedown="calendarRefresh"
                     v-model="flightFromDate">
            </div>
            <div class="flight-date-return section-input search-date search-cascading"
                 :class="{disabled:flightType !== 'double'}">
              <div class="search-contents-title">返程日期</div>
              <div class="search-contents-icon-calendar"></div>
              <div class="search-contents-info">{{flightToDate | getWeekday}}</div>
              <input type="text" readonly="readonly" placeholder="YY-MM-DD"
                     @mousedown="calendarRefresh('flight-to')"
                     v-model="flightToDate">
            </div>
          </div>
          <div class="drop-suggestion-citys"
               v-show="isShowSuggestBox"
               :style="suggestBoxStyle">
            <div class="drop-title">支持中文/拼音/简拼/三字码输入</div>
            <ul class="letter-tabs clearfix">
              <li class="no-blur"
                  v-for="n in citysArr.length"
                  @mousedown="suggestCitysLi=(n-1);triggerBlur=false"
                  :class="{current:suggestCitysLi===(n-1)}">
                {{joinLetters(n - 1)}}<i></i>
              </li>
            </ul>
            <ul class="letter-city-contents">
              <li v-for="n in citysArr.length"
                  v-show="suggestCitysLi === (n-1)">
                <dl class="clearfix"
                    v-for="item in citysArr[(n-1)]"
                    v-show="isDlFilled(item)">
                  <dt>{{item}}</dt>
                  <dd class="drop-city"
                      v-for="city in citys[item]"
                      @mousedown="chooseCity(city.districtName)">{{city.districtName}}
                                </dd>
                </dl>
              </li>
            </ul>
          </div>
          <div class="nova-tip-form" v-show="isFlightError">
            <span class="nova-icon-xs nova-icon-warning"></span>
            <ul class="tip-content">
              <li v-show="isErrorFlightFrom">出发地不能为空</li>
              <li v-show="isErrorFlightTo">目的地不能为空</li>
            </ul>
          </div>
        </li>
        <li class="search-contents-hotel" v-show="currentLi === 'hotel'">
          <div class="hotel-to section-input search-city" :class="{error:isErrorHotelTo}">
            <div class="search-contents-title">目的地</div>
            <input type="text" class="input-city-to" placeholder="请输入目的地"
                   @focus="showSuggestBox('hotel-to')"
                   @blur="hideSuggestBox()"
                   @input="showCompleteBox('hotel-to')"
                   v-model="hotelToContent">
          </div>
          <div class="hotel-keywords section-input search-keywords">
            <div class="search-contents-title">关键字</div>
            <input type="text" placeholder="酒店名称/商圈/地标" class="input-hotel-keywords"
                   @focus="showKeywordsBox('hotel-keywords')"
                   @blur="hideKeywordsBox()"
                   @input="showCompleteBox('hotel-keywords')"
                   v-model="hotelKeywordsContent">
          </div>
          <div class="hotel-date-start section-input search-date search-cascading-hotel">
            <div class="search-contents-title">入住日期</div>
            <div class="search-contents-icon-calendar"></div>
            <div class="search-contents-info">{{hotelFromDate | getWeekday}}</div>
            <input type="text" readonly="readonly"
                   v-model="hotelFromDate">
          </div>
          <div class="hotel-date-end section-input search-date search-cascading-hotel">
            <div class="search-contents-title">退房日期</div>
            <div class="search-contents-info">{{hotelToDate | getWeekday}}</div>
            <div class="search-contents-icon-calendar"></div>
            <input type="text" readonly="readonly"
                   v-model="hotelToDate">
          </div>
          <div class="drop-suggestion-citys"
               v-show="isShowSuggestBox"
               :style="suggestBoxStyle">
            <div class="drop-title">热门城市</div>
            <ul class="city-hot clearfix">
              <li class="drop-city"
                  v-for="city in citys.hot"
                  @mousedown="chooseCity(city.districtName,city.districtId)">{{city.districtName}}
                        </li>
            </ul>
            <ul class="letter-tabs clearfix">
              <li class="no-blur"
                  v-for="n in citysArr.length"
                  @mousedown="suggestCitysLi=(n-1);triggerBlur=false"
                  :class="{current:suggestCitysLi===(n-1)}">
                {{joinLetters(n - 1)}}<i></i>
              </li>
            </ul>
            <ul class="letter-city-contents">
              <li v-for="n in citysArr.length"
                  v-show="suggestCitysLi === (n-1)">
                <dl class="clearfix"
                    v-for="item in citysArr[(n-1)]"
                    v-show="isDlFilled(item)">
                  <dt>{{item}}</dt>
                  <dd class="drop-city"
                      v-for="city in citys[item]"
                      @mousedown="chooseCity(city.districtName,city.districtId)">{{city.districtName}}
                                </dd>
                </dl>
              </li>
            </ul>
          </div>
          <div class="drop-suggestion-keywords"
               v-show="isShowKeywordsBox"
               :style="keywordsBoxStyle">
            <div class="keywords-transport clearfix">
              <p class="keywords-title">交通枢纽</p>
              <p class="keywords-details">
                            <span v-for="item in keywordsObj.metro"
                                  @mousedown="chooseCity(item.searchValue)">{{item.searchValue}}</span>
              </p>
            </div>
            <div class="keywords-subway">
              <p class="keywords-title">地铁站</p>
              <p class="keywords-details">
                            <span v-for="item in keywordsObj.traffic"
                                  @mousedown="chooseCity(item.searchValue)">{{item.searchValue}}</span>
              </p>
            </div>
          </div>
          <div class="nova-tip-form" v-show="isHotelError">
            <span class="nova-icon-xs nova-icon-warning"></span>
            <ul class="tip-content">
              <li v-show="isErrorHotelTo">目的地不能为空</li>
            </ul>
          </div>
        </li>
      </ul>
      <ul class="drop-complete"
          v-show="isShowCompleteBox"
          :style="compelteBoxStyle">
        <li class="drop-city" v-for="(item,index) in completeResults" :class="{current:currentCompleteIndex === index}"
            @mousedown="chooseCity(item.searchValue||item.name)">{{item.searchValue}}
                <span class="name" v-show="currentCompleteBox==='hotel-keywords'">{{item.name}}</span><span class="hotelCount" v-show="currentCompleteBox==='hotel-keywords'&&item.hotelCount!==0">约{{item.hotelCount}}家酒店</span><span class="type" v-show="currentCompleteBox==='hotel-keywords'">{{item.type}}</span>
        </li>
      </ul>
      <div class="search-btn-wrapper">
        <a class="search-btn btn btn-pink"
           @click="checkForm(currentLi)">
          <span class="icon"></span>
          <span class="search-btn-words">{{currentLi === 'combo' ? '搜索自由行套餐' : '开始搜索'}}</span>
        </a>
      </div>
    </div>
    <cart></cart>
    <history></history>
    <hot-citys></hot-citys>
  </div>
</template>

<script>
    import axios from 'axios'
    import jsonp from 'jsonp'
    import History from './history.vue'
    import SearchTitle from './search-title.vue'
    import Cart from './cart.vue'
    import HotCitys from './hot-citys.vue'
    export default {
        name: 'search',
        components:{History,SearchTitle,Cart,HotCitys},
        data: function () {
            return {
                currentLi: 'combo',
                currentSuggestBox: '',
                currentCompleteBox: '',
                currentKeywordsBox: '',
                currentCompleteIndex: 0,
                isShowSuggestBox: false,
                isShowCompleteBox: false,
                isShowKeywordsBox: false,
                comboFromContent: '上海',
                comboToContent: '',
                comboFromDate: '',
                comboDays: '4天',
                comboAdultNum: 2,
                comboKidsNum: 0,
                flightFromContent: '上海',
                flightToContent: '',
                flightType: 'single',
                flightFromDate: '',
                flightToDate: '',
                hotelToContent: '上海',
                hotelFromDate: '',
                hotelToDate: '',
                districtId: 9,//hotel keywords专用
                hotelKeywordsContent: '',
                isShowSelections: false,
                isShowSelectionsKids: false,
                isComboError: false,
                isFlightError: false,
                isHotelError: false,
                isErrorComboFrom: false,
                isErrorComboTo: false,
                isErrorComboAdults: false,
                isErrorComboKids: false,
                isErrorFlightFrom: false,
                isErrorFlightTo: false,
                isErrorHotelTo: false,
                calendarFlightReturn: null,
                citys: {},
                completeResults: [],
                keywordsObj: {},
                suggestCitysLi: 0,
                triggerBlur: true,
                citysArr: [['A', 'B', 'C', 'D'], ['E', 'F', 'G', 'H'], ['J', 'K', 'L', 'M'], ['N', 'P', 'Q', 'R', 'S'], ['T', 'U', 'V', 'W', 'X'], ['Y', 'Z']],
                suggestBoxStyle: {
                    top: '0',
                    left: '0'
                },
                compelteBoxStyle: {
                    top: '0',
                    left: '0',
                    width: '0'
                },
                keywordsBoxStyle: {
                    top: '0',
                    left: '0'
                }
            }
        },
        mounted: function () {
            const vm = this;
            document.addEventListener('mousedown', function (e) {
                let classNames = e.target.className;
                if (!classNames.match(/no-blur/)) {
                    vm.triggerBlur = true;
                    vm.hideSuggestBox();
                }
                vm.isShowCompleteBox = false;
            });
            //下拉框内容选择
            document.addEventListener('keydown', function (e) {
                let which = e.which || e.keyCode;
                if ((vm.isShowCompleteBox||vm.isShowSelections||vm.isShowSelectionsKids) && (which === 40 || which === 38)) {
                    e.preventDefault();
                }
            });
            //键盘选中下拉框
            document.addEventListener('keyup', function (e) {
                if (!vm.isShowCompleteBox && !vm.isShowSelections && !vm.isShowSelectionsKids) {
                    return
                }
                let length = 0;
                let which = e.which || e.keyCode;

                e.preventDefault();
                if (vm.isShowSelections) {
                    length = 9
                } else if (vm.isShowSelectionsKids) {
                    length = 7
                } else {
                    length = vm.completeResults.length;
                }
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
                    if (vm.isShowCompleteBox) {
                        vm.chooseCity(vm.completeResults[vm.currentCompleteIndex].searchValue||vm.completeResults[vm.currentCompleteIndex].name);
                    } else if (vm.isShowSelections) {
                        vm.chooseSelections(vm.currentCompleteIndex + 1);
                    } else {
                        vm.chooseSelectionsKids(vm.currentCompleteIndex);
                    }
                }
            });
            //初始化日历
            this.calendarInit();
            //初始化日期
            this.comboFromDate = this.getDate((new Date()), 0);
            this.flightFromDate = this.getDate((new Date()), 0);
            this.hotelFromDate = this.getDate((new Date()), 0);
            this.hotelToDate = this.getDate((new Date()), 3);
        },
        computed: {
            classObject: function () {
                return {
                    current: this.currentLi === 'asd'
                }
            }
        },
        filters: {
            getWeekday: function (date) {
                const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
                let dateObj = new Date(date);
                let weekDay = week[dateObj.getDay()];
                return weekDay;
            },
            returnDateCalc: function (date, comboDays) {
                let daysTime = parseInt(comboDays) * 86400000;
                let dateObj = new Date(date);
                let $date = new Date(dateObj.getTime() + daysTime);
                let dateArr = [$date.getFullYear(), $date.getMonth() + 1, $date.getDate()];
                //+0
                dateArr[1] = dateArr[1] < 10 ? '0' + dateArr[1] : dateArr[1];
                dateArr[2] = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2];
                return dateArr.join('-');

            }
        },
        watch: {
            comboFromContent: function () {
                this.isComboError ? this.checkForm() : '';
            },
            comboToContent: function () {
                this.isComboError ? this.checkForm() : '';
            },
            comboAdultNum: function () {
                this.isComboError ? this.checkForm() : '';
            },
            comboKidsNum: function () {
                this.isComboError ? this.checkForm() : '';
            },
            flightFromContent: function () {
                this.isFlightError ? this.checkForm() : '';
            },
            flightToContent: function () {
                this.isFlightError ? this.checkForm() : '';
            },
            hotelToContent: function () {
                this.isHotelError ? this.checkForm() : '';
            }
        },
        methods: {
            getDate: function (dateObj, daysAfter) {
                let daysTime = parseInt(daysAfter) * 86400000;
                let $date = new Date(dateObj.getTime() + daysTime);
                let dateArr = [$date.getFullYear(), $date.getMonth() + 1, $date.getDate()];
                //+0
                dateArr[1] = dateArr[1] < 10 ? '0' + dateArr[1] : dateArr[1];
                dateArr[2] = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2];
                return dateArr.join('-');
            },
            tabSwitch: function (name) {
                this.currentLi = name;
            },
            showSuggestBox: function (className) {
                //发送ajax请求
                var vm = this;
                axios.get('static/data/citys.json').then(function (res) {
                    vm.citys = res.data;
                    //初始化tab切换
                    vm.suggestCitysLi = 0;
                    //计算位置
                    vm.getPosition(className);
                    vm.isShowSuggestBox = true;
                    vm.currentSuggestBox = className;
                }, function (error) {
                    console.log('error', error)
                })
            },
            showCompleteBox: function (className)  {
                //发送ajax请求
                var vm = this;
                //初始化index
                vm.currentCompleteIndex = 0;
                let keyword = this.comboFromContent;
                let type = 'TICKET';
                let url = 'http://s.lvmama.com/autocomplete/autoCompleteNew.do';
                let districtId = '';
                switch (className) {
                    case 'combo-from':
                        keyword = this.comboFromContent;
                        break;
                    case 'combo-to':
                        keyword = this.comboToContent;
                        break;
                    case 'flight-from':
                        keyword = this.flightFromContent;
                        break;
                    case 'flight-to':
                        keyword = this.flightToContent;
                        break;
                    case 'hotel-to':
                        keyword = this.hotelToContent;
                        break;
                    case 'hotel-keywords':
                        keyword = this.hotelKeywordsContent;
                        type = 'HOTEL';
                        url = 'http://s.lvmama.com/autocomplete/autoCompleteHotel.do';
                        districtId = '&districtId='+vm.districtId;
                        break;
                    default:
                        return
                }
                //判断是否无内容
                if (keyword === '') {
                    //关闭suggestBox,completeBOx
                    vm.isShowCompleteBox = false;
                    if(className === 'hotel-keywords'){
                        this.showKeywordsBox(className)
                    }else {
                        this.showSuggestBox(className)
                    }
                } else {
                    jsonp(url + '?' + 'type='+ type +'&keyword=' + keyword + districtId, function (err, data) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            vm.completeResults = data.matchList;
                            //判断是否有结果
                            if (vm.completeResults.length !== 0) {
                                //计算位置
                                vm.getPosition(className);
                                vm.isShowCompleteBox = true;
                                vm.currentCompleteBox = className;
                            } else {
                                vm.isShowCompleteBox = false;
                            }
                            //关闭suggestBox,completeBOx
                            vm.isShowSuggestBox = false;
                        }
                    });
                }
            },
            showKeywordsBox: function (className) {
                //发送ajax请求
                var vm = this;
                jsonp('http://s.lvmama.com/autocomplete/autoCompleteHotel.do?' + 'type=REC&districtId=' + vm.districtId, function (err, data) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        vm.keywordsObj = data;
                        vm.currentKeywordsBox = className;
                        //计算位置
                        vm.getPosition(className);
                        vm.isShowKeywordsBox = true;
                    }
                });
            },
            getPosition: function (className) {
                let targetBox = document.querySelector('.' + className);
                let top = targetBox.offsetTop + targetBox.clientHeight + 3;
                let left = targetBox.offsetLeft;
                let width=0;
                if(className === 'hotel-keywords') {
                    width = 418;
                }else {
                    width = targetBox.offsetWidth;
                }
                this.suggestBoxStyle.top = top + 'px';
                this.suggestBoxStyle.left = left + 'px';
                this.compelteBoxStyle.top = top + 'px';
                this.compelteBoxStyle.left = left + 'px';
                this.compelteBoxStyle.width = width + 'px';
                this.keywordsBoxStyle.top = top + 'px';
                this.keywordsBoxStyle.left = left + 'px';
            },
            hideSuggestBox: function () {
                if (this.triggerBlur) {
                    this.isShowSuggestBox = false;
                }
                this.triggerBlur = true;
            },
            hideKeywordsBox: function () {
                if (this.triggerBlur) {
                    this.isShowKeywordsBox = false;
                }
                this.triggerBlur = true;
            },
            joinLetters: function (index) {
                let newArr = this.citysArr.map(function (x) {
                    let str = '';
                    for (let i = 0; i < x.length; i++) {
                        str += x[i]
                    }
                    return str
                });
                return newArr[index];
            },
            chooseCity: function (res,districtId) {
                let targetBox = '';
                if (this.isShowSuggestBox) {
                    targetBox = this.currentSuggestBox
                } else if(this.isShowCompleteBox) {
                    targetBox = this.currentCompleteBox
                }else {
                    targetBox = this.currentKeywordsBox
                }
                switch (targetBox) {
                    case 'combo-from':
                        this.comboFromContent = res;
                        break;
                    case 'combo-to':
                        this.comboToContent = res;
                        break;
                    case 'flight-from':
                        this.flightFromContent = res;
                        break;
                    case 'flight-to':
                        this.flightToContent = res;
                        break;
                    case 'hotel-to':
                        this.hotelToContent = res;
                        break;
                    case 'hotel-keywords':
                        this.hotelKeywordsContent = res;
                        break;
                    default:
                        return
                }
                //处理hotel keywords中的districtId
                if(districtId){
                    this.districtId = districtId;
                }
                this.isShowCompleteBox = false;
                this.isShowKeywordsBox = false;
            },
            isDlFilled: function (index) {
                let arr = this.citys.hot && this.citys[index];
                if (arr) {
                    if (arr.length === 0) {
                        return false;
                    } else {
                        return true;
                    }
                }

            },
            calendarRefresh: function (className) {
                //飞机日历,随时刷新cascadingNextAutoFlag
                let vm = this;
                this.calendarFlightReturn && this.calendarFlightReturn.destroy();
                //判断单程还是返程
                let cascadingNextAutoFlag = true;
                if (vm.flightType === 'single') {
                    cascadingNextAutoFlag = false;
                }
                //初始化连级日历
                this.calendarFlightReturn = lv.calendar({
                    autoRender: false,
                    trigger: ".search-cascading input",
                    triggerEvent: "click",
                    bimonthly: true,
                    //定位偏移
                    monthNext: 10,
                    monthPrev: 10,
                    dayPrev: 0,
                    template: "small",
                    cascading: true,
                    cascadingOffset: 4,
                    cascadingNextAuto: cascadingNextAutoFlag,
                    //点击选择日期后的回调函数 默认返回值: calendar对象
                    selectDateCallback: function () {
                        let self = this;
                        setTimeout(function () {
                            vm.flightFromhotelFromDateDate = self.cascadingSelected.start;
                            vm.hotelToDate = self.cascadingSelected.end?self.cascadingSelected.end:'';
                        },0);
                        if(className === 'flight-to'){
                            vm.changeFlightType('double')
                        }
                    }
                });

            },
            calendarInit: function () {
                var vm = this;
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
                            vm.comboFromDate = i;
                        }
                    }
                });
                this.calendarRefresh();
                //初始化连级日历-hotel
                lv.calendar({
                    autoRender: false,
                    trigger: ".search-cascading-hotel input",
                    triggerEvent: "click",
                    bimonthly: true,
                    //定位偏移
                    monthNext: 10,
                    monthPrev: 10,
                    dayPrev: 0,
                    template: "small",
                    cascading: true,
                    cascadingNextAuto: true,
                    cascadingOffset: 2,
                    showNumberOfDays: true,
                    //点击选择日期后的回调函数 默认返回值: calendar对象
                    selectDateCallback: function () {
                        let self = this;
                        setTimeout(function () {
                            vm.hotelFromDate = self.cascadingSelected.start;
                            vm.hotelToDate = self.cascadingSelected.end?self.cascadingSelected.end:'';
                        },0);
                    }
                })
            },
            numCalc: function (move, least, maximum) {
                let comboDaysNum = parseInt(this.comboDays);
                comboDaysNum = comboDaysNum + move;
                if (comboDaysNum >= maximum) comboDaysNum = maximum;
                if (comboDaysNum <= least) comboDaysNum = least;
                this.comboDays = comboDaysNum + '天'
            },
            inputComboDays: function (least, maximum) {
                this.comboDays = parseInt(this.comboDays) || 0;
                if (this.comboDays >= maximum) this.comboDays = maximum;
                if (this.comboDays <= 0) this.comboDays = 0;
            },
            focusComboDays: function () {
                this.comboDays = parseInt(this.comboDays)
            },
            chooseSelections: function (num) {
                this.comboAdultNum = num;
                this.isShowSelections = false;
            },
            chooseSelectionsKids: function (num) {
                this.comboKidsNum = num;
                this.isShowSelectionsKids = false;
            },
            changeFlightType: function (type) {
                this.flightType = type;
                //处理日历
                this.calendarRefresh(type);
                if(type === 'double'){
                    this.flightToDate = this.getDate(new Date(this.flightFromDate),4);
                }
            },
            switchFlightCity: function () {
                let from = this.flightFromContent;
                let to = this.flightToContent;
                this.flightToContent = from;
                this.flightFromContent = to;
                //表单验证，更新错误信息
            },
            checkForm: function (name) {
                //检查是否为空
                this.isComboError = false;
                this.isFlightError = false;
                this.isHotelError = false;
                this.isErrorComboFrom = false;
                this.isErrorComboTo = false;
                this.isErrorComboAdults = false;
                this.isErrorComboKids = false;
                this.isErrorFlightFrom = false;
                this.isErrorFlightTo = false;
                this.isErrorHotelTo = false;
                if(this.currentLi === 'combo'){
                    if (this.comboFromContent === '') {
                        this.isErrorComboFrom = true;
                        this.isComboError = true;
                    }
                    if (this.comboToContent === '') {
                        this.isErrorComboTo = true;
                        this.isComboError = true;
                    }
                    if ((this.comboAdultNum + this.comboKidsNum) >= 9) {
                        this.isErrorComboAdults = true;
                        this.isComboError = true;
                    }
                    if (this.comboKidsNum > this.comboAdultNum * 2) {
                        this.isErrorComboKids = true;
                        this.isComboError = true;
                    }
                    if (!this.isComboError&&name) {
                        this.$router.push('/combo')
                    }
                }else if(this.currentLi === 'flight'){
                    if (this.flightFromContent === '') {
                        this.isErrorFlightFrom = true;
                        this.isFlightError = true;
                    }
                    if (this.flightToContent === '') {
                        this.isErrorFlightTo = true;
                        this.isFlightError = true;
                    }
                    if (!this.isFlightError&&name) {
                        alert('flight pass!')
                    }
                }else {
                    if (this.hotelToContent === '') {
                        this.isErrorHotelTo = true;
                        this.isHotelError = true;
                    }
                    if (!this.isHotelError&&name) {
                        alert('Hotel pass!')
                    }
                }
            }
        }
    }
</script>


<style lang="scss">
    @import "../../assets/scss/_var.scss";

    .ui-calendar {
        z-index: 10;
    }

    .cal-number-of-days {
        z-index: 10;
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
            background: url("../../assets/imgs/sprite@2x/banner-title.png");
            width: 209px;
            height: 49px;
        }
        background: url("../../assets/imgs/banner.jpg") no-repeat center;
    }

    .search-container {
        position: absolute;
        top: 120px;
        left: 50%;
        margin-left: -(685px/2);
        width: 585px;
        height: 306px;
        *z-index: 1;
        background-color: rgba(0, 0, 0, 0.6);
        background-color: #444 \9
    ;
        *background-color: #444;
        padding: 25px 50px;
        border-radius: 8px;
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
                    background: url("../../assets/imgs/sprite@2x/icon-tab-combo.png");
                }
                &.current {
                    i {
                        background: url("../../assets/imgs/sprite@2x/icon-tab-combo-cur.png");
                    }
                }
            }
            .tab-flight {
                i {
                    background: url("../../assets/imgs/sprite@2x/icon-tab-flight.png");
                }
                &.current {
                    i {
                        background: url("../../assets/imgs/sprite@2x/icon-tab-flight-cur.png");
                    }
                }
            }
            .tab-hotel {
                border: 0;
                i {
                    background: url("../../assets/imgs/sprite@2x/icon-tab-hotel.png");
                    height: 25px;
                    width: 23px;
                }
                &.current {
                    i {
                        background: url("../../assets/imgs/sprite@2x/icon-tab-hotel-cur.png");
                    }
                }
            }
            .tab-ticket {
                border: 0;
                i {
                    background: url("../../assets/imgs/sprite@2x/icon-tab-ticket.png");
                    width: 26px;
                    height: 26px;
                }
                &.current {
                    i {
                        background: url("../../assets/imgs/sprite@2x/icon-tab-ticket-cur.png");
                    }
                }
            }
        }
        .search-contents {
            display: block;
            margin-left: -15px;
            border-radius: 3px;
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
                    background: url(../../assets/imgs/alpha.gif) repeat;
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
                    background: url("../../assets/imgs/sprite@2x/icon-loaction.png");
                }
                .search-contents-icon-calendar {
                    @extend .search-contents-icon-location;
                    top: 13px;
                    height: 15px;
                    background: url("../../assets/imgs/sprite@2x/icon-calendar.png");
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
                    background: url("../../assets/imgs/sprite@2x/icon-num-add.png");
                    &.disabled {
                        background: url("../../assets/imgs/sprite@2x/icon-num-add-not.png");
                    }
                }
                .num-minus {
                    @extend .num-add;
                    right: 175px;
                    background: url("../../assets/imgs/sprite@2x/icon-num-minus.png");
                    &.disabled {
                        background: url("../../assets/imgs/sprite@2x/icon-num-minus-not.png");
                    }
                }
                .search-contents-select {
                    width: 100px;
                    padding-right: 100px;
                }
                .search-contents-selections {
                    //display: none;
                    position: absolute;
                    top: 41px;
                    background-color: #fff;
                    border: 1px solid #ccc \9
                ;
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
                        font-family: Arial;
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
                //display: none;
                position: absolute;
                top: 244px;
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
            .combo-from, .combo-to {
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
                    background: url("../../assets/imgs/sprite@2x/icon-select.png");
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
                    background: url("../../assets/imgs/sprite@2x/flight-not.png");
                    @include inlineblock;
                    width: 22px;
                    height: 22px;
                    vertical-align: top;
                }
                &.current {
                    span {
                        background: url("../../assets/imgs/sprite@2x/flight-choose.png");
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
                    background: url("../../assets/imgs/sprite@2x/flight-change.png");
                    &:hover {
                        background: url("../../assets/imgs/sprite@2x/flight-change-hover.png");
                    }
                }
            }
            .dates-wrapper {
                width: 240px;
                float: left;
                .flight-date-return {
                    &.search-cascading {
                        input {
                            background: url(../../assets/imgs/alpha.gif) repeat;
                        }
                        color: #333;
                        .search-contents-icon-calendar, .search-contents-info {
                            display: block;
                        }
                    }
                    &.disabled {
                        input {
                            background-color: #eee;
                            @include opacity(0.5);
                        }
                        color: #999;
                        .search-contents-icon-calendar, .search-contents-info {
                            display: none;
                        }
                    }
                }
            }
        }
        .search-contents-hotel {
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
        .search-contents-ticket {
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
            top: 268px;
            left: 0;
            text-align: center;
            .search-btn {
                @include inlineblock;
                color: #fff;
                border-radius: 5px;
                width: 300px;
                height: 48px;
                font-size: 20px;
                line-height: 48px;
                cursor: pointer;
                .icon {
                    @include inlineblock;
                    background: url("../../assets/imgs/sprite@2x/search-btn.png");
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
            border: 1px solid #ccc \9
        ;
            box-shadow: 0px 2px 4px #999;
            top: 100px;
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
                    font-family: Arial;
                    font-size: 14px;
                    i {
                        display: none;
                        position: absolute;
                        bottom: -2px;
                        left: 30px;
                        background: url("../../assets/imgs/sprite/icon-arrow.png");
                        width: 11px;
                        height: 6px;
                    }
                    &.current {
                        font-family: Arial;
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
                        top: 8px;
                        left: 0;
                        font-family: Arial;
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
                font-size: 12px;
                color: #999999;
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
                color: #666666;
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
