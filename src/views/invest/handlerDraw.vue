<template>
    <div class="handler-draw-wrap page-layout">
      <van-nav-bar
        :title="$t('handlerDraw.t1')"
        left-arrow
        @click-left="$router.back()"
      >
      </van-nav-bar>
      <div class="wrap">
        <div class="form">
          <div class="title">{{ $t('handlerDraw.t2') }}</div>
          <van-field v-model="totalAmount" placeholder="">
            <span slot="right-icon">USDT</span>
          </van-field>
        </div>
        <ul class="list">
          <li v-for="(item, index) in list" :key="index">
            <div class="info">
              <img :src="item.img" alt="">{{ item | showName  }}
            </div>
            <div class="amount">{{ item.balance | filterCEC }} &nbsp;{{ item.asset }}</div>
          </li>
        </ul>
        <div class="handler">
          <van-button class="submit_btn" @click="submit">{{ $t('handlerDraw.t1') }}</van-button>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { jumpSave, jumpAmount } from '@/api';

export default {
    name: 'handlerDraw',
    data() {
        return {
          list: [],
          totalAmount: '',
        };
    },
    computed: {
      ...mapGetters(['radioList']),
      ...mapState(['balanceList']),
    },
    activated() {
      this.init();
    },
    methods: {
      init() {
        const list = JSON.parse(localStorage.drawList);
        const obj = {};
        list.forEach((e) => { obj[e] = e; });
        this.list = [];
        this.balanceList.forEach((item) => {
          if (obj[item.id]) {
            this.list.push(item);
          }
        });
        this.jumpAmount();
      },
      async jumpAmount() {
        try {
          const load = this.$toast.loading();
          const params = this.list.map(e => e.id);
          console.log(params);
          const { data } = await jumpAmount({ ids: params });
          load.clear();
          this.totalAmount = data.usdt_number;
        } catch (e) {
        }
      },
      async submit() {
        try {
          const load = this.$toast.loading();
          const params = this.list.map(e => e.id);
          console.log(params);
          const res = await jumpSave({ ids: params, number: this.totalAmount });
          load.clear();
          this.$toast.success(res.msg);
          setTimeout(() => {
            this.$router.replace({ name: 'home' });
          }, 1000);
        } catch (e) {
        }
      },
    },
};
</script>

<style scoped>
  .handler-draw-wrap >>> .van-field .van-field__control {
    color: #FFDD5C!important;
  }
</style>
<style lang="scss" scoped>
.handler-draw-wrap {
  .form {
    width: 670px;
    margin: 40px auto;
    .title {
      font-size:32px;
      color:rgba(181,186,197,1);
      margin-bottom: 40px;
    }
    .van-field {
      font-size: rem(44);
    }
    .van-field__right-icon span {
      font-size: rem(28);
    }
  }
  ul.list {
    width: 670px;
    margin: 0 auto;
    li {
      height: 128px;
      border-radius: 10px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      background: #202634;
      color: #5A5F6C;
      font-size:28px;
      .info {
        height: 100%;
        display: flex;
        align-items: center;
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
  }
  .handler {
    margin: 130px auto 0 auto;
    text-align: center;
    .submit_btn {
      height: 88px;
      width: 670px;
    }
  }
}
</style>
