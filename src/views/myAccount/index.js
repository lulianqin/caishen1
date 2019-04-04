import TabBar from '@/components/TabBar/index.vue'
import LeftMenu from '@/components/LeftMenu/index.vue'
import { dateFtt } from '@/utils/common.js'
import $ from 'jquery'

export default {
    data() {
        return {
            username: '迎财神',
            photo: '/img/pic_logo_m.png',
            totalAmount: 0,
            amount: 0,
            lockAmount: 0,
            txAmount: 0,
            list:[],
            pageIndex:1,
            loading: false,
            finished: false
        }
    },
    created: function () {
        var $vue = this;
        //获取用户基本信息
        $.ajax({
            type: "GET",
            url: "/Mobile/Api/Info",
            data: {},
            dataType: "json",
            async:false,
            success: function(rst){
                if(rst.status==0){
                    $vue.username = rst.data.U_NickName;
                    $vue.photo = rst.data.U_Thumbnail;
                    $vue.amount = rst.data.U_Amount;
                    $vue.lockAmount = rst.data.U_LockAmount;
                    $vue.totalAmount = rst.data.U_Amount+rst.data.U_LockAmount;
                    $vue.txAmount = rst.data.U_TiXianAmount;
                }
                else{
                    alert(rst.msg);
                }
            }
        });
        // //获取账单记录
        // $.ajax({
        //     type: "GET",
        //     url: "/Mobile/Api/AmountList",
        //     data: {page:1},
        //     dataType: "json",
        //     async:false,
        //     success: function(rst){
        //         if(rst.status==0){
        //             for (var i = 0; i < rst.data.length; i++) {
        //                 rst.data[i].Time = dateFtt("yyyy-MM-dd hh:mm:ss",new Date(Number(rst.data[i].Time.substr(6,13))));
        //             }
        //             $vue.list= rst.data;
        //         }
        //         else{
        //             alert(rst.msg);
        //         }
        //     }
        // });
    },
    components: {
        TabBar,
        LeftMenu
    },
    methods: {
        getUserInfo(){
        },
        btnTiXian(){
            location.href="/Mobile/Member/TiXianApply";
        },
        btnChongZhi(){
            location.href="/Mobile/Member/Recharge";
        },
        onLoad() {
            var $vue = this;
            // 异步更新数据
            setTimeout(() => {
                
                $.ajax({
                    type: "GET",
                    url: "/Mobile/Api/AmountList",
                    data: {"page":$vue.pageIndex},
                    dataType: "json",
                    async:false,
                    success: function(rst){
                        if(rst.status==0){
                            // this.article = rst.data;
                            $.each(rst.data,function(index,obj){
                                obj.Time= dateFtt("yyyy-MM-dd hh:mm:ss",new Date(Number(obj.Time.substr(6,13))));
                                $vue.list.push(obj);
                            });
                            if (rst.data.length < 20) {
                                $vue.finished = true;
                            }
                            else{
                                $vue.pageIndex++;
                            }
                        }
                        else{
                            alert(rst.msg);
                        }
                        $vue.loading = false;
                    }
                });
            }, 500);
          }
    }
}