<template>
    <div class="quotataion-page">
      <van-nav-bar
        class="top-title"
        :left-text="$t('nav.quotation')"
      />
      <div class="wrap">
        <div class="list-section">
          <ul>
            <li v-for="(item, index) in quotationList" :key="index">
              <div class="li" v-if="item.symbol !== 'PGT'">
                <div class="info">
                  <img :src="item.img" alt="">
                  <div class="asset">
                    <p>{{ item.symbol.slice(0, -5) }}</p>
                  </div>
                </div>
                <div class="money">
                    <p>$ {{ item.buy || 0 }}</p>
                </div>
                <div class="trend">
                  <div class="up" v-if="item.change*1 > 0"><div></div>{{ item.change || 0 }}%</div>
                  <div class="down" v-else ><div></div>{{ item.change.slice(1) || 0 }}%</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { getQuotationList } from '@/api';
  let vm = null;
  export default {
    name: 'quotataion-page',
    components: {
    },
    data() {
      return {
        quotationList: [],
      };
    },
    computed: {
      ...mapGetters(['coinList', 'radioList']),
    },
    watch: {},
    methods: {
      getConfigResult (res) {
      // 接收回调函数返回数据的方法
        console.log(res)
      },
      websocketToLogin () {
        // 【agentData：发送的参数；this.getConfigResult：回调方法】
        this.socketApi.sendSock({"dataType":"4072_TRADE_STATISTIC_24H","dataSize":1,"action":"ADD"})
      },
      // 获取交易对列表
      async getmarketlist() {
        try {
          const { data } = await getmarketlist();
          this.$toast.loading().clear();
        } catch (e) {
        }
      },
      async getQuotationList() {
        try {
          const { data } = await getQuotationList();
          this.$toast.loading().clear();
          // console.log(data);
          this.quotationList = data;
        } catch (e) {
        }
      },
    },
    mounted() {
      this.getQuotationList();
      this.timer = setInterval(function(){
        getQuotationList();
      }, 60000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
  };
</script>

<style lang="scss" scoped>
.quotataion-page{
  height: 100%;
  font-size: 32px;
  color: #fff;
  position: relative;
  .top-title{
    .van-nav-bar__text{
      font-size: px2rem(44);
      color: #FFDD5C;
      font-family:PingFangSC-Medium,PingFangSC;
      font-weight: 500;
    }
  }
  .wrap{
    margin-top: 20px;
      .list-section {
        width: 670px;
        margin: 0 auto 150px auto;
        font-size: 28px;
        color: #fff;
        overflow: hidden;
        ul {
        .li {
            height: 128px;
            border-radius: 10px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            font-size: 28px;
            background-color: #202634;
            color: #fff;
            .info {
                height: 100%;
                display: flex;
                align-items: center;
                img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    margin-right: 20px;
                }
                .asset {
                    height: 84px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    p:last-child {
                    color: #FFFFFF;
                    }
                }
            }
            .money {
              width: 200px;
              overflow: auto;
            }
            .trend{
              width: 160px;
              overflow: auto;
              .up{
                display: flex;
                justify-content: center;
                align-items: center;
                font-size:28px;
                color: #FF0000;
                font-weight:600;
                div{
                  margin-right: 10px;
                  width:0px;
                  height:0px;
                  border-width: 0 10px 10px;
                  border-style: solid;
                  border-color: transparent transparent #FF0000;
                }
              }
              .down{
                display: flex;
                justify-content: center;
                align-items: center;
                font-size:28px;
                color: #00FF62;
                font-weight:600;
                div{
                  margin-right: 10px;
                  width:0px;
                  height:0px;
                  transform:rotate(180deg);
                  border-width: 0 10px 10px;
                  border-style: solid;
                  border-color: transparent transparent #00FF62;
                }
              }
            }
        }
        }
    }
  }
}
</style>
