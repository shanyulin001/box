<template>
<!-- 头条界面 -->
    <div style="margin-bottom: 50px">
        <div class="header">
            <div class="headline">头条</div>
            <div class="newflash" @click="newstab">快讯</div>
        </div>
        <div class="headlinelist">
            <ul>
                <li v-for="item in simulation" :key="item.index" @click="findlist">
                    <!-- <li> -->
                    <div class="newsword">
                        <h2>
                            {{ item.title }}
                        </h2>
                        <div>
                            <p class="author"> {{ item.author }}</p>
                            <p> {{ item.time }}</p>
                        </div>
                    </div>
                    <div class="newsimg">
                        <img src="@/assets/find/demo.jpg" alt="">
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
                "simulation": [
                {
                    title : '南非对加密货币持保守的乐观主义态度',
                    img : '@/assets/find/demo.jpg',
                    author : '云智小编',
                    time : '8小时之前'
                },
                 {
                    title : '南非对加密货币持保守的乐观主义态度',
                    img : '@/assets/find/demo.jpg',
                    author : '云智小编',
                    time : '3小时之前' ,
                }
                ]
    }

},
    methods:{
        newstab(){
            this.$router.push({name: 'fastflash'})
        },
        findlist(){
            this.$router.push({name: 'finddetails'})
        }
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
        .headline{
            width:82px;
            height:56px;
            font-size:40px;
            color:rgba(255,221,92,1);
        }
        .newflash{
            margin-left:20px;
        }
    }
    .headlinelist{
        margin-top: 10px;
         background:rgba(32,38,52,1);
        ul{
            padding: 0 20px;
            li{
                // width:750px;
                height:228px;
                padding: 40px 8px;
                border-bottom: 4px solid #111;
                color:white;
                display: flex;
                justify-content: space-around;
                .newsword{
                    width:404px;
                    height: 150px;
                    padding: 8px 0;
                    h2{
                        font-size:36px;
                        font-family:PingFangSC-Medium,PingFang SC;
                        font-weight:500;
                        color:rgba(255,255,255,1);
                        line-height:42px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp:2;
                        overflow: hidden;
                    }
                    div{
                        margin-top: 20px;
                        display: flex;
                        p{
                            height:28px;
                            font-size:20px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(170,170,170,1);
                            line-height:28px;
                        }
                        .author{
                            padding-right:80px; 
                        }
                    }
                }
                .newsimg{
                    width: 220px;
                    height: 150px;
                    border-radius: 10px;
                    overflow: hidden;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
            }
        }
    }
</style>
