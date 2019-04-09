import { getCookie,setCookie,isWeiXin,GetQueryString } from '@/utils/common.js'
import $ from 'jquery'

export default {
    data() {
        return {

        }
    },
    created: function () {
        var openid = getCookie("openid");
        var $vue = this;
        var u= GetQueryString("u");
        if(u!=null && u !="undefined" && u!="")
        {
            localStorage.setItem("u",u);
            setCookie("u",u,7);
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
        else if(isWeiXin()==true){
            if(u!=null && u !="undefined" && u!="")
            {
                location.href="/Mobile/WeiXin/GotoOauth?state=&u="+u;
            }
            else{
                location.href="/Mobile/WeiXin/GotoOauth";
            }
        }
    },
    methods:{
        btnShareClick:function(){
            location.href="/Mobile/Member/InfoReferrer";
        }
    }
}