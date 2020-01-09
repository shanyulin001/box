<template>
  <div class="privateKeyImport-page">
    <van-nav-bar
      :title="`导入${form.addActive}账户`"
      left-arrow
     @click-left="onClickLeft"
    />
    <div class="wrap">
      <p class="form-title" style="margin-top: 0;margin-bottom: 16px;">Active 私钥</p>
        <van-field type="text" v-model="form.privatekey" clearable placeholder="给您的钱包添加一个便于识别的备注名" />
      <p class="form-title">设置密码</p>
        <van-field type="password" v-model="form.password" clearable placeholder="输入密码至少6位，建议大小写字母混合" />
        <van-field type="password" v-model="form.repassword" clearable placeholder="重复输入密码" />
      <van-checkbox v-model="checked" class="agreement">我已经阅读并同意【服务及隐私条款】</van-checkbox>

      <div class="import-btn" @click="importBtn">导入钱包</div>
    </div>
  </div>
</template>

<script>
import { privatekeyImport } from '@/api';

export default {
  name: 'privateKeyImport-page',
  data () {
    return{
      checked: false,
      form:{
        privatekey:'',
        repassword:'',
        password:'',
        remark:'',
        addActive: '',
      }
    }
  },
  methods:{
    onClickLeft(){
      this.$router.push({ name: 'addAccout', query:{ addActive: this.form.addActive === 'CTT'? 0: 1} });
    },

    async importBtn() {
      if(!this.checked){
        this.$toast('同意并勾选相关条款后才能导入')
        return
      }
      try {
        const params = {
          privatekey: this.form.privatekey,
          password: this.form.password,
          repassword: this.form.repassword,
          remark: this.form.remark,
          coin: this.form.addActive
        };
        // console.log(params);
        const res = await privatekeyImport(params);
        let data = res.data.mnemonic
        let arr = {
          address: res.data.address,
          remark: res.data.remark
        }
        
        if(this.form.addActive == 'CTT'){
          //将CTT账户添加存储本地
          let templist = JSON.parse(localStorage.getItem("AccountData") || "[]");
          templist.push(arr);
          localStorage.setItem("AccountData", JSON.stringify(templist));
        }else{
          //将ETH账户添加存储本地
          let templist = JSON.parse(localStorage.getItem("ETHAccount") || "[]");
          templist.push(arr);
          localStorage.setItem("ETHAccount", JSON.stringify(templist));
        }

        this.$toast.success(res.msg);
      } catch (e) {
        this.disabled = false;
      }
    },
  },
  mounted() {
    this.form.addActive = this.$route.query.addActive
  },
}
</script>

<style lang="scss">
.privateKeyImport-page{
 .wrap{
    margin: 20px 30px 0 30px;
    padding: 40px 30px 96px 30px;
    background-color: #202634;
    .form-title{
     margin-top: 22px;
     margin-bottom: 16px;
     font-size:36px;
     font-family:PingFangSC-Regular,PingFang SC;
     font-weight:400;
     color:rgba(181,186,197,1);
    }
    .van-cell{
      padding: 10px 0;
      background-color: #202634;
    }
    .import-btn{
      margin: 100px auto 96px auto;
      width:300px;
      height:72px;
      background:linear-gradient(90deg,rgba(255,221,92,1) 0%,rgba(255,197,0,1) 100%);
      border-radius:36px;
      font-size:28px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(21,25,36,1);
      line-height:72px;
      text-align: center;
    }
    .van-checkbox{
      margin-top: 10px;
      .van-checkbox__icon{
        height: 12px;
        line-height: 12px;
        .van-icon{
          height: 12px;
          width: 12px;
        }
        .van-icon::before{
         display: inline;
        }
      }
      .van-checkbox__label{
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
      }
    }
  }

}
</style>
