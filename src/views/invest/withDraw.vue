<template>
<!-- 折跃界面 -->
    <div class="with-draw-wrap page-layout">
      <van-nav-bar
        :title="$t('withDraw.t1')"
        left-arrow
        @click-left="$router.back()"
      >
      </van-nav-bar>
      <div class="wrap">
        <div class="main-theme">
          <p>
            <span>{{ $t('withDraw.t2') }}（USDT）</span>
            <span>{{ $t('global.unit') }}（CTT）</span>
          </p>
          <p>
            <span>{{ totalCount.sum_usdt | filterCEC }}</span>
            <span>{{ totalCount.sum_galaxy | filterCEC }}</span>
          </p>
        </div>
        <div class="btn-section" @click="toPage">
          <span class="l">{{ $t('withDraw.t3') }}</span>
          <span class="r">x {{ jumpNumber }}</span>
          
        </div>
        <div class="list-section">
          <div class="title">{{ $t('withDraw.t4') }}</div>
          <ul>
            <li v-for="(item, index) in coinList" :key="index" @click="checkList(item)">
              <div class="li" v-if="item.asset !== 'PGT'" :class="{'act': selectList.includes(item.id)}">
                <div class="info">
                  <img :src="item.img" alt="">
                  <div class="asset">
                    <p>{{ item | showName }}</p>
                    <p>{{ item.ratio || 0 }}</p>
                  </div>
                </div>
                <div class="amount">
                  {{ (typeof item !== 'undefined') ? item.balance : '' | filterCEC }}
                  &nbsp;&nbsp;{{ item.asset }}
                </div>
              </div>
            </li>
            <!-- <li v-for="(item, index) in coinList"
                :key="index" @click="checkList(item)"
                :class="{'act': selectList.includes(item.id)}">
              <div class="info">
                <img :src="item.img" alt="">
                <div class="asset">
                  <p>{{ item | showName }}</p>
                  <p>{{ item.ratio }}</p>
                </div>
              </div>
              <div class="amount">{{ item.balance | filterCEC  }} &nbsp;{{ item.asset }}</div>
            </li> -->
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { totalAsset, getjumpprofit } from '@/api';

export default {
    name: 'withDraw',
    data() {
        return {
          selectList: [],
          dataInfo: {},
          totalCount: {},
          jumpprofit: {},
          jumpNumber: 0,
        };
    },
    computed: {
      ...mapGetters(['coinList', 'radioList']),
    },
    mounted() {
      this.totalAsset();
      this.getjumpprofit();
    },
    methods: {
      checkList(val) {
        // console.log(val);
        if(val.asset === 'USDT'){
          this.jumpNumber = this.jumpprofit.usdt_profit_ratio;
        }else if(val.asset === 'CTT') {
          this.jumpNumber = this.jumpprofit.ctt_profit_ratio;
        }else if(val.asset === 'CPG') {
          this.jumpNumber = this.jumpprofit.cpg_profit_ratio;
        }else{
           this.jumpNumber = 0;
        }
        if (this.selectList.includes(val.id)) {
          this.selectList.splice(this.selectList.indexOf(val), 1);
        } else {
          // 数组初始化，实现单选
          this.selectList = [];
          this.selectList.push(val.id);
        }
      },
      async totalAsset() {
        try {
          const { data } = await totalAsset();
          this.totalCount = data;
        } catch (e) {}
      },
      async getjumpprofit() {
        try {
          const { data } = await getjumpprofit();
          this.jumpprofit = data;
        } catch (e) {}
      },
      toPage() {
        localStorage.drawList = JSON.stringify(this.selectList);
        this.$router.push({
          name: 'handlerDraw',
        });
      },
    },
};
</script>

<style lang="scss" scoped>
.with-draw-wrap {
  .main-theme {
    width: 670px;
    height: 320px;
    margin: 40px auto;
    background: url("../../assets/familyTree/bg-1@2x.png") no-repeat center;
    background-size: 670px 320px;
    padding: 40px 20px;
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
            color: #90939A;
          }
        }
      }
      &:last-child {
        font-size: 56px;
        span {
          &:last-child {
            color: #FFDD5C;
          }
        }
      }
    }
  }
  .btn-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 670px;
    height: 100px;
    margin: 20px auto;
    background-color: #202634;
    border-radius:10px;
    font-size: 28px;
    padding: 0 20px;
    .l {
      color: rgba(255,255,255,1);
    }
    .r {
      color: #FFDD5C;
    }
  }
  .list-section {
    width: 670px;
    margin: 0 auto;
    font-size: 28px;
    color: #fff;
    overflow: hidden;
    .title {
      margin: 0 20px 20px 20px;
      color: #B5BAC5;
    }
    ul {
      .li {
        height: 128px;
        border-radius: 10px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 100px 0 20px;
        background: url("../../assets/familyTree/select-icon.png") no-repeat 610px center #202634;
        background-size: 40px 40px;
        &.act {
          background: url("../../assets/familyTree/selected-icon.png") no-repeat 610px center #202634;
          background-size: 40px 40px;
        }
        .info {
          height: 100%;
          display: flex;
          align-items: center;
          img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin-right: 20px;
          }
          .asset {
            height: 84px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p:last-child {
              color: rgba(255,255,255,.4);
            }
          }
        }
      }
    }
  }
}
</style>
