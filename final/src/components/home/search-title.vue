<template>
    <div class="search-wrapper">
        <div class="banner-title"></div>
    </div>
</template>
<script>
    export default{
        name: 'search-title',
    }
</script>
<style lang="scss">
    @import "../../assets/scss/_var.scss";
    body {
        min-width: 1200px;
        font-family: "Microsoft YaHei";
        #sideInve {
            bottom: 160px;
        }
        #goTopBtn {
            bottom: 120px;
        }
        #Feedback {
            bottom: 80px;
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
            background: url("../../assets/imgs/sprite@2x/banner-title.png");
            width: 209px;
            height: 49px;
        }
        background: url("../../assets/imgs/banner.jpg") no-repeat center;
    }
</style>
