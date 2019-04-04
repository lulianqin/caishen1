<template>
    <div :class="'home caishen '+bgClass">
        <!--底部菜单-->
        <tab-bar v-on:change-bg="footBarClick" />
        <!--左侧菜单-->
        <left-menu/>
        <!--右侧按钮-->
        <div class="right-wrap">
            <div class="right-btn" @click="handleKaiguangClick">開光</div>
            <div class="right-btn mt10" @click="handleJingxiangClick">敬香</div>
            <div class="right-btn mt10" @click="handleGongpinClick">貢品</div>
            <div class="right-btn mt10" @click="handleYunshiClick">運勢</div>
            <div class="right-btn mt10" @click="handleChongqianClick">抽簽</div>
            <div class="right-btn mt10" @click="handleNiChengClick">昵称</div>
        </div>
        <!--拜一拜弹出层-->
        <van-popup v-model="bybShow" class="byb">
            <div class="byb-wrap">
                <van-icon name="cross" class="close-btn" @click="handleCloseClick('bybShow')"></van-icon>
                <img src="../../assets/images/baiyibai.png" class="img"/>
                <img src="../../assets/images/baiyibai-btn.png" class="btn mt15"/>
            </div>
        </van-popup>
        <!--抽签弹出层-->
        <van-popup v-model="chouqianShow" class="chouqian">
            <img src="../../assets/images/qiantong.png"/>
            <img src="../../assets/images/chouqian-btn.png" @click="handleChouqian" class="btn"/>
        </van-popup>
        <!--贡品弹出层-->
        <van-popup v-model="gongpinShow" class="gongpin">
            <div class="gongpin-wrap scroll-wrap">
                <van-icon name="cross" class="close-btn" @click="handleCloseClick('gongpinShow')"></van-icon>
                <div class="img-group">
                    <img src="../../assets/images/gongpin.png"/>
                    <img src="../../assets/images/gongpin.png" class="ml35"/>
                </div>
                <div class="content">
                    <p class="title">贡品</p>
                    <p class="text">每人限奉请一套，开光正品，改变新一年的运气，从此刻开始!</p>
                    <p class="money">500.00元</p>
                </div>
                <div class="scroll-btn" @click="wxpay('gp')">微信支付</div>
            </div>
        </van-popup>
        <!--敬香弹出层-->
        <van-popup v-model="jingxiangShow" class="jingxiang">
            <div class="jingxiang-wrap scroll-wrap">
                <van-icon name="cross" class="close-btn" @click="handleCloseClick('jingxiangShow')"></van-icon>
                <div class="img-group">
                    <img src="../../assets/images/xianglu.png" class="xianglu"/>
                </div>
                <div class="content">
                    <p class="title">敬香</p>
                    <p class="text">每人限奉请一套，开光正品，改变新一年的运气，从此刻开始!</p>
                    <p class="money">1.00元</p>
                </div>
                <div class="scroll-btn"  @click="wxpay('jx')">微信支付</div>
            </div>
        </van-popup>
        <!--开光-->
        <van-popup v-model="kaiguangShow" class="kaiguang">
            <div class="kaiguang-wrap scroll-wrap">
                <van-icon name="cross" class="close-btn" @click="handleCloseClick('kaiguangShow')"></van-icon>
                <div class="content">
                    <p class="title">开光</p>
                    <p class="text">每人限奉请一套,开光正品,改变新一年的运气，从此刻开始!</p>
                    <p class="money">599.00元</p>
                </div>

                <div v-if="kgSuccessShow" class="scroll-btn">已开光</div>
                <div v-else class="scroll-btn" @click="wxpay('kg')">微信支付</div>
            </div>
        </van-popup>
        <!-- <div class="kaiguang" v-if="kaiguangShow">
            <div class="kaiguang-wrap">
                <div class="content">
                    <p class="title">开光</p>
                    <p class="text">每人限奉请一套,开光正品,改变新一年的运气，从此刻开始!</p>
                    <p class="money">1680.00元</p>
                </div>
                <div class="scroll-btn" @click="handleWechatPay">微信支付</div>
            </div>
        </div> -->
        <!--开光成功-->
        <transition name="bounce">
            <div class="kgSuccess" v-if="kgSuccessShow">
                <!-- <img src="../../assets/images/yuanbao.png"/> -->
            </div>
        </transition>
        <!--掉金元宝-->
        <div id="yuanbao"></div>
        <!--贡品香炉-->
        <div id="gongpin_line">
            <img src="/img/gongpin.png" class="gongpin_i" v-if="show_gongpin_i"/>
            <img src="/img/xianglu.png" class="xianglu_i" v-if="show_xianglu_i" style="width:100px;"/>
            <img src="/img/gongpin.png" class="gongpin_i" v-if="show_gongpin_i"/>
        </div>
    </div>
</template>
<script>
    import home from './index.js';
    export default home;
</script>

<style lang="less" scoped>
    @import url('./index.less');
</style>

<style>
    #gongpin_line {
        width: 100%;
        position: fixed;
        bottom: 110px;
        text-align: center;
        left:0;
    }
    #gongpin_line .gongpin_i{
        margin: 0 10px;
    }
    #yuanbao {
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 9999;
        display: none;
    }
    #yuanbao>div{
        position: relative;
        height: 100%;
        width:100%;
        z-index: 1;
    }
    #yuanbao img
    {
        position:absolute;
        /* animation:mymove 3s infinite;
        -webkit-animation:mymove 3s infinite; */
        height: auto;
    }
    @keyframes mymove
    {
        from {top:-200px;}
        to {top:1500px;}
    }

    @-webkit-keyframes mymove /*Safari and Chrome*/
    {
        from {top:-200px;}
        to {top:1500px;}
    }
    .home .left-common .left-wrap .text{
        display: block !important;
    }
    .caishen .van-popup.member-center {
        left: 0;
        transform: translate3d(0, -50%, 0);
    }
    .caishen .van-popup {
        background: none;
        overflow: hidden;
    }
    .caishen .van-icon {
        font-size: 25px;
    }
    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }
    .mt10{margin-top:10px;}
</style>


