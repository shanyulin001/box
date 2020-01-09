<template>
    <div class="game-page">
      <van-nav-bar
        class="top-title"
        :left-text="$t('nav.game')"
      />
      <div class="wrap">
        <div v-if="token" class="main-theme">
          <p>
            <span>{{ $t('global.t1') }}</span>
            <!-- <span>{{ $t('global.unit') }}（CTT）</span> -->
          </p>
          <p>
            <span>{{totalCount.sum_galaxy | filterCEC}}</span>
            <!-- <span>{{ totalCount.sum_galaxy | filterCEC }}</span> -->
          </p>
        </div>
        <div v-else class="main-theme" style="display: flex;align-items: center;" >
          <div class="login-btn" @click="toLogin">点击登录</div>
        </div>

        <div class="assets-handle">
          <!-- <router-link tag="div" :to="{name: 'buyGameCurrency'}"> -->
          <div @click="isLogin(buyGameCurrency)" >
            <img src="../../assets/familyTree/icon-goumaiYXB@2x.png" alt="">{{ $t('game.t1') }}
          </div>
          <!-- </router-link>
          <router-link tag="div" :to="{name: 'exchangeCTT'}"> -->
          <div @click="isLogin(exchangeCTT)" >
            <img src="../../assets/familyTree/icon-tixianYXB@2x.png" alt="">{{ $t('game.t2') }}
          </div>
          <!-- </router-link> -->
        </div>
        <div class="swiper-content">
          <div class="title">{{ $t('global.t2') }}</div>
          <swiper :options="swiperOption2" ref="mySwiper" width="610">
            <swiper-slide v-for="(item, index) in mainList" @click="toMPage(item)" :key="index">
              <img :src="item.image" alt="">
              <p>{{ item.title }}</p>
              <p>{{ item.content }}</p>
            </swiper-slide>
          </swiper>
        </div>
        <div class="swiper-content1">
          <div class="title">{{ $t('game.t3') }}</div>
          <swiper :options="swiperOption1" ref="mySwiper" width="200">
            <swiper-slide v-for="(item, index) in newList" @click="toNPage(item)" :key="index">
              <img :src="item.image" alt="">
              <p>{{ item.title }}</p>
            </swiper-slide>
          </swiper>
        </div>
        <div class="all-list">
          <div class="title">{{ $t('game.t4') }}</div>
          <div class="list">
            <div class="list-one" v-for="(item, index) in list" @click="toPage(item)" :key="index">
              <img :src="item.image" alt="">
              <p>{{ item.title }}</p>
            </div>
          </div>
        </div>
        <div class="bottom-img">
          <img :src="require(`@/assets/familyTree/banner-kaifazheruzhu@2x.png`)" alt="" @click="$router.push({name: 'developerResidence'})">
        </div>
      </div>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import { gameList, getBalanceList } from '@/api';
  let vm = null;
  export default {
    name: 'game-page',
    components: {},
    data() {
      return {
        token: '',
        swiperOption: {
          loop: true,
          autoplay: 3000,
          speed: 1000,
          preventClicks: false,
          spaceBetween: 0,
          slidesPerView: 'auto',
          // centeredSlides: 'center',
          on: {
            click: function() {
              const { realIndex } = this;
              vm.toPage(realIndex);
            },
          },
          observer: true,
        },
        swiperOption1: {
          loop: true,
          autoplay: 3000,
          speed: 1000,
          preventClicks: false,
          spaceBetween: 0,
          slidesPerView: 'auto',
          // centeredSlides: 'center',
          on: {
            click: function() {
              const { realIndex } = this;
              vm.toNPage(realIndex);
            },
          },
          observer: true,
        },
        swiperOption2: {
          loop: true,
          autoplay: 3000,
          speed: 1000,
          preventClicks: false,
          spaceBetween: 0,
          slidesPerView: 'auto',
          // centeredSlides: 'center',
          on: {
            click: function() {
              const { realIndex } = this;
              vm.toMPage(realIndex);
            },
          },
          observer: true,
        },
        totalCount: {
          sum_galaxy: 0,
        },
        list: [],
        mainList: [],
        newList: [],
        isIOS: 0,
      };
    },
    computed: {
      ...mapGetters(['radioList']),
      ...mapState(['balanceList']),
    },
    watch: {},
    methods: {
      toLogin(){
        this.$router.push({name: 'login',query:{from:'home'} })
      },
      isLogin(val) {
        if(!this.token){
          this.$toast('请登录后操作')
        }else{
          this.$router.push({name: val})
        }
      },
      async gameList(val) {
        try {
          const params = {
            is_new: val,
            page_size: 99,
          }
          const { data } = await gameList( params );
          this.$toast.loading().clear();
          if( params.is_new === 1 ){
            this.newList = data.list
          }else if ( params.is_new === 3 ){
             this.mainList = data.list
          }else if( params.is_new ===2 ){
            this.list = data.list;
            if (this.list.length > 1) {
              this.$refs.mySwiper.swiper.slideTo(1, 1000, false);
            } else {
              this.$refs.mySwiper.swiper.slideTo(0, 1000, false);
            }
          }
        } catch (e) {
        }
      },
      async getBalanceList() {
        try {
          const { data } = await getBalanceList();
          data.map((item) => {
            if(item.asset === "PGT"){
              this.totalCount.sum_galaxy = item.balance*1;
            }
          })
        } catch (e) {}
      },
      toMPage(val) {
        if (!this.token){
          this.$toast('请登录后操作')
          return
        }
        if (!cordova.InAppBrowser) {
          return;
        }
        const { token, sessionkey } = localStorage;
          let iframeSrc;
          if( !val.link ){
            iframeSrc = `${this.mainList[val].link}?token=${token}&sessionkey=${sessionkey}`
          }else{
            iframeSrc = `${val.link}?token=${token}&sessionkey=${sessionkey}`
          }
          cordova.InAppBrowser.open(iframeSrc, '_blank', 'location=no,toolbar=yes,toolbarposition=bottom,closebuttoncaption=关闭');
      },
      toPage(val) {
        if (!this.token){
          this.$toast('请登录后操作')
          return
        }
        // console.log(11111, val);
        // if (this.isIOS) {
           if (!cordova.InAppBrowser) {
            return;
          }
          // toolbar=yes 仅iOS有效,提供关闭、返回、前进三个按钮
          // toolbarposition=top/bottom 仅iOS有效,决定toolbar的位置
          // closebuttoncaption=关闭 仅iOS有效
          // window.location.open(this.iframeSrc);
          // ${this.$route.query.url}?token=${token}&sessionkey=${sessionkey}
          const { token, sessionkey } = localStorage;
          let iframeSrc;
          if( !val.link ){
            iframeSrc = `${this.list[val].link}?token=${token}&sessionkey=${sessionkey}`
          }else{
            iframeSrc = `${val.link}?token=${token}&sessionkey=${sessionkey}`
          }
          cordova.InAppBrowser.open(iframeSrc, '_blank', 'location=no,toolbar=yes,toolbarposition=bottom,closebuttoncaption=关闭');
        // }else{
        //   // console.log(this.list[val].link)
        //   if( !val.link ){
        //     this.$router.push({
        //       name: 'iframePage',
        //       query: {
        //         url: this.list[val].link,
        //         title: this.list[val].title,
        //       },
        //     });
        //   }else{
        //     this.$router.push({
        //       name: 'iframePage',
        //       query: {
        //         url: val.link,
        //         title: val.title,
        //       },
        //     });
        //   }
        // }
        // this.$router.push({
        //   name: 'iframePage',
        //   query: {
        //     url: this.list[val].link,
        //     title: this.list[val].title,
        //   },
        // });
      },
      toNPage(val) {
        if (!this.token){
          this.$toast('请登录后操作')
          return
        }
        // if (this.isIOS) {
          if (!cordova.InAppBrowser) {
            return;
          }
          const { token, sessionkey } = localStorage;
          let iframeSrc = `${this.newList[val].link}?token=${token}&sessionkey=${sessionkey}`
          cordova.InAppBrowser.open(iframeSrc, '_blank', 'location=no,toolbar=yes,toolbarposition=bottom,closebuttoncaption=关闭');
        // }else{
        //   this.$router.push({
        //     name: 'iframePage',
        //     query: {
        //       url: this.newList[val].link,
        //       title: this.newList[val].title,
        //     },
        //   });
        // }
      }
    },
    mounted() {
      this.token = localStorage.getItem("token") || "";

      const { token, sessionkey } = localStorage;
      console.log(token)
      console.log(sessionkey)
      const u = navigator.userAgent;
      this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
      this.gameList(3);
      this.gameList(1);
      this.gameList(2);
      if(this.token){
        this.getBalanceList();
      }
      vm = this;
    },
  };
