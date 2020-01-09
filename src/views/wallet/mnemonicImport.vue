<template>
  <div class="mnemonicImport-page">
    <van-nav-bar
      :title="`导入${form.addActive}账户`"
      left-arrow
     @click-left="onClickLeft"
    />
    <div class="wrap">
      <p class="form-title" style="margin-top: 0;margin-bottom: 16px;">助记词</p>
         <van-field class="mnemonic-input" style="padding:5px 12px;" type="textarea" v-model="form.mnemonic" rows="1" autosize clearable placeholder="请输入助记词(每个单词以空格隔开)" />
        <p class="input-tis">助记词导入的同时可以修改钱包密码</p>
      <!-- <p class="form-title">选择路径</p>
        <van-field type="text" v-model="form.path" clearable placeholder="请选择路径" /> -->
      <p class="form-title">账户备注名</p>
        <van-field type="text" v-model="form.remark" clearable placeholder="给您的钱包添加一个便于识别的备注名" />
      <p class="form-title">设置密码</p>
        <van-field type="password" v-model="form.password" clearable placeholder="输入密码至少6位，建议大小写字母混合" />
        <van-field type="password" style="margin-top: 15px;" v-model="form.repassword" clearable placeholder="重复输入密码" />
      <van-checkbox v-model="checked" class="agreement">我已经阅读并同意【服务及隐私条款】</van-checkbox>
    
      <div class="import-btn" @click="importWallet">导入钱包</div>
    </div>

  </div>
</template>

<script>
import { mnemonicImport } from '@/api';


export default {
    name: 'mnemonicImport-page',
    data() {
      return{
        checked: false,
        form:{
          mnemonic: '',
          password:'',
          repassword: '',
          remark:'',
          addActive:'',
        }
      }
    },
    mounted() {
      this.form.addActive = this.$route.query.addActive
    },
    methods:{
     onClickLeft(){
      this.$router.push({ name: 'addAccout', query:{ addActive: this.form.addActive === 'CTT'? 0: 1} });
     },
     async importWallet() {
      if(!this.checked){
        this.$toast('同意并勾选相关条款后才能导入')
        return
      }
      try {
        const params = {
          mnemonic: this.form.mnemonic,
          password: this.form.password,
          repassword: this.form.repassword,
          remark: this.form.remark,
          coin: this.form.addActive
        };
        // console.log(params);
        const res = await mnemonicImport(params);
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
    }
}
</script>

<style lang="scss">
.mnemonicImport-page{
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
    .mnemonic-input{
      height: 140px;
      border:2px solid rgba(255, 255, 255, 0.2);
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
    .input-tis{
      margin-top: 10px;
      font-size:24px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(153,153,153,1);
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
        .van-icon-success:before{
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
