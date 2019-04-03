<template>
    <div class="account caishen">
        <div class="user">
            <img :src="photo"/>
            <p class="ml10">昵称：{{username}}</p>
        </div>
        <div class="yuanbao">
            <p class="title">总元宝：</p>
            <p class="total">{{totalAmount}}</p>
            <div class="yuanbao-wrap">
                <div class="yuanbao-item">
                    <div class="subTitle">
                        <span>可用元宝</span>
                        <van-icon name="play"/>
                    </div>
                    <p>{{amount}}</p>
                </div>
                <div class="yuanbao-item">
                    <div class="subTitle">
                        <span>冻结元宝</span>
                        <van-icon name="play"/>
                    </div>
                    <p>{{lockAmount}}</p>
                </div>
                <div class="yuanbao-item">
                    <div class="subTitle">
                        <span>已提现元宝</span>
                        <van-icon name="play"/>
                    </div>
                    <p>{{txAmount}}</p>
                </div>
            </div>
            <div class="proportion">元宝与人民币比例为1:1</div>
        </div>
        <div class="btn-wrap">
            <van-button type="danger" @click="btnChongZhi">充值</van-button>
            <van-button type="info" class="fr" @click="btnTiXian">提现</van-button>
            <p class="notice">注意：充值提现金额为100的整数倍，冻结元宝不能提现。解冻规则请关注官方公告。</p>
        </div>
        <div class="list">
            <p>账单记录</p>
             <!--列表-->
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
                <div
                    v-for="(item, index) in list"
                    :key="index"
                    class="list-item">
                    <img src="../../assets/images/caifu-icon.png"/>
                    <div class="item-left">
                        <div>
                            <p>{{ item.Thing }} </p>
                            <p>{{ item.Time }}</p>
                        </div>
                        <p :class="item.Type==1?'num red':'num'">{{item.Type==1?'+':'-'}}{{ item.Amount==0?item.LockAmount:item.Amount }}</p>
                        <div>余额:{{ item.TotalAmount }} / 冻结:{{item.LockTotalAmount}}</div>
                    </div>
                </div>
            </van-list>
        </div>
        <!--底部菜单-->
        <!-- <tab-bar/> -->
        <left-menu/>
    </div>
</template>
<script>
    import myAccount from './index.js'
    export default myAccount;
</script>
<style lang="less" scoped>
    @import url('./index.less');
</style>
<style>
    .caishen .van-icon {
        font-size: 12px;
    }
    .nothing{
        padding: 50px;text-align: center;
    }
</style>



