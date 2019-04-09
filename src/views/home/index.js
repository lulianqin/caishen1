import TabBar from '@/components/TabBar/index.vue'
import LeftMenu from '@/components/LeftMenu/index.vue'
import { getCookie,isWeiXin,GetQueryString,setCookie } from '@/utils/common.js'
import $ from 'jquery'

const fanli = require('@/assets/images/fanli.png'),
      fanli2 = require('@/assets/images/fanli2.png'),
      guanyu = require('@/assets/images/guanyu.png'),
      guanyu2 = require('@/assets/images/guanyu2.png'),
      zhaominggong = require('@/assets/images/zhaominggong.png'),
      zhaominggong2 = require('@/assets/images/zhaominggong2.png'),
      bigan = require('@/assets/images/bigan.png'),
      bigan2 = require('@/assets/images/bigan2.png'),
      liguizu = require('@/assets/images/liguizu.png'),
      liguizu2 = require('@/assets/images/liguizu2.png')

export default {
    components: {
        TabBar,
        LeftMenu
    } ,
    data() {
        return {
            bgClass: 'caishen3',
            active: 2,
            icon: [{
                normal: fanli,
                active: fanli2
            }, {
                normal: guanyu,
                active: guanyu2
            }, {
                normal: zhaominggong,
                active: zhaominggong2
            }, {
                normal: bigan,
                active: bigan2
            }, {
                normal: liguizu,
                active: liguizu2
            }],
            memberShow: false,   //会员中心是否展示
            bybShow: false,    //拜一拜是否展示
            chouqianShow: false,   //抽签弹出层是否显示
            cqResultShow: false,   //抽签结果弹出层是否显示
            gongpinShow: false,    //贡品弹出层是否显示
            jingxiangShow: false,   //敬香弹出层是否显示
            kaiguangShow: false,   //开光弹框是否显示
            kgSuccessShow: false,   //开光成功弹框是否显示
            csIndex1:[0,3,1,2,4,5],//hash对应财神背景序号
            csIndex2:[0,2,3,1,4,5],//底部菜单对hash财神序号
            show_xianglu_i : false,
            show_gongpin_i : false
        }
    },
    created: function () {
        var openid = getCookie("openid");
        var username = getCookie("username");
        var $vue = this;
        var hashVal = window.location.hash;
        var u= GetQueryString("u");

        if(u!=null && u !="undefined" && u!="")
        {
            localStorage.setItem("u",u);
            setCookie("u",u,7);
        }
        //财神背景
        if(hashVal.indexOf("#n")>-1)
        {
           this.bgClass="caishen" + this.csIndex1[parseInt(hashVal.replace("#n",""))];
        }
        if(openid==null || openid =="undefined" || openid=="")
        {
            openid = GetQueryString("openid");
        }
        if(openid!=null && openid !="undefined" && openid!="")
        {
            window.openid = openid;
            localStorage.setItem("openid",openid);
        }
        // else if(localStorage && localStorage.getItem("openid"))
        // {
        //     window.openid = localStorage.getItem("openid");
        // }
        else //if(isWeiXin()==true){
        {
            if(u!=null && u !="undefined" && u!="")
            {
                location.href="/Mobile/WeiXin/GotoOauth?state=&u="+u;
            }
            else{
                location.href="/Mobile/WeiXin/GotoOauth";
            }
            return;
        }
        // else if(!username || username==""){
        //     //location.href="/Mobile/Login";
        // }

        //获取用户基本信息
        $.ajax({
            type: "GET",
            url: "/Mobile/Api/Info",
            data: {},
            dataType: "json",
            async:false,
            success: function(rst){
                if(rst.status==0){
                    if(localStorage)
                    {
                        localStorage.setItem("nickname",rst.data.U_NickName);                
                        localStorage.setItem("photo",rst.data.U_Thumbnail);                
                    }
                    if(rst.data.U_Is_Check==1)
                    {
                        $vue.kgSuccessShow=true;            
                    }
                }
                else{
                    if(rst)
                    alert(rst.msg);
                }
            }
        });
        //敬香贡品是否显示
        if(localStorage && localStorage.getItem("jx") && localStorage.getItem("jx_time"))
        {
            var jx_time =Number( localStorage.getItem("jx_time"));
            var today_time = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).getTime();
            if(jx_time < today_time)//前一天
            {
                $vue.show_xianglu_i =false;
            }
            else
            {
                $vue.show_xianglu_i =true;
            }
        }
        else{
            $vue.show_xianglu_i =false;
        }
        if(localStorage && localStorage.getItem("gp") && localStorage.getItem("gp_time"))
        {
            var jx_time =Number( localStorage.getItem("gp_time"));
            var today_time = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()).getTime();
            if(jx_time < today_time)//前一天
            {
                $vue.show_gongpin_i =false;
            }
            else
            {
                $vue.show_gongpin_i =true;
            }
        }
        else{
            $vue.show_gongpin_i =false;
        }
    },
    methods: {
        //左侧展开按钮点击事件，展开会员中心
        handleArrowClick() {
            this.memberShow = true
        },
        //会员中心收起按钮，隐藏会员中心
        handleRightArrowClick() {
            this.memberShow = false
        },
        //会员中心：常用地址按钮点击事件
        checkAddress() {
            this.$router.push('/address')
        },
        //会员中心：我的账户按钮点击事件
        checkMyAccount() {
            this.$router.push('/myAccount')
        },
        //会员中心：个人信息按钮点击事件
        checkUserInfo() {
            this.$router.push('/userInfo')
        },
        //敬香按钮点击事件
        handleJingxiangClick() {
            this.jingxiangShow = true
        },
        //关闭按钮点击事件
        handleCloseClick(name) {
            this[name] = false
        },
        //抽签按钮点击事件
        handleChongqianClick() {
            this.chouqianShow = true
        },
        //昵称凶吉点击事件
        handleNiChengClick() {
            this.$router.push('/weChatTest')
        },
        //抽签弹出层: 点击抽签按钮点击事件
        handleChouqian() {
            var $vue = this;
            $vue.$dialog.confirm({
                title: '',
                message: '抽签需支付1元，是否支付？'
              }).then(() => {
                    // $.ajax({
                    //     type: "GET",
                    //     url: "/Mobile/Api/PayThing",
                    //     data: {"thing":"cq"},
                    //     dataType: "json",
                    //     async:false,
                    //     success: function(rst){
                    //         if(rst.status==0){
                    //             $vue.$notify({message:'支付成功',background: '#07c160'});
                    //             $vue.chouqianShow = false
                    //             $vue.$router.push('/chouqianResult')
                    //         }
                    //         else{
                    //             alert(rst.msg);
                    //         }
                    //     }
                    // });
                    $vue.payRequest("cq");
              }).catch(() => {
                $vue.$notify('操作已取消');
              });
        },
        //贡品按钮点击事件
        handleGongpinClick() {
            this.gongpinShow = true
        },
        //运势按钮点击事件
        handleYunshiClick() {
            this.$router.push('/yunshi')
        },
        //会员中心：平台公告点击事件
        checkNotice() {
            this.$router.push('/notice')
        },
        //会员中心: 分享有礼点击事件
        checkShare() {
            this.$router.push('/share')
        },
        //右侧开光按钮点击事件
        handleKaiguangClick() {
            this.kaiguangShow = true
        },
        //开光：微信支付按钮点击事件
        handleWechatPay() {
            this.kaiguangShow = false
            this.kgSuccessShow = true
        },
        //微信
        wxpay(thing){
            var $vue = this;
            if(localStorage)
            {
                localStorage.setItem("thing",thing);
            }
            $vue.$dialog.confirm({
                title: '',
                message: '确认使用余额支付？'
              }).then(() => {
                $vue.payRequest(thing);
              }).catch(() => {
                $vue.$notify('操作已取消');
              });
        },
        payRequest(thing)
        {
            var $vue = this;
            $.ajax({
                type: "GET",
                url: "/Mobile/Api/PayThing",
                data: {thing:thing},
                dataType: "json",
                async:false,
                success: function(rst){
                    if(rst.status==0){
                        //this.article = rst.data;
                        if(thing=="kg")
                        {
                            $vue.kaiguangShow = false;
                            $vue.kgSuccessShow = true;
                            $vue.$notify({message:'开光成功',background: '#07c160'});
                        }
                        else if(thing=="jx"){
                            $vue.$notify({message:'支付成功',background: '#07c160'});
                            $vue.show_xianglu_i = true;
                            $vue.handleShowYuanBao();

                            if(localStorage)
                            {
                                localStorage.setItem("jx","1");
                                localStorage.setItem("jx_time",new Date().getTime());
                            }
                        }
                        else if(thing=="gp"){
                            $vue.$notify({message:'支付成功',background: '#07c160'});
                            $vue.show_gongpin_i = true;
                            $vue.gongpinShow = false;
                            
                            if(localStorage)
                            {
                                localStorage.setItem("gp","1");
                                localStorage.setItem("gp_time",new Date().getTime());
                            }
                        }
                        else if(thing=="cq"){
                            $vue.$notify({message:'支付成功',background: '#07c160'});
                            $vue.chouqianShow = false
                            $vue.$router.push('/chouqianResult')
                        }
                    }
                    else if(rst.status==-2)//余额不足
                    {
                        //微信在线支付
                        callpay(rst.amount,function(){
                            $vue.payRequest(thing);
                        });
                    }
                    else{
                        alert(rst.msg);
                    }
                }
            });
        },
        footBarClick(val)
        {
            //var hashVal="";
            val++;
            this.bgClass = 'caishen' + val;
            //hashVal="#n"+this.csIndex2[val];
            //window.location.hash = hashVal;
        },
        //显示元宝效果
        handleShowYuanBao(){
            var $yuanbao = $("#yuanbao");
            var i;
            var lines = [],
                    yb_maxSpeed = 5,
                    yb_spacing = 40,
                    yb_xSpacing = 0,
                    yb_n = $(window).width() / yb_spacing,
                    yb_srcs = ["/img/yb_01.png", "/img/yb_02.png", "/img/yb_03.png","/img/yb_01.png", "/img/yb_02.png", "/img/yb_03.png"],
                    yb_i;

            this.jingxiangShow = false;
            $yuanbao.show();
            for (yb_i = 0; yb_i < yb_n; yb_i++){
                yb_xSpacing += yb_spacing;
                lines.push({
                    x: yb_xSpacing,
                    y: -Math.round(Math.random()*300),
                    rotate: Math.round(Math.random()*180),
                    width: 40+ Math.round(Math.random()*40),
                    speed: Math.random()*yb_maxSpeed + 5,
                    src: yb_srcs[Math.floor(Math.random() * yb_srcs.length)]
                });
            }
            for (i = 0; i < yb_n; i++){
                var $img = $("<img src='"+lines[i].src+"'/>");
                $img.css({
                    'transform':'rotate('+lines[i].rotate+'deg)',
                    'animation':'mymove '+lines[i].speed+'s infinite',
                    'top':lines[i].y+'px',
                    'left':lines[i].x+'px',
                    'width':lines[i].width+'px',
                });
                $img.appendTo("#yuanbao");
            }
            setTimeout(function(){
                $yuanbao.fadeOut(2000);
                $yuanbao.html("");
            },10000);
        }
    },
    watch: {
        active: {
            handler(val) {
                val++
                this.bgClass = 'caishen' + val
            }
        }
    }
}