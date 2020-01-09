<template>
    <div class="user-info page-layout">
      <van-nav-bar
        title="个人中心"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="wrap">
        <van-cell-group class="section">
          <van-cell title="更换头像" value="" is-link @click="upLoad($event)">
            <div slot="right-icon" class="logo">
              <img :src="userData.avatar" @error="defaultAvatar($event)" alt="">
              <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
            </div>
          </van-cell>
          <van-cell title="用户名" :value="userData.username" @click="show = true" is-link />
          <van-cell title="账号" :value="userData.mobile" />
          <van-cell title="登陆密码" value="" is-link @click="changePw" />
        </van-cell-group>
        <div class="section">
          <van-button class="submit_btn" @click="logoutFuc">退出登录</van-button>
        </div>
      </div>
      <confirm-dialog
        v-model="show"
        :title="title"
        @ok="confirm"
        @cancel="show=false"
      ></confirm-dialog>
      <input type="file" @change="uploadStart($event)" accept="image/*" ref="upload" style="display: none;visibility: hidden">
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { changeUsername, uploadImage, uploadAvatar } from '@/api';
import confirmDialog from '@/components/confirmDialog.vue';

export default {
  name: 'userInfo',
  components: { confirmDialog },
  data() {
    return {
      show: false,
      show2: false,
      username: '',
      title: '修改用户名',
    };
  },
  computed: {
    ...mapState([
      'userData',
    ]),
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    logoutFuc() {
      this.$dialog.confirm({
        message: '是否退出登录',
      }).then(() => {
        this.logout();
      });
    },
    changePw() {
      this.$router.push({ name: 'tranPw', query: { type: 3 } });
    },
    confirm(val) {
      const params = {
        username: val,
      };
      changeUsername(params).then((res) => {
          if (res.code === '1') {
            this.$toast.success('修改成功');
            this.show = false;
            this.updateUserData();
          } else {
            this.$toast.fail(res.msg);
          }
      });
    },
    upLoad() {
      this.$refs.upload.click();
    },
    uploadStart(e) {
      const file = e.target.files[0];
      console.log(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const dataUrl = reader.result;
        uploadImage({
          image: dataUrl,
        }).then((res) => {
          if (res.code === '1') {
            this.uploadLogo(res.data.img_path);
          } else {
            this.$toast.fail(res.msg);
          }
        });
      };
    },
    uploadLogo(val) {
      uploadAvatar({
        avatar: val,
      }).then((res) => {
        if (res.code === '1') {
          this.$toast.success('上传成功');
          this.updateUserData();
        } else {
          this.$toast.fail(res.msg);
        }
      });
    },
  },
};
</script>

<style scoped>
  .user-info >>> .van-cell .van-cell__title {
    color: #fff;
    max-width: none;
  }
  .user-info >>> .van-cell .van-cell__value {
    text-align: right;
  }
</style>
<style lang="scss" scoped>
.user-info {
  .wrap {
    .section {
      margin: 50px auto 20px auto;
      width: 690px;
      background: $bg2;
      border-radius: 12px;
      overflow: auto;
      .logo {
        display: flex;
        align-items: center;
        img {
          margin-right: 10px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
