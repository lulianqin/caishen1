import TabBar from '@/components/TabBar/index.vue'
import { dateFtt } from '@/utils/common.js'
import $ from 'jquery'

export default {
    data() {
        return {
            minDate:new Date("1920-01-01"),
            currentDate:new Date(),
            ysFormData: {
                username: '',
                sex: '1',
                birthday: '',
                type: '1'
            },
            dateShow: false,
            yunshiResultShow: false
        }
    },
    created: function () {
        // var $vue = this;
        // $.ajax({
        //     type: "GET",
        //     url: "/Mobile/Api/YunDetail",
        //     data: {},
        //     dataType: "json",
        //     success: function(rst){
        //         if(rst.status==0){
        //             $vue.article = rst.data;
        //         }
        //         else{
        //             alert(rst.msg);
        //         }
        //     }
        // });
    },
    components: {
        TabBar
    },
    methods: {
        //生日选择框点击事件
        handleBirthdayClick() {
            this.dateShow = true
        },
        //生日：日期confirm事件
        handleDateConfirm(val) {
            this.ysFormData.birthday = dateFtt('yyyy-MM-dd hh:mm:ss', new Date(val))
            this.dateShow = false
        },
        //生日：日期cancel事件
        handleDateCancel() {
            this.dateShow = false
        }, 
        //运势弹出层：开始占卜按钮点击事件
        handleZhanbuClick() {
            var $vue = this;
            if($vue.ysFormData.username=="")
            {
                $vue.$toast.fail('请输入姓名');
                return;
            }
            if($vue.ysFormData.birthday=="")
            {
                $vue.$toast.fail('请选择生日');
                return;
            }
           //console.log("属："+$vue.getShengXiao($vue.ysFormData.birthday));
            $vue.$dialog.confirm({
                title: '',
                message: '测运势需支付1元，是否支付？'
              }).then(() => {
                $vue.payRequest("ys");
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
                      
                        $.ajax({
                            type: "GET",
                            url: "/Mobile/Api/YunDetail",
                            data: {"shengxiao":$vue.getShengXiao($vue.ysFormData.birthday)},
                            dataType: "json",
                            success: function(rst){
                                if(rst.status==0){
                                    $vue.article = rst.data;
                                    const timer = setTimeout(() => {
                                        $vue.$toast.clear();
                                        $vue.yunshiResultShow = true
                                    }, 1000);
                                }
                                else{
                                    alert(rst.msg);
                                }
                            }
                        });

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
        getShengXiao(mybirthday)
        {
            var arr = "鼠牛虎兔龙蛇马羊猴鸡狗猪".split(/(?!\b)/);
            var val = new Date(mybirthday).getFullYear();
            var gap = Math.abs(val - 1900);
            var ind = gap % 12;
            return arr[ind];
        }
    }   
}