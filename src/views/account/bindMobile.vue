<template>
  <div class="verify-mobile-wrap" @click="focusPw">
    <van-nav-bar :title="$t('bindMobile.t1')" left-arrow @click-left="$router.back()"/>
    <div class="wrap">
<!--      <h2>为了确认您的身份，需要验证手机号</h2>-->
      <h2></h2>
      <small>
        {{ $t('bindMobile.t2') }}
        {{ mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") }}</small>
      <ul>
        <li v-for="i in 6" :key="i"
            :class="{'act': code.length > i - 1}"
        >{{ code ? code[i - 1] : '' }}</li>
      </ul>
      <p @click="sendCode">{{ btnText }}</p>
      <input type="password" class="hidden" maxlength="6" v-model="code" ref="code">
    </div>
  </div>
</template>

<script>
  import { sendNewMobileSms, changeBindMobile } from '@/api';

  export default {
    name: 'bindMobile',
    data() {
      return {
        code: '',
        mobile: '',
        btnText: this.$t('button.t5'),
        codeTime: 60,
        formType: 1, // 1绑定手机号码
      };
    },
    watch: {
      code(val) {
        if (val.length === 6) {
          this.verifyPassword();
        }
      },
    },
    mounted() {
      const data = this.$store.state.userData;
      this.mobile = this.$route.query.mobile || data.mobile;
      this.$refs.code.focus();
    },
    methods: {
      focusPw() {
        this.$refs.code.focus();
      },
      async sendCode() {
        if (this.codeTime !== 60) {
          return false;
        }
        try {
          this.codeTime -= 1;
          await sendNewMobileSms({ mobile: this.mobile });
          let timer = setInterval(() => {
            if (this.codeTime > 0) {
              this.codeTime -= 1;
              this.btnText = `${this.codeTime}秒`;
            } else {
              this.btnText = this.$t('button.t6');
              clearInterval(timer);
              timer = null;
              this.codeTime = 60;
            }
          }, 1000);
        } catch (e) {
        }
      },
      async verifyPassword() {
        try {
          const params = {
            mobile: this.mobile,
            code: this.code,
          };
          const load = this.$toast.loading();
          const { msg } = await changeBindMobile(params);
          this.$toast(msg);
          setTimeout(() => {
            load.clear();
            this.logout();
          }, 1000);
        } catch (e) {
          this.code = '';
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .verify-mobile-wrap {
    .wrap {
      text-align: center;
      overflow: hidden;
      .hidden {
        background-color: transparent;
        border: none;
        color: transparent;
        opacity: 0;
      }
      h2 {
        margin-top: 80px;
        font-size: 36px;
        color: #fff;
        margin-bottom: 10px;
      }
      small {
        color: #5A5F6C;
        font-size: 28px;
      }
      ul {
        width: 590px;
        margin: 140px auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        li {
          flex: none;
          width: 70px;
          height: 44px;
          line-height: 44px;
          position: relative;
          color: #fff;
          font-size: 42px;
          &::after {
            content: '';
            display: block;
            width: 100%;
            height: 4px;
            position: absolute;
            left: 0;
            bottom: -10px;
            background-color: #fff;
          }
        }
      }
      p {
        color: #FFDD5C;
        font-size:28px;
        &.disabled {
          color: #5A5F6C;
        }
      }
    }
  }
</style>
