<template>
    <div class="exchangeCTT page-layout">
      <van-nav-bar
        :title="$t('exchangeCTT.t1')"
        left-arrow
        @click-left="$router.back()"
      >
      </van-nav-bar>
      <div class="wrap">
          <div class="section">
            <div class="title">将游戏币兑换成CTT</div>
            <ul>
              <li v-for="(item) in list" :key="item.id"
                  :class="{'act': item.id === wayId }"
                  @click="changeWay(item)"
              >
                <p >{{ (item.ctt_number*1).toFixed(0) }}CTT</p>
                <p >需{{ (item.game_number*1).toFixed(0) }}游戏币</p>
              </li >
            </ul>
            <van-button class="submit_btn" @click="submit">立即兑换</van-button>
          </div>
      </div>
    </div>
</template>

<script>
import { getgameconvertlist, buygameconvert } from '@/api';

export default {
    name:'exchangeCTT',
    data() {
        return {
          list: [
            // { id: 1, game_number: 100, ctt_number: 80 },
            // { id: 2, game_number: 200, ctt_number: 180 },
            // { id: 3, game_number: 50, ctt_number: 480 },
            ],
          wayId: '',
        };
    },
    methods: {
      init() {
          this.getgameconvertlist();
      },
      async getgameconvertlist() {
        try {
            const params = {
              side: '1'
            }
            const { data } = await getgameconvertlist(params);
            this.list = data;
            this.wayId = data[0].id;
        } catch (e) {
        }
      },
       async buygameconvert() {
        try {
          const load = this.$toast.loading();
          const params = {
            convert_id: this.wayId,
          };
          const res = await buygameconvert(params);
          load.clear();
          this.$toast.success(res.msg);
        } catch (e) {
        }
      },
      submit () {
        this.buygameconvert();
      },
      changeWay (val) {
        this.wayId = val.id; 
      },
    },
    mounted() {
        this.init();
    },
}
</script>

<style lang="scss" scoped>
  .exchangeCTT{
    .wrap {
     .section {
        position: relative;
        width: 670px;
        height: 860px;
        background:rgba(32,38,52,1);
        border-radius: 16px;
        margin: 30px auto;
        padding: 0 40px;
        overflow: hidden;
     .title {
        margin: 40px auto 50px auto;
        font-size:28px;
        font-weight:600;
        color:rgba(255,255,255,1);
      }
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          flex: none;
          width:290px;
          height:100px;
          margin-top: 20px;
          border-radius:8px;
          border:2px solid rgba(255,255,255, .3);
          padding-top: 12px;
          &.act {
            background:rgba(255,221,92,0.25);
            border:2px solid rgba(255,221,92,1);
            p {
              color: #FFDD5C;
            }
          }
          p {
            font-size:28px;
            font-weight:600;
            color: rgba(255,255,255, .8);
            line-height: 40px;
            // margin-bottom: 44px;
            text-align: center;
            &:nth-of-type(2) {
              margin-bottom: 40px;
              font-size: 32px;
            //   color: #FFDD5C;
            }
            &:last-child {
              font-size: 24px;
              font-weight: 400;
              position: relative;
            }
          }
        }
      }
      .submit_btn {
        position: absolute;
        bottom: 50px;
        height: 88px;
        width: 590px;
      }
     }
  }
  }
</style>
