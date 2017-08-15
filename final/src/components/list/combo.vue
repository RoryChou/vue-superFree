<template>
  <div class="wrap">

    <list-top></list-top>

    <!-- 搜索框 -->
    <div class="ticket_search">
      <div class="search_nav_box" v-show="isShowNav!=='false'">
        <ul class="search_nav">
          <li class="search_li">
            <router-link to="combo">优选套餐</router-link>
          </li>
          <li>
            <router-link to="flight">机票</router-link>
            <i></i>
          </li>
          <li>
            <router-link to="hotel">酒店</router-link>
          </li>
        </ul>
      </div>
      <p class="ticket-search-title" v-show="isShowNav==='false'">优选套餐</p>
      <div class="head-wrapper">
        <div class="main_search search-contents-combo">
          <div class="search-bar-wrapper">
            <div class="default-box clearfix" v-show="!isShowChangeBox">
              <div class="city">
                <i class="icon"></i>
                <p class="flight-from">
                  <span class="city-from-str">{{comboFromContent}}</span>
                  <span><b class="date-from-str">{{comboFromDate}}</b>出发</span>
                </p>
                <i class="icon-flight-double" :class="{'icon-flight-double':isFlightDouble,'icon-flight-single':!isFlightDouble}"></i>
                <p class="flight-to">
                  <span class="city-to-str">{{comboToContent}}</span>
                  <span><b class="date-to-str">{{comboDateToStr}}</b>返回</span>
                </p>
              </div>
              <div class="date">
                <i class="icon"></i>
                <span>
                    <b class="hotel-days">{{comboDays}}</b>
                  </span>
              </div>
              <div class="persons">
                <i class="icon"></i>
                <span>
                    <b class="adult-num">{{comboAdultNum}}</b>成人
                  </span>
                <span>
                    <b class="kid-num">{{comboKidsNum}}</b>儿童
                  </span>
              </div>
              <div class="btn-wrapper">
                <div class="btn btn-change btn-pink"
                     @click="changeRoute()">更改行程</div>
              </div>
            </div>
            <div class="change-box clearfix" v-show="isShowChangeBox">
              <div class="city">
                <i class="icon"></i>
                <div class="input-wrapper">
                  <div class="combo-from section-input search-city">
                    <div class="search-contents-title">出发地</div>
                    <input type="text" class="input-city-from" placeholder="请输入出发地"
                           @focus="showSuggestBox('combo-from')"
                           @blur="hideSuggestBox()"
                           @input="showCompleteBox('combo-from')"
                           v-model="comboFromContent">
                    <div class="error-box" v-show="isErrorComboFrom">
                      <div class="tip-arrow tip-arrow-left">
                        <em>◆</em>
                        <i>◆</i>
                      </div>
                      <i class="error-icon"></i>
                      <p>出发地不能为空</p>
                    </div>
                  </div>
                  <div class="combo-to section-input search-city">
                    <div class="search-contents-title">目的地</div>
                    <input type="text" class="input-city-to" placeholder="请输入目的地"
                           @focus="showSuggestBox('combo-to')"
                           @blur="hideSuggestBox()"
                           @input="showCompleteBox('combo-to')"
                           v-model="comboToContent">
                    <div class="error-box" v-show="isErrorComboTo">
                      <div class="tip-arrow tip-arrow-left">
                        <em>◆</em>
                        <i>◆</i>
                      </div>
                      <i class="error-icon"></i>
                      <p>目的地不能为空</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="date">
                <i class="icon"></i>
                <div class="input-wrapper">
                  <div class="combo-date section-input search-date search-calendar-common search-date-from">
                    <div class="search-contents-title">出发日期</div>
                    <div class="search-contents-info">{{comboFromDate | getWeekday}}</div>
                    <input type="text" readonly="readonly" class="input-date-from"
                           v-model="comboFromDate">
                  </div>
                  <div class="combo-days section-input">
                    <div class="search-contents-title">游玩天数</div>
                    <div class="search-contents-info">{{returnDateCalc(comboFromDate,comboDays)}}</div>
                    <div class="num-minus"
                         @click="numCalc(-1,1,20)"
                         :class="{disabled:parseInt(comboDays)===1}"></div>
                    <div class="num-add"
                         @click="numCalc(1,1,20)"
                         :class="{disabled:comboDays==='20天'}"></div>
                    <input type="text"
                           v-model="comboDays"
                           @blur="numCalc(0,1,20)"
                           @input="inputComboDays(1,20)"
                           @focus="focusComboDays">
                  </div>
                </div>
              </div>
              <div class="persons-num">
                <i class="icon"></i>
                <div class="input-wrapper">
                  <div class="combo-persons-adult section-input">
                    <div class="search-contents-title">成人</div>
                    <input class="search-contents-select" value="2" readonly="readonly"
                           @click="isShowSelections = !isShowSelections;currentCompleteIndex = 0"
                           @blur="isShowSelections = false"
                           v-model="comboAdultNum">
                    <b :class="{active:isShowSelections}"></b>
                    <div class="error-box" v-show="isErrorComboAdults">
                      <div class="tip-arrow tip-arrow-top">
                        <em>◆</em>
                        <i>◆</i>
                      </div>
                      <i class="error-icon"></i>
                      <p>总人数不能超过9人哦</p>
                    </div>
                    <ul class="search-contents-selections" v-show="isShowSelections">
                      <li v-for="n in 9"
                          @mousedown="chooseSelections(n)"
                          :class="{current:currentCompleteIndex === n-1}">{{n}}
                        </li>
                    </ul>
                  </div>
                  <div class="combo-persons-children section-input">
                    <div class="search-contents-title">儿童</div>
                    <div class="search-contents-info">2-12岁</div>
                    <input class="search-contents-select" value="0" readonly="readonly"
                           @click="isShowSelectionsKids = !isShowSelectionsKids;currentCompleteIndex = 0;"
                           @blur="isShowSelectionsKids = false"
                           v-model="comboKidsNum">
                    <b :class="{active:isShowSelectionsKids}"></b>
                    <div class="error-box" v-show="isErrorComboKids">
                      <div class="tip-arrow tip-arrow-top">
                        <em>◆</em>
                        <i>◆</i>
                      </div>
                      <i class="error-icon"></i>
                      <p>儿童数最多为{{comboAdultNum*2}}人哦</p>
                    </div>
                    <ul class="search-contents-selections" v-show="isShowSelectionsKids">
                      <li v-for="n in 7"
                          @mousedown="chooseSelectionsKids(n-1)"
                          :class="{current:currentCompleteIndex === n-1}">{{n - 1}}
                        </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="btn-wrapper">
                <div class="btn btn-pink search-btn"
                     @click="checkForm('combo')">
                  搜索
                </div>
                <div class="btn cancle search-btn-cancle"
                     @click="cancelChange()">
                  取消
                </div>
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
            </div>
            <!--<ul class="drop-complete"></ul>-->
          </div>
        </div>
        <div class="search_sort clearfix">
          <div class="search_list clearfix">
            <div class="search_theme">酒店星级</div>
            <dl class="search_theme_list clearfix">
              <dt><a class="select" href="javascript:;">不限</a></dt>
              <dd>
                <span class="navListSpan"><a href="javascript:;"><span
                  class="hlIcon hlIcon-select"></span>五星级/豪华型</a></span>
                <span class="navListSpan"><a href="javascript:;"><span
                  class="hlIcon hlIcon-select"></span>四星级/品质型</a></span>
                <span class="navListSpan"><a href="javascript:;"><span
                  class="hlIcon hlIcon-select"></span>三星级/舒适性</a></span>
                <span class="navListSpan"><a href="javascript:;"><span
                  class="hlIcon hlIcon-select"></span>二星级/简约型</a></span>
                <span class="navListSpan"><a href="javascript:;"><span
                  class="hlIcon hlIcon-select"></span>其他/其他</a></span>
                <span class="navListSpan"><a href="javascript:;"><span
                  class="hlIcon hlIcon-select"></span>其他/其他</a></span>
                <span class="navListSpan"><a href="javascript:;"><span
                  class="hlIcon hlIcon-select"></span>其他/其他</a></span>
                <span class="navListSpan"><a href="javascript:;"><span
                  class="hlIcon hlIcon-select"></span>其他/其他</a></span>
                <span class="navListSpan"><a href="javascript:;"><span
                  class="hlIcon hlIcon-select"></span>其他/其他</a></span>
                <span class="navListSpan"><a href="javascript:;"><span
                  class="hlIcon hlIcon-select"></span>其他/其他</a></span>
                <span class="navListSpan"><a href="javascript:;"><span
                  class="hlIcon hlIcon-select"></span>其他/其他</a></span>
              </dd>
            </dl>
            <a class="seach_gd_btn js_moreOpt_btn">更多<i class="arrow"></i></a>
          </div>
          <div class="search_list clearfix">
            <div class="search_theme">组合搭配</div>
            <dl class="search_theme_list clearfix">
              <dt><a class="select" href="javascript:;">不限</a></dt>
              <dd>
                <span class="navListSpan"><a href="javascript:;"><span
                  class="hlIcon hlIcon-select"></span>含飞机</a></span>
                <span class="navListSpan"><a href="javascript:;"><span
                  class="hlIcon hlIcon-select"></span>含门票</a></span>
              </dd>
            </dl>
          </div>
          <div class="search_list result_sort clearfix">
            <div class="search_theme">排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序</div>
            <ul class="search_theme_list rank_box clearfix">
              <li class="active">推荐<b>|</b></li>
              <li title="按人气从低到高排序">人气<i></i><b>|</b></li>
              <li title="按销量从低到高排序">销量<i></i><b>|</b></li>
              <li title="按价格从高到低排序" class="tl-col-down">价格<i></i><b>|</b></li>
              <li title="自定义">
                <p class="diy">自定义</p>
                <div class="search-filter-price-new">
                  <div class="search-filter-price-new-dropdown">
                    <div class="clearfix">
                      <label>
                        <input type="text" class="price-low-input" id="price1" placeholder="最低价">
                      </label>
                      <em></em>
                      <label>
                        <input type="text" class="price-high-input" id="price2" placeholder="最高价">
                      </label>
                    </div>
                    <p class="price-tip">
                      本次价格区间<span class="price-low">200</span>至<span class="price-high">3888</span>
                    </p>
                    <p class="control">
                      <span class="btn btn-sm JS_btn_cls btn-disabled">清除</span><span
                      class="btn JS_btn_ok btn-sm btn-orange btn-disabled" id="priceBtn">确定</span>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索框END -->
    <div class="search-num">
      为您找到<span>520</span>份套餐
        <i></i>（提供的总价中包含机票机场建设费&燃油费）
    </div>

    <!--商品列表-->
    <div class="main-box">
      <div class="loading_box">
        <i class="icon_loading"></i>
        <span>请稍候，正在为您查询</span>
      </div>
      <!-- 列表开始 -->
      <div class="main-list">
        <div class="list-prod clearfix">
          <div class="list-left">
            <div class="list-title">
              <div class="list-left-wrapper clearfix">
                <p class="pro-num">1</p>
                <p class="list-title-main">
                  上海-厦门 4天3晚 5月10日出发
              </p>
                <p class="list-title-type">机票+酒店+门票</p>
              </div>
            </div>
            <div class="list-hotel">
              <div class="list-left-wrapper clearfix">
                <div class="list-icon"></div>
                <div class="list-hotel-main list-main-left clearfix">
                  <div class="list-hotel-wrapper  clearfix">
                    <a href="javascript:;" class="list-hotel-pic js_hotel_name">
                      <img src="http://placehold.it/140x93/ffddff" alt="" width="140" height="93px">
                    </a>
                    <div class="list-main-left-desc">
                      <div class="hotel-desc-top">
                        <a href="javascript:;" class="list-hotel-title-words js_hotel_name">厦门希尔顿逸林酒店</a>
                        <span class="hotel_stars hotel_stars04" title="国家旅游评定为四星级酒店"></span>
                        <span class="djjd_tagsclasses" title="驴妈妈用户评定为高档型酒店">
                                                            <i>[高档型]</i>
                                                        </span>
                        <strong class="js-tips" tip-content="预售提示">预售</strong>
                        <span class="tags-summer-sale">暑期大促</span>
                      </div>
                      <div class="hotel-desc-next">
                        <p class="evaluate">
                          满意度<span class="num">92%</span>
                        </p>
                        <p class="eval_count">
                          <a class="comment-num js_hotel_content" href="javascript:;">
                            <span>5892</span>人点评
                                                </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="list-hotel-details clearfix">
                    <span class="list-icon-notice">房型</span>
                    <span class="list-hotel-details-desc">豪华大床房最多十二个字字</span>
                    <i class="tl-confirm js-tips" tip-content="立即确认!!!">立即确认</i>
                    <span class="list-info-bed list-info-1">大床/双床</span>
                    <span class="list-info-breakfast list-info-2">双早</span>
                    <span class="list-info-refuse js-tips list-info-4" tip-content="不可退改!!!">不可退改</span>
                    <span class="list-info-hotel-num list-info-5"> <i>1</i>间</span>
                    <span class="list-info-hotel-days list-info-6"><i>3</i>晚</span>
                  </div>
                </div>
                <div class="list-main-btns">
                  <div class="btn-change-pro-hotel">
                    <i></i>
                    更换酒店


                  </div>
                  <div class="btn-add-cart btn-add-cart-new">
                    <i></i>
                    加入购物车


                  </div>
                </div>
              </div>
              <div class="list-left-wrapper clearfix">
                <div class="list-icon"></div>
                <div class="list-hotel-main list-main-left clearfix">
                  <div class="list-hotel-wrapper  clearfix">
                    <a href="javascript:;" class="list-hotel-pic js_hotel_name">
                      <img src="http://placehold.it/140x93/ffddff" alt="" width="140" height="93px">
                    </a>
                    <div class="list-main-left-desc">
                      <div class="hotel-desc-top">
                        <a href="javascript:;" class="list-hotel-title-words js_hotel_name">厦门希尔顿逸林酒店</a>
                        <span class="hotel_stars hotel_stars04" title="国家旅游评定为四星级酒店"></span>
                        <span class="djjd_tagsclasses" title="驴妈妈用户评定为高档型酒店">
                                                            <i>[高档型]</i>
                                                        </span>
                        <strong class="js-tips" tip-content="预售提示">预售</strong>
                        <span class="tags-summer-sale">暑期大促</span>
                      </div>
                      <div class="hotel-desc-next">
                        <p class="evaluate">
                          满意度<span class="num">92%</span>
                        </p>
                        <p class="eval_count">
                          <a class="comment-num js_hotel_content" href="javascript:;">
                            <span>5892</span>人点评
                                                </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="list-hotel-details clearfix">
                    <span class="list-icon-notice">房型</span>
                    <span class="list-hotel-details-desc">豪华大床房最多十二个字字</span>
                    <i class="tl-confirm js-tips" tip-content="立即确认!!!">立即确认</i>
                    <span class="list-info-bed list-info-1">大床/双床</span>
                    <span class="list-info-breakfast list-info-2">双早</span>
                    <span class="list-info-refuse js-tips list-info-4" tip-content="不可退改!!!">不可退改</span>
                    <span class="list-info-hotel-num list-info-5"> <i>1</i>间</span>
                    <span class="list-info-hotel-days list-info-6"><i>3</i>晚</span>
                  </div>
                </div>
                <div class="list-main-btns">
                  <div class="btn-change-pro-hotel">
                    <i></i>
                    更换酒店


                  </div>
                  <div class="btn-add-cart btn-add-cart-new">
                    <i></i>
                    加入购物车


                  </div>
                </div>
              </div>
            </div>
            <div class="list-flight">
              <div class="list-left-wrapper clearfix">
                <div class="list-icon"></div>
                <div class="list-flight-main list-main-left clearfix">
                  <div class="list-flight-go clearfix">
                    <span class="list-icon-notice">去程</span>
                    <span class="list-flight-time">
                                    <em class="list-flight-time-start">16:30</em>
                                    -
                                    <em class="list-flight-time-arrive">19:50</em>
                                    <i class="add-one-day js-tips"
                                       tip-content="航班到达日期为起飞日期<span class='tip-add-one'>+1天</span>。">+1</i>
                                </span>
                    <span class="list-flight-company">吉祥航空</span>
                    <span class="list-flight-num">HO1221</span>
                    <i class="tl-confirm js-tips" tip-content="立即确认!!!">立即确认</i>
                    <span class="list-airports list-info-1">
                                    <em class="list-airport-from">普通机场T2</em>
                                    -
                                    <em class="list-airport-to">厦门国际机场</em>
                                </span>
                    <span class="list-flight-class list-info-3">经济舱</span>
                    <span class="list-info-4 list-info-refuse tui-gai-qian"
                          tip-content="不可退改!!!">退改签</span>
                    <span class="list-info-hotel-num list-info-5">
                                    <i>2</i>
                                    份
                                </span>
                  </div>
                  <div class="list-flight-return clearfix">
                    <span class="list-icon-notice">返程</span>
                    <span class="list-flight-time">
                                    <em class="list-flight-time-start">16:30</em>
                                    -
                                    <em class="list-flight-time-arrive">19:50</em>
                      <!--<i class="add-one-day" tip-content="航班到达日期为起飞日期<span class='tip-add-one'>+1天</span>。">+1</i>-->
                                </span>
                    <span class="list-flight-company">吉祥航空</span>
                    <span class="list-flight-num">HO1221</span>
                    <i class="tl-confirm js-tips" tip-content="立即确认!!!">立即确认</i>
                    <span class="list-airports list-info-1">
                                    <em class="list-airport-from">厦门国际机场</em>
                                    -
                                    <em class="list-airport-to">普通机场T2</em>
                                </span>
                    <span class="list-flight-class list-info-3">经济舱</span>
                    <span class="list-info-4 list-info-refuse tui-gai-qian"
                          tip-content="不可退改!!!">退改签</span>
                    <span class="list-info-hotel-num list-info-5">
                                    <i>2</i>
                                    份
                                </span>
                  </div>
                </div>
                <div class="list-main-btns">
                  <div class="btn-change-pro-flight">
                    <i></i>
                    更换机票


                  </div>
                  <div class="btn-add-cart btn-add-cart-new">
                    <i></i>
                    加入购物车


                  </div>
                </div>
              </div>
              <div class="list-left-wrapper clearfix">
                <div class="list-icon"></div>
                <div class="list-flight-main list-main-left clearfix">
                  <div class="list-flight-go clearfix">
                    <span class="list-icon-notice">去程</span>
                    <span class="list-flight-time">
                                    <em class="list-flight-time-start">16:30</em>
                                    -
                                    <em class="list-flight-time-arrive">19:50</em>
                                    <i class="add-one-day js-tips"
                                       tip-content="航班到达日期为起飞日期<span class='tip-add-one'>+1天</span>。">+1</i>
                                </span>
                    <span class="list-flight-company">吉祥航空</span>
                    <span class="list-flight-num">HO1221</span>
                    <i class="tl-confirm js-tips" tip-content="立即确认!!!">立即确认</i>
                    <span class="list-airports list-info-1">
                                    <em class="list-airport-from">普通机场T2</em>
                                    -
                                    <em class="list-airport-to">厦门国际机场</em>
                                </span>
                    <span class="list-flight-class list-info-3">经济舱</span>
                    <span class="list-info-4 list-info-refuse tui-gai-qian"
                          tip-content="不可退改!!!">退改签</span>
                    <span class="list-info-hotel-num list-info-5">
                                    <i>2</i>
                                    份
                                </span>
                  </div>
                  <div class="list-flight-return clearfix">
                    <span class="list-icon-notice">返程</span>
                    <span class="list-flight-time">
                                    <em class="list-flight-time-start">16:30</em>
                                    -
                                    <em class="list-flight-time-arrive">19:50</em>
                      <!--<i class="add-one-day" tip-content="航班到达日期为起飞日期<span class='tip-add-one'>+1天</span>。">+1</i>-->
                                </span>
                    <span class="list-flight-company">吉祥航空</span>
                    <span class="list-flight-num">HO1221</span>
                    <i class="tl-confirm js-tips" tip-content="立即确认!!!">立即确认</i>
                    <span class="list-airports list-info-1">
                                    <em class="list-airport-from">厦门国际机场</em>
                                    -
                                    <em class="list-airport-to">普通机场T2</em>
                                </span>
                    <span class="list-flight-class list-info-3">经济舱</span>
                    <span class="list-info-4 list-info-refuse tui-gai-qian"
                          tip-content="不可退改!!!">退改签</span>
                    <span class="list-info-hotel-num list-info-5">
                                    <i>2</i>
                                    份
                                </span>
                  </div>
                </div>
                <div class="list-main-btns">
                  <div class="btn-change-pro-flight">
                    <i></i>
                    更换机票


                  </div>
                  <div class="btn-add-cart btn-add-cart-new">
                    <i></i>
                    加入购物车


                  </div>
                </div>
              </div>
            </div>
            <div class="list-ticket">
              <div class="list-left-wrapper clearfix">
                <div class="list-icon"></div>
                <div class="list-ticket-main list-main-left">
                  <div class="list-ticket-li clearfix">
                    <p class="list-ticket-title">厦门海底世界－成人门票</p>
                    <div class="list-ticket-calendar">
                      <input type="text" class="list-ticket-calendar-input" readonly="readonly"
                             value="2017-05-06">
                      <span class="list-ticket-calendar-weekday">周二</span>
                      <span class="list-ticket-calendar-icon"></span>
                    </div>
                    <div class="list-info-4 list-info-refuse js-tips" tip-content="不可退改!!!">随时退改</div>
                    <span class="list-info-hotel-num list-info-5">
                                    <i>2</i>
                                    份
                                    </span>
                    <div class="btn-add-cart btn-add-cart-new">
                      <i></i>
                      加入购物车


                    </div>
                  </div>
                  <div class="list-ticket-li clearfix">
                    <p class="list-ticket-title">厦门海底世界－成人门票</p>
                    <div class="list-ticket-calendar">
                      <input type="text" class="list-ticket-calendar-input" readonly="readonly"
                             value="2017-05-06">
                      <span class="list-ticket-calendar-weekday">周二</span>
                      <span class="list-ticket-calendar-icon"></span>
                    </div>
                    <div class="list-info-4 list-info-refuse js-tips" tip-content="不可退改!!!">随时退改</div>
                    <span class="list-info-hotel-num list-info-5">
                                    <i>2</i>
                                    份
                                    </span>
                    <div class="btn-add-cart btn-add-cart-new">
                      <i></i>
                      加入购物车


                    </div>
                  </div>
                  <div class="list-ticket-li clearfix">
                    <p class="list-ticket-title">厦门海底世界－成人门票</p>
                    <div class="list-ticket-calendar">
                      <input type="text" class="list-ticket-calendar-input" readonly="readonly"
                             value="2017-05-06">
                      <span class="list-ticket-calendar-weekday">周二</span>
                      <span class="list-ticket-calendar-icon"></span>
                    </div>
                    <div class="list-info-4 list-info-refuse js-tips" tip-content="不可退改!!!">随时退改</div>
                    <span class="list-info-hotel-num list-info-5">
                                    <i>2</i>
                                    份
                                    </span>
                    <div class="btn-add-cart btn-add-cart-new">
                      <i></i>
                      加入购物车


                    </div>
                  </div>
                  <div class="list-ticket-li clearfix" style="display:none;">
                    <p class="list-ticket-title">厦门海底世界－成人门票厦门海底世界－成人门票厦门海底世界－成人门票厦门海底世界－成人门票</p>
                    <div class="list-ticket-calendar">
                      <input type="text" class="list-ticket-calendar-input" readonly="readonly"
                             value="2017-05-06">
                      <span class="list-ticket-calendar-weekday">周二</span>
                      <span class="list-ticket-calendar-icon"></span>
                    </div>
                    <div class="list-info-4 list-info-refuse js-tips" tip-content="不可退改!!!">随时退改</div>
                    <span class="list-info-hotel-num list-info-5">
                                        <i>2</i>
                                        份
                                    </span>
                    <div class="btn-add-cart btn-add-cart-new">
                      <i></i>
                      加入购物车


                    </div>
                  </div>
                  <div class="list-ticket-li clearfix" style="display:none;">
                    <p class="list-ticket-title">厦门海底世界－成人门票厦门海底世界－成人门票厦门海底世界－成人门票厦门海底世界－成人门票</p>
                    <div class="list-ticket-calendar">
                      <input type="text" class="list-ticket-calendar-input" readonly="readonly"
                             value="2017-05-06">
                      <span class="list-ticket-calendar-weekday">周二</span>
                      <span class="list-ticket-calendar-icon"></span>
                    </div>
                    <div class="list-info-4 list-info-refuse js-tips" tip-content="不可退改!!!">随时退改</div>
                    <span class="list-info-hotel-num list-info-5">
                                        <i>2</i>
                                        份
                                    </span>
                    <div class="btn-add-cart btn-add-cart-new">
                      <i></i>
                      加入购物车


                    </div>
                  </div>
                  <a class="list-ticket-more" href="javascript:;">
                    展开全部门票
                    <i></i>
                  </a>
                </div>
              </div>
              <div class="list-left-wrapper clearfix">
                <div class="list-icon"></div>
                <div class="list-ticket-main list-main-left">
                  <div class="list-ticket-li clearfix">
                    <p class="list-ticket-title">厦门海底世界－成人门票</p>
                    <div class="list-ticket-calendar">
                      <input type="text" class="list-ticket-calendar-input" readonly="readonly"
                             value="2017-05-06">
                      <span class="list-ticket-calendar-weekday">周二</span>
                      <span class="list-ticket-calendar-icon"></span>
                    </div>
                    <div class="list-info-4 list-info-refuse js-tips" tip-content="不可退改!!!">随时退改</div>
                    <span class="list-info-hotel-num list-info-5">
                                    <i>2</i>
                                    份
                                    </span>
                    <div class="btn-add-cart btn-add-cart-new">
                      <i></i>
                      加入购物车


                    </div>
                  </div>
                  <div class="list-ticket-li clearfix">
                    <p class="list-ticket-title">厦门海底世界－成人门票</p>
                    <div class="list-ticket-calendar">
                      <input type="text" class="list-ticket-calendar-input" readonly="readonly"
                             value="2017-05-06">
                      <span class="list-ticket-calendar-weekday">周二</span>
                      <span class="list-ticket-calendar-icon"></span>
                    </div>
                    <div class="list-info-4 list-info-refuse js-tips" tip-content="不可退改!!!">随时退改</div>
                    <span class="list-info-hotel-num list-info-5">
                                    <i>2</i>
                                    份
                                    </span>
                    <div class="btn-add-cart btn-add-cart-new">
                      <i></i>
                      加入购物车


                    </div>
                  </div>
                  <div class="list-ticket-li clearfix">
                    <p class="list-ticket-title">厦门海底世界－成人门票</p>
                    <div class="list-ticket-calendar">
                      <input type="text" class="list-ticket-calendar-input" readonly="readonly"
                             value="2017-05-06">
                      <span class="list-ticket-calendar-weekday">周二</span>
                      <span class="list-ticket-calendar-icon"></span>
                    </div>
                    <div class="list-info-4 list-info-refuse js-tips" tip-content="不可退改!!!">随时退改</div>
                    <span class="list-info-hotel-num list-info-5">
                                    <i>2</i>
                                    份
                                    </span>
                    <div class="btn-add-cart btn-add-cart-new">
                      <i></i>
                      加入购物车


                    </div>
                  </div>
                  <div class="list-ticket-li clearfix" style="display:none;">
                    <p class="list-ticket-title">厦门海底世界－成人门票厦门海底世界－成人门票厦门海底世界－成人门票厦门海底世界－成人门票</p>
                    <div class="list-ticket-calendar">
                      <input type="text" class="list-ticket-calendar-input" readonly="readonly"
                             value="2017-05-06">
                      <span class="list-ticket-calendar-weekday">周二</span>
                      <span class="list-ticket-calendar-icon"></span>
                    </div>
                    <div class="list-info-4 list-info-refuse js-tips" tip-content="不可退改!!!">随时退改</div>
                    <span class="list-info-hotel-num list-info-5">
                                        <i>2</i>
                                        份
                                    </span>
                    <div class="btn-add-cart btn-add-cart-new">
                      <i></i>
                      加入购物车


                    </div>
                  </div>
                  <div class="list-ticket-li clearfix" style="display:none;">
                    <p class="list-ticket-title">厦门海底世界－成人门票厦门海底世界－成人门票厦门海底世界－成人门票厦门海底世界－成人门票</p>
                    <div class="list-ticket-calendar">
                      <input type="text" class="list-ticket-calendar-input" readonly="readonly"
                             value="2017-05-06">
                      <span class="list-ticket-calendar-weekday">周二</span>
                      <span class="list-ticket-calendar-icon"></span>
                    </div>
                    <div class="list-info-4 list-info-refuse js-tips" tip-content="不可退改!!!">随时退改</div>
                    <span class="list-info-hotel-num list-info-5">
                                        <i>2</i>
                                        份
                                    </span>
                    <div class="btn-add-cart btn-add-cart-new">
                      <i></i>
                      加入购物车


                    </div>
                  </div>
                  <a class="list-ticket-more" href="javascript:;">
                    展开全部门票
                    <i></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="list-right">
            <div class="list-right-info-top">
              <p class="list-money-total-old clearfix">
                <span class="list-money-info-title">订单总价</span>
                <span class="list-money-total-old-value">¥13875</span>
              </p>
              <p class="list-money-discount clearfix">
                            <span class="list-money-info-title js-tips" tip-content="<div class='tip-li'><span class='tip-title'>满减¥20</span><span>文案文案文案文案文案文案文案文案</span></div>
    <div class='tip-li'><span class='tip-title'>立减优惠</span><span>文案文案文案文案文案文案文案文案</span></div>
    <div class='tip-li'><span class='tip-title'>立减优惠</span><span>文案文案文案文案文案文案文案文案</span></div>">套餐立减</span>
                <span class="list-money-discount-value">- ¥100</span>
              </p>
            </div>
            <div class="list-right-info-main">
              <p class="list-right-info-main-title">套餐总价</p>
              <p class="list-money-total-value">¥<i>13775</i></p>
              <p class="list-right-info-main-title-second">(
                            <span class="adult-num">2</span>
                成人
                <span class="kids-num">0</span>
                儿童)
            </p>
            </div>
            <div class="list-right-btns">
              <a href="#" class="btn btn-lg btn-orange btn-buy">立即预定</a>
              <a href="#" class="btn btn-lg btn-add-cart">加入购物车</a>
              <!--<a href="#" class="btn btn-lg btn-add-cart-already">已加入购物车</a>-->
            </div>
          </div>
        </div>
      </div>
      <!-- 列表开始 END-->
    </div>
    <!--商品列表END-->

    <list-bottom></list-bottom>

    <cart v-bind:cartNum="cartNum"></cart>

  </div>

