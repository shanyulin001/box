<template>
    <div class="user-page">
      <div class="page-view">
        <div v-if="token" class="userManage">
          <div class="accountInfo" @click="emitUpload">
            <div class="avatar">
              <img :src="userData.avatar" @error="defaultAvatar($event)" alt="">
              <i :class="'v' + vipInfo.member_rank.key - 1"></i>
            </div>
            <div class="content">
              <p class="name">
                {{ userInfo.username }}
              </p>
              <p class="mobile">{{ `${userData.mobile.substring(0,3)}****${userData.mobile.substring(7,11)}`||  `${userData.email.substring(0,3)}****${userData.email.substring(7)}` || '' }}</p>
              <p class="vip">
                {{ levelMap[userInfo.level] }}
                <!-- {{ $t('user.t10') }}<i>{{ vipInfo.team_lock_integral }}</i>USDT，
                {{ $t('user.t12') }}{{ vipInfo.up_team_integral }}USDT -->
              </p>
            </div>
          </div>
        </div>
        <div v-else class="userManage">
          <div class="accountInfo">
            <div class="avatar">
              <img src="" @error="defaultAvatar($event)" alt="">
            </div>
            <div class="content">
              <p class="login-btn" @click="toLogin">注册/登录</p>
            </div>
          </div>
        </div>

        <div class="systemManage">
          <div class="item" @click="toRobotPage">
           <label>
             <img :src="require(`@/assets/user/icon-jiqiren@2x.png`)" alt="">
             <span>智能机器人</span>
           </label>
           <div class="time">{{ robotExpireTime }}<p>{{robotExpireState}}</p></div>
          </div>
          <!-- <router-link :to="{name: 'billList'}" class="item"> -->
          <div class="item" @click="toNextPage('billList')">
            <label>
              <img :src="require(`@/assets/user/list-icon1.png`)" alt="">
              <span>{{ $t('user.t1') }}</span>
            </label>
          </div>
          <!-- </router-link> -->
          <!-- <router-link :to="changePwParams" class="item"> -->
          <div class="item" @click="changePwParams">
            <label>
              <img :src="require(`@/assets/user/list-icon2.png`)" alt="">
              <span>{{ $t('user.t2') }}</span>
            </label>
          </div>
          <!-- </router-link> -->
          <div @click="mobileShow" class="item">
            <label>
              <img :src="require(`@/assets/user/list-icon3.png`)" alt="">
              <span v-if="token">{{ userData.mobile ? $t('user.t3') : $t('user.t14') }}</span>
              <span v-else >更换手机</span>
            </label>
          </div>
        </div>
        <div class="systemManage">
          <!-- <router-link :to="{name: 'share'}" class="item"> -->
          <div class="item" @click="toNextPage('share')">
            <label>
              <img :src="require(`@/assets/user/list-icon4.png`)" alt="">
              <span>{{ $t('user.t4') }}</span>
            </label>
          </div>
          <!-- </router-link> -->
          <!-- <router-link :to="{name: 'invite'}" class="item"> -->
          <div class="item" @click="toNextPage('invite')">
            <label>
              <img :src="require(`@/assets/user/list-icon7.png`)" alt="">
              <span>我的推荐</span>
            </label>
          </div>
          <!-- </router-link> -->
          <!-- <router-link :to="{name: 'setting'}" class="item"> -->
          <div class="item" @click="toNextPage('setting')">
            <label>
              <img :src="require(`@/assets/user/list-icon5.png`)" alt="">
              <span>{{ $t('user.t5') }}</span>
            </label>
          </div>
          <!-- </router-link> -->
          <div class="item" @click="toPage">
            <label>
              <img :src="require(`@/assets/user/list-icon6.png`)" alt="">
              <span>{{ $t('user.t6') }}</span>
            </label>
            <p>{{ $t('user.t7') }}</p>
          </div>
        </div>
        <div class="action" v-if="token" >
          <van-button class="submit_btn" @click="confirmLogout">{{ $t('button.t10') }}</van-button>
        </div>
      </div>
      <van-dialog
        v-if="token"
        v-model="show"
        :message="userData.mobile ? $t('user.t8') : $t('user.t15')"
        show-cancel-button
        @confirm="changeMobile"
        @cancel="show=false"
      >
      </van-dialog>
      <input type="file" ref="uploadEl" @change="upload" style="display: none">
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { uploadImage, uploadAvatar, getVip, getRobotExpireTime, getUserinfo } from '../../api';

