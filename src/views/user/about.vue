<template>
    <div class="about page-layout">
      <van-nav-bar
        :title="$t('about.t1')"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="wrap">
        <img src="../../assets/user/logo@2x.png" alt="" class="logo">
        <p>{{ global.appname}}</p>
        <p>{{ global.version }}</p>
        <van-cell-group class="section">
          <van-cell class="" :title="$t('about.t2')" :value="dataInfo.web" is-link :border="false" />
          <van-cell class="" :title="$t('about.t3')" :value="dataInfo.weixin" is-link :border="false" />
          <van-cell class="" :title="$t('about.t4')" :value="dataInfo.phone" is-link :border="false" />
          <van-cell class="" :title="$t('about.t5')" :value="dataInfo.isUpdate" is-link :border="false" />
        </van-cell-group>
      </div>
    </div>
</template>

<script>
  import { getAbout } from '@/api';

export default {
  name: 'about',
  data() {
    return {
      dataInfo: {
        web: 'www.baidu.com',
        weixin: '',
        phone: '',
        isUpdate: this.$t('about.t6'),
      },
    };
  },
  mounted() {
    this.getData();
    this.getVersion().then((res) => {
      this.$toast.loading().clear();
      if (Number(res.code) === 1) {
        if (this.global.version === res.data.version) {
          this.dataInfo.isUpdate = this.$t('about.t7');
        }
      }
    });
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    async getData() {
      try {
        const { data } = await getAbout();
        if (data) {
          this.dataInfo = data;
        }
      } catch (e) {
      }
    },
  },
};
</script>

<style scoped>
  .about >>> .van-cell {
    height: 48px;
    box-sizing: border-box;
    background-color: #202634;
    border-bottom-color: rgba(255,255,255,.1);
  }
  .about >>> .van-cell::after {
    content: none;
  }
  .about >>> .van-cell .van-cell__title {
    max-width: none;
    color: #fff;
  }
  .about >>> .van-cell .van-cell__value {
    text-align: right;
    color:rgba(254,254,254, .4);
  }
</style>

<style lang="scss" scoped>
.about {
  .wrap {
    text-align: center;
    .logo {
      width: 120px;
      margin: 50px auto 40px auto;
    }
    p {
      font-size: 32px;
      margin-bottom: 20px;
      color: #fff;
      &:last-of-type {
        font-size: 28px;
        margin-bottom: 60px;
      }
    }
    .section {
      background-color: $bg;
      margin: 50px auto 20px auto;
      width: 690px;
      border-radius: 12px;
      overflow: auto;
    }
  }
}
</style>
