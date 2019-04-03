import TabBar from '@/components/TabBar/index.vue'
import LeftMenu from '@/components/LeftMenu/index.vue'
import $ from 'jquery'

export default {
    data() {
        return {
           article:{}
        }
    },
    components: {
        TabBar,
        LeftMenu
    },
    created: function () {
        var $vue = this;
        $.ajax({
            type: "GET",
            url: "/Mobile/Api/MyArtDetail",
            data: {type:9},
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