</template>
<script>
  import ListTop from './list-top.vue';
  import ListBottom from './list-bottom.vue';
  import Cart from '../cart.vue';
  import axios from 'axios'
  import jsonp from 'jsonp'
  export default {
    name: 'combo',
    components: {ListTop,ListBottom,Cart},
    props:['isShowNav'],
    data: function () {
      return {
        currentLi:'combo',
        comboFromDate: '2017-08-14',
        comboDateToStr: '2017-08-17',
        comboFromContent: '上海',
        comboToContent: '厦门',
        comboDays: '3天',
        comboAdultNum: 2,
        comboKidsNum: 1,
        cartNum:0,
        isShowChangeBox: false,
        currentSuggestBox: '',
        currentCompleteBox: '',
        currentKeywordsBox: '',
        currentCompleteIndex: 0,
        isShowSuggestBox: false,
        isShowCompleteBox: false,
        isShowKeywordsBox: false,
        hotelToContent: '上海',
        hotelFromDate: '',
        hotelToDate: '',
        districtId: 9,//hotel keywords专用
        hotelKeywordsContent: '',
        isShowSelections: false,
        isShowSelectionsKids: false,
        isComboError: false,
        isHotelError: false,
        isErrorComboFrom: false,
        isErrorComboTo: false,
        isErrorComboAdults: false,
        isErrorComboKids: false,
        isErrorHotelTo: false,
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
        },
      }
    },
    created: function () {
      var vm = this;
      //获取搜索数据
      this.getDataSearch();

      //获取购物车数据
      axios.get('static/data/cart.json')
        .then(function (res) {
          vm.cartNum = res.data.proNum
        })
    },
    mounted: function () {
      let vm = this;
      //let currentSec = this.$route.params.currentSec;
      //this.currentLi = currentSec;
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
    methods: {
      returnDateCalc: function (date, comboDays) {
        let daysTime = parseInt(comboDays) * 86400000;
        let dateObj = new Date(date);
        let $date = new Date(dateObj.getTime() + daysTime);
        let dateArr = [$date.getFullYear(), $date.getMonth() + 1, $date.getDate()];
        //+0
        dateArr[1] = dateArr[1] < 10 ? '0' + dateArr[1] : dateArr[1];
        dateArr[2] = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2];
        this.comboDateToStr = dateArr.join('-');
        return this.comboDateToStr;
      },
      changeRoute: function () {
        this.isShowChangeBox = !this.isShowChangeBox;
      },
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
        this.isErrorComboFrom = false;
        this.isErrorComboTo = false;
        this.isErrorComboAdults = false;
        this.isErrorComboKids = false;
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
          //this.$router.push({ name: 'combo', params: { currentSec: 'combo'}})
          alert('combo pass')
        }
      },
      cancelChange: function () {
        //回到defaultbox，重新拉取数据
        this.isShowChangeBox = !this.isShowChangeBox
        this.getDataSearch();
      },
      getDataSearch: function () {
        var vm = this;
        axios.get('static/data/search-result.json')
          .then(function (res) {
              let comboData = res.data.comboData
            vm.comboFromContent = comboData.fromCity;
            vm.comboToContent = comboData.toCity;
            vm.comboFromDate = comboData.fromDate;
            vm.comboDateToStr = comboData.toDate;
            vm.comboDays = comboData.days;
            vm.comboAdultNum = comboData.adultNum;
            vm.comboKidsNum = comboData.kidsNum;
          });
      }
    }

  }
