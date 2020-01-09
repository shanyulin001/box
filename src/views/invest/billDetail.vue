<template>
    <div class="bill-detail-wrap" v-if="isLoad">
      <van-nav-bar
        :title="$t('billDetail.t1')"
        left-arrow
        @click-left="$router.back()"
      />
        <div class="header">
          <!-- 1充值  2 提现 3游戏 4折跃 5拾取折跃 6流失-->
            <p>
                <i class="bill-type" :class="'t' + dataInfo.type.key"></i>{{ dataInfo.title }}
            </p>
            <p v-if="dataInfo.type.key !== 9">{{ dataInfo.number }}</p>
            <p v-else>{{ parseFloat(dataInfo.number)-parseFloat(dataInfo.deal_fee) }}</p>
            <p class="t1">{{ $t('billDetail.t2') }}</p>
        </div>
        <div class="content">
            <div class="item van-hairline--bottom">
                <label>{{ labelText1 }}</label><span>{{ dataInfo.number }}</span>
            </div>
            <div class="item van-hairline--bottom" v-if="dataInfo.type.key !== 9 && dataInfo.type.key !== 10">
                <label>{{ labelText2 }}</label><span>{{ dataInfo | showName }}</span>
            </div>
            <div class="item van-hairline--bottom" v-if="dataInfo.type.key === 2 || dataInfo.type.key === 9">
                <label>{{ $t('billDetail.t3') }}</label><span>{{ dataInfo.deal_fee }}</span>
            </div>
            <div class="item van-hairline--bottom" v-if="dataInfo.type.key === 9">
                <label>{{ $t('billDetail.t27') }}</label><span>{{ dataInfo.to }}</span>
            </div>
            <div class="item van-hairline--bottom" v-if="dataInfo.type.key === 10">
                <label>{{ $t('billDetail.t31') }}</label><span>{{ dataInfo.to }}</span>
            </div>
            <div class="item van-hairline--bottom" v-if="dataInfo.type.key < 3">
                <label>{{ labelText3 }}</label><span>{{ dataInfo.to }}</span>
            </div>
            <div class="item van-hairline--bottom" v-if="dataInfo.type.key === 3">
                <label>{{ $t('billDetail.t4') }}</label><span>{{ dataInfo.sn }}</span>
            </div>
            <div class="item van-hairline--bottom" v-if="dataInfo.type.key === 3">
                <label>{{ $t('billDetail.t5') }}</label><span>{{ dataInfo.deal_fee }}</span>
            </div>
            <div class="item van-hairline--bottom">
                <label>{{ labelText4 }}</label><span>
              {{ dataInfo.add_time | formatDate('YYYY-MM-DD HH:mm') }}</span>
            </div>
            <div class="item van-hairline--bottom" v-if="dataInfo.type.key !== 3">
                <label>{{ labelText5 }}</label><span>{{ dataInfo.sn }}</span>
            </div>
        </div>
<!--        <div class="tip">未通过的款项会回到用户账户中</div>-->
    </div>
</template>

<script>
import { getUserAssetDetail } from '@/api';

