<template>
    <div class="set-password-wrap">
      <van-nav-bar
        :title="title"
        left-arrow
        @click-left="$router.back()"
      />
      <div class="wrap">
        <div class="section">
          <van-field v-model="password" type="password" clearable :placeholder="placeholder" />
          <van-field v-model="password2" type="password" clearable :placeholder="placeholder2" />
        </div>
        <div class="text-center section">
          <van-button class="submit_btn" @click="submit">{{ $t('button.t9') }}</van-button>
        </div>
      </div>
    </div>
</template>

<script>
import { changeTranpw, resetPwd, emailResetpassword } from "@/api";

export default {
    name: 'setPassword',
    data() {
        return {
          title: this.$t('setPassword.t1'),
          password: '',
          password2: '',
          placeholder: this.$t('setPassword.t2'),
          placeholder2: this.$t('setPassword.t3'),
          inputType: true,
          formType: 1, // 1绑定手机号码， 2修改密码, 3修改邮箱登录密码
          mobile: '',
          // code: '', // 修改邮箱需要的验证码
        };
    },
    mounted() {
      this.formType = Number(this.$route.query.type) || 1;
      this.title = this.formType === 1 ? this.$t('setPassword.t4') : this.$t('setPassword.t5');
      const data = this.$store.state.userData;
      this.mobile = this.$route.query.mobile || data.mobile;
      // this.code = this.$route.query.code;
    },
    methods: {
      changeType() {
        this.inputType = !this.inputType;
      },
      async submit() {
        if (!this.password || !this.password2) {
          return this.$toast.fail('请填写密码');
        } else if (this.password !== this.password2){
          return this.$toast.fail('两次密码不一致');
        }
        try {
          const load = this.$toast.loading();
          if (this.formType === 1) {
            const params = {
              code: '',
              trade_password: this.password,
            };
            const { msg } = await changeTranpw(params);
            this.$toast(msg);
            setTimeout(() => {
              load.clear();
            }, 200);
          } else if (this.formType === 2) {
            const params = {
              mobile: this.mobile,
              password: this.password,
              password1: this.password2,
            };
            const { msg } = await resetPwd(params);
            this.$toast(msg);
            setTimeout(() => {
              load.clear();
              this.logout();
            }, 1000);
          } else if (this.formType === 3) {
            const params = {
              email: this.mobile,
              password: this.password,
              password1: this.password2,
            };
            const { msg } = await emailResetpassword(params);
            this.$toast(msg);
            setTimeout(() => {
              load.clear();
              this.logout();
            }, 1000);
          }
        } catch (e) {
          console.log(e);
        }
      },
    },
};
</script>

<style lang="scss" scoped>
.set-password-wrap {
  .section {
    width: 670px;
    margin: 50px auto;
    overflow: hidden;
    .van-cell {
      margin-bottom: 30px;
    }
    .submit_btn {
      margin-top: 60px;
    }
  }
}
</style>
