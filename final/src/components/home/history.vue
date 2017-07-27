<template>
    <div class="history-search-wrapper">
        <div class="history-search-container">
            <div class="hot-citys-title">
                <div class="title-wrapper">
                    <span class="title-main">说走就走，还在等什么！</span>
                    <span class="title-en">GO ON A TRIP TOGETHER</span>
                </div>
            </div>
            <ul class="history-search-citys clearfix">
                <li class="history-pros">
                    <p class="notice">亲,看来你很中意这家住宿哟~</p>
                    <a href="#">
                        <div class="pro-title">鼓浪屿喜来登假日酒店</div>
                        <img src="../../assets/imgs/placehold/386x257.png" alt="">
                        <div class="pro-bg"></div>
                    </a>
                </li>
                <li class="history-pros">
                    <p class="notice">亲,看来你很中意这家住宿哟~</p>
                    <a href="#">
                        <div class="pro-title">鼓浪屿喜来登假日酒店</div>
                        <img src="../../assets/imgs/placehold/386x257.png" alt="">
                        <div class="pro-bg"></div>
                    </a>
                </li>
                <li class="history-pros">
                    <p class="notice">亲,看来你很中意这家住宿哟~</p>
                    <a href="#">
                        <div class="pro-title">鼓浪屿喜来登假日酒店</div>
                        <img src="../../assets/imgs/placehold/386x257.png" alt="">
                        <div class="pro-bg"></div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'history'
    }
</script>
<style lang="scss">
    @import "../../assets/scss/_var.scss";
    .history-search-container {
        //@extend .hot-citys-container;
        width: 1200px;
        position: relative;
        height: 563px;
        padding-bottom: 60px;
        left: 50%;
        margin-left: -600px;
        height: 463px;
    }
    .history-search-citys {
        //@extend .hot-citys;
        margin-left: -20px;
        .hot-pros {
            float: left;
            position: relative;
            width: 285px;
            height: 410px;
            margin-left: 20px;
            transition: all 0.5s;
            .pro-info {
                position: absolute;
                left: 44px;
                top: 41px;
                width: 200px;
                height: 80px;
                color: #fff;
                .pro-name {
                    font-weight: 700;
                    font-size:24px;
                    text-align: center;
                }
                .pro-icon {
                    // @include sprite(url('../../assets/imgs/sprite@2x/pro-icon.png'),url('../../assets/imgs/sprite@2x/pro-icon@2x.png'));
                    background: url("../../assets/imgs/sprite@2x/pro-icon.png");
                    width: 200px;
                    height: 10px;
                    margin: 10px 0;
                }
                .pro-tips {
                    li {
                        float: left;
                        width:58px;
                        height:20px;
                        line-height: 20px;
                        text-align: center;
                        border-radius: 10px;
                        border:1px solid #ffffff;
                        margin-left: 5px;
                    }
                }
            }
            &:hover {
                transform: translateY(-5px)
            }
        }
        .notice {
            background: url("../../assets/imgs/sprite@2x/bubble.png") no-repeat center;
            height: 42px;
            width: 366px;
            line-height: 37px;
            padding-left: 20px;
            margin-bottom: 11px;
            color: #666;
        }
        .history-pros {
            float: left;
            position: relative;
            width: 386px;
            height: 310px;
            margin-left: 20px;
            transition: all 0.5s;
            .pro-title {
                position: absolute;
                bottom: 15px;
                left: 15px;
                font-size:16px;
                color:#ffffff;
                line-height:18px;
                height: 18px;
                z-index: 1;
            }
            .pro-bg {
                position: absolute;
                left: 0;
                bottom: 0;
                background: url("../../assets/imgs/pro-bg.png") repeat-x center;
                height: 123px;
                width: 100%;
            }
            &:hover {
                transform: translateY(-5px)
            }
        }

    }
    .history-search-container {
        .title-wrapper {
            background-color: #f5f5f5;
        }
    }
    .history-search-wrapper {
        background-color: #f5f5f5;
    }
</style>
