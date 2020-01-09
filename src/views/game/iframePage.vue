<template>
    <div class="iframe-page">
      <van-nav-bar
        :title="title"
        left-arrow
        @click-left="leftClick"
      >
        <van-icon name="cross" slot="right" @click="rightClick" />
      </van-nav-bar>
      <div class="out-page" ref="wrap">
        <iframe @load="loadIframe"
                :height="iframeHeight"
                ref="iframeEle" :src="iframeSrc" frameborder="0" :scrolling="isIos ? 'no' : 'auto'">
        </iframe>
      </div>
    </div>
</template>

<script>
export default {
    name: 'iframePage',
    data() {
        return {
          iframeSrc: '',
          title: '',
          iframeHeight: '',
          isIos: false,
        };
    },
    mounted() {
      const u = navigator.userAgent;
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
      this.iframeHeight = this.$refs.wrap.clientHeight;
      const { token, sessionkey } = localStorage;
      this.title = this.$route.query.title;
      this.iframeSrc = `${this.$route.query.url}?token=${token}&sessionkey=${sessionkey}`;
      // if (isIOS) {
      //   this.isIos = true; // 这个是ios操作系统
        // if (!cordova.InAppBrowser) {
        //     return;
        // }
        // toolbar=yes 仅iOS有效,提供关闭、返回、前进三个按钮
        // toolbarposition=top/bottom 仅iOS有效,决定toolbar的位置
        // closebuttoncaption=关闭 仅iOS有效
        // window.location.open(this.iframeSrc);
        // cordova.InAppBrowser.open(this.iframeSrc, '_blank', 'location=no,toolbar=yes,toolbarposition=bottom,closebuttoncaption=关闭');
      // }else{
        this.$toast.loading({ duration: 0 });
      // }
    },
    methods: {
      loadIframe() {
        this.$toast.loading().clear();
      },
      leftClick() {
        this.$router.replace({ name: 'game' });
      },
      rightClick() {
        this.$router.replace({ name: 'home' });
      },
    },
};
</script>

<style lang="scss" scoped>
.iframe-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .out-page {
    flex: 1;
    width: 750px;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    iframe {
      margin: 0;
      padding: 0;
      min-width: 100%;
      *width: 100%;
      width: 1px;
      height: 100%;
      border: none;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }
}
</style>
