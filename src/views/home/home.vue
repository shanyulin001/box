<template>
  <div class="home-page page-layout">
    <van-nav-bar :title="$t('nav.wallet')" class="header" />
    <div class="wrap">
      <div v-if="token" class="main-theme">
        <p>
          <span>{{ $t('home.t1') }}（USDT）</span>
          <span>{{ $t('global.unit') }}</span>
        </p>
        <p class="last-p">
          <span>{{ totalCount.sum_usdt | filterCEC }}</span>
          <span>{{ totalCount.sum_galaxy || 0 | filterCEC }}</span>
        </p>
        <div class="turn" @click="$router.push({ name: 'transferAccounts' })" >
          <img src="../../assets/familyTree/zhuanzhang@2x.png" alt="" />
          <p>{{ $t('global.t6') }}</p>
        </div>
      </div>
      <div v-else class="main-theme" style="display: flex;align-items: center;" >
        <div class="login-btn" @click="toLogin">点击登录</div>
      </div>
      <div class="assets-handle">
        <router-link tag="div" :to="{name: 'withDraw'}">
        <div tag="div" @click="tostTis" >
          <img src="../../assets/familyTree/icon-zheyue@2x.png" alt="">{{ $t('global.t3') }}
        </div>
        </router-link>
        <router-link tag="div" :to="{name: 'coinList'}">
        <div @click="toOutMonty">
          <img src="../../assets/familyTree/icon-tixian@2x.png" alt="">{{ $t('global.t4') }}
        </div>
        </router-link>
        <div @click="drawNumber">
          <img src="../../assets/familyTree/icon-ggt@2x.png" alt="">{{ $t('global.t5') }}
          <span class="tips" v-if="getNumber > 0">{{ getNumber }}</span>
        </div>
      </div>
      <div class="assets-list">
        <ul>
          <li v-for="(item, index) in coinList" :key="index" @click="toPage(item)">
            <div class="li" v-if="item.asset !== 'PGT'">
              <div class="info">
                <img :src="item.img" alt="">
                <div class="asset">
                  <p>{{ item | showName }}</p>
                  <p>{{ item.ratio || 0 }}</p>
                </div>
              </div>
              <div class="amount">
                {{ (typeof item !== 'undefined') ? item.balance : '' | filterCEC }}
                &nbsp;&nbsp;{{ item.asset }}
              </div>
             
            </div>
          </li>
        </ul>
      </div>
      <van-dialog
        v-model="show"
        :show-confirm-button="false"
        class="loading-define"
      >
        <img src="./../../assets/home/ch-1@2x.png">
        <p>{{ $t('home.t2') }}...</p>
      </van-dialog>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import { getJumpNumber, collectJump, totalAsset } from '@/api';

  export default {
    name: 'home-page',
    data() {
      return {
        token: '', //是否有登录
        getNumber: 0, // 可领取的币种数量
        dataInfo: {
          balance: '',
        },
        show: false,
        totalCount: {},
      };
    },
    computed: {
      ...mapState(['balanceList', 'assetList']),
      ...mapGetters(['coinList', 'radioList']),
      totalUSDT() {
        let res = 0;
        if (this.coinList.length > 0 && Object.keys(this.radioList).length > 0) {
          this.coinList.forEach((item) => {
            if (this.radioList[item.asset]) {
              let { balance } = item;
              if (item.asset !== 'USDT') {
                const { ratio } = this.radioList[item.asset];
                balance = this.Big(ratio).times(item.balance || 0).toString();
              }
              res = this.Big(res).plus(Number(balance)).toFixed(7);
            }
          });
        }
        return res;
      },
    },
    methods: {
      init() {
        this.token = localStorage.getItem("token") || "";

        this.show = true;
        this.$toast.loading().clear();
        this.getAssetList().then(() => {
          if(this.token){
            this.getBalanceList();
            this.getJumpNumber();
            this.totalAsset();
          }
          this.show = false;
        });
      },
      toLogin(){
        this.$router.push({name: 'login',query:{from:'home'}})
      },
      async getJumpNumber() {
        try {
          this.$toast.loading().clear();
          const { data } = await getJumpNumber();
          this.getNumber = data.release_amount;
          const list = this.balanceList.filter(e => e.asset === 'TTT');
          if (list.length > 0) {
            this.dataInfo = list[0];
          }
        } catch (e) {
        }
      },
      async drawNumber() {
        if(!this.token){
          this.$toast('请登录后操作')
          return
        }
        try {
          const load = this.$toast.loading();
          await collectJump();
          load.clear();
          this.init();
        } catch (e) {}
      },
      async totalAsset() {
        try {
          const { data } = await totalAsset();
          this.totalCount = data;
        } catch (e) {}
      },
      toPage(val) {
        if(this.token){
          this.$router.push({ name: 'assetDetail', query: { asset: val.asset, type: val.chain_protocol_type } });
        }else{
          this.$toast('请登录后操作')
        }
        
      },
      toOutMonty() {
        if(this.token){
          this.$router.push({name: 'coinList'})
        }else{
          this.$toast('请登录后操作')
        }
      },
      tostTis() {
        // this.$toast("抱歉！暂不支持折跃")
      },
    },
    mounted() {
      this.init();
    },
  };
