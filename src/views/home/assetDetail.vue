<template>
    <div class="asset-detail page-layout">
      <van-nav-bar
        :title="asset"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="wrap">
        <div class="asset-top">
          <div class="title">{{ $t('assetDetail.t1') }}{{ asset }}</div>
          <div class="amount">
            <p>{{ assetInfo.balance | filterCEC }}  {{ asset }}</p>
            <p>≈$ {{ toUSD }}</p>
          </div>
          <div class="address" @click="copyText(assetInfo.addr)">{{ assetInfo.addr }}<i></i></div>
        </div>
        <div class="asset-btn">
          <van-cell :title="$t('assetDetail.t2')" @click="toPage" is-link></van-cell>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';


export default {
  name: 'assetDetail',
  data() {
    return {
      isLoad: false,
      list: [],
      title: '',
      type: 0, // 1--OMNI，2--ERC20
      assetInfo: {},
      qrSrc: '',
      asset: '',
    };
  },
  computed: {
    ...mapState([
      'balanceList',
    ]),
    ...mapGetters([
      'radioList',
    ]),
    balance() {
      return this.assetInfo.balance || 0;
    },
    toUSD() {
      console.log(this.radioList);
      let res = 0;
      if (this.title) {
        const { ratio } = this.radioList[this.title];
        res = this.Big(this.balance).times(ratio).toFixed(4);
      }
      return res;
    },
  },
  mounted() {
    this.getAssetList().then(() => {
      this.init();
    });
  },
  methods: {
    init() {
      // asset是币种
      const { asset } = this.$route.query;
      const { type } = this.$route.query;
      this.title = asset;
      this.type = type;
      this.balanceList.forEach((item) => {
        if (item.asset === asset) {
          if (asset === 'USDT') {
            if (item.chain_protocol_type === Number(type)) {
              this.assetInfo = item;
            }
            if (Number(type) === 1) {
              this.asset = 'USDT-OMNI';
            } else {
              this.asset = 'USDT-ERC20';
            }
          } else {
            this.asset = asset;
            this.assetInfo = item;
          }
        }
      });
    },
    toPage() {
      this.$router.push({ name: 'recharge', query: { asset: this.title, type: this.type } });
    },
    toList() {
      this.$router.push({ name: 'tranList' });
    },
    showName(val) {
      let res = '';
      if (this.type === 1) {
        res = val && val.type.value;
      } else {
        res = val && val.title;
      }
      return res;
    },
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.asset-detail {
  overflow: auto;
  .wrap {
    flex: 1;
    overflow: auto;
    .asset-top {
      width: 670px;
      height: 320px;
      background: url("../../assets/home/bg-2@2x.png") no-repeat center;
      background-size: cover;
      padding: 40px 20px;
      box-sizing: border-box;
      margin: 40px auto;
      overflow: auto;
      .title {
        font-size: 28px;
        color: #90939A;
      }
      .amount {
        margin-top: 15px;
        color: #fefefe;
        font-weight: bold;
        font-size: 56px;
        p {
          margin-bottom: 20px;
          line-height: 64px;
          white-space: nowrap;
          &:last-of-type {
            font-size:36px;
            line-height: 42px;
          }
        }
      }
      .address {
        color: #90939A;
        font-size: 28px;
        text-align: right;
        vertical-align: middle;
      }
    }
    .asset-btn {
      margin-bottom: 30px;
      padding: 0 40px;
      .van-cell {
        background-color: #202634;
        border-bottom-color: #202634;
        .van-cell__title {
          max-width: none;
        }
      }
    }
  }
}
</style>
