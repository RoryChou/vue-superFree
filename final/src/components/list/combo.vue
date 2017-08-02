<template>
  <div class="wrap">

    <list-top></list-top>

    <!-- 搜索框 -->
    <div class="ticket_search">
      <div class="search_nav_box">
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

      <div class="head-wrapper">
        <div class="main_search search-contents-combo">
          <div class="search-bar-wrapper">
            <div class="default-box clearfix">
              <div class="city">
                <i class="icon"></i>
                <p class="flight-from">
                  <span class="city-from-str">{{comboCityFrom}}</span>
                  <span><b class="date-from-str">{{comboDateFromStr}}</b>出发</span>
                </p>
                <i class="icon-flight-double" :class="{'icon-flight-double':isFlightDouble,'icon-flight-single':!isFlightDouble}"></i>
                <!--单程icon-->
                <!--<i class="icon-flight-single"></i>-->
                <!--单程icon END-->
                <p class="flight-to">
                  <span class="city-to-str">{{comboCityTo}}</span>
                  <span><b class="date-to-str">{{comboDateToStr}}</b>返回</span>
                </p>
              </div>
              <div class="date">
                <i class="icon"></i>
                <span>
                    <b class="hotel-days">{{comboDays}}</b>天
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
                <div class="btn btn-change btn-pink">更改行程</div>
              </div>
            </div>
            <div class="change-box clearfix">
              <div class="city">
                <i class="icon"></i>
                <div class="input-wrapper">
                  <div class="combo-from section-input search-city">
                    <div class="search-contents-title">出发地</div>
                    <input type="text" class="input-city-from" placeholder="请输入出发地">
                    <div class="error-box">
                      <div class="tip-arrow tip-arrow-left">
                        <em>◆</em>
                        <i>◆</i>
                      </div>
                      <i class="error-icon"></i>
                      <p></p>
                    </div>
                  </div>
                  <div class="combo-to section-input search-city">
                    <div class="search-contents-title">目的地</div>
                    <input type="text" class="input-city-to" placeholder="请输入目的地">
                    <div class="error-box">
                      <div class="tip-arrow tip-arrow-left">
                        <em>◆</em>
                        <i>◆</i>
                      </div>
                      <i class="error-icon"></i>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="date">
                <i class="icon"></i>
                <div class="input-wrapper">
                  <div class="combo-date section-input search-date search-calendar-common search-date-from">
                    <div class="search-contents-title">出发日期</div>
                    <div class="search-contents-info"></div>
                    <input type="text" readonly="readonly" class="input-date-from">
                    <div class="error-box">
                      <div class="tip-arrow tip-arrow-left">
                        <em>◆</em>
                        <i>◆</i>
                      </div>
                      <i class="error-icon"></i>
                      <p></p>
                    </div>
                  </div>
                  <div class="combo-days section-input">
                    <div class="search-contents-title">游玩天数</div>
                    <div class="search-contents-info"></div>
                    <div class="num-minus"></div>
                    <div class="num-add"></div>
                    <input type="text" data-max="20" data-min="1" class="input-days">
                    <div class="error-box">
                      <div class="tip-arrow tip-arrow-left">
                        <em>◆</em>
                        <i>◆</i>
                      </div>
                      <i class="error-icon"></i>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="persons-num">
                <i class="icon"></i>
                <div class="input-wrapper">
                  <div class="combo-persons-adult section-input">
                    <div class="search-contents-title">成人</div>
                    <input class="search-contents-select" value="2" readonly="readonly">
                    <div class="error-box">
                      <div class="tip-arrow tip-arrow-left">
                        <em>◆</em>
                        <i>◆</i>
                      </div>
                      <i class="error-icon"></i>
                      <p></p>
                    </div>
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
                    <div class="search-contents-title">儿童</div>
                    <div class="search-contents-info">(2-12岁)</div>
                    <input class="search-contents-select" value="0" readonly="readonly">
                    <div class="error-box">
                      <div class="tip-arrow tip-arrow-top">
                        <em>◆</em>
                        <i>◆</i>
                      </div>
                      <i class="error-icon"></i>
                      <p></p>
                    </div>
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
                </div>
              </div>
              <div class="btn-wrapper">
                <div class="btn btn-pink search-btn">
                  搜索

                </div>
                <div class="btn cancle search-btn-cancle">
                  取消

                </div>
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
                <ul class="drop-suggestion-keywords-ul clearfix">

                </ul>
                <p class="drop-suggestion-keywords-info">目前只提供以上四个目的地的套餐哦，以后会陆续增多，敬请期待吧~</p>
              </div>
            </div>
            <ul class="drop-complete"></ul>
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

  </div>

</template>
<script>
  import ListTop from './list-top.vue';
  import ListBottom from './list-bottom.vue';
  import axios from 'axios'
  import jsonp from 'jsonp'
  export default {
    name: 'combo',
    components: {ListTop,ListBottom},
    data: function () {
      return {
        currentList:'combo',
        comboDateFromStr: '2017-08-14',
        comboDateToStr: '2017-08-17',
        isFlightDouble: false,
        comboCityFrom: '上海',
        comboCityTo: '厦门',
        comboDays: 3,
        comboAdultNum: 2,
        comboKidsNum: 1
      }
    },
    beforeUpdate: function () {

     /* axios.get('static/data/search-result.json').then(function (res) {
        //vm.currentList = res.data.currentSec;
      }, function (error) {
        console.log('error', error)
      })*/
    },
    mounted: function () {
      let vm = this;
      let currentSec = this.$route.params.currentSec;
      this.currentList = currentSec;
      /*store.$on('currentSec', function (id) {
        console.log(1111,id);
        vm.currentList = id;

      });
      console.log(222,this.currentList)*/
    },
    methods: {

    }

  }
</script>
<style >
  @import "http://pic.lvmama.com/styles/v6/flighthotel/hotel-facilities.css";
  @import "http://pic.lvmama.com/styles/detail/destroute/hotel_flight_detail.css";
  @import "http://pic.lvmama.com/styles/v6/public/common_box.css";


</style>

