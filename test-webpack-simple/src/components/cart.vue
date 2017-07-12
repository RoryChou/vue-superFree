<template>
    <div class="cart">
        <span class="pro-num">6</span>
        <i></i>
        超级自由行
      </div>
</template>
<script>
    export default {
        name: 'cart'
    }
</script>
<style lang="scss">
    @import "../assets/scss/_var.scss";
    .cart {
        position: fixed;
        z-index: 100;
        bottom: 20px;
        right: 0px;
        background: url("../assets/imgs/bg-cart.png");
        height: 46px;
        line-height: 46px;
        width: 140px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        .pro-num {
            background: url("../assets/imgs/icon-cart-num.png");
            height: 26px;
            line-height: 26px;
            text-align: center;
            width: 26px;
            position: absolute;
            top: -13px;
            left: 0px;
        }
        i {
            background: url("../assets/imgs/icon-cart.png");
            height: 20px;
            width: 20px;
            @include inlineblock;
            vertical-align: middle;
            margin-top: -3px;
        }
        &:hover {
            background: url("../assets/imgs/bg-cart-hover.png");
        }
    }
</style>