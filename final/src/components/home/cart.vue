<template>
    <router-link to="cart" class="cart">
        <span class="pro-num">6</span>
        <i></i>
        超级自由行
    </router-link>
</template>
<script>
    export default {
        name: 'cart'
    }
</script>
<style lang="scss">
    @import "../../assets/scss/_var.scss";
    //@import "../../spritesmith-generated/_sprite.scss";

    .cart {
        &:hover {
          text-decoration: none;
          color: #fff;
        }
        position: fixed;
        z-index: 100;
        bottom: 20px;
        right: 0px;
        background: url("../../assets/imgs/sprite@2x/bg-cart.png");
        height: 46px;
        line-height: 46px;
        //@include sprite($bg-cart);
        //@include retina-sprite($bg-cart-group);
        width: 140px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        .pro-num {
            background: url("../../assets/imgs/sprite@2x/icon-cart-num.png");
            //@include retina-sprite($icon-cart-num-group);
            height: 26px;
            line-height: 26px;
            text-align: center;
            width: 26px;
            position: absolute;
            top: -13px;
            left: 0px;
        }
        i {
            background: url("../../assets/imgs/sprite@2x/icon-cart.png");
          //@include retina-sprite($icon-cart-group);
            height: 20px;
            width: 20px;
            @include inlineblock;
            vertical-align: middle;
            margin-top: -3px;
        }
        &:hover {
            background: url("../../assets/imgs/sprite@2x/bg-cart-hover.png");
          //@include retina-sprite($bg-cart-hover-group);
        }
    }
</style>
