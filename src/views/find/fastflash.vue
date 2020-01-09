<template>
<!-- 快讯界面 -->
    <div style="margin-bottom: 50px">
        <div class="header">
             <router-link to="/find" tag="div">
                <div class="headline">头条</div>
             </router-link>
            <div class="newflash">快讯</div>
        </div>
        <div class="fastflash">
            <ul>
                <li  v-for="item in fast" :key="item.index" @click="inputdetails">
                    <div class="fastflashtop">
                        <div><img src="@/assets/find/touxiang@2x.png" alt=""></div>
                        <h4 class="issue">钱包社区</h4>
                        <p>{{ item.time }}</p>
                    </div>
                    <h2>{{ item.title }}</h2>
                    <div class="fastflashcenter">
                        <p>{{ item.section }}</p>
                    </div>
                    <div class="fastflashbotton">
                        <div v-if="item.zan === 0" class="beforezan">
                            <!-- 没有点赞 -->
                            <p>{{ item.number }}</p>
                            <div>
                                <img src="@/assets/find/dianzan-1@2x.png" alt="">
                            </div>
                        </div>
                        <div v-else-if="item.zan === 1" class="afterzan">
                            <!-- 点赞后 -->
                            <p>{{ item.number }}</p>
                            <div>
                                <img src="@/assets/find/dianzan-2@2x.png" alt="">
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            fast:[
                {
                    id : 1,
                    time : '10-18 10:30',
                    title : '01年许志安拿金曲奖最受欢迎男歌手，上台领奖时说到厨房宣言：有一个人我要多谢',
                    zan : 1,
                    section : '在不经意的时间，经历了我从没想到的遇见，总感觉像久别重逢的故人，但一见如故更准确。不知道他是怎么想的，他推荐给我的这首歌，第一次听的时候，完全想不到会这么喜欢。现在是我每天的单曲循环。',
                    number : '30'
                },
                {
                    id : 2,
                    time : '10-19 20:40',
                    title : '01年许志安拿金曲奖最受欢迎男歌手，上台领奖时说到厨房宣言：有一个人我要多谢',
                    zan : 0,
                    section : '在不经意的时间，经历了我从没想到的遇见，总感觉像久别重逢的故人，但一见如故更准确。不知道他是怎么想的，他推荐给我的这首歌，第一次听的时候，完全想不到会这么喜欢。现在是我每天的单曲循环。',
                    number : '22'
                }
            ]
        }
    },
    methods: {
        inputdetails(){
            this.$router.push({name: 'flashdetails' ,query:{id:'item.id'}})
        },
    }
}
</script>
<style lang="scss" scoped>
 .header{
        width:750px;
        height:88px;
        background:rgba(32,38,52,1);
        display: flex;
        padding: 16px 40px;
        div{
            width:66px;
            height:44px;
            font-size:32px;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(255,255,255,1);
            line-height:44px;
        }
        .newflash{
            margin-left:20px; 
            width:82px;
            height:56px;
            font-size:40px;
            color:rgba(255,221,92,1);
        }
    }
    .fastflash{
        ul{
            li{
            padding: 40px 30px; 
            background:rgba(32,38,52,1);
            margin-top: 8px;
                .fastflashtop{
                    display: flex;
                    height: 40px;
                    line-height:40px;
                    font-size:24px;
                    font-family:PingFangSC-Medium,PingFang SC;
                    div{
                        height: 40px;
                        width: 40px;
                        margin-right: 16px;
                        border-radius: 50%;
                        overflow: hidden;
                        img{
                            height: 100%;
                            width: 100%;
                        }
                    }
                    h4{
                        color:rgba(255,221,92,1);

                    }
                    p{
                        color:rgba(170,170,170,1);
                        margin-left: 16px;
                    }
                }
                h2{
                    font-size:32px;
                    font-family:PingFangSC-Medium,PingFang SC;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                    line-height:48px;
                    padding: 22px 0;
                }
                .fastflashcenter{
                    p{
                        font-size:24px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(151,151,151,1);
                        line-height:42px;
                       
                    }
                }
                .fastflashbotton{
                    height: 32px;
                    margin-right: 40px;
                    .beforezan{
                        display: flex;
                        flex-direction: row-reverse;
                        p{
                        color:rgba(170,170,170,1);
                         font-size:24px;
                        font-family:PingFangSC-Medium,PingFang SC;
                        font-weight:500;
                        line-height:34px;
                        }
                        div{
                            width: 32px;
                            height: 32px;
                            margin-right: 10px;
                            img{
                                width:100%;
                                height:100%;
                            }
                        }
                        
                    }
                    .afterzan{
                         display: flex;
                        flex-direction: row-reverse;
                        p{
                        color:rgba(255,221,92,1);
                        font-size:24px;
                        font-family:PingFangSC-Medium,PingFang SC;
                        font-weight:500;
                        line-height:34px;
                        }
                        div{
                            width: 32px;
                            height: 32px;
                            margin-right: 10px;
                            img{
                                width:100%;
                                height:100%;
                            }
                        }
                    } 
                }
            }
        }
    }
</style>