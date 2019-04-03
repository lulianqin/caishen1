<template>
    <div class="address caishen">
        <div class="header">
            <div class="left-wrap">
                <img :src="photo"/>
                <span class="ml10">昵称：{{username}}</span>
            </div>
            <!-- <a>管理</a> -->
        </div>
        <div class="list">
            <div
                v-for="(item, index) in list"
                :key="index"
                class="list-item">
                 <div>
                    <span class="name">{{ item.UserName }}</span>
                    <span class="phone">{{ item.Mobile }}</span>
                </div>
                <div class="full-address">{{ item.Address }}</div>
                <van-tag plain type="primary" class="tag">{{ item.Is_Default==1?"默认地址":"" }}</van-tag>
            </div>
        </div>
        <van-button type="info" class="addBtn" @click="btnNewAddress">新增地址</van-button>
        <!--底部菜单-->
        <!-- <tab-bar/> -->
        <!--左侧菜单-->
        <left-menu/>
    </div>
</template>
<script>
    import address from './index.js'
    export default address
</script>
<style lang="less" scoped>
    @import url('./index.less');
</style>


