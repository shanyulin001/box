<template>
    <div class="recharge-wrap page-layout">
      <van-nav-bar
        title="充值"
        left-arrow
        @click-left="$router.back()"
      />
      <div class="wrap">
        <div class="title">收款二维码</div>
        <div class="ewm">
          <img :src="qrSrc" alt="">
        </div>
        <div class="addr">
          {{ assetInfo.addr }}<span @click="copyText(assetInfo.addr)">复制</span>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import QRCode from 'qrcode';

export default {
    name: 'recharge',
    data() {
        return {
            radio: '',
            type: '',
            assetInfo: {
              addr: '',
            },
            qrSrc: '',
        };
    },
    computed: {
        ...mapState(['balanceList']),
    },
    mounted() {
      const { asset } = this.$route.query;
      const { type } = this.$route.query;
      this.balanceList.forEach((item) => {
        if (item.asset === asset && item.chain_protocol_type === Number(type)) {
          this.assetInfo = item;
        }
      });
      this.getQrcode();
    },
    methods: {
        getQrcode() {
            const data = this.assetInfo.addr;
            QRCode.toDataURL(data).then((url) => {
                this.qrSrc = url;
            }).catch((err) => {
                console.error(err);
            });
        },
    },
}
</script>

<style lang="scss" scoped>
  .recharge-wrap {
    .wrap {
      background: #202634;
      width:670px;
      height:900px;
      border-radius:16px;
      overflow: hidden;
      position: relative;
      margin: 30px auto;
      .title {
        font-size: 28px;
        color: #fff;
        line-height: 25px;
        width: 200px;
        margin: 40px auto 110px auto;
        text-align: center;
        border-radius: 8px;
      }
      .ewm {
        width: 420px;
        height: 420px;
        margin: 0 auto;
        background-color: rgba(0,0,0,.3);
        img {
          width: 100%;
        }
      }
      .addr {
        display: flex;
        align-items: center;
        /*justify-content: center;*/
        font-size: 26px;
        color: rgba(112,139,179,1);
        max-width: 90%;
        word-break: break-all;
        margin: 94px auto 0 auto;
        span {
          display: inline-block;
          white-space: nowrap;
          width: 102px;
          height: 36px;
          line-height: 36px;
          font-size: 24px;
          color: #fff;
          text-align: center;
          background:linear-gradient(90deg,rgba(255,221,92,1) 0%,rgba(255,197,0,1) 100%);
          border-radius: 18px;
          box-shadow: 0 0 10px rgba(0, 0, 0, .2);
          margin-left: 4px;
        }
      }
    }
  }
</style>
