<template>
  <div class="wrap">


    <list-top></list-top>

    <!-- 搜索框 -->
    <div class="ticket_search">
      <div class="search_nav_box">
        <ul class="search_nav">
          <li>
            <router-link to="combo">优选套餐</router-link>
            <i></i>
          </li>
          <li>
            <router-link to="flight">机票</router-link>
          </li>
          <li class="search_li">
            <router-link to="hotel">酒店</router-link>
          </li>
        </ul>
      </div>

      <div class="head-wrapper">
        <div class="main_search search-contents-hotel">
          <div class="search-bar-wrapper">
            <div class="default-box clearfix"
                 v-show="!isShowChangeBox">
              <div class="city">
                <i class="icon"></i>
                <span class="city-to-str">{{city}}</span>
              </div>
              <div class="date">
                <i class="icon"></i>
                <span>
                    <b class="hotel-days">{{days}}</b>天
                </span>
                <p class="date-details">
                  <span><b class="date-from-str">{{fromDate}}</b>入住</span>
                  <span><b class="date-to-str">{{toDate}}</b>退房</span>
                </p>
              </div>
              <div class="btn-wrapper">
                <div class="btn btn-change btn-pink"
                     @click="isShowChangeBox = !isShowChangeBox;">
                  更改行程
                </div>
              </div>
            </div>
            <div class="change-box clearfix"
                 v-show="isShowChangeBox">
              <div class="city">
                <i class="icon"></i>
                <div class="input-wrapper">
                  <search-city
                    title="出发地"
                    :currentCity="currentMesObj('city')"
                    v-on:cityChange="changeData"
                    suggestUrl="static/data/citys.json"
                    errorContent="出发地不能为空"
                    :isShowError="isErrorFrom"></search-city>
                  <search-city
                    title="关键字"
                    :currentCity="currentMesObj('keywords')"
                    v-on:cityChange="changeData"
                    suggestUrl="static/data/citys.json"></search-city>
                  <!--<div class="hotel-keywords section-input search-keywords">
                    <div class="search-contents-title">关键字</div>
                    <input type="text" class="input-city-keywords" placeholder="酒店名/商圈/地标">
                  </div>-->
                </div>
              </div>
              <div class="date">
                <i class="icon"></i>
                <div class="input-wrapper search-hotel">
                  <search-date
                    :dateObj="currentMesObj('fromDate')"
                    titleText="入住日期"
                    :isShowCalendar="false"></search-date>
                  <search-date
                    :dateObj="currentMesObj('toDate')"
                    titleText="退房日期"
                    :isShowCalendar="false"></search-date>
                </div>
              </div>
              <div class="btn-wrapper">
                <div class="btn btn-pink search-btn"
                     @click="checkForm('hotel')">
                  搜索
                </div>
                <div class="btn cancle search-btn-cancle"
                     @click="cancelChange()">
                  取消
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="search_sort clearfix">
          <div class="search_list clearfix">
            <div class="search_theme">酒店星级</div>
            <dl class="search_theme_list clearfix">
              <dt><a class="select" href="javascript:;">不限</a></dt>
              <dd>
                <span class="navListSpan"><a href="javascript:;"><span class="hlIcon hlIcon-select"></span>五星级/豪华型</a></span>
                <span class="navListSpan"><a href="javascript:;"><span class="hlIcon hlIcon-select"></span>四星级/品质型</a></span>
                <span class="navListSpan"><a href="javascript:;"><span class="hlIcon hlIcon-select"></span>三星级/舒适性</a></span>
                <span class="navListSpan"><a href="javascript:;"><span class="hlIcon hlIcon-select"></span>二星级/简约型</a></span>
                <span class="navListSpan"><a href="javascript:;"><span class="hlIcon hlIcon-select"></span>其他/其他</a></span>
                <span class="navListSpan"><a href="javascript:;"><span class="hlIcon hlIcon-select"></span>其他/其他</a></span>
                <span class="navListSpan"><a href="javascript:;"><span class="hlIcon hlIcon-select"></span>其他/其他</a></span>
                <span class="navListSpan"><a href="javascript:;"><span class="hlIcon hlIcon-select"></span>其他/其他</a></span>
                <span class="navListSpan"><a href="javascript:;"><span class="hlIcon hlIcon-select"></span>其他/其他</a></span>
                <span class="navListSpan"><a href="javascript:;"><span class="hlIcon hlIcon-select"></span>其他/其他</a></span>
                <span class="navListSpan"><a href="javascript:;"><span class="hlIcon hlIcon-select"></span>其他/其他</a></span>
              </dd>
            </dl>
            <a class="seach_gd_btn js_moreOpt_btn">更多<i class="arrow"></i></a>
          </div>
          <div class="search_list clearfix">
            <div class="search_theme">房&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价</div>
            <dl class="search_theme_list clearfix">
              <dt><a class="select" href="javascript:;">不限</a></dt>
              <dd>
                <span class="navListSpan"><a href="javascript:;"><span class="hlIcon hlIcon-select"></span>¥400以下</a></span>
                <span class="navListSpan"><a href="javascript:;"><span class="hlIcon hlIcon-select"></span>¥400 - ¥800</a></span>
                <span class="navListSpan"><a href="javascript:;"><span class="hlIcon hlIcon-select"></span>¥800 - ¥1200</a></span>
                <span class="navListSpan"><a href="javascript:;"><span class="hlIcon hlIcon-select"></span>¥1200 - ¥1600</a></span>
                <span class="navListSpan"><a href="javascript:;"><span class="hlIcon hlIcon-select"></span>¥2000以上</a></span>
              </dd>
            </dl>
          </div>
          <div class="search_list result_sort clearfix">
            <div class="search_theme">排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序</div>
            <ul class="search_theme_list rank_box clearfix">
              <li class="active">驴妈妈推荐<b>|</b></li>
              <li title="按价格从高到低排序" class="tl-col-down">价格<i></i><b>|</b></li>
              <li title="按点评率从低到高排序">点评率<i></i><b>|</b></li>
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

    <!-- 列表开始 -->
    <div class="mainBox mt20 clearfix">
      <div class="loading_box">
        <i class="icon_loading"></i>
        <span>请稍候，正在为您查询</span>
      </div>
      <div class="mainLeft fl">

        <!--<div class="loading_box">
            <i class="icon_loading"></i>
            <span>请稍候，正在为您查询</span>
        </div>-->

        <!-- 列表开始 -->
        <div class="prdLi" point="118.13,24.5" name="厦门京闽中心酒店">

          <!-- 酒店主体内容 -->
          <div class="prdMain clearfix">
            <a href="javascript:;" class="proImg js_hotel_name">
              <img src="http://placehold.it/210x140/ffddff" alt="" width="210" height="140">
            </a>

            <div class="proInfo">
              <p class="proTit">
                <a href="javascript:;" class="js_hotel_name">
                  <span class="hlIcon hlIcon-biao">1</span>
                  厦门京闽中心酒店厦门京闽中心酒店厦门京闽中心酒店中心酒店
              </a>
                <span class="hotel_stars hotel_stars04" title="国家旅游评定为四星级酒店"></span>
                <span class="djjd_tagsclasses" title="驴妈妈用户评定为高档型酒店">
                                <i>[高档型]</i>
                            </span>
                <strong class="js_tips" tip-content="预售提示">预售</strong>
                <span class="tags-summer-sale">暑期大促</span>
              </p>

              <dl class="prdDtl address">
                <dt>地址：</dt>
                <dd>上海外滩路18号15楼对方水电费多岁的范德萨发的顺丰到
                                <a point="116.404, 39.915" name="上海新崇大酒店" rel="nofollow" title="上海新崇大酒店" class="prd_map">查看地图</a>
                </dd>
              </dl>
              <dl class="prdDtl double_line">
                <dt>主题：</dt>
                <dd title="别墅酒店、园林酒店、农家乐">别墅酒店、园林酒店、农家乐
                            </dd>
              </dl>

              <div class="service">
                <!--设施-->
                <span class="hotel-facilities-icon hfi-wifi-f" title="免费Wifi"></span>
                <span class="hotel-facilities-icon hfi-wifi-c" title="收费Wifi"></span>
                <span class="hotel-facilities-icon hfi-internet-f" title="免费宽带"></span>
                <span class="hotel-facilities-icon hfi-internet-c" title="收费宽带"></span>
                <span class="hotel-facilities-icon hfi-park-f" title="免费停车场"></span>
                <span class="hotel-facilities-icon hfi-park-c" title="收费停车场"></span>
                <span class="hotel-facilities-icon hfi-pick-f" title="免费接机"></span>
                <span class="hotel-facilities-icon hfi-pick-c" title="收费接机"></span>
                <span class="hotel-facilities-icon hfi-sp-in" title="室内游泳池"></span>
                <span class="hotel-facilities-icon hfi-sp-out" title="室外游泳池"></span>
                <span class="hotel-facilities-icon hfi-gym" title="健身房"></span>
                <span class="hotel-facilities-icon hfi-bc" title="商务中心"></span>
                <span class="hotel-facilities-icon hfi-mr" title="会议室"></span>
                <span class="hotel-facilities-icon hfi-restaurant" title="酒店餐厅"></span>

              </div>

            </div><!-- //prdInfo -->

            <div class="price_inf">
              <p class="price"><b>¥</b><span class="num">550</span>起</p>
              <p class="evaluate"><span class="num">92%</span>好评率</p>
              <p class="eval_count">
                <a class="num js_hotel_content" href="javascript:;">来自<span>2000</span>条点评</a>
              </p>
            </div>

          </div><!-- //prdMain -->

          <div class="prdTab">
            <ul class="prd_switch clearfix">
              <li class="active">房型<span class="tabArrow"><b></b></span></li>
            </ul>

            <ul class="prdHeadTit">
              <li class="list_td list_td2">床型</li>
              <li class="list_td list_td3">早餐</li>
              <li class="list_td list_td4">宽带</li>
              <li class="list_td list_td5">政策</li>
              <li class="list_td list_td6">价格</li>
              <li class="list_td list_td7">间数</li>
            </ul>
          </div>

          <div class="room_list">
            <dl>
              <dt>
                <a class="js_roomDtl" href="javascript:;">
                  <span class="hlIcon hlIcon-room"></span>
                  尊华双床房<i class="icon-arrow"></i>
                </a>
              </dt>
              <dd>
                <div class="roomInfo">
                  <a href="#"><img src="http://placehold.it/90x60/e8e8e8" width="90" height="60"></a>
                  <div class="room-meta">
                    <p>床型：双床</p>
                    <p class="room-addBed">加床：可以加床</p>
                    <p class="room-area">面积：36-48平方米</p>
                    <p>楼层：2楼</p>
                    <p>宽带：免费</p>
                  </div>
                  <p class="room-other">其它：拖鞋、浴室化妆放大镜、24小时热水、免费洗漱用品(6样以上)、电热水器、独立淋浴间、公用吹风机、吹风机、浴室、淋浴便利设施：雨伞、遮光窗帘、针线包、多种规格电源插座、单一规格普通分。</p>
                  <a class="js_room_up" href="javascript:;">收起</a>
                </div>

                <ul class="room-li">
                  <li>
                    <div class="list_td list_td1">
                      豪华套房豪华套房豪华套房豪华套房豪华套房豪华套房豪华套房豪华套房
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床</div>
                    <div class="list_td list_td3">无早</div>
                    <div class="list_td list_td4">收费宽带</div>
                    <div class="list_td list_td5">
                      <span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">限时退改</span>
                    </div>
                    <div class="list_td list_td6">
                                        <span class="room_price js_date_price room_price_days">
                                            <dfn>¥</dfn>288
                                        </span>
                      <!--引入文字提示 时间价格表提示-->
                      <div class="time_price_in_resort_hotel" style="display: none;">
                        <div class="tip_arrow">
                          <em>◆</em>
                          <i>◆</i>
                        </div>
                        <ul>
                          <li>
                            <div class="head">
                              <p>2017-07-26</p>
                              <p>星期三</p>
                            </div>
                            <div class="price_wrap">
                              <p class="price"><b>¥</b>938</p>
                              <p class="detail">有早</p>
                            </div>
                          </li>
                          <li>
                            <div class="head">
                              <p>2017-07-22</p>
                              <p>星期六</p>
                            </div>
                            <div class="price_wrap">
                              <p class="price"><b>¥</b>938</p>
                              <p class="detail">有早</p>
                            </div>
                          </li>
                          <li>
                            <div class="head">
                              <p>2017-07-21</p>
                              <p>星期五</p>
                            </div>
                            <div class="price_wrap">
                              <p class="price"><b>¥</b>938</p>
                              <p class="detail">有早</p>
                            </div>
                          </li>
                          <li>
                            <div class="head">
                              <p>2017-07-23</p>
                              <p>星期日</p>
                            </div>
                            <div class="price_wrap">
                              <p class="price"><b>¥</b>938</p>
                              <p class="detail">有早</p>
                            </div>
                          </li>
                          <li>
                            <div class="head">
                              <p>2017-07-20</p>
                              <p>星期四</p>
                            </div>
                            <div class="price_wrap">
                              <p class="price"><b>¥</b>938</p>
                              <p class="detail">有早</p>
                            </div>
                          </li>
                          <li>
                            <div class="head">
                              <p>2017-07-25</p>
                              <p>星期二</p>
                            </div>
                            <div class="price_wrap">
                              <p class="price"><b>¥</b>938</p>
                              <p class="detail">有早</p>
                            </div>
                          </li>
                          <li>
                            <div class="head">
                              <p>2017-07-24</p>
                              <p>星期一</p>
                            </div>
                            <div class="price_wrap">
                              <p class="price"><b>¥</b>938</p>
                              <p class="detail">有早</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <div class="yufu">
                        <span class="text_b js_tips" tip-content="提示内容">预付</span>
                      </div>
                      <a href="javascript:;" class="btn btn-orange btn-xs btn-add-cart">加入购物车</a>
                    </div>
                  </li>

                  <li>
                    <div class="list_td list_td1">
                      <span class="room-li-tit">豪华套房</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床</div>
                    <div class="list_td list_td3">无早</div>
                    <div class="list_td list_td4">收费宽带</div>
                    <div class="list_td list_td5">
                      <span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">限时退改</span>
                    </div>
                    <div class="list_td list_td6">
                      <span class="room_price js_date_price"><dfn>¥</dfn>288</span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <span class="soldout js_tips" tip-content="已经订完,您可以预订其他房型">订完</span>
                    </div>
                  </li>

                  <li style="display: none">
                    <div class="list_td list_td1">
                      <span class="room-li-tit">豪华套房</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床</div>
                    <div class="list_td list_td3">无早</div>
                    <div class="list_td list_td4">收费宽带</div>
                    <div class="list_td list_td5">
                      <span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">限时退改</span>
                    </div>
                    <div class="list_td list_td6">
                                        <span class="room_price js_date_price">
                                            <dfn>¥</dfn>288
                                        </span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <span class="soldout js_tips" tip-content="已经订完,您可以预订其他房型">订完</span>
                    </div>
                  </li>
                  <li style="display: none">
                    <div class="list_td list_td1">
                      <span class="room-li-tit">豪华套房</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床</div>
                    <div class="list_td list_td3">无早</div>
                    <div class="list_td list_td4">收费宽带</div>
                    <div class="list_td list_td5">
                      <span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">限时退改</span>
                    </div>
                    <div class="list_td list_td6">
                      <span class="room_price js_date_price"><dfn>¥</dfn>288</span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <span class="soldout js_tips" tip-content="已经订完,您可以预订其他房型">订完</span>
                    </div>
                  </li>

                  <!-- 最后一条加last -->
                  <li class="last">
                    <div class="list_td list_td1">
                      <span class="room-li-tit">急速确认价</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床双</div>
                    <div class="list_td list_td3">部分无早</div>
                    <div class="list_td list_td4">免费宽带</div>
                    <div class="list_td list_td5">
                      <span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">限时取消</span>
                    </div>
                    <div class="list_td list_td6">
                                        <span class="room_price js_date_price">
                                            <dfn>¥</dfn>1000
                                        </span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <div class="danbao">
                        <span class="text_b js_tips" tip-content="提示内容">担保</span>
                      </div>
                      <a href="javascript:;" class="btn btn-orange btn-xs btn-add-cart">加入购物车</a>
                    </div>
                  </li>
                </ul>
              </dd>
            </dl>

            <dl class="open">
              <dt>
                <a class="js_roomDtl" href="javascript:;"><span class="hlIcon hlIcon-room"></span>尊华单人房<i class="icon-arrow"></i></a>
              </dt>
              <dd>
                <div class="roomInfo">
                  <a href="#"><img src="http://placehold.it/90x60/e8e8e8" width="90" height="60"></a>
                  <div class="room-meta">
                    <p>床型：双床</p>
                    <p class="room-addBed">加床：可以加床</p>
                    <p class="room-area">面积：36-48平方米</p>
                    <p>楼层：2楼</p>
                    <p>宽带：免费</p>
                  </div>
                  <p class="room-other">其它：拖鞋、浴室化妆放大镜、24小时热水、免费洗漱用品(6样以上)、电热水器、独立淋浴间、公用吹风机、吹风机、浴室、淋浴便利设施：雨伞、遮光窗帘、针线包、多种规格电源插座、单一规格普通分。</p>
                  <a class="js_room_up" href="javascript:;">收起</a>
                </div>

                <ul class="room-li">
                  <li>
                    <div class="list_td list_td1">
                      <span class="room-li-tit">标准价</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床</div>
                    <div class="list_td list_td3">无早</div>
                    <div class="list_td list_td4">收费宽带</div>
                    <div class="list_td list_td5"><span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">不可退改</span></div>
                    <div class="list_td list_td6">
                      <span class="room_price js_date_price"><dfn>¥</dfn>288</span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <div class="yufu">
                        <span class="text_b js_tips" tip-content="提示内容">预付</span>
                      </div>
                      <a href="javascript:;" class="btn btn-orange btn-xs btn-add-cart">加入购物车</a>
                    </div>
                  </li>

                  <!-- 最后一条加last -->
                  <li class="last">
                    <div class="list_td list_td1">
                      <span class="room-li-tit">急速确认价急速确认价急速确</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床双</div>
                    <div class="list_td list_td3">部分无早</div>
                    <div class="list_td list_td4">免费宽带</div>
                    <div class="list_td list_td5"><span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">限时取消</span></div>
                    <div class="list_td list_td6">
                      <span class="room_price js_date_price"><dfn>¥</dfn>1080</span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <div class="danbao">
                        <span class="text_b js_tips" tip-content="提示内容">担保</span>
                      </div>
                      <a href="javascript:;" class="btn btn-orange btn-xs btn-add-cart">加入购物车</a>
                    </div>
                  </li>
                </ul>
              </dd>
            </dl>

            <!-- 第三条开始默认不显示  -->
            <dl style="display:none;">
              <dt>
                <a class="js_roomDtl" href="javascript:;"><span class="hlIcon hlIcon-room"></span>尊华单人房<i class="icon-arrow"></i></a>
              </dt>
              <dd>
                <div class="roomInfo">
                  <a href="#"><img src="http://placehold.it/90x60/e8e8e8" width="90" height="60"></a>
                  <div class="room-meta">
                    <p>床型：双床</p>
                    <p class="room-addBed">加床：可以加床</p>
                    <p class="room-area">面积：36-48平方米</p>
                    <p>楼层：2楼</p>
                    <p>宽带：免费</p>
                  </div>
                  <p class="room-other">其它：拖鞋、浴室化妆放大镜、24小时热水、免费洗漱用品(6样以上)、电热水器、独立淋浴间、公用吹风机、吹风机、浴室、淋浴便利设施：雨伞、遮光窗帘、针线包、多种规格电源插座、单一规格普通分。</p>
                  <a class="js_room_up" href="javascript:;">收起</a>
                </div>

                <ul class="room-li">
                  <li>
                    <div class="list_td list_td1">
                      <span class="room-li-tit">标准价</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床</div>
                    <div class="list_td list_td3">无早</div>
                    <div class="list_td list_td4">收费宽带</div>
                    <div class="list_td list_td5"><span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">不可退改</span></div>
                    <div class="list_td list_td6">
                      <span class="room_price js_date_price"><dfn>¥</dfn>288</span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <div class="yufu">
                        <span class="text_b js_tips" tip-content="提示内容">预付</span>
                      </div>
                      <a href="javascript:;" class="btn btn-orange btn-xs btn-add-cart">加入购物车</a>
                    </div>
                  </li>

                  <!-- 最后一条加last -->
                  <li class="last">
                    <div class="list_td list_td1">
                      <span class="room-li-tit">急速确认价急速确认价急速确</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床双</div>
                    <div class="list_td list_td3">部分无早</div>
                    <div class="list_td list_td4">免费宽带</div>
                    <div class="list_td list_td5"><span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">限时取消</span></div>
                    <div class="list_td list_td6">
                      <span class="room_price js_date_price"><dfn>¥</dfn>1080</span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <div class="danbao">
                        <span class="text_b js_tips" tip-content="提示内容">担保</span>
                      </div>
                      <a href="javascript:;" class="btn btn-orange btn-xs btn-add-cart">加入购物车</a>
                    </div>
                  </li>
                </ul>
              </dd>
            </dl>
            <dl style="display:none;">
              <dt>
                <a class="js_roomDtl" href="javascript:;"><span class="hlIcon hlIcon-room"></span>尊华单人房<i class="icon-arrow"></i></a>
              </dt>
              <dd>
                <div class="roomInfo">
                  <a href="#"><img src="http://placehold.it/90x60/e8e8e8" width="90" height="60"></a>
                  <div class="room-meta">
                    <p>床型：双床</p>
                    <p class="room-addBed">加床：可以加床</p>
                    <p class="room-area">面积：36-48平方米</p>
                    <p>楼层：2楼</p>
                    <p>宽带：免费</p>
                  </div>
                  <p class="room-other">其它：拖鞋、浴室化妆放大镜、24小时热水、免费洗漱用品(6样以上)、电热水器、独立淋浴间、公用吹风机、吹风机、浴室、淋浴便利设施：雨伞、遮光窗帘、针线包、多种规格电源插座、单一规格普通分。</p>
                  <a class="js_room_up" href="javascript:;">收起</a>
                </div>

                <ul class="room-li">
                  <li>
                    <div class="list_td list_td1">
                      <span class="room-li-tit">标准价</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床</div>
                    <div class="list_td list_td3">无早</div>
                    <div class="list_td list_td4">收费宽带</div>
                    <div class="list_td list_td5"><span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">不可退改</span></div>
                    <div class="list_td list_td6">
                      <span class="room_price js_date_price"><dfn>¥</dfn>288</span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <div class="yufu">
                        <span class="text_b js_tips" tip-content="提示内容">预付</span>
                      </div>
                      <a href="javascript:;" class="btn btn-orange btn-xs btn-add-cart">加入购物车</a>
                    </div>
                  </li>

                  <!-- 最后一条加last -->
                  <li class="last">
                    <div class="list_td list_td1">
                      <span class="room-li-tit">急速确认价急速确认价急速确</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床双</div>
                    <div class="list_td list_td3">部分无早</div>
                    <div class="list_td list_td4">免费宽带</div>
                    <div class="list_td list_td5"><span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">限时取消</span></div>
                    <div class="list_td list_td6">
                      <span class="room_price js_date_price"><dfn>¥</dfn>1080</span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <div class="danbao">
                        <span class="text_b js_tips" tip-content="提示内容">担保</span>
                      </div>
                      <a href="javascript:;" class="btn btn-orange btn-xs btn-add-cart">加入购物车</a>
                    </div>
                  </li>
                </ul>
              </dd>
            </dl>

            <div class="hotel_list_b">
              <a href="javascript:;" class="btn_list_show js_room_show">展开全部房型(6)<i class="icon-arrow"></i></a>
            </div>
          </div><!-- //room_list -->

        </div>

        <div class="prdLi" point="118.13,24.52" name="厦门悦华酒店">

          <!-- 酒店主体内容 -->
          <div class="prdMain clearfix">
            <a href="javascript:;" class="proImg js_hotel_name">
              <img src="http://placehold.it/210x140/ffddff" alt="" width="210" height="140">
            </a>

            <div class="proInfo">
              <p class="proTit">
                <a href="javascript:;" class="js_hotel_name">
                  <span class="hlIcon hlIcon-biao">2</span>
                  厦门希尔顿逸林酒店
              </a>
                <span class="djjd_tagsclasses" title="驴妈妈用户评定为经济型酒店">
                                <i>[经济型]</i>
                            </span>
                <strong class="js_tips" tip-content="预售提示">预售</strong>
                <span class="tags-summer-sale">暑期大促</span>
              </p>

              <dl class="prdDtl address">
                <dt>地址：</dt>
                <dd>上海外滩路18号15楼对方水
                                <a point="116.404, 39.915" name="上海新崇大酒店" rel="nofollow" title="上海新崇大酒店" class="prd_map">查看地图</a>
                </dd>
              </dl>
              <dl class="prdDtl double_line">
                <dt>主题：</dt>
                <dd title="别墅酒店、园林酒店、农家乐">别墅酒店、园林酒店、农家乐
                            </dd>
              </dl>

              <div class="service">
                <!--设施-->
                <span class="hotel-facilities-icon hfi-wifi-f" title="免费Wifi"></span>
                <span class="hotel-facilities-icon hfi-wifi-c" title="收费Wifi"></span>
                <span class="hotel-facilities-icon hfi-internet-f" title="免费宽带"></span>
                <span class="hotel-facilities-icon hfi-internet-c" title="收费宽带"></span>
                <span class="hotel-facilities-icon hfi-park-f" title="免费停车场"></span>
                <span class="hotel-facilities-icon hfi-park-c" title="收费停车场"></span>
                <span class="hotel-facilities-icon hfi-pick-f" title="免费接机"></span>
                <span class="hotel-facilities-icon hfi-pick-c" title="收费接机"></span>
                <span class="hotel-facilities-icon hfi-sp-in" title="室内游泳池"></span>
                <span class="hotel-facilities-icon hfi-sp-out" title="室外游泳池"></span>
                <span class="hotel-facilities-icon hfi-gym" title="健身房"></span>
                <span class="hotel-facilities-icon hfi-bc" title="商务中心"></span>
                <span class="hotel-facilities-icon hfi-mr" title="会议室"></span>
                <span class="hotel-facilities-icon hfi-restaurant" title="酒店餐厅"></span>

              </div>

            </div><!-- //prdInfo -->

            <div class="price_inf">
              <p class="price"><b>¥</b><span class="num">550</span>起</p>
              <p class="evaluate"><span class="num">92%</span>好评率</p>
              <p class="eval_count">
                <a class="num js_hotel_content" href="javascript:;">来自<span>2000</span>条点评</a>
              </p>
            </div>

          </div><!-- //prdMain -->

          <div class="prdTab">
            <ul class="prd_switch clearfix">
              <li class="active">房型<span class="tabArrow"><b></b></span></li>
            </ul>

            <ul class="prdHeadTit">
              <li class="list_td list_td2">床型</li>
              <li class="list_td list_td3">早餐</li>
              <li class="list_td list_td4">宽带</li>
              <li class="list_td list_td5">政策</li>
              <li class="list_td list_td6">价格</li>
              <li class="list_td list_td7">间数</li>
            </ul>
          </div>

          <div class="room_list">
            <dl>
              <dt>
                <a class="js_roomDtl" href="javascript:;">
                  <span class="hlIcon hlIcon-room"></span>
                  尊华双床房<i class="icon-arrow"></i>
                </a>
              </dt>
              <dd>
                <div class="roomInfo">
                  <a href="#"><img src="http://placehold.it/90x60/e8e8e8" width="90" height="60"></a>
                  <div class="room-meta">
                    <p>床型：双床</p>
                    <p class="room-addBed">加床：可以加床</p>
                    <p class="room-area">面积：36-48平方米</p>
                    <p>楼层：2楼</p>
                    <p>宽带：免费</p>
                  </div>
                  <p class="room-other">其它：拖鞋、浴室化妆放大镜、24小时热水、免费洗漱用品(6样以上)、电热水器、独立淋浴间、公用吹风机、吹风机、浴室、淋浴便利设施：雨伞、遮光窗帘、针线包、多种规格电源插座、单一规格普通分。</p>
                  <a class="js_room_up" href="javascript:;">收起</a>
                </div>

                <ul class="room-li">
                  <li>
                    <div class="list_td list_td1">
                      豪华套房豪华套房豪华套房豪华套房豪华套房豪华套房豪华套房豪华套房
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床</div>
                    <div class="list_td list_td3">无早</div>
                    <div class="list_td list_td4">收费宽带</div>
                    <div class="list_td list_td5">
                      <span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">限时退改</span>
                    </div>
                    <div class="list_td list_td6">
                                        <span class="room_price js_date_price">
                                            <dfn>¥</dfn>288
                                        </span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <div class="yufu">
                        <span class="text_b js_tips" tip-content="提示内容">预付</span>
                      </div>
                      <a href="javascript:;" class="btn btn-orange btn-xs btn-add-cart">加入购物车</a>
                    </div>
                  </li>

                  <li>
                    <div class="list_td list_td1">
                      <span class="room-li-tit">豪华套房</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床</div>
                    <div class="list_td list_td3">无早</div>
                    <div class="list_td list_td4">收费宽带</div>
                    <div class="list_td list_td5">
                      <span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">限时退改</span>
                    </div>
                    <div class="list_td list_td6">
                      <span class="room_price js_date_price"><dfn>¥</dfn>288</span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <span class="soldout js_tips" tip-content="已经订完,您可以预订其他房型">订完</span>
                    </div>
                  </li>

                  <li style="display: none">
                    <div class="list_td list_td1">
                      <span class="room-li-tit">豪华套房</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床</div>
                    <div class="list_td list_td3">无早</div>
                    <div class="list_td list_td4">收费宽带</div>
                    <div class="list_td list_td5">
                      <span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">限时退改</span>
                    </div>
                    <div class="list_td list_td6">
                                        <span class="room_price js_date_price">
                                            <dfn>¥</dfn>288
                                        </span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <span class="soldout js_tips" tip-content="已经订完,您可以预订其他房型">订完</span>
                    </div>
                  </li>
                  <li style="display: none">
                    <div class="list_td list_td1">
                      <span class="room-li-tit">豪华套房</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床</div>
                    <div class="list_td list_td3">无早</div>
                    <div class="list_td list_td4">收费宽带</div>
                    <div class="list_td list_td5">
                      <span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">限时退改</span>
                    </div>
                    <div class="list_td list_td6">
                      <span class="room_price js_date_price"><dfn>¥</dfn>288</span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <span class="soldout js_tips" tip-content="已经订完,您可以预订其他房型">订完</span>
                    </div>
                  </li>

                  <!-- 最后一条加last -->
                  <li class="last">
                    <div class="list_td list_td1">
                      <span class="room-li-tit">急速确认价</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床双</div>
                    <div class="list_td list_td3">部分无早</div>
                    <div class="list_td list_td4">免费宽带</div>
                    <div class="list_td list_td5">
                      <span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">限时取消</span>
                    </div>
                    <div class="list_td list_td6">
                                        <span class="room_price js_date_price">
                                            <dfn>¥</dfn>1000
                                        </span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <div class="danbao">
                        <span class="text_b js_tips" tip-content="提示内容">担保</span>
                      </div>
                      <a href="javascript:;" class="btn btn-orange btn-xs btn-add-cart">加入购物车</a>
                    </div>
                  </li>
                </ul>
              </dd>
            </dl>

            <dl class="open">
              <dt>
                <a class="js_roomDtl" href="javascript:;"><span class="hlIcon hlIcon-room"></span>尊华单人房<i class="icon-arrow"></i></a>
              </dt>
              <dd>
                <div class="roomInfo">
                  <a href="#"><img src="http://placehold.it/90x60/e8e8e8" width="90" height="60"></a>
                  <div class="room-meta">
                    <p>床型：双床</p>
                    <p class="room-addBed">加床：可以加床</p>
                    <p class="room-area">面积：36-48平方米</p>
                    <p>楼层：2楼</p>
                    <p>宽带：免费</p>
                  </div>
                  <p class="room-other">其它：拖鞋、浴室化妆放大镜、24小时热水、免费洗漱用品(6样以上)、电热水器、独立淋浴间、公用吹风机、吹风机、浴室、淋浴便利设施：雨伞、遮光窗帘、针线包、多种规格电源插座、单一规格普通分。</p>
                  <a class="js_room_up" href="javascript:;">收起</a>
                </div>

                <ul class="room-li">
                  <li>
                    <div class="list_td list_td1">
                      <span class="room-li-tit">标准价</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床</div>
                    <div class="list_td list_td3">无早</div>
                    <div class="list_td list_td4">收费宽带</div>
                    <div class="list_td list_td5"><span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">不可退改</span></div>
                    <div class="list_td list_td6">
                      <span class="room_price js_date_price"><dfn>¥</dfn>288</span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <div class="yufu">
                        <span class="text_b js_tips" tip-content="提示内容">预付</span>
                      </div>
                      <a href="javascript:;" class="btn btn-orange btn-xs btn-add-cart">加入购物车</a>
                    </div>
                  </li>

                  <!-- 最后一条加last -->
                  <li class="last">
                    <div class="list_td list_td1">
                      <span class="room-li-tit">急速确认价急速确认价急速确</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床双</div>
                    <div class="list_td list_td3">部分无早</div>
                    <div class="list_td list_td4">免费宽带</div>
                    <div class="list_td list_td5"><span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">限时取消</span></div>
                    <div class="list_td list_td6">
                      <span class="room_price js_date_price"><dfn>¥</dfn>1080</span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <div class="danbao">
                        <span class="text_b js_tips" tip-content="提示内容">担保</span>
                      </div>
                      <a href="javascript:;" class="btn btn-orange btn-xs btn-add-cart">加入购物车</a>
                    </div>
                  </li>
                </ul>
              </dd>
            </dl>

            <!-- 第三条开始默认不显示  -->
            <dl style="display:none;">
              <dt>
                <a class="js_roomDtl" href="javascript:;"><span class="hlIcon hlIcon-room"></span>尊华单人房<i class="icon-arrow"></i></a>
              </dt>
              <dd>
                <div class="roomInfo">
                  <a href="#"><img src="http://placehold.it/90x60/e8e8e8" width="90" height="60"></a>
                  <div class="room-meta">
                    <p>床型：双床</p>
                    <p class="room-addBed">加床：可以加床</p>
                    <p class="room-area">面积：36-48平方米</p>
                    <p>楼层：2楼</p>
                    <p>宽带：免费</p>
                  </div>
                  <p class="room-other">其它：拖鞋、浴室化妆放大镜、24小时热水、免费洗漱用品(6样以上)、电热水器、独立淋浴间、公用吹风机、吹风机、浴室、淋浴便利设施：雨伞、遮光窗帘、针线包、多种规格电源插座、单一规格普通分。</p>
                  <a class="js_room_up" href="javascript:;">收起</a>
                </div>

                <ul class="room-li">
                  <li>
                    <div class="list_td list_td1">
                      <span class="room-li-tit">标准价</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床</div>
                    <div class="list_td list_td3">无早</div>
                    <div class="list_td list_td4">收费宽带</div>
                    <div class="list_td list_td5"><span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">不可退改</span></div>
                    <div class="list_td list_td6">
                      <span class="room_price js_date_price"><dfn>¥</dfn>288</span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <div class="yufu">
                        <span class="text_b js_tips" tip-content="提示内容">预付</span>
                      </div>
                      <a href="javascript:;" class="btn btn-orange btn-xs btn-add-cart">加入购物车</a>
                    </div>
                  </li>

                  <!-- 最后一条加last -->
                  <li class="last">
                    <div class="list_td list_td1">
                      <span class="room-li-tit">急速确认价急速确认价急速确</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床双</div>
                    <div class="list_td list_td3">部分无早</div>
                    <div class="list_td list_td4">免费宽带</div>
                    <div class="list_td list_td5"><span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">限时取消</span></div>
                    <div class="list_td list_td6">
                      <span class="room_price js_date_price"><dfn>¥</dfn>1080</span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <div class="danbao">
                        <span class="text_b js_tips" tip-content="提示内容">担保</span>
                      </div>
                      <a href="javascript:;" class="btn btn-orange btn-xs btn-add-cart">加入购物车</a>
                    </div>
                  </li>
                </ul>
              </dd>
            </dl>
            <dl style="display:none;">
              <dt>
                <a class="js_roomDtl" href="javascript:;"><span class="hlIcon hlIcon-room"></span>尊华单人房<i class="icon-arrow"></i></a>
              </dt>
              <dd>
                <div class="roomInfo">
                  <a href="#"><img src="http://placehold.it/90x60/e8e8e8" width="90" height="60"></a>
                  <div class="room-meta">
                    <p>床型：双床</p>
                    <p class="room-addBed">加床：可以加床</p>
                    <p class="room-area">面积：36-48平方米</p>
                    <p>楼层：2楼</p>
                    <p>宽带：免费</p>
                  </div>
                  <p class="room-other">其它：拖鞋、浴室化妆放大镜、24小时热水、免费洗漱用品(6样以上)、电热水器、独立淋浴间、公用吹风机、吹风机、浴室、淋浴便利设施：雨伞、遮光窗帘、针线包、多种规格电源插座、单一规格普通分。</p>
                  <a class="js_room_up" href="javascript:;">收起</a>
                </div>

                <ul class="room-li">
                  <li>
                    <div class="list_td list_td1">
                      <span class="room-li-tit">标准价</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床</div>
                    <div class="list_td list_td3">无早</div>
                    <div class="list_td list_td4">收费宽带</div>
                    <div class="list_td list_td5"><span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">不可退改</span></div>
                    <div class="list_td list_td6">
                      <span class="room_price js_date_price"><dfn>¥</dfn>288</span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <div class="yufu">
                        <span class="text_b js_tips" tip-content="提示内容">预付</span>
                      </div>
                      <a href="javascript:;" class="btn btn-orange btn-xs btn-add-cart">加入购物车</a>
                    </div>
                  </li>

                  <!-- 最后一条加last -->
                  <li class="last">
                    <div class="list_td list_td1">
                      <span class="room-li-tit">急速确认价急速确认价急速确</span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>即时</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>礼</i></span>
                      <span class="tagsback tagsback-orange js_tips" tip-content="提示内容"><i>评</i></span>
                    </div>
                    <div class="list_td list_td2">双床双</div>
                    <div class="list_td list_td3">部分无早</div>
                    <div class="list_td list_td4">免费宽带</div>
                    <div class="list_td list_td5"><span class="text_b js_tips" tip-content="在2014-01-02 18：00前您可免费取消/变更订单，超时取消/变更订单将扣除全额房费或部分房费">限时取消</span></div>
                    <div class="list_td list_td6">
                      <span class="room_price js_date_price"><dfn>¥</dfn>1080</span>
                    </div>
                    <div class="list_td list_td7">
                      <input class="select-num" value="2" readonly="readonly">
                      <b></b>
                      <ul class="select-num-selections">
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
                    <div class="list_td list_td8">
                      <div class="danbao">
                        <span class="text_b js_tips" tip-content="提示内容">担保</span>
                      </div>
                      <a href="javascript:;" class="btn btn-orange btn-xs btn-add-cart">加入购物车</a>
                    </div>
                  </li>
                </ul>
              </dd>
            </dl>

            <div class="hotel_list_b">
              <a href="javascript:;" class="btn_list_show js_room_show">展开全部房型(6)<i class="icon-arrow"></i></a>
            </div>
          </div><!-- //room_list -->

        </div>

        <list-bottom v-bind:content="emptyContent"></list-bottom>

      </div><!-- //mainLeft 左侧结束-->

      <!-- 右侧边栏 开始-->
      <div class="mainRight fr">
        <div class="main_r_fixed">
          <div class="mainR-mapTit">
            <strong>地图预览</strong>
            <a href="javascript:;" class="select JS_mapgundong">
              <span class="hlIcon hlIcon-select"></span>
              随屏滚动
          </a>
          </div>
          <div class="map_box" id="baidu_map"></div>
        </div>
      </div><!-- //mainRight 右侧边栏结束 -->
    </div>
    <!-- 列表开始 END-->


    <cart v-bind:cartNum="cartNum"></cart>
  </div>
