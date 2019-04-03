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
        if(u && u!="")
        {
            localStorage.setItem("u",u);
            setCookie("u",u,7);
        }
        if(openid)
        {
            window.openid = openid;
            localStorage.setItem("openid",openid);
        }
        else if(localStorage && localStorage.getItem("openid"))
        {
            window.openid = localStorage.getItem("openid");
        }
        else if(isWeiXin()==true){
            location.href="/Mobile/WeiXin/GotoOauth?state=/";
        }
    }
}