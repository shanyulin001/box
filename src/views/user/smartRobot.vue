<template>
    <div class="smart-robot-wrap page-layout">
      <van-nav-bar
        title="智能机器人"
        left-arrow
        @click-left="$router.back()"
      />
      <div class="wrap">
          <div class="section">
            <div class="title">立即开通智能机器人，每日拾取不用愁</div>
            <ul>
              <li v-for="(item) in list" :key="item.id"
                  :class="{'act': item.id === currentId }"
                  @click="changeMonth(item)"
              >
                <p >{{ item.title }}</p>
                <p >{{ (item.price*1).toFixed(0) }} <span class="code">USDT</span></p>
                <p >{{ (item.original_price*1).toFixed(0) }}<span class="code">USDT</span></p>
              </li >
            </ul>
            <div class="pay-list">
              <div class="title">选择支付方式</div>
              <div class="item" v-for="(item, index) in payList"
                   :class="{'act': item === currentCode }"
                   :key="index" @click="changeCode(item)">
                <div class="l">{{ item }}支付</div>
                <div class="r" v-if="item === 'USDT'">需要支付{{ payUSDT.toFixed(2) }}{{ item }}</div>
                <div class="r" v-if="item === 'CTT'">需要支付{{ payCTT.toFixed(2) }}{{ item }}</div>
              </div>
            </div>
            <van-button class="submit_btn" @click="submit">开通</van-button>
          </div>
      </div>
    </div>
</template>

<script>
import { getcollectrobotlist, buycollectrobot } from '@/api';

export default {
  name: 'smartRobot',
  data() {
    return {
      list: [
        // { month: 1, money: 100, truemoney: 80 },
        // { month: 3, money: 200, truemoney: 180 },
        // { month: 6, money: 50, truemoney: 480 },
      ],
      payList: ['USDT', 'CTT'],
      payUSDT: 0,
      payCTT: 0,
      currentCode: 'USDT',
      currentId: 1,
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getcollectrobotlist();
    },
    async getcollectrobotlist() {
      try {
        const { data } = await getcollectrobotlist();
        // this.getNumber = data.release_amount;
        // const list = this.balanceList.filter(e => e.asset === 'TTT');
        // if (list.length > 0) {
        //   this.dataInfo = list[0];
        // }
        this.list = data;
        this.payUSDT = data[0].usdt_price*1;
        this.payCTT = data[0].ctt_price*1;
      } catch (e) {
      }
    },
     async buycollectrobot() {
        try {
          this.disabled = true;
          const load = this.$toast.loading();
          const params = {
            robot_id: this.currentId,
            coin: this.currentCode,
          };
          // console.log(params);
          const res = await buycollectrobot(params);
          load.clear();
          this.$toast.success(res.msg);
        } catch (e) {
          this.disabled = false;
        }
      },
    changeMonth(val) {
      this.currentId = val.id;
      this.payUSDT = val.usdt_price*1;
      this.payCTT = val.ctt_price*1;
    },
    changeCode(val) {
      this.currentCode = val;
    },
    submit() {
      const that = this;
      this.$dialog.confirm({
        message: '您是否要开通智能机器人？',
      }).then(() => {
        this.buycollectrobot()
        console.log(111);
      }).catch((e) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.smart-robot-wrap {
  .wrap {
    .section {
      width: 670px;
      height: 900px;
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
        li {
          flex: none;
          width:180px;
          height:220px;
          border-radius:8px;
          border:2px solid rgba(255,255,255, .3);
          padding-top: 28px;
          &.act {
            background:rgba(255,221,92,0.25);
            border:2px solid rgba(255,221,92,1);
            p {
              &:first-child {
                color: #FFDD5C;
              }
            }
          }
          p {
            font-size:28px;
            font-weight:600;
            color: rgba(255,255,255, .8);
            line-height: 1;
            margin-bottom: 30px;
            text-align: center;
            &:nth-of-type(2) {
              margin-bottom: 40px;
              font-size: 32px;
              color: #FFDD5C;
            }
            &:last-child {
              font-size: 24px;
              position: relative;
              .code {
                display: inline-block;
                transform: scale(.7);
              }
              &::after {
                content: '';
                display: block;
                position: absolute;
                width: 130px;
                height: 2px; /*no*/
                left: 50%;
                margin-left: -65px;
                top: 50%;
                background-color: #fff;
              }
            }
            .code {
              font-size: 20px;
            }
          }
        }
      }
      .item {
        display: flex;
        justify-content: space-between;
        font-size:24px;
        font-weight:600;
        color:rgba(181,186,197,1);
        margin-bottom: 40px;
        height: 50px;
        line-height: 50px;
        padding-right: 60px;
        background: url("./../../assets/familyTree/select-icon.png") right center no-repeat;
        background-size: 40px 40px;
        &.act {
          background: url("./../../assets/familyTree/selected-icon.png") right center no-repeat;
          background-size: 40px 40px;
          color: #FFDD5C;
          .r {
            font-size:20px;
            color: #FFDD5C;
          }
        }
        .r {
          font-size:20px;
          color: #ffffff;
        }
      }
      .submit_btn {
        margin-top: 80px;
      }
    }
  }
}
</style>
