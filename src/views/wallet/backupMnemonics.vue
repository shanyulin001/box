<template>
  <div class="backupMnemonics-page">
    <van-nav-bar
      title="备份助记词"
      left-arrow
     @click-left="onClickLeft"
    />
    <div class="wrap">
      <p class="wrap-title">请抄写下您的钱包助记词</p>
      <p class="wrap-tis">助记词用于恢复钱包或充值签保密吗，将它准确的抄写在纸上，并存放在只有你知道的安全的地方</p>
      <ul>
        <li v-for="(item, index) in mnemonicList" :key="index" >
            {{item}}
        </li>
      </ul>
      <div class="next-btn" @click="nextPage">下一步</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'backupMnemonics-page',
  data(){
    return{
      mnemonicList:[],
    }
  },
  methods: {
    onClickLeft(){
      this.$router.push({ name: 'quickCreation' })
    },
    nextPage(){
      this.$router.push({ name:'confirmBackup',query:{ mnemonicList: this.mnemonicList } })
    }
  },
  mounted() {
    this.mnemonicList = this.$route.query.mnemonicList;
  },
}
</script>

<style lang="scss">
.backupMnemonics-page{
  .wrap{
    margin: 20px 30px 0 30px;
    padding: 0 0 96px 0;
    background-color: #202634;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .wrap-title{
    margin: 88px auto 0 auto;
    font-size:36px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .wrap-tis{
    margin: 18px auto 50px auto;
    width:490px;
    height:102px;
    font-size:24px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:34px;
  }
  ul{
    margin: 0 auto;
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    li{
     margin-top: 20px;
     width: 25%;
     font-size:28px;
     font-family:PingFangSC-Semibold,PingFang SC;
     font-weight:600;
     color:rgba(255,221,92,1);
     line-height:40px;
     
    }
  }
  .next-btn{
    margin: 190px auto 0 auto;
    width:300px;
    height:72px;
    background:linear-gradient(90deg,rgba(255,221,92,1) 0%,rgba(255,197,0,1) 100%);
    border-radius:36px;
    font-size:28px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(21,25,36,1);
    line-height:72px;
    text-align: center;
  }
}
</style>