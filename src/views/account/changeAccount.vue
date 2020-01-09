<template>
    <div class="change-account">
      <van-nav-bar
        :title="title"
        left-arrow
        @click-left="$router.back()"
      />
      <van-cell-group class="form">
          <van-field v-model="mobile" type="text" :placeholder="placeholderTxt" clearable v-if="formType === 1 || formType === 4" />
          <van-field v-model="password" type=" password" v-else clearable :placeholder="$t('changeAccount.t4')" />
          <van-button type="primary" class="submit_btn" @click="toPage">{{ $t('button.t7') }}</van-button>
      </van-cell-group>
    </div>
</template>

<script>
import { sendNewMobileSms } from '@/api';

export default {
    name: 'changeAccount',
    data() {
        return {
            mobile: '',
            password: '',
            formType: 1, // 1绑定手机号码， 2修改密码, 4，修改绑定邮箱
            title: '',
        };
    },
    computed: {
      placeholderTxt() {
        return this.formType === 1 ? this.$t('changeAccount.t3') : this.$t('changeAccount.t6');
      },
    },
    mounted() {
        this.formType = parseInt(this.$route.query.type, 10) || 1;
        if (this.formType === 1) {
            this.title = this.$t('changeAccount.t1');
        } else if (this.formType === 4) {
          this.title = this.$t('changeAccount.t5');
        } else {
            this.title = this.$t('changeAccount.t2');
        }
    },
    methods: {
        changeType() {
          this.inputType = !this.inputType;
        },
        toPage() {
            if (this.formType === 1) {
                this.sendSms();
            } else if (this.formType === 4) {
                this.$router.push({ name: 'bindEmail', query: { mobile: this.mobile } }); // 前往绑定新邮箱
            } else {
                if (!this.password) {
                    return this.$toast.fail('请填写原密码');
                }
                this.$router.push({
                    name: 'setPassword',
                    query: {
                        type: 2,
                    },
                });
            }
        },
        async sendSms() {
            if (!this.mobile) {
                return this.$toast.fail('请填写新手机号码');
            }
            try {
              const res = await sendNewMobileSms({ mobile: this.mobile });
              this.$toast(res.msg);
              this.$router.push({ name: 'bindMobile', query: { mobile: this.mobile } });
            } catch (e) {
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.change-account {
    .form {
        margin-top: 40px;
        padding: 0 26px;
        .van-cell {
            margin-bottom: 34px;
        }
        a {
            float: right;
            color: #708BB3;
            margin-top: 40px;
            font-size:15px;
            text-decoration: underline;
        }
    }
}
</style>
