<template>
  <div class="confirmBackup-page">
    <van-nav-bar
      title="确认备份信息"
      left-arrow
     @click-left="onClickLeft"
    />
    <div class="wrap">
      <p class="wrap-tis">请按顺序点击助记词，已确认您备份正确</p>

      <div class="input-view">
        <p v-for="(item, index) in mnemonicView" :key="index">
            {{ item }}
        </p>
      </div>
      <ul>
        <li v-for="(item, index) in mnemonicBtn" :key="index"
          :class="{'act': contains(mnemonicView, item) }" @click="pushBtn(item)"
        >{{item}}</li>
      </ul>
      <div v-if="isAllIn" class="confirm-btn-act" @click="confirmBtn">确认</div>
      <div v-else class="confirm-btn">确认</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'confirmBackup-page',
  data(){
    return{
      isAllIn: false,
      mnemonicList:[],
      mnemonicView:[],
      mnemonicBtn:[],
      currentIdList:[]
    }
  },
  watch:{
    mnemonicView(val) {
      if(val.length === 12){
        this.isAllIn = true;
      }else{
        this.isAllIn = false;
      }
    }
  },
  methods:{
    onClickLeft(){
      this.$router.push({ name: 'backupMnemonics',query:{ mnemonicList: this.mnemonicList }})
    },
    shuffle(arr){
      let result = [];
      let arrTemp = [...arr]; // splice会影响原数组，复制一个新的数组，防止影响原数组
      while(arrTemp.length) {
        let index = Math.floor(Math.random() * arrTemp.length);
        result.push(arrTemp[index]);
        arrTemp.splice(index, 1);
      }
      this.mnemonicBtn = result;
    //   return result;
    },

    pushBtn(val){
      
      if(this.contains(this.mnemonicView,val)){
        for (let index = 0; index < this.mnemonicView.length; index++) {
          if(this.mnemonicView[index]===val){
            this.mnemonicView.splice(index,1);
          }
        }
      }else{
        this.mnemonicView.push(val);
      }
    //   console.log(this.mnemonicView,'view')
    },
    contains(arr, obj) {
        var i=arr.length;
        //判断元素是否存在
        while(i--){
            if(arr[i]===obj){
                return true;//若存在返回true
            }
        }
      return false;//若不存在返回false
    },
    confirmBtn(){
      if(this.mnemonicView.toString() == this.mnemonicList.toString()){
        this.$toast.success('助记词完全匹配');
        setTimeout((res) => {
          this.$router.push({name: 'wallet'})
        },1000)
      }else{
        this.$toast('助记词不匹配，请重新选择排序')
      }
      // console.log(this.mnemonicView,'001')
      // console.log(this.mnemonicList,'002')
    },

  },
  mounted(){
    this.mnemonicList = this.$route.query.mnemonicList;
    this.shuffle(this.$route.query.mnemonicList);
    // console.log(this.mnemonicBtn)
    // console.log(this.mnemonicList,'45')
  },
}
</script>

<style lang="scss">
.confirmBackup-page{
  .wrap{
    margin: 20px 30px 0 30px;
    padding: 0 0 96px 0;
    background-color: #202634;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .wrap-tis{
      margin:112px auto 34px auto;
      font-size:28px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:40px;
    }
    .input-view{
      display: flex;
      flex-wrap: wrap;
      width:630px;
      height:200px;
      opacity:0.19;
      border:2px solid rgba(255,255,255,1);
      p{
        font-size: 38px;
        margin-bottom: 10px;
        margin-left: 10px;
        color:rgba(255,221,55,1);
      }
    }
    .input-view{
      margin: 0 auto;
    }
    .confirm-btn{
      margin: 190px auto 0 auto;
      width:300px;
      height:72px;
    //   background:linear-gradient(90deg,rgba(255,221,92,1) 0%,rgba(255,197,0,1) 100%);
      background:rgba(130,130,130,1);
      border-radius:36px;
      font-size:28px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(21,25,36,1);
      line-height:72px;
      text-align: center;
    }
    .confirm-btn-act{
      margin: 190px auto 0 auto;
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
    ul{
      margin: 50px auto 0 auto;
      justify-content: space-between;
      display: flex;
      flex-wrap: wrap;
      width: 80%;
      li{
        margin-top: 20px;
        padding: 8px 15px;
        border-radius:8px;
        border:2px solid rgba(255,221,55,1);
        font-size:28px;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:rgba(255,221,92,1);
        &.act {
          color: #ffffff;
          background:rgba(130,130,130,1);
          border:2px solid rgba(130,130,130,1);
        }
          
      }
    }
  }
}
</style>