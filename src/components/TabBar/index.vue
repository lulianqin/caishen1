<template>
     <!--底部菜单-->
    <van-tabbar v-model="active">
        <van-tabbar-item>
            <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon[0].active : icon[0].normal"
                v-on:click="$emit('change-bg', 0)"/>
        </van-tabbar-item>
        <van-tabbar-item>
            <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon[1].active : icon[1].normal"
                v-on:click="$emit('change-bg', 1)"/>
        </van-tabbar-item>
        <van-tabbar-item>
            <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon[2].active : icon[2].normal"
                v-on:click="$emit('change-bg', 2)"/>
        </van-tabbar-item>
        <van-tabbar-item>
            <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon[3].active : icon[3].normal"
                v-on:click="$emit('change-bg', 3)"/>
        </van-tabbar-item>
        <van-tabbar-item>
            <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? icon[4].active : icon[4].normal"
                v-on:click="$emit('change-bg', 4)"/>
        </van-tabbar-item>
    </van-tabbar>   
</template>
<script>
    import TabBar from './index.js'
    export default TabBar
</script>
<style>
    .van-tabbar {
        border-bottom: 2px solid #d4af6d;
        border-top: 2px solid #d4af6d;
    }
    .van-tabbar-item:first-child {
        border-left: 2px solid #d4af6d;
    }
    .van-tabbar-item:last-child {
        border-right: 2px solid #d4af6d;
    }
    .van-hairline--top-bottom::after {
        border-width: 0;
    }
</style>


