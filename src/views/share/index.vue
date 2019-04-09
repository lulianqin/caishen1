<template>
    <div class="share caishen">
        <div class="content">
            <div class="title">一、邀请1人 可获2次奖励</div>
            <p>1.您邀请的好友首次开光，您将获得500提现额度。</p>
            <p>2.推荐好友消费，可获得直推70%，复推30%的奖励。</p>
            <div class="title">二、邀请方式</div>
            <p>直接点击下方“邀请好友”按钮，邀请多人可获多人奖励哦。</p>
        </div>
        <div class="share-btn" @click="btnShareClick"></div>
    </div>
</template>
<script>
    import share from './index.js'
    export default share
</script>
<style lang="less" scoped>
    @import url('./index.less');
</style>

