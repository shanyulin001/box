<template>
    <div class="verify-mobile-wrap">
      <van-nav-bar :title="formType >2 ? $t('verifyMobile.t6') : $t('verifyMobile.t1')" left-arrow @click-left="$router.back()"/>
      <div class="wrap" @click="focusPw">
        <h2>{{ formType >2 ? $t('verifyMobile.t5') : $t('verifyMobile.t2') }}</h2>
        <small>
          {{ formType >2 ? $t('verifyMobile.t4') : $t('verifyMobile.t3') }}
          {{ mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") }}
        </small>
        <ul>
          <li v-for="i in 6" :key="i"
              :class="{'act': code.length > i - 1}"
          >{{ code ? code[i - 1] : '' }}</li>
        </ul>
        <p @click.stop="sendCode">{{ btnText }}</p>
        <input type="password" class="hidden" value=""
               maxlength="6" v-model="code" ref="code">
      </div>
    </div>
</template>

<script>
import { sendResetPasswordSms, verifycode, verifycode2, emailVerifycode, emailSendresetpasswordsms } from '@/api';

export default {
    name: 'verifyMobile',
    data() {
        return {
          code: '',
          mobile: '',
          btnText: this.$t('button.t5'),
          codeTime: 60,
          formType: 1, // 1绑定手机号码， 2修改密码,3修改邮箱登陆密码, 4.更换绑定邮箱
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
      this.formType = Number(this.$route.query.type) || 1;
      this.$nextTick(() => {
        this.$refs.code.focus();
      });
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
          if (this.formType < 3) {
            await sendResetPasswordSms({ mobile: this.mobile });
          } else {
            await emailSendresetpasswordsms({ email: this.mobile });
          }
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
          console.log(e);
        }
      },
      async verifyPassword() {
        try {
          if (this.formType === 1) {
            await verifycode2({ code: this.code });
            this.$router.push({
              name: 'changeAccount',
              query: { type: this.formType, mobile: this.mobile },
            });
          } else if (this.formType === 2) {
            await verifycode({ code: this.code, mobile: this.mobile });
            this.$router.push({
              name: 'setPassword',
              query: { type: this.formType, mobile: this.mobile },
            });
          } else if (this.formType === 3) {
            // 验证修改邮箱登录密码的验证码
            await emailVerifycode({ code: this.code, email: this.mobile });
            this.$router.push({
              name: 'setPassword',
              query: { type: this.formType, mobile: this.mobile },
            });
          } else if (this.formType === 4) {
            // 验证修改邮箱登录密码的验证码,更换邮箱
            await emailVerifycode({ code: this.code, email: this.mobile });
            this.$router.push({
              name: 'changeAccount',
              query: { type: this.formType, mobile: this.mobile },
            });
          }
        } catch (e) {
          setTimeout(() => {
            this.code = '';
          }, 500);
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
    height: 100%;
    .hidden {
      /*background-color: transparent;*/
      border: none;
      width: 10px;
      height: 10px;
      /*opacity: 0;*/
      position: fixed;
      right: -100px;
      top: -100px;
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
    .form {
      width: 590px;
      margin: 140px auto;
      input {
        width: 100%;
        height: 50px;
        font-size: 36px;
        color: #fff;
        background-color: #000;
        border: none;
        letter-spacing: 10px;
      }
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
