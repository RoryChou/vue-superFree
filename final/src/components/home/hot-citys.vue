<template>
    <div class="hot-citys-container">
        <div class="hot-citys-title">
            <div class="title-wrapper">
                <span class="title-main">热门目的地旅游宝典</span>
                <span class="title-en">POPULAR DESTINATION TRAVEL BIBLE</span>
            </div>
        </div>
        <ul class="hot-citys clearfix">
            <li class="hot-pros">
                <a href="#">
                    <div class="pro-info">
                        <p class="pro-name">三亚</p>
                        <p class="pro-icon"></p>
                        <ul class="pro-tips clearfix">
                            <li>标题名称</li>
                            <li>美食</li>
                            <li>观光</li>
                        </ul>
                    </div>
                    <img src="../../assets/imgs/sanya.jpg" srcset="../../assets/imgs/sanya@2x.jpg 2x" alt="">
                </a>
            </li>
            <li class="hot-pros">
                <a href="#">
                    <div class="pro-info">
                        <p class="pro-name">厦门</p>
                        <p class="pro-icon"></p>
                        <ul class="pro-tips clearfix">
                            <li>标题名称</li>
                            <li>美食</li>
                            <li>观光</li>
                        </ul>
                    </div>
                    <img src="../../assets/imgs/xiamen.jpg" srcset="../../assets/imgs/xiamen@2x.jpg 2x" alt="">
                </a>
            </li>
            <li class="hot-pros">
                <a href="#">
                    <div class="pro-info">
                        <p class="pro-name">长隆</p>
                        <p class="pro-icon"></p>
                        <ul class="pro-tips clearfix">
                            <li>标题名称</li>
                            <li>美食</li>
                            <li>观光</li>
                        </ul>
                    </div>
                    <img src="../../assets/imgs/changlong.jpg" srcset="../../assets/imgs/changlong@2x.jpg 2x" alt="">
                </a>
            </li>
            <li class="hot-pros">
                <a href="#">
                    <div class="pro-info">
                        <p class="pro-name">西安</p>
                        <p class="pro-icon"></p>
                        <ul class="pro-tips clearfix">
                            <li>标题名称</li>
                            <li>美食</li>
                            <li>观光</li>
                        </ul>
                    </div>
                    <img src="../../assets/imgs/xian.jpg" srcset="../../assets/imgs/xian@2x.jpg 2x" alt="">
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'hot-citys'
    }
</script>
<style lang="scss">
    @import "../../assets/scss/_var.scss";
    .hot-citys-container{
        width: 1200px;
        position: relative;
        height: 563px;
        padding-bottom: 60px;
        left: 50%;
        margin-left: -600px;
    }
    .hot-citys-title {
        position: relative;
        left: 50%;
        margin-left: -(583px/2);
        width: 583px;
        height: 74px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 68px;
        .title-wrapper {
            position: absolute;
            width: 361px;
            top: 53px;
            left: 50%;
            margin-left: -180px;
            background-color: #fff;
            .title-main {
                font-size: 30px;
                display: block;
                height: 40px;
                line-height: 40px;
                text-align: center;
            }
            .title-en {
                font-family:Arial;
                display: block;
                font-size: 14px;
                color: #999;
                text-align: center;
                height: 16px;
                line-height: 16px;
            }
        }
    }
    .hot-citys {
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
    }
    .history-search-container {
        .title-wrapper {
            background-color: #f5f5f5;
        }
    }
</style>
