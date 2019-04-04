import TabBar from '@/components/TabBar/index.vue'
import LeftMenu from '@/components/LeftMenu/index.vue'
import $ from 'jquery'

export default {
    data() {
        return {
            result: false,
            nickname:"迎财神",
            photo: '/img/pic_logo_m.png',
            article:{}
        }
    },
    components: {
        TabBar,
        LeftMenu
    },
    methods:{

         //运势弹出层：开始占卜按钮点击事件
         handleNickClick() {
            var $vue = this;

            $vue.$dialog.confirm({
                title: '',
                message: '测运势需支付1元，是否支付？'
              }).then(() => {
                $vue.payRequest("nc");
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
                data: {"thing":thing},
                dataType: "json",
                async:false,
                success: function(rst){
                    if(rst.status==0){
                       
                        const myToast = $vue.$toast.loading({
                            duration: 0, // 持续展示 toast
                            forbidClick: true, // 禁用背景点击
                            loadingType: 'spinner',
                            message: '测算中...'
                          });
                          const timer = setTimeout(() => {
                                $vue.$toast.clear();
                                $vue.result = true
                          }, 2000);
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
        }
    },
    created: function () {
        var $vue = this;

        if(localStorage && localStorage.getItem("nickname") && localStorage.getItem("photo"))
        {
            $vue.nickname =localStorage.getItem("nickname") ;    
            $vue.photo = localStorage.getItem("photo");    
        }
        else{
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
                        $vue.nickname =rst.data.U_NickName;
                        $vue.photo = rst.data.U_Thumbnail;
                    }
                    else{
                        if(rst)
                        alert(rst.msg);
                    }
                }
            });
        }

        var $vue = this;
        $.ajax({
            type: "GET",
            url: "/Mobile/Api/NicknameDetail",
            data: {},
            dataType: "json",
            success: function(rst){
                if(rst.status==0){
                    $vue.article = rst.data;
                }
                else{
                    alert(rst.msg);
                }
            }
        });
    }
}