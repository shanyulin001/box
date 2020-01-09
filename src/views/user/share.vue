<template>
    <div class="share page-layout" v-if="dataInfo">
      <van-nav-bar
        :title="$t('share.t1')"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="wrap">
        <div class="section">
          <div class="info">
            <p>{{ $t('share.t2') }}</p>
            <p class="code" @click="copyText(dataInfo.invite_code)">{{ dataInfo.invite_code }}</p>
            <img :src="qrUrl" alt=""  @click="copyText(downloadUrl)">
          </div>
          <div class="handler">
            <van-button type="primary" class="submit_btn" @click="copyText(downloadUrl)">{{ $t('share.t3') }}</van-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { getShare, getVersion } from '@/api';
import QRCode from 'qrcode';

export default {
  name: 'share',
  data() {
    return {
      dataInfo: null,
      qrUrl: '',
      downloadUrl: '',
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    getData() {
      getShare().then((res) => {
        if (res.code === '1') {
          this.dataInfo = res.data;
        } else {
          this.$toast.fail(res.msg);
        }
        getVersion().then((res) => {
          if (res.code === '1') {
            // this.downloadUrl = res.data.download_url;
            this.downloadUrl = `http://reg.yh.hetonglian.top/#/register?code=${this.dataInfo.invite_code}`
            console.log(this.downloadUrl);
            QRCode.toDataURL(`http://reg.yh.hetonglian.top/#/register?code=${this.dataInfo.invite_code}`)
              .then((url) => {
                this.qrUrl = url;
              })
              .catch((err) => {
                console.error(err);
              });
          } else {
            this.$toast.fail(res.msg);
          }
        });
      });
    },
    copyUrl() {
      console.log(11);
    },
  },
};
</script>

<style lang="scss" scoped>
.share {
  .wrap {
    height: 100%;
    .section {
      height: 100%;
      background: url("../../assets/user/bg-yaoqing@2x.png") no-repeat center;
      background-size: 100% 100%;
      color: $fc1;
      overflow: auto;
      .info {
        margin-top: 454px;
        overflow: hidden;
        text-align: center;
        p {
          &:first-of-type {
            font-size: 32px;
            color: #fff;
          }
          &:nth-of-type(2) {
            font-size: 48px;
            margin-top: 20px;
            margin-bottom: 20px;
            color: #FFDD5C;
          }
          img {
            width: 360px;
          }
        }
      }
      .handler {
        width: 360px;
        margin: 40px auto;
      }
    }
  }
}
</style>