</script>
<style lang="scss">
  .home-page {
    display: flex;
    flex-direction: column;
    height: calc(100% - 100px);
    overflow: hidden;
    .main-theme {
      width: 670px;
      height: 320px;
      margin: 40px auto 20px auto;
      background: url("../../assets/familyTree/bg-1@2x.png") no-repeat center;
      background-size: 670px 320px;
      padding: 40px 20px;
      .login-btn{
        margin: auto;
        width:320px;
        height:80px;
        border-radius:8px;
        border:2px solid rgba(253,219,91,1);
        font-size:28px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(253,219,91,1);
        line-height:80px;
        text-align: center;
      }
      img{
        height: 48px;
        width: 48px;
      }
      p {
        font-size: 28px;
        color: #fff;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:first-child {
          margin-bottom: 40px;
          span {
            &:last-child {
              color: #90939A;
            }
          }
        }
      }
       .last-p{
          font-size: 56px;
          color: #FFDD5C;
          span {
            &:last-child {
              color: #FFDD5C;
            }
          }
        }
      .turn{
        margin: 46px 0 0 10px;
        p{
          width:50px;
          height:34px;
          font-size:24px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:34px; 
        }
      }
    }
    .assets-handle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      font-size: 36px;
      border-radius: 12px;
      width: 670px;
      margin: 0 auto 20px auto;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        // width: 210px;
         width: 200px;
        height: 120px;
        flex: none;
        background: rgba(32,38,52,1);
        border-radius: 10px;
        color: #B5BAC5;
        font-size: 24px;
        position: relative;
        img {
          margin-right: 10px;
          width: 36px;
        }
        .tips {
          position: absolute;
          right: 20px;
          bottom: 12px;
          display: inline-block;
          height:24px;
          line-height: 24px;
          padding: 0 10px;
          border-radius: 12px;
          border: 2px solid rgba(255,221,92,1); /*no*/
          color: #FFDD5C;
          font-size: 16px;
        }
      }
    }
    .assets-list {
      ul {
        width: 670px;
        margin: 20px auto;
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
              justify-content: space-between;
              p:last-child {
                color: rgba(255,255,255,.4);
              }
            }
          }
        }
      }
    }
  
    .loading-define {
      width: 320px;
      height: 230px;
      background: rgba(32,38,52,1);
      border-radius: 10px;
      text-align: center;
      color: #B5BAC5;
      font-size: 24px;
      .van-dialog__content {
        background: rgba(32,38,52,1);
      }
      img {
        margin-top: 40px;
        width: 208px;
      }
    }
  }
</style>