</template>
<script>
  import ListTop from './list-top.vue';
  import ListBottom from './list-bottom.vue';
  import Cart from '../cart.vue';
  import SearchCity from '../search/search-city.vue';
  import SearchDate from '../search/search-date.vue';
  import {storage} from '../../assets/js/utils.js'
  import {getDate} from '../../assets/js/utils.js'
  import axios from 'axios'
  export default {
    name: 'hotel',
    components: {ListTop,ListBottom,Cart,SearchCity,SearchDate},
    data: function () {
      return {
        isShowChangeBox:false,
        city:'上海',
        keywords:'',
        fromDate: '',//默认值
        toDate: '',
        isError: false,
        isErrorFrom: false,
        isErrorTo: false,
        cartNum:0,
        proId:1,
        emptyContent: '酒店'
      }
    },
    created: function () {
      const vm = this;
      //获取搜索数据
      this.getDataSearch();
      //获取购物车数据
      axios.get('static/data/cart.json')
        .then(function (res) {
          vm.cartNum = res.data.proNum
        });
      this.calendarRefresh()
    },
    filters: {
      getWeekday: function (date) {
        const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        let dateObj = new Date(date);
        let weekDay = week[dateObj.getDay()];
        return weekDay;
      }
    },
    watch: {
      toContent: function () {
        this.isError ? this.checkForm() : '';
      },
      keywords: function () {
        this.isError ? this.checkForm() : '';
      }
    },
    computed:{
      days: function () {
        let fromDateTime = new Date(this.fromDate);
        let toDateTime = new Date(this.toDate);
        return (toDateTime-fromDateTime)/86400000;
      }
    },
    methods: {
      checkForm: function (name) {
        //检查是否为空
        this.isError = false;
        this.isErrorFrom = false;
        this.isErrorTo = false;
        if (this.toContent === '') {
          this.isErrorFrom = true;
          this.isError = true;
        }
        if (this.toContent === '') {
          this.isErrorTo = true;
          this.isError = true;
        }
        if (!this.isError&&name) {
          //set localstorage
          let obj = {
            currentSec: 'hotel',
            toCity: this.toCity,
            keywords: this.keywords,
            fromDate: this.fromDate,
            toDate: this.toDate,
          };
          storage('searchHotel','set',obj);
          //TODO
          this.isShowChangeBox = false;
        }
      },
      cancelChange: function () {
        //回到defaultbox，重新拉取数据
        this.isShowChangeBox = !this.isShowChangeBox;
        this.getDataSearch();
      },
      getDataSearch: function () {
        //从localstorage中获取参数
        let obj = storage('searchHotel','get');
        //判断是否有值
        if(obj !== null){
          this.toContent = obj.toCity;
          this.keywords = obj.keywords;
          this.fromDate = obj.fromDate;
          this.toDate = obj.toDate;
        }else {
          this.fromDate = getDate();
          this.toDate = getDate((new Date()),2);
        }
      },
      butNow: function () {
        //携带参数跳转填单页
        let vm = this;
        this.$router.push({
          name:'form',
          params:{
            proId: vm.proId
          }
        })
      },
      changeData: function (value,type) {
        this[type] = value;
      },
      currentMesObj: function (name) {
        const vm = this;

        let obj = {};
        obj.name = name;
        vm.$set(obj,'value',vm[name]);

        return obj;

        /*return {
          name:name,
          value: vm[name]
        };*/
      },
      calendarRefresh: function () {
        const vm = this;
        //初始化连级日历
        lv.calendar({
          autoRender: false,
          trigger: ".search-hotel .section-input",
          triggerEvent: "click",
          bimonthly: true,
          //定位偏移
          monthNext: 10,
          monthPrev: 10,
          dayPrev: 0,
          template: "small",
          cascading: true,
          cascadingOffset: 1,
          cascadingNextAuto: true,
          //点击选择日期后的回调函数 默认返回值: calendar对象
          selectDateCallback: function () {
            let self = this;
            setTimeout(function () {
              vm.fromDate = self.cascadingSelected.start;
              vm.toDate = self.cascadingSelected.end?self.cascadingSelected.end:'';
            },0);
          }
        });

      },
    }
  }
</script>
<style >
  @import "http://pic.lvmama.com/styles/v6/flighthotel/hotel-facilities.css";
  @import "http://pic.lvmama.com/styles/detail/destroute/hotel_flight_detail.css";
  @import "http://pic.lvmama.com/styles/v6/public/common_box.css";

</style>




