<template>
    <div class="login-page">
      <van-nav-bar
        v-if="showBack"
        left-arrow
        @click-left="$router.back()"
      />

      <div class="wrap">
        <div class="section">
          <h2>{{ smsLogin ? $t('login.title2') : $t('login.title2')}}</h2>
<!--          <small v-if="smsLogin">{{ $t('login.t1') }}</small>-->
        </div>
        <div class="section mb20">
          <van-field v-model="form.mobile" type="text" clearable :placeholder="$t('login.t2')" @blur="blurScroll" @focus="focusScroll">
            <span slot="label" class="select-tip" @click="changeType">{{ registerType.name }}<van-icon name="arrow-down" /></span>
          </van-field>
        </div>
        <div class="section">
          <van-field v-if="!smsLogin" v-model="form.password" type="password"
                     clearable  @blur="blurScroll" :placeholder="$t('login.t3')"
                     @focus="focusScroll"
          />
          <van-field v-else v-model="form.code" type="text" clearable
                     @blur="blurScroll" :placeholder="$t('login.t4')"
                     @focus="focusScroll"
          >
            <van-button class="submit_btn code-btn" :disabled="disabledCode || period !== 60" @click="sendCode"
                        slot="button" size="small">{{smsTips}}</van-button>
          </van-field>
        </div>
        <div class="section" v-if="smsLogin">
          <van-field  v-model="form.invite_code" @blur="blurScroll"
                      type="text" clearable :placeholder="$t('login.t5')"
                      @focus="focusScroll"
          />
        </div>
        <div class="section">
          <van-button class="submit_btn" :disabled="disabled" @click="submit">{{ $t('button.t1') }}</van-button>
          <p class="link" v-if="!smsLogin">
<!--            <a href="#" @click.stop="smsLogin = true">{{ $t('button.t2') }}</a>-->
            <span @click.stop="verifyFun">{{ $t('button.t3') }}</span>
            <router-link tag="a" :to="{ name: 'register' }">{{ $t('button.t12') }}</router-link>
          </p>
          <p class="link" @click.stop="smsLogin = false" v-else>{{ $t('button.t4') }}</p>
        </div>
        <div class="login-bg"></div>
      </div>
    </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { Login, sendLoginSms, smsLogin, emailLogin } from '../../api';

  export default {
    name: 'login-page',
    components: {},
    data() {
      return {
        showBack:'',
        form: {
          mobile: '',
          password: '',
          invite_code: '',
          code: '',
        },
        smsTips: this.$t('button.t5'),
        smsLogin: false, // 短信验证码登陆
        period: 60,
        timer: null,
        disabled: false,
        disabledCode: false,
        actions: [
          { name: '手机号', value: 1 },
          { name: '邮箱', value: 2 },
        ],
        registerType: { name: '手机号', value: 1 }, // 登陆方式
      };
    },
    computed: {},
    watch: {},
    methods: {
      ...mapActions([
        'updateUserData',
      ]),
      sendCode() {
        if (!this.form.mobile) {
          return this.$toast.fail('请填写手机号码');
        }
        this.disabledCode = true;
        sendLoginSms({ mobile: this.form.mobile }).then((res) => {
          this.$toast(res.msg);
          if (Number(res.code) === 1) {
            this.disabledCode = false;
            this.period -= 1;
            let timer = setInterval(() => {
              if (this.period > 0) {
                this.period -= 1;
                this.smsTips = `${this.period}秒`;
              } else {
                this.smsTips = this.$t('button.t6');
                clearInterval(timer);
                timer = null;
                this.period = 60;
              }
            }, 1000);
          }
        }).catch((e) => {
          this.disabledCode = false;
        });
      },
      async submit() {
        if (!this.form.mobile) {
          return this.$toast.fail('请填写手机号码或者邮箱');
        }
        const params = {
          mobile: this.form.mobile,
          password: this.form.password,
          login_mode: 'APP',
          code: this.form.code,
          invite_code: this.form.invite_code,
        };
        // 邮箱登陆
        if (this.registerType.value === 2) {
          const load = this.$toast.loading({ message: '登录中...', mask: true });
          try {
            delete params.mobile;
            params.email = this.form.mobile;
            const { data } = await emailLogin(params);
            load.clear();
            this.disabled = false;
            localStorage.token = data.token;
            localStorage.sessionkey = data.sessionkey;
            this.updateUserData(data);
            this.$router.replace({ name: 'home' });
          } catch (e) {
            this.disabled = false;
          }
        } else {
          const load = this.$toast.loading({ message: '登录中...', mask: true });
          const reg = new RegExp(/^1[3456789]\d{9}$/);
          if (!reg.test(this.form.mobile)) {
            return this.$toast.fail('手机号格式不正确');
          }
          try {
            delete params.code;
            const { data } = await Login(params);
            load.clear();
            this.disabled = false;
            localStorage.token = data.token;
            localStorage.sessionkey = data.sessionkey;
            this.updateUserData(data);
            this.$router.replace({ name: 'home' });
          } catch (e) {
            this.disabled = false;
          }
        }
      },
      verifyFun() {
        // if (!this.form.mobile || !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.form.mobile))) {
        //   return this.$toast('请输入正确的手机号码');
        // }
        if (!this.form.mobile) {
          return this.$toast('请输入正确的手机号码或者邮箱');
        }
        this.$router.push({
          name: 'verifyMobile',
          query: {
            mobile: this.form.mobile,
            type: Number(this.registerType.value) === 1 ? 2 : 3,
          },
        });
      },
      changeType() {
        if (this.registerType.value === 1) {
            this.registerType = this.actions[1];
        } else {
            this.registerType = this.actions[0];
        }
      },
      // 输入框blur时候页面返回高度
      blurScroll() {
        setTimeout(() => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }, 20);
      },
      focusScroll() {
        setTimeout(() => {
          document.body.scrollTop = document.body.scrollHeight;
        }, 20);
      },
    },
    created() {
      this.blurScroll();
    },
    mounted() {
      this.showBack = this.$route.query.from

      this.blurScroll();
    },
  };
</script>

<style lang="scss" scoped>
  .login-page {
    .van-nav-bar {
      background: transparent;
    }
    .wrap {
      padding-top: 70px;
      position: relative;
      overflow: hidden;
      .login-bg {
        width: 560px;
        height: 560px;
        border-radius: 50%;
        background: linear-gradient(90deg,rgba(255,221,92,1),rgba(255,197,0,1));
        position: absolute;
        top: -280px;
        right: -200px;
      }
      .section {
        width: 690px;
        margin: 20px auto 20px auto;
        text-align: center;
        .submit_btn {
          width: 630px;
          margin-top: 100px;
          font-size: 38px;
        }
        .code-btn {
          width: 200px;
          margin-top: 0;
          font-size: 28px;
          &:disabled {
            color: #5A5F6C;
          }
        }
        &:first-of-type {
          text-align: left;
          margin-top: 360px;
          margin-bottom: 160px;
        }
        h2 {
          font-size: 48px;
          color: #fff;
          margin-bottom: 10px;
        }
        small {
          color: #5A5F6C;
          font-size: 24px;
        }
        .select-tip {
          display: inline-flex;
          align-items: center;
          color: #fff;
          i {
            margin-left: 4px;
          }
        }
      }
      .link {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 30px;
        color: #5A5F6C;
        padding: 0 60px;
        font-size: 24px;
        a {
          color: #5A5F6C;
        }
        .href {
          color: #5A5F6C;
        }
      }
    }
  }
</style>
