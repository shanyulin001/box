<template>
    <div class="addAccout-page page-layout">
        <van-nav-bar
        :title="`添加${addActive}钱包`"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="wrap">
          <p class="section-title">选择钱包体系</p>
            <ul>
                <li @click="toMnemonicPage">
                    <div class="li-left">
                        <img src="../../assets/wallet/MnemonicWord-icon@2x.png" alt="" class="li-icon">
                        <div class="li-text">
                            <p>助记词导入</p>
                            <p>通过导入助记词添加钱包</p>
                        </div>
                    </div>
                    <img src="../../assets/home/click-icon.png" alt="" class="right-icon">
                </li>
                <li @click="toPrivateKeyImport">
                    <div class="li-left">
                        <img src="../../assets/wallet/siyaodaoru@2x.png" alt="" class="li-icon">
                        <div class="li-text">
                            <p>私钥导入</p>
                            <p>通过私钥导入您的现有钱包</p>
                        </div>
                    </div>
                    <img src="../../assets/home/click-icon.png" alt="" class="right-icon">
                </li>
            </ul>
          <p class="section-title">我没有账户</p>
            <ul>
                <li @click="toQuickCreation">
                    <div class="li-left">
                        <img src="../../assets/wallet/QuickCreation-icon@2x.png" alt="" class="li-icon">
                        <div class="li-text">
                            <p>1分钟快速创建</p>
                            <p>免费创建钱包</p>
                        </div>
                    </div>
                    <img src="../../assets/home/click-icon.png" alt="" class="right-icon">
                </li>
            </ul>
      </div>
    </div>
</template>

<script>
export default {
    name: 'addAccout',
    data(){
        return{
          addActive:'',
        }
    },
    methods:{
        onClickLeft() {
          this.$router.push({name:'wallet'})
        },
        toMnemonicPage() {
          this.$router.push({name:'mnemonicImport', query:{ addActive: this.addActive} })
        },
        toPrivateKeyImport(){
          this.$router.push({name:'privateKeyImport', query:{ addActive: this.addActive} })
        },
        toQuickCreation() {
          this.$router.push({name:'quickCreation', query:{ addActive: this.addActive} })
        }
    },
    mounted(){
      let addActive = this.$route.query.addActive
      console.log(addActive)
      if( addActive === 0 ){
        this.addActive = 'CTT'
      }else if( addActive === 1){
        this.addActive = 'ETH'
      }
    },
}
</script>

<style lang="scss">
    .addAccout-page{
      .wrap{
        padding: 0 30px;
        .section-title{
          margin: 40px 0 20px 0;
          font-size:36px;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:600;
          color:rgba(255,255,255,1);
        }
        ul{
          li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 140px;
            background:rgba(32,38,52,1);
            box-shadow:0px 4px 8px 0px rgba(0,0,0,0.1);
            border-radius:12px;
            padding: 0 22px 0 30px;
            margin-top: 20px;
            .li-left{
              display: flex;
              align-items: center;
              .li-icon{
                height: 80px;
                width: 80px;
                margin-right: 54px
              }
              .li-text{
                margin: auto 0;
                p{
                    font-size:32px;
                    font-family:PingFangSC-Medium,PingFang SC;
                    font-weight:500;
                    color:rgba(255,255,255,1);
                }
                p:last-child{
                    margin-top: 4px;
                    font-size: 22px;
                    color:rgba(153,153,153,1);
                }
              }
            }
            .right-icon{
              height: 24px;
              width: 24px;
            }
          }
        }
      }
    }
</style>
