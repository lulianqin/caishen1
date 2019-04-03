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
        var $vue = this;
        $.ajax({
            type: "GET",
            url: "/Mobile/Api/YunDetail",
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

            $vue.$dialog.confirm({
                title: '',
                message: '测运势需支付1元，是否支付？'
              }).then(() => {
                    $.ajax({
                        type: "GET",
                        url: "/Mobile/Api/PayThing",
                        data: {"thing":"ys"},
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
                                        $vue.yunshiResultShow = true
                                  }, 2000);

                            }
                            else{
                                alert(rst.msg);
                            }
                        }
                    });
              }).catch(() => {
                $vue.$notify('操作已取消');
              });

            
        },
    }   
}