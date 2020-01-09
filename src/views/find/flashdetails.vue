<template>
<!-- 快讯详情界面 -->
    <div class="flashbox">
    <div class="flashhead">
        <div class="title">
            <h2>云智快讯</h2>
            <div><p>尽享区块链资讯</p></div>
        </div>
        <div class="time">
            <p class="day">05</p>
            <p class="date">2020.1</p>
            <p class="week">星期一</p>
        </div>
    </div>
    <div class="newsmain">
        <h2>01年许志安拿金曲奖最受欢迎男歌手上台领奖时说到厨房宣言</h2>
        <p>在不经意的时间，经历了我从没想到的遇见，总感觉像久别重逢的故人，但一见如故更准确。不知道他是怎么想的，他推荐给我的这首歌，第一次听的时候，完全想不到会这么喜欢。现在是我每天的单曲循环。 希望我们就是晚遇到的对方对的人，生命里遇见即使迟到了也没什么关系。这个歌挺伤感的，但我们的故事绝对要丰富多彩才可以哟哈哈哈。故事不要相似，我还想和你有很长很长的以后。这次就让我当爱情的信徒，被眷顾一次吧。</p>
        <div class="bottom">
            <div class="bottomleft">
                <p class="scan">扫码注册云智盒子</p>
                <p class="know">了解最新的区块链快讯</p>
                <p class="give scan">给您不一样的精彩</p>
            </div>
            <div class="pic">
                <img src="@/assets/find/demo.jpg" alt="">
            </div>
        </div>
    </div>
    <div>
        <van-button round type="info" size="large">截图分享</van-button>
        <van-button round type="info" size="large">返回</van-button>
    </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .flashbox{
        padding: 30px;
        background: url(../../assets/find/ellipse@2x.png) no-repeat 380px -240px;
        background-size: 500px 500px;
    }
    .flashhead{
        display: flex;
        .title{
            h2{
                font-size:72px;
                font-family:WenYue-XinQingNianTi-W8,WenYue-XinQingNianTi;
                font-weight:normal;
                color:rgba(255,221,92,1);
                line-height:90px;
                letter-spacing:16px;
            }
            div{
                p{
                    font-size:28px;
                    font-family:AlibabaPuHuiTi-Regular,AlibabaPuHuiTi;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    line-height:40px;
                    letter-spacing:16px;
                }
            }
            
        }
        .time{
            display: flex;
            flex:1;
            padding: 14px;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
            font-family:PingFangSC-Semibold,PingFang SC;
            .day{
                color:rgba(28,31,34,1);
                font-size:48px;
                font-weight:600;
                line-height:66px;
            }
            .date{
                font-size:25px;
                font-weight:600;
                color:rgba(21,25,36,1);
                line-height:40px;
            }
            .week{
                font-size:24px;
                font-weight:400;
                color:rgba(49,46,31,1);
                line-height:34px;
            }
        }
    }
    .newsmain{
        background:rgba(32,38,52,1);
        padding: 40px 50px;
        font-family:PingFangSC-Semibold,PingFang SC;
        h2{
            font-size:36px;
            font-weight:600;
            color:rgba(255,255,255,1);
            line-height:50px;
            padding: 20px 0;
        }
        p{
            font-size:24px;
            font-weight:400;
            color:rgba(159,159,159,1);
            line-height:44px;
            margin: 8px 0;
        }
        .bottom{
                margin-top: 80px;
                display: flex;
                justify-content: space-between;
                .bottomleft{
                    .scan{
                        font-size:20px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                        line-height:28px;
                    }
                    .know{
                       font-size:34px;
                       line-height:56px;
                       color:rgba(255,221,92,1); 
                    }
                }
                    .pic{
                        width: 108px;
                        height: 108px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }

            }
    }
</style>