<!--hotel_list.scss-->
<style lang="scss">
  @import "../../assets/scss/_var.scss";
  .hlIcon, .sort_down, .sort_up {
    display: inline-block;
    background: url(http://pic.lvmama.com/img/v6/hotel/hlicon.png) no-repeat;
  }

  .body_bg {
    background: #f8f8f8;
  }



  /*导航*/
  .search_nav_box {
    position: relative;
    height: 46px;
  }

  .search_nav {
    height: 43px;
    line-height: 43px;
    border-bottom: 2px solid $color-lv-pink;
    width: 1199px;
    font-family: "Microsoft Yahei";
    font-size: 16px;
    background-color: #fff;
  }

  .search_nav li {
    float: left;
    position: relative;
    background: #fff;
  }

  .search_nav li i {
    @include inlineblock;
    width: 1px;
    height: 17px;
    background-color: #ccc;
    vertical-align: middle;
  }

  .search_nav li a {
    display: block;
    float: left;
    height: 43px;
    padding: 0 20px 0 20px;
    font-style: normal;
    color: #333;
  }

  .search_nav li a:hover {
    color: $color-lv-pink;
    font-weight: 700;
    //background: #fef2f9;
    text-decoration: none;
    //margin: -1px;
  }

  .search_nav li a:hover span {
    color: $color-lv-pink;
  }

  .search_nav li a span {
    color: #999;
    font-size: 12px;
  }

  .search_nav li.search_li a {
    background: $color-lv-pink;
    color: #fff;
    font-weight: 700;
    font-size: 16px;
  }

  .search_nav li.search_li i {
    background-color: #fff;
  }

  .search_nav li.search_li a span {
    color: #fff;
    font-weight: normal;
    font-size: 14px;
  }

  .search_nav li.search_li a:hover {
    border: none;
    margin: 0;
  }

  .icon {
    background: url(http://pic.lvmama.com/img/v5/dest.png) no-repeat;
  }

  .icon_hd {
    display: block;
    width: 61px;
    height: 19px;
    background-position: 0 -95px;
    position: absolute;
    top: -12px;
    left: 50%;
    margin-left: -30px;
  }

  .icon_hdjt {
    display: block;
    width: 65px;
    height: 21px;
    background-position: 0 -116px;
    position: absolute;
    top: -12px;
    right: 5px;
  }

  .search_sort {
    //border: 1px solid #ddd;
    border-top: none;
    background: #fff;
    overflow: hidden;
    zoom: 1;
    position: relative;
  }

  .search_sort .search_list {
    padding: 7px 0 5px;
    border-top: 1px dotted #ddd;
    margin-top: -1px;
    line-height: 26px;
    position: relative;
  }

  .search_sort .search_list .search_more {
    max-height: 1000px; /*_height:expression((document.documentElement.clientHeight||document.body.clientHeight)<1000?"1000px":"");*/
  }

  .search_theme {
    float: left;
    width: 70px;
    text-align: right;
    color: #999;
  }

  .search_theme_list {
    margin-left: 25px;
    float: left;
    overflow: hidden;
    zoom: 1;
    max-height: 26px; /*_height:expression((document.documentElement.clientHeight||document.body.clientHeight)<26?"26px":"");*/
  }

  .theme_type {
    max-height: 70px;
  }

  .theme_type dd {
    height: 29px;
  }

  .search_theme_list dt {
    float: left;
  }

  .search_theme_list dt a {
    width: 43px;
    text-align: center;
    padding: 0;
  }

  .navListSpan {
    display: block;
    float: left;
    height: 22px;
    margin: 0 35px 4px 0;
    min-width: 80px;
  }

  .navListSpan .arrow {
    position: static;
    border-color: #999 #fff #fff;
    margin-bottom: -2px;
  }

  .navListSpan a:hover .arrow, .navListSpan a.select .arrow {
    border-color: #fff #f90 #f90;
    margin-bottom: -2px;
  }

  .navListSpan .active {
    height: 25px;
    background: #FBFBFB;
    border: 1px solid #eee;
    border-bottom: none;
  }

  .navListSpan .active .arrow {
    border-color: #fff #fff #999 #fff;
    margin-bottom: 2px;
  }

  .navListSpan a.active:hover .arrow {
    border-color: #f90 #f90 #fff #f90;
    margin-bottom: 2px;
  }

  .search_theme_list dd {
    float: left;
    width: 1000px;
    margin-left: 20px;
  }

  .search_theme_list a, .hotel_pinpai_list a {
    color: #333;
    display: inline;
    float: left;
    height: 22px;
    line-height: 22px;
    padding: 0 5px;
  }

  .search_theme_list a:hover, .hotel_pinpai_list a:hover {
    background: #fff3e4;
    color: #f60;
    text-decoration: none;
  }

  .search_theme_list a.select, .hotel_pinpai_list a.select {
    background: #f90;
    color: #fff;
  }

  .search_theme_price {
    position: relative;
    color: #666;
    float: left;
    margin-left: 4px;
  }

  .search_theme_price span {
    display: inline-block;
    vertical-align: top;
  }

  .search_theme_list a.search_theme_btn {
    float: none;
    box-shadow: none;
    cursor: pointer;
    opacity: 0.65;
    border: 1px solid #ccc;
    border-radius: 2px;
    color: #333;
    font-weight: normal;
    width: 30px;
    min-width: 30px;
    height: 22px;
    display: inline-block;
    text-align: center;
    vertical-align: top;
  }

  a.search_theme_btn:hover {
    background: #f60;
    border-color: #f60;
    color: #fff;
  }

  .search_theme_txt {
    width: 42px;
    height: 22px;
    padding-left: 16px;
    border: 1px solid #ccc;
    margin: auto 2px;
    color: #333;
    cursor: pointer;
    line-height: 22px;
  }

  .calendar_bg {
    width: 17px;
    height: 17px;
    //background: url(../../images/calendar-icon.png) no-repeat;
    position: absolute;
  }

  .calendar_bg1 {
    top: 3px;
    left: 112px;
  }

  .calendar_bg2 {
    top: 3px;
    left: 214px;
  }

  .seach_gd_btn {
    position: absolute;
    right: 20px;
    top: 10px;
    color: #999;
    width: 35px;
    height: 16px;
    line-height: 16px;
    overflow: hidden;
    cursor: pointer;
  }

  .seach_gd_btn:hover {
    text-decoration: none;
    color: #f60;
  }

  .seach_gd_btn:hover .arrow {
    border-top-color: #f60;
  }

  .seach_gd_btn:hover .arrow_up {
    border-color: #fff #fff #f60 #fff;
  }

  .btn_morepp {
    width: 50px;
    color: #09c;
  }

  .arrow {
    display: inline-block;
    margin-left: 4px;
    border-width: 4px;
    border-style: solid;
    border-color: #999 #fff #fff #fff;
    width: 0;
    height: 0;
    overflow: hidden;
    font-size: 0;
    position: absolute;
    right: 0;
    top: 6px;
  }

  .arrow_up {
    display: inline-block;
    margin-left: 4px;
    border-width: 4px;
    border-style: solid;
    width: 0;
    height: 0;
    overflow: hidden;
    font-size: 0;
    position: absolute;
    right: 0;
    top: 3px;
    border-color: #fff #fff #999 #fff;
  }

  .gd_city {
    display: none;
  }

  .search_theme_list .searchArrow {
    position: absolute;
    right: 9px;
    top: 3px;
    width: 7px;
    margin: 0 0 0 5px;
    overflow: hidden;
    display: inline-block;
    color: #333;
    font-size: 12px;
    line-height: 12px;
    text-indent: -2px;
    vertical-align: top;
  }

  .searchArrow {
    font-family: "Arial", "PingFang SC", "SimSun", serif;
  }

  .searchArrow i {
    position: absolute;
    left: 0;
    top: -1px;
    color: #fff;
  }

  .search_sub li {
    display: inline-block;
    float: left;
    margin-right: 70px;
  }

  .search_sub li.last {
    margin-right: 0;
  }

  .request {
    border: 1px solid #ddd;
    border-top: none;
    padding-top: 10px;
    position: relative;
    background: #fff;
  }

  .result {
    float: left;
    margin-left: 12px;
    color: #999;
    padding-bottom: 10px;
  }

  .result b {
    color: #f60;
    font-family: Arial;
    font-size: 16px;
    vertical-align: middle;
    display: inline-block;
    margin: 0 5px;
  }

  .request_list {
    float: left;
    width: 960px;
    margin-left: 17px;
    color: #333;
  }

  .request_list dt {
    float: left;
    padding-bottom: 10px;
    color: #999;
  }

  .request_list dd {
    float: left;
    padding-bottom: 10px;
  }

  .request_list dd span {
    float: left;
    margin-right: 10px;
    height: 20px;
    line-height: 20px;
    padding: 0 25px 0 5px;
    position: relative;
    border: 1px solid #ff9900;
  }

  .request_list dd span:hover {
    cursor: pointer;
  }

  .request_list dd span:hover .request_close {
    color: #fff;
    background: #f90;
  }

  .request_list dd i {
    color: #f90;
  }

  .request_close {
    display: block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    position: absolute;
    top: 0;
    right: 0;
    _right: -1px;
    color: #f90;
    background: #fff3e4;
    font-size: 16px;
    font-weight: bolder;
  }

  .request_close:hover {
    color: #fff;
    background: #f90;
    text-decoration: none;
  }

  .close_all {
    color: #0077CC;
  }

  .close_all:hover {
    color: #f60;
  }

  .subTit, .search_sub li {
    position: relative;
    display: inline-block;
    height: 24px;
    line-height: 24px;
    padding: 0 19px 0 9px;
    color: #333;
    cursor: pointer;
  }

  .search_sub li.active {
    z-index: 3;
    height: 29px;
    line-height: 23px;
    padding: 0 18px 0 8px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-bottom: none;
    color: #f60;
    text-decoration: none;
    cursor: pointer;
  }

  .search_sub li.active .searchArrow i {
    top: 1px;
    color: #f8f8f8;
  }

  .search_sub li.active .searchArrow { /*margin-top: 9px;*/
    top: 9px;
    color: #f60;
  }

  .localfun_mddSearch {
    z-index: 3;
  }

  .localfun_mddSearch .search_theme_list {
    overflow: visible;
  }

  .search_sub li {
    position: relative;
  }

  .search_nav_hot {
    font-size: 0;
    position: absolute;
    right: 0;
    top: 0;
    color: #666;
  }

  .search_nav_hot a {
    font: 14px/46px "Microsoft Yahei";
    color: #666;
    padding: 0 10px;
  }

  .search_nav_hot a:hover {
    color: #f60;
  }

  .search_nav_hotLine {
    font-size: 14px;
    color: #ccc;
  }

  .vacation_ico {
    background: url(http://pic.lvmama.com/img/v6/vacation_hotel/vacation_ico.png);
  }



  .hlIcon-time {
    background-position: -129px 0;
    display: inline-block;
    width: 19px;
    height: 16px;
  }

  .search_sub {
    position: absolute;
    top: 7px;
    left: 158px;
    height: 28px;
  }

  .search_subCon {
    position: relative;
    left: 95px;
    background: #f8f8f8;
    padding-bottom: 9px;
    border: 1px solid #e6e6e6;
    width: 1080px;
    overflow: hidden;
    display: none;
  }

  .search_subCon .seach_gd_btn {
    top: 14px;
  }

  .search_subCon {
    clear: both;
  }

  .search_subCon_list {
    display: none;
    margin-top: 9px;
  }

  .search_subCon_list a {
    margin-right: 10px;
  }

  .search_subCon_list a, .subway ul a {
    display: inline-block;
    padding: 0 10px;
    color: #666;
    line-height: 22px;
  }

  .search_subCon_list a:hover, .subway ul a:hover {
    background: #fff3e4;
    color: #f60;
    text-decoration: none;
  }

  .search_subCon_list a.select, .subway ul a.select {
    background: #f90;
    color: #fff;
  }

  .subway {
    display: none;
    padding: 10px;
  }

  .subway ul {
    height: 29px;
    border-bottom: 1px solid #e3e3e3;
    margin-bottom: 5px;
    line-height: 26px;
  }

  .subway li {
    position: relative;
    float: left;
    margin-right: 19px;
  }

  .subway li.active {
    border-bottom: 2px solid #f60;
    height: 28px;
  }

  .subway li.active .tabArrow {
    display: block;
  }

  .subway li.last {
    margin-right: 0;
  }

  .subway .tabArrow {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -4px;
    border: 4px solid transparent;
    border-bottom-color: #f60;
    display: none;
  }

  .subway .tabArrow b {
    position: absolute;
    left: 50%;
    bottom: -7px;
    margin-left: -4px;
    width: 0;
    height: 0;
    display: block;
    border: 4px solid transparent;
    border-bottom-color: #f8f8f8;
  }

  /*.subway .search_subCon_list { display: block; }*/

  .subCon_list {
    position: relative;
    padding: 0 45px 0 9px;
    max-height: 38px;
    overflow: hidden;
  }

  .subCon_list.search_more {
    max-height: 1000px;
  }

  .subCon_list .arrow {
    border-color: transparent;
    border-top-color: #999;
  }

  .hlIcon-select {
    width: 13px;
    height: 13px;
    margin: 5px 4px 0 0;
    background-position: 0 0;
    vertical-align: top;
    float: left;
  }

  .select .hlIcon-select, a.select:hover .hlIcon-select {
    background-position: -31px 0;
  }

  a:hover .hlIcon-select {
    background-position: -15px 0;
  }

  .arial {
    font-family: Arial;
  }

  .search_theme_price dfn {
    position: absolute;
    top: 0;
  }

  .priceYen {
    left: 50px;
  }

  .priceYen1 {
    left: 130px;
  }

  .result_sort {
    //border: 1px solid #ddd;
    border-top: none;
    padding: 10px 0 10px 20px;
    position: relative;
    background: #f8f8f8;
    box-shadow: 0 1px 3px #ccc;
  }

  .result_sort, .result_sort a {
    color: #666;
  }


  /*排序*/
  .rank_box {
    li {
      float: left;
      cursor: pointer;
      i {
        @include inlineblock;
        background: url('../../assets/imgs/list/hotel/sprite/icon-arrow-black-up.png') no-repeat center;
        height: 7px;
        width: 7px;
        margin-left: 8px;
      }
      b {
        padding: 0 19px;
        font-size: 14px;
        font-family: sans-serif;
        font-weight: normal;
        color: #ccc;
      }
      &.active,&:hover {
        color: $color-lv-pink;
        i {
          background: url('../../assets/imgs/list/hotel/sprite/icon-arrow-pink.png') no-repeat center;
          height: 7px;
          width: 7px;
        }
      }
      &.tl-col-down {
        i {
          background: url('../../assets/imgs/list/hotel/sprite/icon-arrow-black-down.png') no-repeat center;
          height: 7px;
          width: 7px;
        }
        &.active,&:hover {
          i {
            background: url('../../assets/imgs/list/hotel/sprite/icon-arrow-pink-down.png') no-repeat center;
            height: 7px;
            width: 7px;
          }
        }
      }
    }
  }
  /*排序END*/


  .shaixuan li {
    margin-right: 30px;
    float: left;
  }

  .shaixuan a {
    color: #666;
    display: inline-block;
    height: 22px;
    line-height: 22px;
    padding: 0 5px;
  }

  .shaixuan a:hover {
    background: #fff3e4;
    color: #f60;
    text-decoration: none;
  }

  .page_count {
    position: absolute;
    left: 762px;
    top: 10px;
  }

  .count_num {
    margin-right: 10px;
    color: #333;
    font-family: "宋体";
  }

  .count_num b {
    color: #f60;
    font-weight: normal;
  }

  .prev_paging, .next_paging {
    display: inline-block;
    float: left;
    vertical-align: middle;
    margin-right: 5px;
    width: 19px;
    height: 19px;
    border: 1px solid #ddd;
    position: relative;
    cursor: pointer;
  }

  .page_no .page_arrow_p, .page_no:hover .page_arrow_p {
    border-color: #fbfbfb #dadada #fbfbfb #fbfbfb;
  }

  .page_arrow_p {
    display: inline-block;
    width: 0;
    height: 0;
    line-height: 0;
    font-size: 0;
    border-width: 4px;
    border-style: solid;
    border-color: #fbfbfb #aeaeae #fbfbfb #fbfbfb;
    overflow: hidden;
    position: absolute;
    top: 5px;
    left: 3px;
  }

  .page_arrow_n {
    display: inline-block;
    width: 0;
    height: 0;
    line-height: 0;
    font-size: 0;
    border-width: 4px;
    border-style: solid;
    border-color: #fbfbfb #fbfbfb #fbfbfb #aeaeae;
    overflow: hidden;
    position: absolute;
    top: 5px;
    left: 8px;
  }

  .prev_paging:hover, .next_paging:hover {
    border-color: #f60;
  }

  .prev_paging:hover i {
    border-color: #fbfbfb #f60 #fbfbfb #fbfbfb;
  }

  .page_no:hover {
    border-color: #ddd;
  }

  .next_paging:hover i {
    border-color: #fbfbfb #fbfbfb #fbfbfb #f60;
  }

  .mainLeft {
    width: 880px;
  }

  .prdLi {
    padding: 20px 20px 15px;
    background: #fff;
    border: 1px solid #ddd;
    margin-bottom: 11px;
  }

  .prdLi:hover {
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.1);
  }

  .prdMain {
    position: relative;
    //height: 190px;
  }

  .proImg {
    position: relative;
    float: left;
    height: 140px;
  }

  .videobtn-list {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -31px 0 0 -31px;
    width: 62px;
    height: 62px;
    background: url(http://pic.lvmama.com/img/v6/public/video_btn.png) -79px -4px;
  }

  .proInfo {
    float: left;
    width: 460px;
    margin-left: 20px;
  }

  .proTit {
    position: relative;
    width: 430px;
    margin-top: -5px;
    padding-left: 30px;
    font-weight: 700;
    font-family: "微软雅黑";
    font-size: 18px;
    line-height: 30px;
  }

  .proTit a {
    color: #333;
  }

  .proTit a:hover {
    color: #f60;
    text-decoration: none;
  }

  .proTit a:hover .hlIcon-biao {
    //background-position: -26px -15px;
    background: url('../../assets/imgs/list/hotel/sprite/hotel-num-hover.png') no-repeat center;
    height: 27px;
    width: 24px;
  }

  .hlIcon-biao {
    position: absolute;
    left: 0;
    top: 5px;
    width: 24px;
    height: 27px;
    background-position: 0 -15px;
    text-align: center;
    color: #fff;
    font: bold 13px/24px Arial;
  }

  .prdDtl {
    display: block;
    overflow: hidden;
    line-height: 22px;
  }

  .prdDtl dt {
    color: #999;
    float: left;
    vertical-align: top;
  }

  .prdDtl dd {
    float: left;
    color: #666;
    max-height: 44px;
    overflow: hidden;
    width: 360px;
  }

  .prdDtl.address {
    margin-top: 15px;
  }

  .prd_map {
    @include inlineblock;
    color: #29e;
    cursor: pointer;
  }

  .price_inf {
    color: #666;
    position: absolute;
    right: 0;
    top: 5px;
    text-align: right;
  }

  .price {
    color: #999
  }

  .price b {
    font-family: Arial;
    font-size: 20px;
    color: #f60;
  }

  .price .num {
    font-family: Arial;
    font-size: 24px;
    color: #f60;
    font-weight: bold;
    margin: 0 3px;
  }

  .evaluate .num {
    font-family: Arial;
    font-size: 14px;
    color: #f60;
    margin-right: 3px;
  }

  /*.eval_count .num { font-size: 14px;  }*/
  .eval_count a {
    color: #666
  }

  .eval_count a:hover, .eval_count a:hover span {
    color: #f60
  }

  .eval_count .num span {
    //color: #29e;
  }

  .service {
    height: 20px;
    overflow: hidden;
    margin-top: 15px;
  }

  .prd_switch {
    width: 100%;
    border-bottom: 1px solid #ccc;
    height: 42px;
  }

  .prd_switch li {
    font-family: "微软雅黑";
    color: #999;
    position: relative;
    float: left;
    font-size: 12px;
    margin-top: 15px;
    margin-left: 10px;
  }

  .prdTab {
    position: relative;
  }

  .prdHeadTit {
    position: absolute;
    left: 222px;
    top: 16px;
  }

  .prdHeadTit .list_td {
    color: #bbb;
  }

  .room_list dl {
    border-bottom: 1px solid #eee;
    //overflow: hidden;
    padding-top: 10px;
  }

  .room_list dl.open .roomInfo {
    display: block;
  }

  .room_list dl.open dt {
    border-bottom: none;
  }

  .room_list dl.open dt .icon-arrow {
    transform: rotateX(180deg);
  }

  .room_list dl.open dt a:hover .icon_arrow {
    border-color: #fff #fff #f60 #fff;
  }

  .room_list dt {
    border-bottom: 1px dotted #ddd;
    padding: 0 10px 10px;
  }

  .room_list dt a {
    font-family: "微软雅黑";
    font-size: 14px;
    color: #333;
    position: relative;
  }

  .room_list dt a:hover {
    color: #f60;
  }

  .room_list dt a:hover .icon-arrow {
    background: url('../../assets/imgs/list/hotel/sprite/icon-arrow-hover.png') no-repeat center;
    width: 9px;
    height: 6px;

  }

  .room_list dt .icon_arrow {
    border-color: #999 #fff #fff #fff;
    border-width: 4px;
    right: -12px;
    top: 9px;
    transition: all 0s linear 0s;
  }

  .hlIcon-room {
    width: 20px;
    height: 15px;
    background-position: -87px 0;
    vertical-align: top;
    margin: 4px 5px 0 0;
  }

  a:hover .hlIcon-room {
    background-position: -108px 0;
  }

  .roomInfo {
    position: relative;
    padding: 14px 14px 20px 120px;
    background: #f9f9f9;
    display: none;
    border: 1px solid #e6e6e6;
    line-height: 20px;
  }

  .roomInfo img {
    position: absolute;
    left: 14px;
    top: 14px;
  }

  .room-meta {
    height: 20px;
    color: #666;
  }

  .room-meta p {
    display: inline-block;
    width: 95px;
    overflow: hidden;
    white-space: nowrap;
    float: left;
  }

  .room-meta p.room-addBed {
    width: 125px;
  }

  .room-meta p.room-area {
    width: 140px;
  }

  .room-other {
    height: 40px;
    overflow: hidden;
    color: #999;
  }

  .js_room_up {
    position: absolute;
    right: 20px;
    bottom: 5px;
    color: #666;
    display: inline-block;
  }

  .room-li li {
    min-height: 22px;
    line-height: 20px;
    padding: 9px 0;
    border-bottom: 1px dotted #ddd;
  }

  .room-li li:hover {
    background: #fff3e4;
  }

  .room-li li.last, .room-li li:last-of-type {
    border: none;
  }


  .list_td {
    //float: left;
    @include inlineblock;
    vertical-align: top;
    min-height: 22px;
    padding: 0 8px;
    color: #999;
    //white-space: nowrap;
    //overflow: hidden;
    text-overflow: ellipsis;
  }

  .list_td1 {
    width: 204px;
    overflow: hidden;
  }

  .list_td2 { /*width: 46px;*/
    width: 64px;
    padding: 0;
  }

  .list_td3 {
    width: 60px;
  }

  .list_td4 {
    width: 60px;
  }

  .list_td5 {
    width: 60px;
  }

  .list_td6 { /* width: 114px;*/
    width: 68px;
  }

  .list_td6 .text_b {
    border-bottom: #f60 dashed 1px;
  }

  .list_td7 {
    width: 90px;
    padding-right: 0;
    text-align: left;
    position: relative;
    *z-index: 2;
  }

  .list_td7 .btn {
    float: right;
  }

  .list_td7 .btn-mini {
    padding: 0 9px;
    border-radius: 2px;
  }

  .list_td7 .btn-orange {
    background: #f80;
  }

  .list_td7 .btn-orange:hover {
    background: #f60;
  }

  .list_td8 {
    width: 154px;
    text-align: right;
    padding: 0;
    .btn {
      padding: 0 10px;
    }
  }

  .room_price {
    margin-right: 10px;
    font-size: 20px;
    color: #f60;
    cursor: default;
    font-family: Arial;
    &.room_price_days {
      border-bottom: #f60 dashed 1px;
    }
  }

  .room_price dfn {
    padding-right: 2px;
    font-size: 18px;
    font-family: "Arial", "微软雅黑";
  }

  .yufu, .danbao {
    height: 22px;
    padding: 0 5px;
    @include inlineblock;
    line-height: 22px;
  }

  .yufu {
    background: #fffde6;
    color: #f60;
  }

  .yufu .text_b {
    border-bottom-color: #f60;
  }

  .danbao {
    background: #f0f5fc;
    color: #09f;
  }

  .danbao .text_b {
    border-bottom-color: #09f;
  }

  .text_b {
    border-bottom: #999 dashed 1px;
    cursor: default;
  }

  .btn_list_show {
    float: left;
    position: relative;
    color: #666;
    cursor: pointer;
  }

  .btn_list_show:hover .icon-arrow {
    background: url('../../assets/imgs/list/hotel/sprite/icon-arrow-hover.png') no-repeat center;
    width: 9px;
    height: 6px;

  }


  .btn_list_show.room_up .icon-arrow {
    transform: rotateX(180deg);
  }

  .btn_list_show.room_up:hover .icon_arrow {
    border-color: #fff #fff #f60 #fff;
  }

  .hotel_list_b {
    border-top: #eee solid 1px;
    padding-top: 12px;
    height: 20px;
    line-height: 20px;
  }

  .btn_list_show .icon_arrow {
    border-width: 4px;
    top: 9px;
    border-top-color: #09c;
    transition: all 0s linear 0s;
  }

  .room-freetour {
    display: none;
  }

  .room-freetour li {
    padding: 14px 10px;
    border-bottom: 1px solid #ddd;
    zoom: 1;
    clear: both;
    overflow: hidden;
    line-height: 22px;
  }

  .room-freetour .btn {
    float: right;
    margin: 3px 0 0 0;
  }

  .room-freetour .btn-mini {
    padding: 0 9px;
    border-radius: 2px;
  }

  .room-freetour .btn-orange {
    background: #f80;
  }

  .room-freetour .btn-orange:hover {
    background: #f60;
  }

  .room-freetour-tit {
    width: 420px;
    max-height: 44px;
    overflow: hidden;
    float: left;
    margin-right: 66px;
    overflow: hidden;
    font: 14px/22px "Microsoft Yahei";
    position: relative;
    top: -5%;
  }

  .room-freetour-tit a {
    color: #333;
  }

  .room-freetour-tit a:hover {
    color: #f60;
  }

  .room-duration {
    width: 120px;
    float: left;
    color: #666;
  }

  .room-freetour-price {
    width: 120px;
    float: left;
    color: #999;
  }

  .room-freetour-price dfn, .room-freetour-price b {
    color: #f60;
    vertical-align: bottom;
  }

  .room-freetour-price dfn {
    padding-right: 5px;
    font-size: 14px;
    font-family: "Arial", "微软雅黑";
  }

  .room-freetour-price b {
    padding-right: 5px;
    font-size: 20px;
    color: #f60;
    cursor: default;
    font-family: Arial;
  }

  .freetour-list {
    padding-top: 12px;
    height: 20px;
    line-height: 20px;
  }

  .mainRight {
    width: 310px;
  }

  .mainR-mapTit {
    padding: 0 20px 0 15px;
    height: 30px;
    border: 1px solid #ddd;
    background: #fbfbfb;
    line-height: 30px;
    color: #666;
  }

  .mainR-mapTit strong {
    float: left;
    font-family: "Microsoft Yahei";
    font-size: 14px;
    font-weight: normal;
  }

  .mainR-mapTit a {
    float: right;
    display: inline-block;
    cursor: pointer;
    color: #666;
  }

  .mainR-mapTit a:hover {
    color: #f60;
    text-decoration: none;
  }

  .mainR-mapTit a span {
    margin: 8px 5px 0 0;
    vertical-align: top;
  }

  .map_box {
    height: 333px;
    border: #e3e3e3 solid 1px;
    border-top: none;
  }

  .mainRight-box {
    margin-top: 15px;
    border: 1px solid #ddd;
  }

  .mainRight-box h3 {
    padding-left: 15px;
    background: #fbfbfb;
    font: normal 14px/32px "Microsoft Yahei";
  }

  .main_r_fixed {
    width: 310px;
    z-index: 1;
  }

  .hotel_jilu {
    padding: 0 15px;
    background: #fff;
  }

  .hotel_jilu li {
    border-bottom: 1px dotted #ddd;
    height: 60px;
    padding: 15px 0;
  }

  .hotel_jilu img {
    float: left;
    margin-right: 10px;
  }

  .hotel_jilu h5 {
    width: 175px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: "微软雅黑";
    font-size: 14px;
    font-weight: normal;
  }

  .hotel_jilu span {
    color: #999;
  }

  .hotel_jilu span b, .hotel_jilu span dfn {
    margin-right: 3px;
    color: #f60;
    font-family: "Arial", "微软雅黑";
    font-size: 14px;
    vertical-align: middle;
  }

  .hotel_jilu span b {
    font-size: 20px;
  }

  .hotel_jilu a {
    color: #333;
  }

  .hotel_jilu a:hover {
    color: #f60;
  }

  .mapThis {
    position: absolute;
    left: 0;
    height: 32px;
    width: 26px;
    z-index: 1;
    transition: all 0.2s linear 0s;
    -webkit-transition: all 0.2s linear 0s;
  }

  .mapNum {
    display: inline-block;
    overflow: hidden;
    background: url(http://pic.lvmama.com/img/v6/hotel/hlicon.png) no-repeat;
  }

  .mapNum {
    position: absolute;
    left: 0;
    top: 0;
    height: 32px;
    width: 24px;
    background-position: -26px -44px;
    color: #f60;
    font-size: 16px;
    font-weight: bold;
    line-height: 26px;
    text-align: center;
    z-index: 3;
    font-family: Arial;
    z-index: 3;
  }

  .num_this {
    z-index: 3;
  }

  .num_this .mapNum {
    background-position: -0px -44px;
    color: #d37;
  }

  .num_this.mapThis p {
    border-color: #d37;
    background: #d37;
    color: #fff;
    box-shadow: none;
  }

  .mapThis p {
    background: none repeat scroll 0 0 #fff;
    border: #bbb solid 1px;
    border-radius: 10px;
    box-shadow: inset 0 0 0 1px rgba(255, 221, 170, 0.5);
    border: 1px solid #fda;
    color: #333;
    font-size: 12px;
    height: 14px;
    left: 10px;
    line-height: 14px;
    padding: 2px 14px 2px 20px;
    position: absolute;
    top: 1px;
    white-space: nowrap;
    z-index: 1;
  }

  .main_search input.des_tip {
    color: #bbb;
    font-size: 12px;
  }

  .hotel_mdd {
    background: #fff;
    width: 390px;
    padding: 10px;
    border: #ddd solid 1px;
    overflow: hidden;
    box-shadow: 0px 2px 4px #ccc;
    z-index: 99;
    position: absolute;
    display: none;
  }

  .hotel_mdd p {
    color: #999;
  }

  .mdd_tab {
    height: 31px;
    line-height: 30px;
    overflow: hidden;
    color: #333;
    margin-top: 5px;
    position: relative;
    z-index: 3;
    font-family: Arial, "Microsoft Yahei";
  }

  .mdd_tab li {
    float: left;
    margin-right: 2px;
    padding: 0 10px;
    position: relative;
    cursor: pointer;
  }

  .mdd_tab li .tabArrow {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -4px;
    border: 4px solid transparent;
    border-bottom-color: #f60;
    display: none;
  }

  .mdd_tab li .tabArrow b {
    position: absolute;
    left: 50%;
    bottom: -6px;
    margin-left: -4px;
    width: 0;
    height: 0;
    display: block;
    border: 4px solid transparent;
    border-bottom-color: #fff;
  }

  .mdd_tab li.active, .mdd_tab li:hover {
    color: #f60;
  }

  .mdd_tab li.active {
    border-bottom: #f60 solid 1px;
  }

  .mdd_tab li.active .tabArrow {
    display: block;
  }

  .mdd_tab li .hotel_icon {
    width: 9px;
    height: 6px;
    background-position: -75px -7px;
    position: absolute;
    left: 50%;
    margin-left: -5px;
    bottom: -1px;
    display: none;
  }

  .mdd_tab li.active .hotel_icon {
    display: block;
  }

  .mdd_list {
    margin-top: -1px;
    border-top: #E5E5E5 solid 1px;
  }

  .mdd_list li {
    display: none;
    padding: 5px 0;
  }

  .mdd_list li a {
    color: #333;
    margin-right: 10px;
    overflow: hidden;
    white-space: nowrap;
  }

  .mdd_list li a:hover {
    color: #f60;
  }

  .ico {
    display: inline-block;
    background: url(http://pic.lvmama.com/img/v6/hotel/hlicon.png) no-repeat;
  }

  .mdd_close {
    position: absolute;
    right: 6px;
    top: 7px;
    display: block;
    width: 11px;
    height: 11px;
    cursor: pointer;
    background-position: -52px -13px;
  }

  .des_error_tips {
    position: absolute;
    z-index: 2;
    background: #fff;
    width: 298px;
    height: 34px;
    padding-left: 10px;
    border: 1px solid #ccc;
    box-shadow: 0px 2px 4px #ccc;
    line-height: 34px;
    color: #999;
  }

  .des_error_tips .word {
    font-weight: bold;
    color: #333;
  }

  .des_error_tips .mdd_close {
    top: 11px;
  }

  .complete-wrap {
    width: 398px;
    border: 1px solid #ccc;
    position: absolute;
    z-index: 500;
    background: #fff;
  }

  .complete-wrap a:hover, .complete-wrap li.active a {
    color: #fff;
    background: #f90;
    text-decoration: none;
  }

  .complete-wrap li {
    width: 100%; /*margin-top: 2px;*/
  }

  .complete-wrap li.divide-line {
    border-top: 1px dashed #ccc;
  }

  .complete-wrap li.active .place-name b, .complete-wrap li.active .hotel-place-type, .complete-wrap li.active .hotel-count, .complete-wrap li.active .hotel-name b, .complete-wrap li a:hover .place-name b, .complete-wrap li a:hover .hotel-place-type, .complete-wrap li a:hover .hotel-count, .complete-wrap li a:hover .hotel-name b {
    color: #fff !important;
  }

  .complete-wrap a {
    background: #fff;
    display: block;
    width: 378px;
    color: #333;
    height: 22px;
    line-height: 22px;
    padding: 4px 10px;
  }

  .complete-wrap .place-name {
    font-family: "微软雅黑";
    font-size: 14px;
    width: 230px;
    height: inherit;
    float: left;
    overflow: hidden;
  }

  .complete-wrap .place-name b, .complete-wrap .hotel-name b {
    color: #999;
    font-weight: normal;
  }

  .complete-wrap .hotel-count {
    color: #999;
    width: 80px;
    text-align: right;
  }

  .complete-wrap .hotel-count, .complete-wrap .hotel-place-type {
    font-family: "Microsoft Yahei";
    font-size: 12px;
    display: inline-block;
  }

  .complete-wrap .hotel-place-type {
    color: #999;
    margin-left: 20px;
    font-size: 14px;
  }

  .complete-wrap .hotel-place-type {
    display: none;
  }

  .complete-wrap .hotel-name {
    font-family: "微软雅黑";
    font-size: 14px;
    width: 235px;
    height: inherit;
    float: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .complete-wrap .hotel-count {
    color: #999;
    width: 80px;
    text-align: right;
  }

  .complete-wrap .hotel-place-lcat {
    display: none;
    font-family: "微软雅黑";
    font-size: 14px;
    margin-right: 10px;
    float: right;
  }

  li.divide-line .hotel-place-type, li.divide-line .hotel-place-type, li.divide-line .hotel-place-lcat, li.active .hotel-place-type, li.active .hotel-place-type, li.active .hotel-place-lcat, li.first .hotel-place-type, li.first .hotel-place-type, li.first .hotel-place-lcat {
    display: inline-block;
  }

  .date_msg, .key_msg {
    display: none;
    position: absolute;
    z-index: 999;
  }

  .date_msg span {
    color: red;
    font-weight: bold;
  }

  .caldate {
    font-family: "Microsoft Yahei";
  }

  .nodate {
    background: none !important;
  }

  .calmonth .caltable th {
    color: #999;
  }

  .hotel_keyword {
    background: #fff;
    width: 378px;
    padding: 0 11px;
    border: #ddd solid 1px;
    overflow: hidden;
    box-shadow: 0px 2px 4px #ccc;
    display: none;
    z-index: 99;
    position: absolute;
  }

  .keyword_list {
    padding: 8px 0 8px 8px;
    margin-top: -1px;
    border-top: #ddd dashed 1px;
    overflow: hidden;
    *zoom: 1;
  }

  .keyword_list dt {
    width: 60px;
    margin-right: 15px;
    color: #999;
    font-weight: normal;
    font-size: 14px;
    font-family: "Microsoft Yahei";
  }

  .keyword_list dd {
    color: #333;
    width: 380px;
  }

  .keyword_list dd a {
    margin-right: 20px;
    display: inline-block;
    color: #333;
    float: left;
    white-space: nowrap;
  }

  .keyword_list dd a:hover {
    color: #f60;
  }

  .pagebox span {
    background: none;
  }

  .hlIcon-warning {
    position: absolute;
    left: 145px;
    top: 48px;
    background: url('../../assets/imgs/list/hotel/sprite/no-result.png') no-repeat center;
    height: 48px;
    width: 48px;
  }

  /*.noresult {
    border: 1px solid #ddd;
    position: relative;
    padding: 50px 0 50px 200px;
    background: #fff;
    margin-bottom: 15px;
  }

  .noresult-title {
    font-size: 16px;
    font-weight: normal;
    font-family: "Microsoft Yahei";
    padding-left: 20px;
  }

  .noresult-explain {
    position: relative;
    padding-left: 20px;
    color: #999;
  }

  .noresult-explain span {
    position: absolute;
    left: 0;
    top: 0;
  }*/

  .tagsback i {
    min-width: 12px;
  }

  .bdTit {
    margin-bottom: 15px;
    padding-left: 20px;
    height: 42px;
    border: 1px solid #ddd;
    color: #666;
    font: 16px/42px "Microsoft Yahei";
  }

  .map_mask {
    z-index: 500;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: #000;
    opacity: 0.5;
    filter: Alpha(opacity=50);
    display: none;
  }

  .map_container {
    position: absolute;
    width: 940px;
    height: 510px;
    left: 50%;
    margin-left: -500px;
    background: #fff;
    padding: 20px 30px;
    z-index: 501;
    display: none;
  }

  .map_container .title {
    color: #333;
    font-family: "微软雅黑";
    font-size: 18px;
  }

  .map_container .map {
    width: 940px;
    height: 480px;
    margin-top: 5px;
  }

  .hlIcon-mapClose {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 23px;
    height: 23px;
    background-position: -68px -18px;
    cursor: pointer;
  }

  .soldout {
    display: block;
    float: right;
    padding: 0 10px;
    height: 20px;
    margin-right: 20px;
  }

  /*更多酒店品牌*/
  .hotel_pinpai {
    width: 500px;
    border: #ccc solid 1px;
    padding: 14px 18px;
    position: absolute;
    background: #fff;
    z-index: 99;
    display: none;
    box-shadow: 0px 2px 4px #ccc;
  }

  .hotel_pinpai_t {
    font-size: 16px;
    color: #333;
    font-family: "Microsoft Yahei";
  }

  .hotel_pinpai_list {
    overflow: hidden;
    *zoom: 1;
  }

  .hotel_pinpai_list li {
    min-width: 90px;
    float: left;
    margin: 5px 10px 0 0;
    display: inline;
    cursor: pointer;
  }

  .hotel_pinpai_list .hotel_ck {
    margin: 5px 5px 0 0;
  }

  .hotel_pinpai_b {
    overflow: hidden;
    *zoom: 1;
    margin-top: 20px;
  }

  .hotel_pinpai .btn {
    float: right;
    clear: both;
    border-radius: 3px;
  }

  .ppClose {
    display: block;
    width: 11px;
    height: 11px; /*background-position:-52px -26px;*/
    background-position: -52px -13px;
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 10px;
  }

  /*.ppClose:hover { background-position:-52px -13px; }*/

  /*loading*/
  .loading_box {
    height: 46px;
    padding: 30px 0;
    width: 100%;
    text-align: center;
    border: 1px solid #ddd;
    background: #fff;
  }

  .icon_loading {
    display: inline-block;
    width: 46px;
    height: 46px;
    background: url(http://pic.lvmama.com/img/new_v/ui_scrollLoading/loadingGIF46px.gif) no-repeat center center;
    vertical-align: middle;
  }

  .loading_box span {
    display: inline-block;
    height: 46px;
    line-height: 46px;
    vertical-align: middle;
    font-family: "微软雅黑";
    font-size: 18px;
    color: #999;
    margin-left: 10px;
  }

  /*价格hover弹层*/
  .tip_content {
    border: 1px solid #ccc;
    padding: 5px 10px;
    box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    vertical-align: top;
    word-break: break-all;
    word-wrap: break-word;
    z-index: 100;
    background: #fff;
    display: none;
  }

  .tip_content .tip_arrow {
    height: 10px;
    overflow: hidden;
    position: absolute;
    width: 16px;
    top: -7px;
    left: 20px;
  }

  .tip_content.tip_date .tip_arrow {
    left: 50%;
    margin-left: 5px;
  }

  .tip_content .tip_arrow i, .tip_content .tip_arrow em {
    font-family: SimSun, Tahoma, Arial, 宋体, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    position: absolute;
  }

  .tip_content .tip_arrow i {
    color: #fff;
    top: 1px;
  }

  .tip_content .tip_arrow em {
    color: #ccc;
  }

  .tip_content.tip_simple {
    max-width: 180px;
  }

  .tip_content.tip_detail {
    max-width: 360px;
  }

  .tip_content.tip_date {
    max-width: 500px;
  }

  .tip_content .title {
    font-weight: bold;
    color: #333;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px dotted #ccc;
  }

  .tip_content .intro {
    color: #666;
    height: 16px;
    line-height: 16px;
  }

  .tip_content .detail {
    color: #999;
  }

  .tip_content dt {
    font-weight: bold;
    color: #999;
    width: 60px;
    float: left;
  }

  .tip_content dd {
    padding-left: 60px;
    margin-bottom: 8px;
  }

  .tip_content li {
    float: left;
    border: 1px solid #f2f2f2;
    margin-left: -1px;
    width: 82px;
    color: #666;
    line-height: 16px;
  }

  .tip_content .head {
    background: #f2f2f2;
    text-align: center;
    padding: 5px 0;
  }

  .tip_content .price_wrap {
    text-align: center;
    padding: 5px 0;
  }

  .tip_content .price {
    font-family: Arial;
    color: #f60;
    font-weight: bold;
  }

  .tip_content .price b {
    font-weight: normal;
  }

  .prdLi .saleBox {
    display: none;
  }

  /*
   * 2016-06-08 酒店预售
   * 江圣
   */

  .shaixuan li b {
    width: 14px;
    height: 14px;
    margin-left: 5px;
    display: inline-block;
    background: url(http://pic.lvmama.com/img/search/v1/search.png) no-repeat -120px -80px;
    vertical-align: -3px;
  }

  .proTit strong {
    font-family: Simsun, sans-serif;
    font-size: 12px;
    display: inline-block;
    padding: 0 4px;
    height: 16px;
    line-height: 16px;
    border-radius: 2px;
    vertical-align: top;
    margin-top: 9px;
    margin-right: 5px;
    text-decoration: none;
    font-weight: normal;
    color: #ffffff;
    background: #74c8fa;
    border-color: #74c8fa;
  }

  .tags-summer-sale {
    text-indent: -9999em;
    width: 60px;
    height: 16px;
    line-height: 16px;
    margin-top: 9px;
    margin-right: 5px;
    background: url(http://pic.lvmama.com/img/v6/hotel/hlicon.png) no-repeat -85px -45px;
    display: inline-block;
    vertical-align: top;
  }

  /*景酒推荐*/
  .hotel_recommend {
    background: #fff;
    border: 1px solid #e3e3e3;
    padding: 10px 20px;
    display: block;
    overflow: hidden;
    margin: 10px 0 20px;
  }

  .hotel_recommend .title {
    font-family: "微软雅黑";
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
  }

  .hotel_recommend ul {
    margin-left: -20px;
  }

  .hotel_recommend li {
    float: left;
    margin-left: 20px;
  }

  .hotel_recommend img {
    width: 194px;
    height: 130px;
  }

  .hotel_recommend .hotel_name {
    color: #333;
    height: 33px;
    line-height: 16px;
    *height: 33px;
    max-width: 194px;
    *width: 194px;
    display: block;
    overflow: hidden;
  }

  .hotel_recommend .hotel_name:hover {
    color: #f60;
    text-decoration: underline;
  }

  .hotel_recommend .hotel_price {
    color: #f60;
    font-family: Arial;
    font-weight: bold;
  }

  .hotel_recommend .detail {
    color: #999;
    width: 190px;
  }

  .hotel_recommend .detail .hotel_type {
    float: right;
  }

  /*seo酒店列表*/
  .hotel_recom {
    width: 880px;
    border-top: 1px solid #ddd;
    margin-top: 30px;
  }

  .hotel_recom .head {
    height: 56px;
    line-height: 56px;
    overflow: hidden;
  }

  .hotel_recom .head .title {
    font-family: "微软雅黑";
    font-size: 16px;
    color: #333;
    float: left;
  }

  .hotel_recom .default_list {
    width: 680px;
    float: left;
    overflow: hidden;
    height: 56px;
  }

  .hotel_recom .default_list a {
    float: left;
    color: #999;
    margin-left: 30px;
    line-height: 60px;
  }

  .hotel_recom .default_list a:hover {
    color: #f60;
  }

  .hotel_recom .head .hotel_more {
    color: #999;
    display: inline-block;
    position: relative;
    float: right;
    margin-right: 20px;
  }

  .hotel_recom .head .hotel_more .font {
    cursor: pointer;
  }

  .hotel_recom .head .hotel_more:hover {
    color: #f60;
  }

  .hotel_recom .head .hotel_more .icon_arrow {
    border-color: #999 #f5f5f5 #f5f5f5 #f5f5f5;
    position: absolute;
    right: -10px;
    top: 25px;
  }

  .hotel_recom .head .hotel_more:hover .icon_arrow {
    border-color: #f60 #f5f5f5 #f5f5f5 #f5f5f5;
  }

  .hotel_recom .head .hotel_more.slide .icon_arrow {
    border-color: #f5f5f5 #f5f5f5 #999 #f5f5f5;
    position: absolute;
    top: 21px;
  }

  .hotel_recom .head .hotel_more.slide:hover .icon_arrow {
    border-color: #f5f5f5 #f5f5f5 #f60 #f5f5f5;
    position: absolute;
  }

  .hotel_recom .content {
    width: 100%;
    display: none;
  }

  .hotel_recom .content .detail {
    color: #999;
  }

  .hotel_recom .content dl {
    margin-top: 20px;
    overflow: hidden;
  }

  .hotel_recom .content dt {
    display: block;
    width: 100%;
    color: #666;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .hotel_recom .content dd {
    float: left;
    margin-right: 20px;
    height: 26px;
    line-height: 26px;
    word-break: keep-all;
  }

  .hotel_recom .content a {
    color: #999;
  }

  .hotel_recom .content a:hover {
    color: #f60;
  }

  /*酒店详情页添加星级*/
  .hotel_stars {
    display: inline-block;
    height: 12px;
    margin: 0 4px;
    overflow: hidden;
    vertical-align: middle;
    background-image: url(http://pic.lvmama.com/img/v6/hotel/hotel_detail.png);
    background-position: -320px -300px;
  }

  .hotel_stars01 {
    width: 12px;
  }

  .hotel_stars02 {
    width: 26px;
  }

  .hotel_stars03 {
    width: 40px;
  }

  .hotel_stars04 {
    width: 54px;
  }

  .hotel_stars05 {
    width: 68px;
  }

  .hotel_stars06 {
    width: 82px;
  }

  .djjd_tagsclasses {
    font-size: 12px;
    height: 14px;
    line-height: 14px;
    text-decoration: none;
    color: #999;
    font-family: 'Microsoft Yahei';
    vertical-align: middle;
  }
</style>
<!--hotel_list.scss END-->
<!--hotel.scss-->
<style lang="scss">
  @import "../../assets/scss/_var.scss";
  body {
    background-color: #f5f5f5;
    a:hover {
      text-decoration: none;
    }
    b {
      font-weight: normal;
    }
    .btn {
      font-weight: normal;
      padding: 0 20px;
    }
    #sideInve {
      bottom: 160px;
    }
    #goTopBtn {
      bottom: 120px;
    }
    #Feedback {
      bottom: 80px;
    }
    .cart {
      position: fixed;
      display: block;
      z-index: 20;
      bottom: 20px;
      right: 0px;
      background: url("../../assets/imgs/list/hotel/sprite/bg-cart.png");
      height: 46px;
      line-height: 46px;
      width: 140px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
      .pro-num {
        background: url("../../assets/imgs/list/hotel/sprite/icon-cart-num.png");
        height: 26px;
        line-height: 26px;
        text-align: center;
        width: 26px;
        position: absolute;
        top: -13px;
        left: 0px;
      }
      i {
        background: url("../../assets/imgs/list/hotel/sprite/icon-cart.png");
        height: 20px;
        width: 20px;
        @include inlineblock;
        vertical-align: middle;
        margin-top: -3px;
      }
      &:hover {
        background: url("../../assets/imgs/list/hotel/sprite/bg-cart-hover.png");
      }
    }
    .fix-top {
      position: fixed;
      top: 0;
      left: 0;
      //width: (1200px - 58);
      width: 100%;
      z-index: 30;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      padding: 0;
    }
    img {
      background: url(http://pic.lvmama.com/img/cmt/img_120_60.jpg) no-repeat center center #f6f6f6;
    }
  }

  .ui-calendar {
    z-index: 40;
  }
  .cal-number-of-days {
    z-index: 40;
  }

  .ticket_search {
    box-shadow:0 1px 4px 0 rgba(0,0,0,0.20);
  }

  .head-wrapper {
    border: 1px solid #ccc\9;
    margin-bottom: 20px;
  }
  .main_search {
    border-bottom:1px solid #e3e3e3;
    background-color: #fff;
    .search-bar-wrapper {
      position: relative;
      padding: 14px 30px 13px 28px;
      width: (1200px - 58);
      margin: 0 auto;
    }
    .default-box {
      .city,.date {
        height: 41px;
        line-height: 41px;
      }
    }
    .change-box {
      display: none;
      margin-bottom: -8px;
      margin-top: 8px;
      .section-input {
        font-weight: normal;
        position: relative;
        height: 30px;
        background-color: #fff;
        width: 250px;
        margin: 0 0 15px 3px;
        border: 1px solid #ddd;
        *z-index: 1;
        &.error {
          border: 1px solid #f30;
          background-color: #ffe8e8;
        }
      }
      .input-wrapper {
        @include inlineblock;
      }
      input {
        position: absolute;
        z-index: 10;
        padding-left: 68px;
        padding-right: 12px;
        top: 0;
        height: 30px;
        line-height: 30px;
        background: url(../../assets/imgs/list/alpha.gif) repeat;
        font-size: 12px;
        width: 170px;
        color: #333;
        outline: none;
        &.placeholder {
          color: #999;
        }
      }
      .search-contents-title {
        position: absolute;
        z-index: 9;
        left: 0px;
        padding-left: 10px;
        height: 30px;
        line-height: 30px;
        width: 58px;
        font-size: 12px;
        color: #999;
      }
      .search-contents-info {
        position: absolute;
        z-index: 9;
        right: 10px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #999;
      }
      .error-box {
        position: absolute;
        display: none;
        top: -4px;
        left: 256px;
        background:#ffffff;
        border:1px solid #dddddd;
        box-shadow:0 2px 4px 0 #aaa;
        width:165px;
        height:34px;
        z-index: 20;
        .error-icon {
          @include inlineblock;
          background: url('../../assets/imgs/list/hotel/sprite/icon-error.png') no-repeat center;
          height: 14px;
          width: 14px;

          margin-left: 10px;
          vertical-align: middle;
        }
        p {
          @include inlineblock;
          font-size:12px;
          line-height: 34px;
          text-align: right;
        }
      }
      .error-box-bottom {
        @extend .error-box;
        display: block;
        top: 38px;
        left: 40px;
      }
      .btn-wrapper {
        margin-top: 50px;
        div {
          margin-left: 8px;
        }
      }
    }
    .city {
      float: left;
      font-size:20px;
      font-weight: 700;
      margin-right: 100px;
      .icon {
        @include inlineblock;
        background: url("../../assets/imgs/list/hotel/sprite/icon-hotel.png") no-repeat center;
        height: 39px;
        width: 39px;
        vertical-align: top;
        margin-right: 12px;
      }
    }
    .date {
      @extend .city;
      .hotel-days {
        font-weight: 700;
        vertical-align: top;
        margin-right: 2px;
        font-size: 22px;
      }
      .icon {
        background: url("../../assets/imgs/list/hotel/sprite/icon-date.png") no-repeat center;
      }
      span {
        font-size: 16px;
      }
      .date-details {
        @include inlineblock;
        vertical-align: middle;
        font-weight: normal;
        margin-left: 3px;
        span {
          margin: 4px 0;
          display: block;
          font-size:12px;
          color:#999999;
          height: 16px;
          line-height: 16px;
          b {
            margin-right: 6px;
          }
        }
      }

    }
    .btn-wrapper{
      margin-top: 5px;
      float: right;
      margin-right: 0;
    }
    .drop-suggestion-citys {
      display: none;
      position: absolute;
      border: 1px solid #ccc\9;
      box-shadow: 0px 2px 4px #999;
      top:100px;
      left: 30px;
      width: (536px - 21*2);
      padding: 13px 21px;
      background-color: #fff;
      z-index: 20;
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
            background: url("../../assets/imgs/list/hotel/sprite/icon-arrow-current.png");
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
      z-index: 30;
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

  .search_sort {

  }

  .search-num {
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    margin-bottom: -10px;
    span {
      font-weight: 700;
      color: $color-lv-orange;
    }
  }

  .room-li {
    .list_td7 {
      position: relative;
      background-color: #fff;
      border:1px solid #dddddd;
      width:57px;
      height:22px;
      padding: 0;
      cursor: pointer;
      .select-num {
        position: absolute;
        top:0;
        left: 0;
        z-index: 1;
        cursor: pointer;
        padding-left: 10px;
        padding-right: 15px;
        height:22px;
        line-height: 22px;
        width:32px;
        background: url('../../assets/imgs/list/alpha.gif') repeat;
      }
      b {
        position: absolute;
        right: 5px;
        top: 8px;
        background: url('../../assets/imgs/list/hotel/sprite/icon-arrow.png') no-repeat center;
        height: 6px;
        width: 9px;
      }
      .select-num-selections {
        display: none;
        position: absolute;
        top: 22px;
        z-index: 10;
        background-color: #fff;
        width: 100%;
        border: 1px solid #ccc;
        left: -1px;
        li {
          height: 20px;
          padding: 0 0 0 10px;
          line-height: 20px;
          color: #333;
          &:hover,&.current {
            background-color: #fef2f9;
            color: #e38;
          }
        }
      }
    }
  }
  .icon-arrow {
    float: right;
    background: url('../../assets/imgs/list/hotel/sprite/icon-arrow.png') no-repeat center;
    height: 6px;
    width: 9px;
  }
  .room_list {
    &:hover {

    }
    .icon-arrow {
      position: absolute;
      right: -12px;
      top: 9px;
    }
  }
  .btn_list_show {
    .icon-arrow {
      top: 8px;
    }
  }

  /*.click-more {
    background:#ffffff;
    width: 100%;
    height:32px;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
    font-size:14px;
    color:#899bad;
    margin-top: 10px;
    margin-bottom: 10px;
    &:hover {
      color: $color-hover-orange;
    }
  }

  .nomore {
    position: relative;
    width: 100%;
    border-bottom: 1px solid #ddd;
    height: 12px;
    margin: 30px 0;
    span {
      position: absolute;
      height: 24px;
      width: 122px;
      top:0;
      left: 50%;
      margin-left: -90px;
      padding: 0 29px;
      font-size:18px;
      color:#bbbbbb;
      background-color: #f5f5f5;
    }
  }*/

  .cart-success {
    display: none;
    background-color: #fff;
    .icon {
      margin: 0 auto;
      background: url('../../assets/imgs/list/hotel/sprite/cart-success.png') no-repeat center;
      height: 81px;
      width: 89px;
      vertical-align: middle;
      margin-top: -20px;
      margin-bottom: 20px;
    }
    p {
      width: 100%;
      text-align: center;
      font-size:16px;
      color:#333333;
      line-height:28px;
      padding-left: 10px;
    }
  }
  .cart-fail {
    @extend .cart-success;
    .icon {
      background: url('../../assets/imgs/list/hotel/sprite/cart-fail.png') no-repeat center;
      height: 81px;
      width: 89px;
    }
  }

  //酒店详情-用户点评-无点评
  .no-comment {
    height: 340px;
    text-align: center;
    span {
      margin-top: 100px;
      @include inlineblock;
      vertical-align: middle;
      color: #999;
      font-size: 16px;
    }
    .pic-lv {
      background: url('../../assets/imgs/list/hotel/sprite/lv_no.png') no-repeat center;
      height: 100px;
      width: 100px;
    }
  }
</style>
<!--hotel.scss END-->
<!--combo.scss-->
<style lang="scss">
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
          display: none;
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