export default {
  name: 'user',
  components: {},
  data() {
    return {
      token: '',
      vipInfo: {
        member_rank: {
          key: 1,
        },
        team_lock_integral: '',
        up_team_integral: '',
      },
      userInfo:[],
      mobile: '',
      email:'',
      levelMap: ['云智会员', '云智VIP', '云智节点', '云智超级节点'], // 1-云智会员 2-云智VIP 3-云智节点 4-云智超级节点 
      robotExpireTime: '',
      robotExpireState: '未开通',
      show: false,
      show2: false,
    };
  },
  computed: {
    ...mapState([
      'userData',
    ]),
   
    // changePwParams() {
    //   return {
    //     name: 'verifyMobile',
    //     query: {
    //       mobile: this.userData.mobile || this.userData.email || '',
    //       type: this.userData.mobile ? 2 : 3,
    //     },
    //   };
    // },
  },
  watch: {},
  methods: {
    changePwParams() {
      // return {
      this.$router.push({
        name: 'verifyMobile',
        query: {
          mobile: this.userData.mobile || this.userData.email || '',
          type: this.userData.mobile ? 2 : 3,
        },
      })
      // };
    },
    toLogin() {
      this.$router.push({name: 'login',query:{from:'home'} })
    },
    async getUserinfo() {
      try {
        const {data} = await getUserinfo();
        this.userInfo = data;
      } catch (e) {
      }
    },
    async getRobotExpireTime() {
      try {
        const {data} = await getRobotExpireTime();
        // this.robotExpireTime = 
        if( data.status.key === 0 ){
          this.robotExpireState = '未开通';
        }else if( data.status.key === 1 ){
          this.robotExpireTime = `${data.end_time}`;
          this.robotExpireState = '到期';
        }else if(data.status.key === 2){
          this.robotExpireState = '已过期';
        }
      } catch (e) {
      }
    },
    checkUpdate() {
      this.getVersion().then((res) => {
        if (Number(res.code) === 1) {
          const { version } = res.data;
          const dataObj = res.data;
          if (version !== this.global.version) {
            const that = this;
            this.$dialog.confirm({
              message: that.$t('user.t9'),
            }).then(() => {
              // window.open(dataObj.download_url);
              if (!cordova.InAppBrowser) {
                return;
              }
              cordova.InAppBrowser.open(dataObj.download_url, '_system', 'location=no,toolbar=yes,toolbarposition=bottom,closebuttoncaption=关闭');
            });
          }
        } else {
          this.$toast.loading().clear();
        }
      }).catch(() => {
        this.$toast.loading().clear();
      });
    },
    toPage() {
      // if(this.token){
        this.$router.push({ name: 'about' });
      // }else{
      //   this.$toast('请登录后操作')
      // }
    },
    mobileShow(){
      if(this.token){
        this.show = true
      }else{
        this.$toast('请登录后操作')
      }
    },
    toNextPage(val){
      if(this.token){
        this.$router.push({ name: val });
      }else{
        this.$toast('请登录后操作')
      }
    },
    toRobotPage() {
      if(this.token){
        this.$router.push({ name: 'smartRobot' });
      }else{
        this.$toast('请登录后操作')
      }
      
    },
    changeMobile() {
      this.$router.push({
        name: 'verifyMobile',
        query: {
          mobile: this.userData.mobile || this.userData.email,
          type: this.userData.mobile ? 1 : 4,
        },
      });
    },
    confirmLogout() {
      this.$dialog.confirm({
        message: '确认是否退出',
      }).then(() => {
        this.logout();
      }).catch(() => {});
    },
    emitUpload() {
      this.$refs.uploadEl.click();
    },
    upload(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const dataUrl = reader.result;
        uploadImage({
          image: dataUrl,
        }).then((res) => {
          if (Number(res.code) === 1) {
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
        if (Number(res.code) === 1) {
          this.$toast.success('上传成功');
          this.updateUserData();
        } else {
          this.$toast.fail(res.msg);
        }
      });
    },
    getVipInfo() {
      getVip().then((res) => {
        this.vipInfo = res.data;
      });
    },
  },
  mounted() {
    this.token = localStorage.getItem("token") || "";
    if(this.token){
      this.getUserinfo();
      this.getRobotExpireTime();
      this.getVipInfo();
    }
    
    this.checkUpdate();
    
  },
};
</script>

<style lang="scss">
  .user-page {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: #fefefe;
    .header {
      flex-shrink: 0;
      .icon {
        display: block;
        width: 32px;
        height: 32px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        cursor: pointer;
      }
    }
    .page-view {
      flex: 1;
      /*margin: 50px 30px 0;*/
      padding-bottom: 120px;
      overflow: auto;
      .userManage {
        background-color: #2B2C3A;
        border-radius: 12px;
        padding-top: 20px;
        .accountInfo {
          padding: 48px 40px;
          display: flex;
          flex-direction: row;
          border-bottom: 1px solid rgba(#fff, .25);
          .avatar {
            width: 112px;
            height: 112px;
            margin-right: 20px;
            border-radius: 50%;
            position: relative;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
            i {
              position: absolute;
              bottom: 18px;
              right: 18px;
              width: 36px;
              height: 36px;
              &.v1 {
                background: url("../../assets/user/v1@2x.png") no-repeat center;
                background-size: 36px 36px;
              }
              &.v2 {
                background: url("../../assets/user/v2@2x.png") no-repeat center;
                background-size: 36px 36px;
              }
              &.v3 {
                background: url("../../assets/user/v3@2x.png") no-repeat center;
                background-size: 36px 36px;
              }
              &.v4 {
                background: url("../../assets/user/v4@2x.png") no-repeat center;
                background-size: 36px 36px;
              }
              &.v5 {
                background: url("../../assets/user/v5@2x.png") no-repeat center;
                background-size: 36px 36px;
              }
              &.v6 {
                background: url("../../assets/user/v6@2x.png") no-repeat center;
                background-size: 36px 36px;
              }
              &.v7 {
                background: url("../../assets/user/v7@2x.png") no-repeat center;
                background-size: 36px 36px;
              }
              &.v8 {
                background: url("../../assets/user/v8@2x.png") no-repeat center;
                background-size: 36px 36px;
              }
              &.v9 {
                background: url("../../assets/user/v9@2x.png") no-repeat center;
                background-size: 36px 36px;
              }
            }
          }
          .content {
            display: flex;
            flex-direction: column;
            line-height: 1;
            .login-btn{
              margin: auto 0;
              font-size:48px;
              font-family:PingFangSC-Medium,PingFang SC;
              font-weight:500;
              color:rgba(255,221,92,1);
              line-height:66px;
            }
            .name {
              margin-top: 7px;
              margin-bottom: 18px;
              font-size: 32px;
              color:rgba(255,221,92,1);
              .super-ico {
                margin: 0 10px;
                line-height: 1;
                font-style: normal;
                font-size: 20px;
                padding: 2px 5px;
                color: #437aff;
                border: 1px solid #437aff; /*no*/
              }
            }
            .mobile {
              font-size: 28px;
              color: #5A5F6C;
            }
            .vip {
              color: rgba(255,221,92,1);
              margin-top: 12px;
              font-size: 20px;
              i {
                font-style: normal;
                color: #FFDD5C;
              }
            }
          }
        }
      }
      .systemManage {
        /*margin-top: 20px;*/
        background-color: #2B2C3A;
        border-radius: 12px;
        margin: 20px auto;
        width: 670px;
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 115px;
          padding: 0 55px 0 35px;
          border-bottom: 1px solid rgba(#fff, .25);
          background: url("../../assets/home/click-icon.png") no-repeat 610px center;
          background-size: 32px 32px;
          .time{
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            color: #FFDD5C;
            p{
              color: #fefefe;
            }
          }
          &:nth-last-child(1) {
            border-bottom: none;
          }
          label {
            display: flex;
            align-items: center;
            font-size: 25px;
            img {
              width: 44px;
              height:44px;
              margin-right: 40px;
            }
          }
          p {
            opacity: .4;
          }
        }
      }
      .action {
        padding: 0 40px;
        margin-top: 40px;
      }
    }
  }
</style>
