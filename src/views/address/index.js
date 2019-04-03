import TabBar from '@/components/TabBar/index.vue'
import LeftMenu from '@/components/LeftMenu/index.vue'
import $ from 'jquery'

export default {
    data() {
        return {
            list:[],
            username: '迎财神',
            photo: '/img/pic_logo_m.png'
        }
    },
    components: {
        TabBar,
        LeftMenu
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
                }
                else{
                    alert(rst.msg);
                }
            }
        });

        $.ajax({
            type: "GET",
            url: "/Mobile/Api/Address",
            data: {},
            dataType: "json",
            async:false,
            success: function(rst){
                if(rst.status==0){
                    $vue.list = rst.data;
                }
                else{
                    alert(rst.msg);
                }
            }
        });
    },
    methods: {
        btnNewAddress(){
            location.href="/Mobile/Member/AddressAdd";
        }
    }
    
}