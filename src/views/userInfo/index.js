import TabBar from '@/components/TabBar/index.vue'
import LeftMenu from '@/components/LeftMenu/index.vue'
import { dateFtt } from '@/utils/common.js'
import $ from 'jquery'

export default {
    data() {
        return {
            username: '昵称',
            sex: '男',
            birthday: '1991年10月20号',
            address: '浙江杭州',
            currentDate: new Date(),
            columns: ['男', '女'],
            dateShow: false,
            sexShow: false,
            minDate:new Date("1920-01-01")
        }
    },
    created: function () {
        var $vue = this;
        $.ajax({
            type: "GET",
            url: "/Mobile/Api/Info",
            data: {},
            dataType: "json",
            async:false,
            success: function(rst){
                if(rst.status==0){
                    $vue.username = rst.data.U_NickName;
                    $vue.sex = rst.data.U_Gender==1?"男":rst.data.U_Gender==2?"女":"未设置";
                    $vue.birthday = dateFtt('yyyy年MM月dd日', new Date(rst.data.U_Birthday));
                    $vue.address = rst.data.U_Address;
                }
                else{
                    alert(rst.msg);
                }
            }
        });
    },
    components: {
        TabBar,
        LeftMenu
    },
    methods: {
        //日期选择：取消按钮点击事件
        handleDateCancel() {
            this.dateShow = false
        },
        //日期选择：确定按钮点击事件
        handleDateConfirm(val) {
            this.dateShow = false
            this.birthday = dateFtt('yyyy年MM月dd日', new Date(val))
        },
        //出生年月日点击事件
        handleBirthdayClick() {
            this.dateShow = true
        },
        //性别选择点击事件
        handleSexClick() {
            this.sexShow = true
        },
        //性别选择器change事件
        onChange(picker, value,index) {
            this.sexShow = false
            this.sex = value
        },
        //获取用户基本信息
        saveUserInfo(){
            var $vue = this;
            $.ajax({
                type: "POST",
                url: "/Mobile/Api/Info",
                data: {"nickname":$vue.username,"gender":$vue.sex,"birthday":$vue.birthday,"address":$vue.address},
                dataType: "json",
                async:false,
                success: function(rst){
                    if(rst.status==0){
                        $vue.$notify({message:'保存成功',background: '#07c160'});
                    }
                    else{
                        alert(rst.msg);
                    }
                }
            });
        }
    }
}