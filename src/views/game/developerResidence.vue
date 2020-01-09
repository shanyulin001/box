<template>
    <div class="developerResidence page-layout">
      <van-nav-bar
        :title="$t('developerResidence.t1')"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="wrap">
        <div class="section">
          <p>{{ $t('developerResidence.t2') }}</p>
          <p class="">{{ $t('developerResidence.t3') }}</p>
          <p class="">{{ $t('developerResidence.t4') }}</p>
          <img src="../../assets/game/wx_img.jpg" alt="" >
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'developerResidence',
  data() {
    return {};
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
  .developerResidence{
      .wrap{
        height: 976px;
        width: 670px;
        margin:32px auto 0 auto;
        .section{
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 976px;
          width: 670px;
          border-radius:16px;
          background-color: #202634;
          p{
            margin-top: 26px;
            font-size: 32px;
            color: #FFFFFF;
            &:first-of-type {
                text-align: center;
                height: 138px;
                width: 216px;
                margin-top: 40px;
                font-size: 48px;
                color: #FFDD5C;
                margin-bottom: 8px;
            }
            &:last-of-type {
                margin-top: 98px;
                font-size: 28px;
                color: #FFFFFF;
            }
          }
          img{
            margin-top: 50px;
            height:400px;
            width:400px;
          }
        }
      }
  }
</style>
