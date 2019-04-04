<template>
    <div class="wechatTest caishen">
        <!--底部菜单-->
        <!-- <tab-bar/> -->
        <left-menu/>
        <!--微信号测试-->
        <div class="content" v-if="!result"> 
            <div class="portrait">
                <img :src="photo"/>
            </div>
            <p class="title">{{nickname}}</p>
            <p class="cont">您的网名蕴含着秘密哦！赶紧进来探询您网名的吉凶玄机与秘密吧？ 网名测吉凶的测算方法来自网络，仅供娱乐，请勿当真！</p>
            <div class="btn" @click="handleNickClick">微信昵称财富查询</div>
        </div>
        <!--测试结果-->
        <div class="result" v-if="result">
            <p class="title">{{article.Art_Title}}</p>
            <div class="cont">
                <p>您测算的昵称：{{nickname}}</p>
                <div class="explain">
                    <div v-html="article.Art_Content"></div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import weChatTest from './index.js'
    export default weChatTest
</script>
<style lang="less" scoped>
    @import url('./index.less');
</style>

