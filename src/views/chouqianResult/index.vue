<template>
    <div class="chouqianResult caishen">
        <div class="fa">
            <img src="../../assets/images/chouqian-bg1.png"/>
        </div>
        <div class="cqResult-wrap">
            <p class="title">{{article.Art_Title}}</p>
            <p class="subTitle">{{article.Art_ShortTitle}}</p>
            <div class="content">
              <div v-html="article.Art_Content"></div>
            </div>
            <div class="btn">{{article.Art_Description}}</div>
        </div>
        <!--底部菜单-->
        <!-- <tab-bar/> -->
        <left-menu/>
    </div>
</template>
<script>
    import chouqianResult from './index.js'
    export default chouqianResult 
</script>
<style lang="less" scoped>
    @import url('./index.less');
</style>

