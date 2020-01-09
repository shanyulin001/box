<template>
    <div class="transferAccounts-wrap">
      <van-nav-bar
        title="转账"
        left-arrow
        @click-left="$router.back()"
      />
      <div class="wrap">
          <!-- <div class="section">
            <div class="title">{{ $t('transferAccounts.t1') }}</div>
                <van-field type="text" v-model="address" clearable :placeholder="$t('transferAccounts.t2')" />
            <div class="title mt70">{{ $t('transferAccounts.t3') }}</div>
                <van-field type="number" v-model.number="amount" clearable :placeholder="$t('extract.t5') + asset">
                    <span slot="right-icon">{{ asset }}</span>
                </van-field>
            <div class="tip">
                {{ $t('extract.t6') }}{{ balance | filterCEC }} &nbsp; {{ asset }}，
                <span @click="toAll">{{ $t('extract.t7') }}</span></div>
            </div>
            <div class="handler">
                <van-button class="submit_btn" :disabled="disabled" @click="assetDraw">{{ $t('extract.t1') }}</van-button>
            </div> -->
            <div class="section">
                <div class="title">{{ $t('transferAccounts.t1') }}</div>
                  <van-field v-model="toAccount" clearable :placeholder="$t('transferAccounts.t2')" />
                <div class="title mt70">{{ $t('transferAccounts.t3') }}</div>
                  <div class="cttTe">
                    <van-field class="tInput" type="text" v-model="num" clearable placeholder="" ></van-field>
                    <span>CTT</span>
                  </div>
                <div class="all">
                  <span>余额：{{ totalCount.sum_ggt | filterCEC }}</span>
                  <span @click="num = totalCount.sum_ggt">全部</span>
                </div>
                <div class="title">{{ $t('transferAccounts.t6') }}</div>
                  <van-field style="height: auto" v-model="remark" rows="1" type="textarea" autosize clearable :placeholder="$t('transferAccounts.t6')" />
                <div class="handler">
                    <van-button class="submit_btn" :disabled="disabled" @click="transferAccounts">{{ $t('transferAccounts.t7') }}</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { transferAccounts, totalAsset } from '@/api';

export default {
    name: 'transferAccounts',
    data() {
        return {
            toAccount: '',
            num: '',
            remark: '',
            disabled: false,
            totalCount: {},
        };
    },
    mounted() {
        this.totalAsset();
    },
    methods: {
        async totalAsset() {
            try {
                const { data } = await totalAsset();
                this.totalCount = data;
            } catch (e) {}
        },
        async transferAccounts() {
            if (!this.toAccount) {
            return this.$toast.fail('请输入收款账号');
            }
            if (!this.num) {
            return this.$toast.fail('请填写转账数量');
            }
            try {
            this.disabled = true;
            const load = this.$toast.loading();
            const params = {
                to_account: this.toAccount,
                num: this.num,
                remark: this.remark,
            };
            // console.log(params);
            const res = await transferAccounts(params);
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
    },
}
</script>

<style lang="scss" scoped>
.transferAccounts-wrap{
 .wrap {
      background: #202634;
      width:670px;
      border-radius:16px;
      overflow: hidden;
      position: relative;
      margin: 30px auto;
      .section{
          padding: 0 40px;
          .title{
            margin: 40px 0 10px 0;
            height:50px;
            font-size:36px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(181,186,197,1);
            line-height:50px
          }
          .van-cell{
            margin-top: 10px;
            height: 30px;
            padding: 0;
            background-color: #202634;
            .van-cell__value{
                height: 30px;
            }
          }
          .cttTe{
              display: flex;
              align-items: center;
              justify-content: space-between;
              .van-cell:not(:last-child)::after{
                border-bottom: none;
              }
              span{
                margin-top: 20px;
                margin-left: 16px;
                width:48px;
                height:40px;
                font-size:28px;
                font-family:PingFangSC-Semibold,PingFang SC;
                font-weight:600;
                color:rgba(255,255,255,1);
              }
            }
          .all{
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            span{
                font-size:24px;
                font-family:PingFangSC-Semibold,PingFang SC;
                font-weight:600;
                color:rgba(153,153,153,1);
                line-height:34px;
                &:last-child{
                    color: #FFDD5C;
                }
            }
          }
          .tInput{
            width: 100%;
            border: 4px solid rgba(255, 255, 255, 0.2);
          }
          .handler{
            margin: 72px auto 60px auto;
            width:300px;
            height:72px;
            background:linear-gradient(90deg,rgba(255,221,92,1) 0%,rgba(255,197,0,1) 100%);
            border-radius:43px;
            span{
              color: #000;
              font-size: 28px;
            }
          }
      }
 }
}
</style>