</script>

<style >
  @import "http://pic.lvmama.com/styles/v6/comment/comment_index.css";
  @import "http://pic.lvmama.com/styles/v6/flighthotel/hotel-facilities.css";
  @import "http://pic.lvmama.com/styles/detail/destroute/hotel_flight_detail.css";
  @import "http://pic.lvmama.com/styles/v6/public/common_box.css";
  @import "http://pic.lvmama.com/styles/v6/flighthotel/fh-icon-ac.css";
</style>

<!--combo.scss-->
<style lang="scss" >
  /*combo.scss*/
  @import "../../assets/scss/_var.scss";

  body {
    #hotel_title_float {
      z-index: 100;
    }
    .search_sort {
      overflow: visible;
    }
    .rank_box {
      overflow: visible;
    }
    .js-tips {
      cursor: default;
    }
    .tip-add-one {
      color: $color-hover-orange;
    }
    .tip-li {
      border-bottom: 1px dotted #ddd;
      span {
        @include inlineblock;
        width: 120px;
      }
      .tip-title {
        color: $color-lv-orange;
        width: 50px;
        vertical-align: top;
        margin: 0;
        margin-right: 10px;
      }
      &:last-child {
        border: 0;
      }

    }
    //更换酒店
    .cgHotel {
      .room_price {
        font-size: 14px;
        color: #f60;
      }
      .btn_choose {
        &:hover {
          color: #fff;
        }
      }
    }
    .cgFlightAll {
      .loading_box {
        border: none;
      }
    }
    .btn-change-page {
      height: 24px;
      line-height: 24px;
    }
  }

  .search_sort {
    .search-clear {
      a {
        padding-left: 20px;
        color:#2299ee;
        &:hover {
          color: $color-hover-orange;
        }
      }
    }
  }

  .main_search {
    margin-bottom: 0;

    .default-box {
      .city {
        height: 42px;
        .icon {
          background: url('../../assets/imgs/list/combo/sprite/icon-combo-place.png') no-repeat center;
          height: 40px;
          width: 40px;
        }
        .icon-flight-double {
          @include inlineblock;
          background: url('../../assets/imgs/list/combo/sprite/flight-double.png') no-repeat center;
          height: 13px;
          width: 52px;
          margin: 17px 15px 0 15px;
          vertical-align: top;
        }
        .icon-flight-single {
          @extend .icon-flight-double;
          background: url('../../assets/imgs/list/combo/sprite/flight-single.png') no-repeat center;
          height: 5px;
          margin-top: 21px;
        }
        .flight-from {
          @include inlineblock;
          line-height: 30px;
          span {
            display: block;
            font-size:12px;
            color:#999999;
            height: 16px;
            line-height: 16px;
            font-weight: normal;
          }
          .city-from-str,.city-to-str {
            display: block;
            height: 26px;
            line-height: 26px;
            font-size: 20px;
            font-weight: 700;
            color: #333;
          }
        }
        .flight-to {
          @extend .flight-from;
        }
      }
      .persons {
        float: left;
        font-size:20px;
        font-weight: 700;
        margin-right: 100px;
        .icon {
          @include inlineblock;
          background: url("../../assets/imgs/list/combo/sprite/icon-persons.png") no-repeat center;
          height: 40px;
          width: 40px;
          vertical-align: middle;
          margin-right: 12px;
        }
        span {
          font-size: 16px;
          font-weight: normal;
          margin-right: 6px;
          b {
            font-size: 20px;
            font-weight: 700;
            margin-right: 2px;
          }
        }
      }
    }
    .change-box {
      .city,.date {
        margin-right: 50px;
      }
      .city {
        .icon {
          background: url('../../assets/imgs/list/combo/sprite/icon-combo-place.png') no-repeat center;
        }
      }
      .persons-num {
        float: left;
        font-size:20px;
        font-weight: 700;
        b {
          position: absolute;
          right: 12px;
          top: 12px;
          background: url('../../assets/imgs/list/combo/sprite/icon-arrow.png') no-repeat center;
          height: 6px;
          width: 9px;
          transition: all 0.3s;
          &.active {
            transform: rotate(180deg);
          }
        }
        .search-contents-selections {
          //display: none;
          position: absolute;
          top: 31px;
          background-color: #fff;
          border: 1px solid #ccc\9;
          *border: 1px solid #ccc;
          box-shadow: 0px 2px 4px #999;
          z-index: 21;
          padding: 10px 0;
          li {
            cursor: pointer;
            width: 126px;
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
        .icon {
          @include inlineblock;
          background: url("../../assets/imgs/list/combo/sprite/icon-combo-persons.png") no-repeat center;
          height: 40px;
          width: 40px;
          vertical-align: top;
          margin-right: 12px;
        }
        .section-input {
          width: 160px;
        }
        input {
          width: 48px;
          padding-left: 12px;
        }
        .search-contents-title {
          left: 92px;
        }
        .combo-persons-adult {
          input {
            padding-right: 100px;
          }
          .error-box {
            left: 168px;
          }
        }
        .combo-persons-children {
          input {
            padding-right: 100px;
          }
          .search-contents-title {
            left: 48px;
          }
          .search-contents-info {
            right: 32px;
          }
          .error-box {
            left: 0px;
            top: 38px;
          }
        }
      }
      .combo-days {
        input {
          padding-left: 106px;
          padding-right: 108px;
          width: 36px;
        }
      }
      .num-add {
        position: absolute;
        z-index: 11;
        cursor: pointer;
        width: 16px;
        height: 16px;
        top: 6px;
        right: 90px;
        background: url("../../assets/imgs/list/combo/sprite/icon-num-add.png");
        &.disabled {
          background: url("../../assets/imgs/list/combo/sprite/icon-num-add-not.png");
        }
      }
      .num-minus {
        @extend .num-add;
        right: 160px;
        background: url("../../assets/imgs/list/combo/sprite/icon-num-minus.png");
        &.disabled {
          background: url("../../assets/imgs/list/combo/sprite/icon-num-minus-not.png");
        }
      }
      .drop-suggestion-keywords {
        width: 250px;
        .drop-suggestion-keywords-ul {
          padding: 8px 20px;
          li {
            float: left;
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
        .drop-suggestion-keywords-info {
          padding: 0 20px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }

  .result_sort {
    .diy {
      float: left;
      width: 50px;
    }
    .price-low-input,.price-high-input {
      &:focus {
        border:1px solid #6cb6f2;
        box-shadow:0 0 4px 0 #62b1f2;
      }
    }
    //2016-08-24 江圣
    /*region 价格筛选优化*/
    .search-filter-price-new {
      position: relative;
      height: 26px;
      width: 156px;
      float: left;
    }

    .search-filter-price-new label {
      float: left;
      width: 70px;
    }

    .search-filter-price-new input {
      border: 1px solid #cccccc;
      width: 53px;
      padding: 0 10px;
      height: 24px;
      line-height: 24px;
    }

    .search-filter-price-new input.input-error {
      border: 1px solid #f00;
    }

    .search-filter-price-new em {
      float: left;
      background: #cccccc;
      height: 1px;
      width: 6px;
      margin: 13px 2px 0 7px;
    }

    .search-filter-price-new-dropdown {
      background: #f5f5f5;
      margin: 0 0 0 -10px;
      position: absolute;
      top: -7px;
      width: 169px;
      overflow: hidden;
      padding: 6px 0 0 9px;
      transition: height 200ms;
      -webkit-transition: height 200ms;
    }

    .search-filter-price-new-dropdown p {
      display: none;
    }

    .search-filter-price-new-dropdown a {
      color: #0099cc;
    }

    .search-filter-price-new-dropdown a:hover {
      color: #ff6600;
    }

    .search-filter-price-new-dropdown .control {
      text-align: center;
      margin: 0px 7px 0 0;
    }

    .search-filter-price-new-dropdown .btn {
      margin: 0 5px;
    }

    .search-filter-price-new-dropdown.active {
      background-color: #fff;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
      margin: -1px 0 0 -11px;
      border: 1px solid #CCC;
      height: 88px;
    }

    .search-filter-price-new-dropdown .price-tip {
      display: none;
    }

    .search-filter-price-new-dropdown.active .price-tip {
      color: #999999;
      display: block;
      line-height: 28px;
      text-align: center;
      height: 28px;
      overflow: hidden;
      width: 160px;
    }

    .search-filter-price-new-dropdown.active .price-low,
    .search-filter-price-new-dropdown.active .price-high {
      color: #ff6600;
    }

    .search-filter-price-new-dropdown.active .price-tip.price-tip-error,
    .search-filter-price-new-dropdown.active .price-tip.price-tip-error .price-low,
    .search-filter-price-new-dropdown.active .price-tip.price-tip-error .price-high {
      color: #ff0000;
    }

    .search-filter-price-new-dropdown.active p {
      display: block;
    }
  }

  .main-box {
    margin-top: 20px;
  }
  .main-list {
    margin-bottom: 10px;
  }
  .list-prod {
    box-shadow:0 1px 0 0 rgba(0,0,0,0.09);
    margin-bottom: 10px;
    position: relative;
    background-color: #f9f9f9;
    &:hover {
      box-shadow:0 0px 2px 2px rgba(0,0,0,0.1);
    }
  }
  .list-left {
    float: left;
    width: 980px;
    background-color: #fff;
    min-height: 250px;
    .list-left-wrapper {
      padding: 0 20px;
      border-bottom: 1px dotted #ddd;
      position: relative;
      &:hover {
        background-color: #fffcf7;
      }
    }
    .list-title {
      height: 45px;
      p {
        float: left;
      }
      .pro-num {
        background:#ffcc66;
        font-size: 16px;
        font-weight: 600;
        width:30px;
        height:30px;
        border-radius:100%;
        text-align: center;
        line-height: 30px;
        color: #fff;
        margin: 7px 9px;
        margin-left: 4px;
        margin-right: 13px;
      }
      .list-title-main {
        height: 45px;
        line-height: 45px;
        font-size:18px;
        color:#333333;
        font-weight: 700;
        padding-left: 11px;
      }
      .list-title-type {
        @extend .list-title-main;
        font-weight: normal;
        font-size:14px;
        color:#999999;
      }
    }
    .list-icon {
      position: absolute;
      top: 16px;
      float: left;
      width: 38px;
      height: 38px;
    }
    .list-main-left {
      float: left;
      width: 800px;
      padding-left: 60px;
    }
    .list-main-btns {
      float: right;
      padding-top: 10px;
    }
    .btn-change-pro-hotel,.btn-change-pro-flight {
      //margin-top: 10px;
      padding: 4px 0px;
      color:#899bad;
      height: 18px;
      line-height: 18px;
      width: 78px;
      cursor: pointer;
      i {
        @include inlineblock;
        background: url('../../assets/imgs/list/combo/sprite/icon-change.png') no-repeat center;
        height: 8px;
        width: 10px;
      }
      &:hover {
        color: $color-hover-orange;
        i {
          background: url('../../assets/imgs/list/combo/sprite/icon-change-hover.png') no-repeat center;
        }
      }
    }
    .btn-add-cart-new {
      display: none;
      @extend .btn-change-pro-hotel;
      color: $color-lv-orange;
      i {
        background: url('../../assets/imgs/list/combo/sprite/icon-btn-cart.png') no-repeat center;
        height: 12px;
        width: 12px;
      }
      &:hover {
        i {
          background: url('../../assets/imgs/list/combo/sprite/icon-btn-cart-hover.png') no-repeat center;
        }
      }
    }
    .list-icon-notice {
      float: left;
      background:#f5f5f5;
      border-radius:16px;
      width:43px;
      height:19px;
      text-align: center;
      line-height: 19px;
      color:#a8a8a8;
    }
    .list-info-1 {
      position: absolute;
      left: 365px;
      color: #666;
    }
    .list-info-2 {
      position: absolute;
      left: 479px;
      color: #666;
    }
    .list-info-3 {
      position: absolute;
      left: 542px;
      color: #666;
    }
    .list-info-4 {
      position: absolute;
      left: 607px;
      white-space: nowrap;
      color: #666;
    }
    .list-info-5 {
      position: absolute;
      left: 695px;
      color: #666;
    }
    .list-info-6 {
      position: absolute;
      left: 743px;
      color: #666;
    }
    //立即确认
    .tl-confirm {
      border:1px solid #ff9900;
      border-radius:2px;
      width:54px;
      height:14px;
      text-align: center;
      font-size:12px;
      color:#ff9900;
      line-height:14px;
      cursor: default;
      float: left;
      margin-left: 9px;
      margin-top: 2px;
      margin-right: 10px;
    }
    //退改签
    .list-info-refuse {
      border-bottom: 1px dashed #999;
    }
    //酒店列表
    .list-hotel {
      position: relative;
      .list-icon {
        background: url('../../assets/imgs/list/combo/sprite/icon-hotel.png') no-repeat center;
      }
      .list-hotel-main {
        padding: 10px 0 10px 60px;
        .list-hotel-pic {
          float: left;
        }
        .list-main-left-desc {
          float: left;
          margin-left: 14px;
          .hotel-desc-top {
            height: 24px;
            line-height: 24px;
            .list-hotel-title-words {
              @include inlineblock;
              font-size:14px;
              color:#333333;
              text-decoration: underline;
              margin-right: 10px;
              &:hover {
                color: $color-hover-orange;
              }
            }
            .djjd_tagsclasses {
              vertical-align: baseline;
            }
            .hotel_stars {
              vertical-align: baseline;
            }
            strong {
              font-family: Simsun,sans-serif;
              font-size: 12px;
              display: inline-block;
              padding: 0 4px;
              height: 16px;
              line-height: 16px;
              border-radius: 2px;
              vertical-align: top;
              margin-top: 4px;
              margin-right: 5px;
              text-decoration: none;
              font-weight: 400;
              color: #fff;
              background: #74c8fa;
              border-color: #74c8fa;
            }
            .tags-summer-sale {
              margin-top: 4px;
            }
          }
          .hotel-desc-next {
            p {
              @include inlineblock;
              color:#999999;
            }
            .evaluate {
              height: 14px;
              line-height: 14px;
              border-right: 1px solid #ddd;
              padding-right: 8px;
            }
            .eval_count {
              padding-left: 8px;
            }
            .comment-num {
              color:#999999;
              span {
                text-decoration: underline;
              }
              &:hover {
                color: $color-hover-orange;
              }
            }
          }
        }
        .list-hotel-details {
          position: relative;
          span {
            float: left;
            height: 19px;
            line-height:19px;
            //color:#666666;
          }
          .list-hotel-details-desc {
            margin-left: 10px;
            font-size:12px;
            color:#333333;
            height: 19px;
            line-height:19px;
            width: 144px;
            @include etc;
          }
        }
      }
    }
    //机票列表
    .list-flight {
      @extend .list-hotel;
      .list-icon {
        background: url('../../assets/imgs/list/combo/sprite/icon-flight.png') no-repeat center;
      }
      .list-left-wrapper {
        &:hover {
          .btn-change-pro-flight {
            margin-top: 0px;
          }
        }
      }
      .btn-change-pro-flight {
        margin-top: 15px;
      }
      .btn-add-cart-new {

      }
      .list-flight-main {
        padding: 5px 0;
        padding-left: 60px;
      }
      .list-flight-go,.list-flight-return {
        position: relative;
        padding: 7px 0;
        span {
          float: left;
          height: 19px;
          line-height: 19px;
        }
      }
      .list-flight-time {
        width: 104px;
        margin-left: 10px;
        em {
          font-size:14px;
          color:#333333;
          font-weight: 700;
        }
        .add-one-day {
          font-size: 12px;
          margin-left: 0;
          vertical-align: 2px;
        }
      }
      .list-flight-company {
        margin-left: 18px;
        margin-right: 4px;
      }
    }
    //门票列表
    .list-ticket {
      @extend .list-flight;
      .list-icon {
        background: url('../../assets/imgs/list/combo/sprite/icon-ticket.png') no-repeat center;
      }
      .list-ticket-main {
        padding-top: 14px;
        padding-bottom: 14px;
      }
      .btn-add-cart-new {
        float: right;
        padding: 0;
        margin-right: 20px;
      }
      .list-main-left {
        width: 900px;
      }
      .list-left-wrapper {
        border-bottom: 0;
      }
      .list-ticket-li {
        position: relative;
        padding: 8px 0;
        .list-ticket-title {
          float: left;
          width: 310px;
          @include etc;
          &:hover {
            color: #f60;
            cursor: pointer;
          }
        }
        .list-ticket-calendar {
          background-color: #fff;
          float: left;
          position: absolute;
          left: 362px;
          width: 138px;
          height: 24px;
          border: 1px solid #ddd;
          .list-ticket-calendar-input {
            cursor: pointer;
            position: absolute;
            top: 0;
            left: 0;
            width: 70px;
            height: 24px;
            line-height: 24px;
            padding: 0 10px;
            padding-right: 58px;
            z-index: 1;
            background: url('../../assets/imgs/list/alpha.gif') repeat;
          }
          .list-ticket-calendar-weekday {
            position: absolute;
            left: 80px;
            width: 24px;
            height: 24px;
            line-height: 24px;
            color:#999999;
          }
          .list-ticket-calendar-icon {
            position: absolute;
            right: 6px;
            top: 4px;
            background: url('../../assets/imgs/list/combo/sprite/icon-calendar.png') no-repeat center;
            height: 15px;
            width: 16px;
          }
        }
      }
      .list-ticket-more {
        display: block;
        padding: 10px 0;
        color: #666;
        width: 100px;
        i {
          padding-left: 5px;
          @include inlineblock;
          background: url('../../assets/imgs/list/combo/sprite/icon-arrow.png') no-repeat center;
          height: 6px;
          width: 9px;
        }
        &:hover {
          color: $color-hover-orange;
          i {
            background: url('../../assets/imgs/list/combo/sprite/icon-arrow-hover.png') no-repeat center;
          }
        }
      }
      .list-ticket-close {
        i {
          transform: rotateX(180deg);
        }
      }
    }
  }
  .list-right {
    float: right;
    width: (220px - 20*2);
    padding: 10px 20px;
    .list-right-info-top {
      height: 50px;
      border-bottom: 1px dotted #ddd;
      padding: 5px 0;
      p {
        height: 24px;
        line-height: 24px;
        padding: 0px 20px;
      }
      .list-money-info-title {
        float: left;
        font-size:12px;
        color:#999999;
      }
      .list-money-total-old-value,.list-money-discount-value {
        float: right;
        font-size:16px;
        color:#666666;
      }
    }
    .list-right-info-main {
      position: absolute;
      top: 50%;
      margin-top: -46px;
      right: 65px;
      p {
        text-align: center;
      }
      .list-right-info-main-title {
        font-size:16px;
        color:#333333;
        height: 24px;
        line-height: 24px;
      }
      .list-money-total-value {
        font-size:20px;
        color:#ff6600;
        i {
          font-size: 28px;
          font-weight: 900;
        }
      }
      .list-right-info-main-title-second {
        font-size:12px;
        color:#999999;
        height: 24px;
        line-height: 24px;
      }
    }
    .list-right-btns {
      position: absolute;
      bottom: 20px;
      right: 32px;
      height: 90px;
      text-align: center;
      a {
        display: block;
        padding: 0px 42px;
        font-size: 14px;
        height: 28px;
        line-height: 28px;
        margin: 10px 0;
      }
      .btn-add-cart {
        border-color: #ff8800;
        color: #ff8800;
        &:hover {
          border-color: $color-hover-orange;
          color: $color-hover-orange;
        }
      }
      .btn-add-cart-already {
        background-color: #fff3e4;
        border-color: #ffd5a5;
        color: #ffaa48;
        cursor: not-allowed;
      }
    }
  }
</style>
<!--combo.scss END-->