</script>

<style lang="scss" scoped>
.game-page {
  height: 100%;
  font-size: 32px;
  color: #fff;
  position: relative;
  .top-title{
    .van-nav-bar__text{
      font-size: px2rem(44);
      color: #FFDD5C;
      font-family:PingFangSC-Medium,PingFangSC;
      font-weight: 500;
    }
  }
  .wrap {
    display: flex;
    flex-direction: column;
    padding-bottom: 150px;
    .main-theme {
      width: 670px;
      height: 320px;
      margin: 40px auto;
      background: url("../../assets/familyTree/bg-1@2x.png") no-repeat center;
      background-size: 670px 320px;
      padding: 40px 20px;
      .login-btn{
        margin: auto;
        width:320px;
        height:80px;
        border-radius:8px;
        border:2px solid rgba(253,219,91,1);
        font-size:28px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(253,219,91,1);
        line-height:80px;
        text-align: center;
      }
      p {
        font-size: 28px;
        color: #fff;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &:first-child {
          margin-bottom: 40px;
          span {
            &:last-child {
              color: #ffffff;
            }
          }
        }
        &:last-child {
          font-size: 56px;
          span {
            &:last-child {
              color: #ffffff;
            }
          }
        }
      }
    }
    .assets-handle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      font-size: 36px;
      border-radius: 12px;
      width: 670px;
      margin: 0 auto 20px auto;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 330px;
        height: 120px;
        flex: none;
        background: rgba(32,38,52,1);
        border-radius: 10px;
        color: #B5BAC5;
        font-size: 24px;
        position: relative;
        img {
          margin-right: 10px;
          width: 36px;
        }
        .tips {
          position: absolute;
          right: 20px;
          bottom: 12px;
          display: inline-block;
          height:24px;
          line-height: 24px;
          padding: 0 10px;
          border-radius: 12px;
          border: 2px solid rgba(255,221,92,1); /*no*/
          color: #FFDD5C;
          font-size: 16px;
        }
      }
    }
    .swiper-content1 {
      margin-left: 40px;
      .title {
        margin: 40px 0 40px 0;
        font-size: 32px;
        color: #B5BAC5;
      }
      .swiper-container {
        .swiper-slide:first-child{
          margin: 0 10px 0 0;
        }
        .swiper-slide:last-child{
          margin: 0 0 0 10px;
        }
        .swiper-slide {
          margin: 0 10px;
          text-align: center;
          // transform: scale(0.9);
          // transition: all ease .3s;
          width: 200px;
          height: 280px;
          background-color: #202634;
          padding: 20px 15px;
          img {
            width: 100%;
            height: 214px;
          }
          p {
            color: #FFFFFF;
            font-size: 24px;
            // margin-top: 10px;
          }
        }
        .swiper-slide-active, .swiper-slide-duplicate-active {
          transform: scale(1);
        }
      }
    }
    .swiper-content {
      margin-left: 40px;
      .title {
        margin: 40px 0 40px 0;
        font-size: 32px;
        color: #B5BAC5;
      }
      .swiper-container {
        .swiper-slide {
          text-align: center;
          transform: scale(0.9);
          transition: all ease .3s;
          width: 610px;
          background-color: #202634;
          padding: 20px 15px;
          img {
            width: 580px;
            height: 326px;
            // width: 100%;
          }
          p {
            color: #FFFFFF;
            font-size: 28px;
            margin-top: 10px;
            &:last-child {
              font-size: 20px;
              color: #B5BAC5;
              line-height:28px;
            }
          }
        }
        .swiper-slide-active, .swiper-slide-duplicate-active {
          transform: scale(1);
        }
      }
    }
    .all-list{
      .title {
        margin: 40px 0 40px 40px;
        font-size: 32px;
        color: #B5BAC5;
      }
      .list{
        margin: 0 40px;
        display: flex;
        flex-wrap:wrap;
        overflow: auto;
        .list-one{
          // display: flex;
          text-align: center;
          margin: 20px 26px;
          width: 128px;
          &:nth-child(4n+1){
            margin: 20px 26px 0 0;
          }
          &:nth-child(4n){
            margin: 20px 0 0 26px;
          }
          img{
            height: 128px;
            width: 128px;
            border-radius:8px;
          }
          p{
            font-size: 24px;
            color: #ffffff;
            font-family:PingFangSC-Regular,PingFangSC;
            font-weight:400;
          }
        }
      }
    }
    .bottom-img{
      margin-top: 40px;
      width: 100%;
      text-align: center;
      img{
        height: 180px;
        width: 670px;
      }
    }
  }
}
</style>
