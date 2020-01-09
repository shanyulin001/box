<template>
<!--  <van-dialog-->
<!--    v-model="value"-->
<!--    :title="title"-->
<!--    id="confirmDialog"-->
<!--  >-->
<!--    <van-field v-model="username" :type="type" />-->
<!--  </van-dialog>-->
  <div id="confirmDialog" v-if="value">
    <div class="mask"></div>
    <div class="dialog">
      <div class="header">
        {{ title }} <i class="close-icon" @click="cancel"></i>
      </div>
      <div class="content">
        <input :type="type" maxlength="20" v-model="username" :placeholder="placeholder">
        <router-link v-if="title === '请输入交易密码'" :to="{ name: 'tranPw', query: { type: 2 } }">忘记密码</router-link>
      </div>
      <div class="footer">
        <van-button class="submit_btn" @click="ok">确定</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'confirmDialog',
  data() {
    return {
      username: '',
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    defaultVal: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '请输入',
    },
  },
  watch: {
    value(val) {
      if (val && this.defaultVal) {
        this.username = this.defaultVal;
      } else {
        this.username = '';
      }
    },
  },
  mounted() {
    this.$on('clearInput', () => {
      this.username = '';
    });
  },
  methods: {
    ok() {
      this.$emit('ok', this.username);
    },
    cancel() {
      this.$emit('cancel', this.username);
    },
  },
};
</script>

<style lang="scss" scoped>
#confirmDialog {
  color: #333;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    z-index: 1000;
  }
  .dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 630px;
    height: 376px;
    margin-left: -315px;
    margin-top: -188px;
    background-color: #fff;
    border-radius: 12px;
    z-index: 1001;
    .header {
      height: 120px;
      line-height: 120px;
      position: relative;
      text-align: center;
      font-size:36px;
      color: #333;
      .close-icon {
        position: absolute;
        right: 40px;
        top: 40px;
        width: 25px;
        height: 25px;
        background: url("../assets/home/close-icon.png") no-repeat center;
        background-size: cover;
      }
    }
    .content {
      text-align: center;
      position: relative;
      input {
        width: 568px;
        height: 96px;
        outline: none;
        border: 2px solid #aaa;/*no*/
        border-radius: 12px;
        line-height: 94px;
        padding: 5px 15px;
        box-sizing: border-box;
      }
      a {
        position: absolute;
        bottom: -50px;
        right: 40px;
        line-height: 1;
        color: #323233;
        font-size: 24px;
      }
    }
    .footer {
      margin-top: 78px;
      button {
        height: 100%;
      }
    }
  }
}
</style>