export default {
    name: 'billDetail',
    data() {
        return {
            dataInfo: {},
            labelText1: '',
            labelText2: '',
            labelText3: '',
            labelText4: '',
            labelText5: '',
            isLoad: false,
        };
    },
    computed: {
    },
    activated() {
        this.getData();
    },
    methods: {
        async getData() {
            const load = this.$toast.loading();
            try {
                const params = {
                    id: this.$route.query.id,
                };
                const { data } = await getUserAssetDetail(params);
                load.clear();
                this.dataInfo = data;
                this.isLoad = true;
                const type = data.type.key;
                switch (type) {
                    case 1:
                        this.labelText1 = this.$t('billDetail.t6');
                        this.labelText2 = this.$t('billDetail.t7');
                        this.labelText3 = this.$t('billDetail.t8');
                        this.labelText4 = this.$t('billDetail.t9');
                        this.labelText5 = this.$t('billDetail.t10');
                        break;
                    case 2:
                        this.labelText1 = this.$t('billDetail.t12');
                        this.labelText2 = this.$t('billDetail.t13');
                        this.labelText3 = this.$t('billDetail.t14');
                        this.labelText4 = this.$t('billDetail.t15');
                        this.labelText5 = this.$t('billDetail.t16');
                        break;
                    case 3:
                        this.labelText1 = this.$t('billDetail.t17');
                        this.labelText2 = this.$t('billDetail.t18');
                        this.labelText3 = '';
                        this.labelText4 = this.$t('billDetail.t19');
                        break;
                  case 4:
                    this.labelText1 = this.$t('billDetail.t20');
                    this.labelText2 = this.$t('billDetail.t21');
                    this.labelText3 = this.$t('billDetail.t22');
                    this.labelText4 = this.$t('billDetail.t23');
                    this.labelText5 = this.$t('billDetail.t24');
                    break;
                  case 5:
                    this.labelText1 = this.$t('billDetail.t20');
                    this.labelText2 = this.$t('billDetail.t21');
                    this.labelText3 = this.$t('billDetail.t22');
                    this.labelText4 = this.$t('billDetail.t23');
                    this.labelText5 = this.$t('billDetail.t24');
                    break;
                  case 6:
                    this.labelText1 = '租用期限';
                    this.labelText2 = '下单时间';
                    this.labelText3 = '';
                    this.labelText4 = '';
                    this.labelText5 = '';
                    break;
                  case 9:
                    this.labelText1 = this.$t('billDetail.t25');
                    this.labelText2 = this.$t('billDetail.t26');
                    this.labelText3 = this.$t('billDetail.t27');
                    this.labelText4 = this.$t('billDetail.t28');
                    this.labelText5 = this.$t('billDetail.t29');
                    break;
                   case 10:
                    this.labelText1 = this.$t('billDetail.t30');
                    this.labelText3 = this.$t('billDetail.t31');
                    this.labelText4 = this.$t('billDetail.t32');
                    this.labelText5 = this.$t('billDetail.t33');
                    break;
                }
            } catch (e) {
                load.clear();
                console.log(e);
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.bill-detail-wrap {
    height: 100%;
    .header {
        text-align: center;
        p {
            font-size: 28px;
            font-weight: 500;
            line-height: 30px;
            color: #fff;
            &:first-of-type {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 28px;
                font-weight: 400;
                margin-top: 60px;
                margin-bottom: 40px;
                .bill-type {
                    display: inline-block;
                    width: 50px;
                    height: 50px;
                    margin-right: 20px;
                    /*1充值  2 提现 3游戏 4折跃 5拾取折跃 6流失 9转账给别人 10别人转账到账*/
                    &.t1 {
                      background: url("../../assets/familyTree/status-1-icon.png") no-repeat left center;
                      background-size: 50px 50px;
                    }
                    &.t2 {
                      background: url("../../assets/familyTree/status-2-icon.png") no-repeat left center;
                      background-size: 50px 50px;
                    }
                    &.t3 {
                      background: url("../../assets/familyTree/status-3-icon.png") no-repeat left center;
                      background-size: 50px 50px;
                    }
                    &.t4 {
                      background: url("../../assets/familyTree/status-4-icon.png") no-repeat left center;
                      background-size: 50px 50px;
                    }
                    &.t5 {
                      background: url("../../assets/familyTree/status-5-icon.png") no-repeat left center;
                      background-size: 50px 50px;
                    }
                    &.t6 {
                      background: url("../../assets/familyTree/status-6-icon.png") no-repeat left center;
                      background-size: 50px 50px;
                    }
                    &.t7 {
                      background: url("../../assets/familyTree/status-7-icon.png") no-repeat left center;
                      background-size: 50px 50px;
                    }
                    &.t9 {
                      background: url("../../assets/familyTree/status-9-icon.png") no-repeat left center;
                      background-size: 50px 50px;
                    }
                    &.t10 {
                      background: url("../../assets/familyTree/status-9-icon.png") no-repeat left center;
                      background-size: 50px 50px;
                    }
                }
            }
            &:nth-of-type(2) {
                margin-bottom: 40px;
                font-size: 56px;
            }
            &:nth-of-type(3) {
                margin-bottom: 40px;
                font-size: 28px;
                &.t1 {
                  color: #ffffff;
                }
                &.t2 {
                  color: #FF9E00;
                }
                &.t3 {
                  color: #FF0000;
                }
            }
        }
    }
    .content {
        width: 670px;
        margin: 0 auto;
        background-color: #202634;
        border-radius:16px;
        .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 28px;
            font-weight:400;
            color: #fff;
            height: 100px;
            padding: 0 40px;
            label {
                margin-right: 12px;
                white-space: nowrap;
                vertical-align: top;
            }
            span {
                word-break: break-all;
                padding-right: 30px;
                font-size: 24px;
                color: #B5BAC5;
                text-align: right;
            }
        }
    }
    .tip {
        font-size:15px;
        font-weight:400;
        color: #fff;
        line-height:21px;
        text-align: center;
        margin-top: 40px;
    }
}
</style>
