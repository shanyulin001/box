<template>
  <div class="wallet-page page-layout" v-if="accountData.length === 0&&ETHAccount.length === 0">
    <van-nav-bar :title="$t('nav.wallet')" class="header" />
    <div class="add-section">
      <img src="../../assets/user/logo@2x.png" alt="" class="logo">
      <div class="choose-wallet">
        <p>选择钱包体系</p>
        <div class="wallet-list">
          <ul>
            <li v-for="(item, index) in walletList" :key="index" @click="toPage(item.addActive)">
              <div class="walletList-item">
                <div class="item-left">
                  <img :src="item.image" alt="" class="wallet-icon">
                  <p>{{ item.moneyType }}</p>
                </div>
                <p class="wallet-name">{{ item.name }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="wallet-page page-layout" v-else >
    <div class="page-nav">
      <div class="account-list" @click="{{ showAccout=true }}">
        <p class="account-name">{{ currentAssets || '请选择钱包' }}</p>
        <img src="../../assets/wallet/icon-xiala@2x.png" alt="" class="account-icon">
      </div>
      <!-- <img src="../../assets/wallet/icon-tianjia@2x.png" alt="" class="add-icon"> -->
    </div>
    <div class="wrap">
      <div class="main-theme">
        <p style="display: flex;justify-content: flex-start;">
          <span>{{ $t('home.t1') }}（CNY）</span><van-icon v-if="hideMoney" name="eye-o"  @click="hideMoney = !hideMoney" /><van-icon v-else name="closed-eye" @click="hideMoney = !hideMoney" />
        </p>
        <p class="last-p">
          <span v-if="hideMoney">{{ assetsNumber | filterCEC }}</span>
          <span v-else>******</span>
        </p>
        <div class="turn">
          <div class="turn-item" @click="$router.push({ name: 'transferMoney', query: { addressUrl: addActive === 0? accountData[currentAssetsIndex].address : ETHAccount[currentETHIndex].address } })" >
            <img src="../../assets/familyTree/zhuanzhang@2x.png" alt="" />
            <p>{{ $t('global.t6') }}</p>
          </div>
          <div class="turn-item" style="margin-left:81px;" @click="$router.push({ name: 'collectMoney', query: { addressUrl: addActive === 0? accountData[currentAssetsIndex].address : ETHAccount[currentETHIndex].address } })" >
            <img src="../../assets/wallet/icon-Receivables@2x.png" alt="" />
            <p>收款</p>
          </div>
        </div>
      </div>
      <div class="assets-list">
        <ul>
          <li v-for="(item, index) in coinList" :key="index">
            <div class="li">
              <div class="info">
                <img :src="item.img" alt="">
                <div class="asset" style="justify-content: center;">
                  <p>{{ item.name }}</p>
                </div>
              </div>
              <div class="amount" style="text-align:right;">
                <!-- {{ (typeof item !== 'undefined') ? item.balance : '' | filterCEC }}
                &nbsp;&nbsp;{{ item.CNY }} -->
                <p>{{ item.number }}</p>
                <p style="color: #AAAAAA;">≈{{ item.CNY }} CNY</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <van-popup
    class="pop"
    v-model="showAccout"
    position="bottom"
    :close-on-click-overlay="false"
    >
    <div class="pop-title">切换钱包</div>
    <van-tabs v-model="addActive">
      <van-tab  title="CTT">
        <div class="tab-item">
          <ul>
            <li v-for="(item, index) in accountData" :key="index" :class="{'act': index === currentAssetsIndex }" @click="changeAssets(index)">
              <div class="li-left">
                <p>{{ item.remark }}</p>
                <div class="li-add">
                  <p>{{ item.address }}</p>
                  <img src="../../assets/wallet/fuzhi@2x.png" alt="" v-on:click.stop="copyText(item.address)" />
                </div>
              </div>
            </li>
            <p v-if="accountData.length === 0">未获取到创建的账号</p>
          </ul>
        </div>
      </van-tab>
      <van-tab title="ETH">
        <div class="tab-item">
          <div class="tab-item" style="padding:0;">
            <ul>
              <li v-for="(item, index) in ETHAccount" :key="index" :class="{'act': index === currentETHIndex }" @click="changeETHAssets(index)">
                <div class="li-left">
                  <p>{{ item.remark }}</p>
                  <div class="li-add">
                    <p>{{ item.address }}</p>
                    <img src="../../assets/wallet/fuzhi@2x.png" alt="" v-on:click.stop="copyText(item.address)" />
                  </div>
                </div>
              </li>
              <p v-if="ETHAccount.length === 0">未获取到创建的账号</p>
            </ul>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <div style="width:100%; background-color:#F8F8F8;padding-bottom:60px;padding-top:30px;">
      <div class="pop-btn" @click="$router.push({name: 'addAccout', query:{ addActive: addActive } })">
        <img src="../../assets/wallet/qianbao1@2x.png" alt="" class="btn-icon">
        <p>添加钱包</p>
      </div>
    </div>
  </van-popup>
  </div>
</template>

<script>
  import { getBalance, getCoinList } from '@/api';
 
  export default {
    name: 'wallet-page',
    data() {
      return {
        currentAssetsIndex: '', //选择CTT账户的下标
        currentETHIndex:'',  //选择ETH账户的下标

        currentAssets:'',  //当前选择账户名
        
        coinList:[],
        
        hideMoney: true,

        accountData: [],
        ETHAccount:[],
        assetsNumber:'',
        walletList:[
          {
            image: require('../../assets/wallet/icon-ctt@2x.png'),
            moneyType: 'CTT',
            name: 'CTT底层',
            addActive: 0,
          },
          {
            image: require('../../assets/wallet/icon-eth@2x.png'),
            moneyType: 'ETH',
            name: '以太坊底层',
            addActive: 1,
          }
        ],
        showAccout: false,
        addActive: '', //0代表CTT 1代表CTH
      };
    },
    methods: {
      init(){
        this.getAccountData().then((res) => {
          this.getCoinList();
          // this.getBalance();
        })
      
      },
      
      //判断本地是否已有账户
      getAccountData(){
        
        //获取CTT账户
        this.accountData = JSON.parse(localStorage.getItem("AccountData") || "[]");
        //获取ETH账户
        this.ETHAccount = JSON.parse(localStorage.getItem("ETHAccount") || "[]");

        //回到上次离开时的账户位置
        this.addActive = JSON.parse(localStorage.getItem("addActive" || 0))
        if(this.addActive == 0){
          this.currentAssetsIndex = JSON.parse(localStorage.getItem("index" || 0))
          this.currentETHIndex = ''
          this.currentAssets = this.accountData[this.currentAssetsIndex].remark        
        }else if(this.addActive == 1){
          this.currentETHIndex = JSON.parse(localStorage.getItem("index" || 0))
          this.currentAssetsIndex = ''
          this.currentAssets = this.ETHAccount[this.currentETHIndex].remark 
        }
        return Promise.resolve()
      },

      //获取账户资产getBalance
      async getBalance(){
        try {
          let addData;
          if(this.addActive == 0){
            addData = this.accountData[this.currentAssetsIndex].address
          }else{
            addData = this.ETHAccount[this.currentETHIndex].address
          }

          const params = {
            address: addData
          };
          // console.log(params);
          const res = await getBalance(params);
          
          
          this.assetsNumber =  res.data.balance
        } catch (e) {
          console.log(e)
        }
      },
      //获取币种列表coinList
      async getCoinList(){
        try {
          let addData;
          if(this.addActive === 0){
            addData = this.accountData[this.currentAssetsIndex].address || ''
          }else{
            addData = this.ETHAccount[this.currentETHIndex].address || ''
          }
          const params = {
            address: addData
          };
          const res = await getCoinList(params);

          this.coinList =  res.data
          this.assetsNumber = res.data[0].CNY*1 + res.data[1].CNY*1

          // console.log( res.data[0].CNY*1,'余额')
        } catch (e) {
          console.log(e)
        }
      },

      toPage(val){
        // this.$router.push({ name: 'adCTT', query: { asset: val.asset, type: val.chain_protocol_type } });
        this.$router.push({name:'addAccout', query: {addActive: val} })
      },
      //改变账户CTT
      changeAssets(val){
        this.currentAssetsIndex = val;
        this.currentAssets = this.accountData[this.currentAssetsIndex].remark
        localStorage.setItem("addActive", 0);
        localStorage.setItem("index", val);
        this.init()
        this.currentETHIndex = '';
        this.showAccout = false;
        // this.getBalance();
        this.getCoinList();
      },
      //改变账户ETH
      changeETHAssets(val){
        this.currentETHIndex = val;
        this.currentAssets = this.ETHAccount[this.currentETHIndex].remark
        localStorage.setItem("addActive", 1);
        localStorage.setItem("index", val);
        this.init()
        this.currentAssetsIndex = '';
        this.showAccout = false;
        // this.getBalance();
        this.getCoinList();
      },
    },
    mounted() {
      this.init();
    },
  };
</script>
<style lang="scss">
  .wallet-page {
    
    .page-nav{
      padding : 0 30px;
      height: 88px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #202634;
      color: #FFFFFF;
      border-radius: 12px;
      padding-top: 20px;
      .account-list{
        display: flex;
        align-items: center;
        .account-name{
          font-size:28px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(255,255,255,1);
        }
        .account-icon{
          margin-left: 8px;
          height: 12px;
          width: 20px;
        }
      }
      .add-icon{
        height: 36px;
        width: 36px;
      }
    }
    .wrap{
      .main-theme {
        width: 670px;
        height: 320px;
        margin: 40px auto 20px auto;
        background: url("../../assets/wallet/bg-2@2x.png") no-repeat center;
        background-size: 670px 320px;
        padding: 40px 20px;
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
                color: #FFFFFF;
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
          display: flex;
          justify-content: center;
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
    }
    .pop{
      display: flex;
      height: 1040px;
      flex-direction: column;
      background-color: #F8F8F8;
      .pop-title{
        // padding: 30px auto 14px auto;
        padding-top: 30px;
        text-align: center;
        font-size:32px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:rgba(51,51,51,1);
        background-color: #FFFFFF;
      }
      .van-tabs{
        .van-tabs__content{
          .van-tab__pane{
            .tab-item{
              padding: 5px 15px 0 15px;
              background-color: #F8F8F8;
              ul{
                li{
                  margin-top: 10px;
                  display: flex;
                  padding: 0 10px;
                  align-items: center;
                  background-color: #fff;
                  height: 70px;
                  width: 100%;
                  box-shadow:0px 4px 8px 0px rgba(0,0,0,0.1);
                  border-radius:6px;
                  background: url("./../../assets/wallet/weixuanzhong@2x.png") right center no-repeat;
                  background-position:98% 50%;
                  background-size: 20px 20px;
                  
                  .li-left{
                    .li-add{
                      display: flex;
                      p{
                        font-size:12px;
                        width: 206px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(212,214,223,1);
                        white-space:nowrap;
                        overflow:hidden;
                        text-overflow:ellipsis;
                      }
                      img{
                        height: 14px;
                        width: 14px;
                      }  
                    }
                  }
                  &.act {
                    background: url("./../../assets/wallet/xuanzhong@2x.png") right center no-repeat;
                    background-size: 20px 20px;
                    background-position:98% 50%;
                  }
                  p{
                    font-size:14px;
                    font-family:PingFangSC-Semibold,PingFang SC;
                    font-weight:600;
                    color:rgba(45,55,99,1);
                    line-height:20px;
                  }
                }
            
              }
            }
          }
        }
      }
      .pop-btn{
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:28px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:rgba(212,214,223,1);
        width:440px;
        height:88px;
        background:rgba(45,55,99,1);
        border-radius:50px;
        .btn-icon{
          margin-right: 20px;
          height: 40px;
          width: 40px;
        }
      }
    }
    .add-section{
      padding: 0 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .logo{
        width: 120px;
        margin: 138px auto 122px auto;
      }
      .choose-wallet{
        p{
          font-size:36px;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:600;
          color:rgba(255,255,255,1);
        }
        ul{
          li{
            .walletList-item{
              margin-top: 40px;
              padding: 0 20px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              height:140px;
              background:rgba(32,38,52,1);
              box-shadow:0px 4px 8px 0px rgba(0,0,0,0.1);
              border-radius:12px;
              p{
                font-size:32px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight:500;
                color:rgba(255,255,255,1);
              }
              .item-left{
                display: flex;
                align-items: center;
              }
              .wallet-icon{
                margin-right: 54px;
                height: 80px;
                width: 80px;
              }
              
            }
            
          }
        }
      }
    }
  }
</style>
