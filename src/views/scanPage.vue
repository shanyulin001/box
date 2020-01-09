<template>
  <div class="scan">
    <van-nav-bar
      class="top"
      title="二维码扫描"
      left-arrow
      @click-left="cancel"
    />
    <div class="content" id="content">
      <div class="line"></div>
      <div class="tips">请把二维码放入框中即可自动扫描</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'scanModal',
    data() {
      return {
        lastRoute: '', // 上一次路由
      };
    },
    methods: {
      cancel() {
        console.log(111223333);
        if (window.cordova && window.QRScanner) {
          console.log(4456);
          window.QRScanner.cancelScan((status) => {
            console.log('scan', status);
            this.$store.commit('changeScan', false);
            window.QRScanner.hide();
            document.getElementById('app').classList.remove('qr-active');
          });
        } else {
          this.$store.commit('changeScan', false);
        }
      },
      init() {
        if (window.QRScanner) {
          window.QRScanner.prepare((err, status) => {
            if (err) {
              this.$toast('二维码相机插件错误');
            }
            if (status.authorized) {
              document.getElementById('app').classList.add('qr-active');
              document.getElementById('content').classList.add('qr-active');
              window.QRScanner.scan((err2, text) => {
                if (err2) {
                  this.$toast(err2);
                } else {
                  this.$router.replace({ name: this.lastRoute, query: { text } });
                }
                window.QRScanner.hide();
                window.QRScanner.destroy();
                document.getElementById('app').classList.remove('qr-active');
              });
              window.QRScanner.show();
            } else if (status.denied) {
              this.$toast('二维码相机没有权限');
            } else {
              this.$toast('二维码相机没有权限');
            }
          });
        } else {
          this.$toast('二维码相机插件错误');
        }
      },
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        const data = vm;
        data.lastRoute = to.query.lastName;
      });
    },
    mounted() {
      // this.init();
    },
  };
</script>

<style lang="scss" scoped>
  /*很做作的做了一个上下移动的横线，也不知道是受了谁家二维码扫描的影响*/
  .scan {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    transform: translate3d(0, 0, 0);
    .content {
      background: transparent;
      width: 100%;
      height: 900px;
      background: url("../assets/scanner.svg") no-repeat center center;
      background-size: 100% 800px;
      position: absolute;
      top: 50%;
      margin-top: -450px;
      left: 0;
      .line {
        width: 46%;
        left: 27%;
        height: 2px; /*no*/
        background: red;
        top: 30%;
        position: absolute;
        animation: myfirst 3s linear infinite;
      }
      .tips {
        position: absolute;
        left: 0;
        top: 80%;
        width: 100%;
        text-align: center;
        font-size: 32px;
        color: #fff;
      }
    }
  }
  @keyframes myfirst {
    0% {
      background: red;
      top: 30%;
    }
    25% {
      background: green;
      top: 38%;
    }
    50% {
      background: red;
      top: 46%;
    }
    75% {
      background: green;
      top: 54%;
    }
    100% {
      background: red;
      top: 63%;
    }
  }

  .button-top {
    width: 100%;
    position: absolute;
    left: 0;
    top: 80px;
    text-align: center;
    button {
      position: absolute;
      left: 60px;
      height: 40px;
      top: 50%;
      margin-top: -20px;
    }
  }

  .icon-camera {
    float: left;
  }
</style>
