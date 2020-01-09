<template>
    <div class="extract-wrap">
      <van-nav-bar @click-left="$router.back()" class="" :title="$t('extract.t1')" left-arrow>
        <i class="menu-icon" slot="right" />
      </van-nav-bar>
      <div class="page-layout">
        <div class="section">
          <div class="title">{{ $t('extract.t2') }}</div>
          <van-field type="text" v-model="address" clearable :placeholder="$t('extract.t3')">
            <i slot="right-icon" class="scan-icon" @click="scan"></i>
          </van-field>
          <div class="title mt70">{{ $t('extract.t4') }}</div>
          <van-field type="number" v-model.number="amount" clearable :placeholder="$t('extract.t5') + asset">
            <span slot="right-icon">{{ asset }}</span>
          </van-field>
          <div class="tip">
            {{ $t('extract.t6') }}{{ balance | filterCEC }} &nbsp; {{ asset }}，
            <span @click="toAll">{{ $t('extract.t7') }}</span></div>
        </div>
        <div class="handler">
          <van-button class="submit_btn" :disabled="disabled" @click="assetDraw">{{ $t('extract.t1') }}</van-button>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { assetDraw, getUserAssetQR } from '@/api';

export default {
    name: 'withDraw',
    data() {
        return {
          address: '',
          amount: '',
          asset: '', // 显示币种名称
          balance: '',
          chain_protocol_type: '',
          code: '', // 真实币种
          disabled: false,
        };
    },
    computed: {
      ...mapGetters(['coinList']),
    },
    activated() {
      const { asset } = this.$route.query;
      this.coinList.forEach((item) => {
        if (asset === item.id) {
          this.balance = item.balance;
          this.chain_protocol_type = item.chain_protocol_type;
          this.code = item.asset;
          if (item.asset === 'USDT') {
            if (item.chain_protocol_type === 1) {
              this.asset = 'USDT-OMNI';
            } else {
              this.asset = 'USDT-ERC20';
            }
          } else {
            this.asset = item.asset;
          }
        }
      });
    },
    methods: {
      async assetDraw() {
        if (!this.amount || parseInt(this.amount, 10) === 0) {
          return this.$toast.fail('数量错误');
        }
        if (!this.address) {
          return this.$toast.fail('请填写地址');
        }
        try {
          this.disabled = true;
          const load = this.$toast.loading();
          const params = {
            number: this.amount,
            type: this.chain_protocol_type,
            code: '',
            to: this.address,
            asset: this.code,
          };
          // console.log(params);
          const res = await assetDraw(params);
          load.clear();
          this.disabled = false;
          this.$toast.success(res.msg);
          setTimeout(() => {
            this.$router.push({ name: 'home' });
          }, 1000);
        } catch (e) {
          this.disabled = false;
        }
      },
      scan() {
        this.scanCode2().then((res) => {
          if (res) {
            this.address = res;
          } else {
            this.$toast('请对准钱包二维码');
          }
        });
      },
      toAll() {
        this.amount = this.balance;
      },
    },
};
</script>

<style lang="scss" scoped>
.extract-wrap {
  .section {
    width: 670px;
    margin: 40px auto;
    .title {
      margin-bottom: 40px;
      font-size:32px;
      font-weight:600;
      color:rgba(181,186,197,1);
      line-height:44px;
      &.mt70 {
        margin-top: 72px;
      }
    }
    .tip {
      font-size:24px;
      margin-top: 20px;
      span {
        color: #FFDD5C;
        font-size: 26px;
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
