<template>
  <div class="collectMoney-page">
      <van-nav-bar
      title="收款"
      left-arrow
    @click-left="onClickLeft"
    />
    <div class="wrap">
      <div class="section">
        <div class="info">
          <img :src="qrUrl" alt="" >
          <p class="code">{{ address }}</p>
        </div>
        <div class="handler">
          <van-button type="primary" class="submit_btn" @click="copyText(address)">复制地址</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode';

export default {
  name: 'collectMoney-page',
  data () {
    return{
      qrUrl: '',

      address: '',
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    getUrl() {
      this.address = this.$route.query.addressUrl;
      console.log(this.address,'url地址')
      
      if(this.address){
        QRCode.toDataURL(this.address).then((url) => {
            this.qrUrl = url;
        })
        .catch((err) => {
            console.error(err);
        });

      }else{
        this.$toast.fail('获取收账地址失败')
      }
    },
    
    copyUrl() {
      console.log(11);
    },
  },
  mounted() {
    this.getUrl(); 
  },
}
</script>

<style lang="scss">
.collectMoney-page{
  .wrap{
    background-color: #202634;
    height: 850px;
    margin: 34px 30px 0 30px; 
    .section{
      .info{
        overflow: hidden;
        text-align: center;
        padding-top: 162px;
        p {
          &:first-of-type {
            margin: 60px 0;
            font-size:24px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(212,214,223,1);
            line-height:34px;
          }

          img {
            width: 332px;
          }
        }
      }
      .handler {
        width: 360px;
        margin: 40px auto;
        .submit_btn{
         .van-button__text{
            color: #000;
         }
        }
      }
    }  
  }
}
</style>