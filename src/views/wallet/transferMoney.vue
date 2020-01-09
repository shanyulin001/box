<template>
    <div class="transferMoney-page">
      <van-nav-bar
        title="转账"
        left-arrow
        @click-left="$router.back()"
      />
      <div class="wrap">
            <div class="section">
                <div class="title">收款地址</div>
                  <van-field class="ad" v-model="toAccount" clearable placeholder="请输入收款地址" right-icon="scan" @click-right-icon="qrScanning"/>
                <div class="title mt70" style="  display: flex;align-items: center;justify-content: space-between;">转账数量
                  <div style="display:flex;align-items: center;font-size:12px;color:#FFDD5C;" @click="coinShow = true">
                    <p style="margin-right:8px;">{{ coin }}</p>
                    <van-icon name="arrow" />
                  </div>
                </div>
                  <div class="cttTe">
                    <van-field class="tInput" type="text" v-model="num" clearable placeholder="" ></van-field>
                    <span>{{coin}}</span>
                  </div>
                <div class="all">
                  <span>余额：{{ balance | filterCEC }}</span>
                  <span @click="num = balance">全部</span>
                </div>
                <div class="title">{{ $t('transferAccounts.t6') }}</div>
                  <van-field style="height: auto" v-model="remark" rows="1" type="textarea" autosize clearable :placeholder="$t('transferAccounts.t6')" />
                <div class="title">矿工费</div>
                  <van-field style="height: auto" v-model="gasLimit" rows="1" type="textarea" autosize  disabled placeholder="请选择矿工费" right-icon="arrow" @click-right-icon="openChoose" />
                <div class="title">密码</div>
                  <van-field style="height: auto" v-model="password" rows="1" :type="passwordShow? 'password':'text'" autosize  placeholder="请输入钱包密码" right-icon="eye-o" @click-right-icon="pwdShow" />
                <div class="handler">
                    <van-button class="submit_btn" :disabled="disabled" @click="contentTransfer">{{ $t('transferAccounts.t7') }}</van-button>
                </div>
            </div>
      </div>
      <p class="wrap-title">最近转账</p>
      <div class="wrap">
        <ul>
          <li v-for="(item, index) in transfersList" :key="index">
            <div class="li-left">
              <p>{{ item.from }}</p>
              <p style="color:#FFFFFF">{{ item.remark }}</p>
            </div>
            <div style="text-align:right;">
              <p>{{ item.amount }}</p>
              <p>{{ item.time | formatDate('YYYY-MM-DD HH:mm')}}</p>
            </div>
          </li>
          <p v-if="transfersList.length == 0">暂无转账记录</p>
        </ul>
      </div>
      <van-popup
        v-model="chooseShow"
        position="top"
        >
        <van-slider
        v-model="value"
        :max="21"
        :min="1"
        :step="1"
        
        bar-height="4px"
        style="margin: 30px 0"
        active-color="#FFC500"
        >
            <div
                slot="button"
                style="padding:1px 5px;background-color:#FFC500;border-radius: 10px;"
            >
                {{ value/10000 }}
            </div>
        </van-slider>
      </van-popup>
      <van-actionsheet v-model="coinShow" :actions="actions" @select="onSelect" />
    </div>
</template>

<script>
import { contentTransfer, getTransfersList, getBalance } from '@/api';

export default {
    name: 'transferMoney-page',
    data() {
      return{
        value: 0,
        address: '',
        coin: 'CTT',
        toAccount: '',
        gasLimit: 0,
        balanceList:[],
        balance:0,
        num: '',
        remark: '',
        disabled: false,
        totalCount: {},
        transfersList: [],
        password: '',
        chooseShow: false,

        coinShow: false,
        actions: [
          { name: 'CTT' },
          { name: 'USDT' },
        ],
        passwordShow: true,
      }
    },
    watch:{
      value: function(newValue){
        this.gasLimit = newValue/10000
      }
    },
    methods:{
        qrScanning(decodedString){
          this.$toast('暂不支持，敬请期待')
          return
          this.$router.push({name:'scanPage'})
        },
        onChange(value) {
        this.$toast('当前值：' + value);
        },

        openChoose(){
          this.chooseShow = true;
        },
        pwdShow() {
          this.passwordShow = !this.passwordShow;
        },
        onSelect(item) {
          // 默认情况下，点击选项时不会自动关闭菜单
          // 可以通过 close-on-click-action 属性开启自动关闭
          this.coinShow = false;
          this.coin = item.name;
          this.balance = this.balanceList[item.name]
          this.num = '';
          // Toast(item.name);
        },
        async getTransfersList() {
            try {
              const params = {
                address: this.address,
                coin: this.coin
              }

              const { data } = await getTransfersList(params);
              // this.transfersList = data
            } catch (e) {}
        },
        async getBalance() {
          try {
              const params = {
                address: this.address,
              }

              const { data } = await getBalance(params);
              this.balanceList = data
              this.balance = data[this.coin]
            } catch (e) {}
        },
        async contentTransfer() {
            this.passwordShow = true;
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
                address: this.address,
                toaddress: this.toAccount,
                amount: this.num,
                gasLimit: this.gasLimit,
                remark: this.remark,
                password: this.password,
                coin: this.coin,
            };
            // console.log(params);
            const res = await contentTransfer(params);
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
    mounted(){
      this.address = this.$route.query.addressUrl;
      this.getBalance();
      this.getTransfersList();
    },
}
</script>

<style lang="scss">
.transferMoney-page{
  .wrap-title{
    font-size:28px;
    margin: 30px 40px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(170,170,170,1);
  }
  .wrap {
      background: #202634;
      width:670px;
      overflow: hidden;
      position: relative;
      margin: 30px auto;
      ul{
        padding: 40px 20px 20px 20px;
        li{
          padding: 20px 0  18px 0;
          border-bottom: 2px solid #ffffff;
          display:flex;
          justify-content: space-between;
          .li-left{
            p{
              width:252px;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            }
          }
          p{
            font-size:20px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:28px;
            &:last-child{
              color: #AAAAAA;
            }
          }
        }
      }
      .section{
        .ad{
          .van-field__right-icon{
            .van-icon{
              font-size: 30px;
            }
          }
        }
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
            border-radius:36px;
            span{
              color: #000;
              font-size: 28px;
            }
          }
      }
   }
}
</style>