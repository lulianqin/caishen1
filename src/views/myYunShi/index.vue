<template>
    <div class="yunshi caishen">
        <!--运势结果-->
        <div class="yunshi-result" v-if="yunshiResultShow">
            <div class="yunshi-wrap">
                <div class="title">{{article.Art_Title}}</div>
                <div class="content" v-html="article.Art_Content"></div>
            </div>
        </div>
        <!--底部菜单-->
        <!-- <tab-bar/> -->
        <left-menu/>
    </div>
</template>
<script>
    import myYunShi from './index.js'
    export default myYunShi
</script>
<style lang="less" scoped>
    @import url('./index.less');
</style>
<style>
    /*运势弹出层样式*/
    .yunshi .van-radio-group {
        display: flex;
    }
    .yunshi .van-radio__icon .van-icon {
        background: #fff;
    }
    .yunshi .radio-group .van-radio-group {
        flex-wrap: wrap;
    }
    .yunshi .van-radio {
        transform: scale(0.75);
    }
    .yunshi .radio-group .van-radio {
        width: 140px;
        font-size: 9px;
        /* transform: scale(0.75); */
    }
</style>
