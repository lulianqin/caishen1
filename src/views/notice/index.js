import LeftMenu from '@/components/LeftMenu/index.vue'
import { dateFtt } from '@/utils/common.js'
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
    data() {
        return {
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
            list: [
            //     {
            //     id: 1,
            //     title: '平台于2018年10月2号上线测试',
            //     content: '本平台于2018年10月2号上线测试，尽情期待，赢取好礼！',
            //     date: '2018-03-09'
            // }
        ],
            pageIndex:1,
            loading: false,
            finished: false
        }
    },
    components: {
        LeftMenu
    } ,
    methods: {
        onLoad() {
            var $vue = this;
            // 异步更新数据
            setTimeout(() => {
                
                $.ajax({
                    type: "GET",
                    url: "/Mobile/Api/AritcleList",
                    data: {"page":$vue.pageIndex},
                    dataType: "json",
                    async:false,
                    success: function(rst){
                        if(rst.status==0){
                            // this.article = rst.data;
                            $.each(rst.data,function(index,obj){
                                $vue.list.push({
                                    id: obj.ID,
                                    title: obj.Art_Title,
                                    content: obj.Art_Description,
                                    date: dateFtt("yyyy-MM-dd hh:mm:ss",new Date(Number(obj.Art_CreateTime.substr(6,13))))
                                });
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


                // for (let i = 0; i < 10; i++) {
                //     this.list.push({
                //         id: 1,
                //         title: '平台于2018年10月2号上线测试',
                //         content: '本平台于2018年10月2号上线测试，尽情期待，赢取好礼！',
                //         date: '2018-03-09'
                //     });
                // }
                // // 加载状态结束
                // this.loading = false;
        
                // // 数据全部加载完成
                // if (this.list.length >= 40) {
                //     this.finished = true;
                // }



            }, 500);
          }
    }
}