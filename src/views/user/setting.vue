<template>
    <div class="setting page-layout">
      <van-nav-bar @click-left="$router.back()" class="header" :title="$t('setting.t1')" left-arrow />
      <div class="wrap">
        <div class="section">
          <ul>
            <li v-for="item in lanList" :key="item.value"
                @click="changeLang(item)" :class="{'act': localeLnag === item.value }"
            >{{ item.name }}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'setting',
  data() {
    return {
      show: false,
      localeLnag: 'zh-cn',
      lanList: [
        { name: this.$t('setting.t2'), value: 'zh-cn' },
        { name: this.$t('setting.t3'), value: 'en-us' },
        { name: this.$t('setting.t4'), value: 'ja-JP' },
      ],
    };
  },
  mounted() {
    this.localeLnag = localStorage.locale;
  },
  methods: {
    changeLang(data) {
      const { locale } = this.$i18n;
      if (!data.value) {
        this.show = false;
        return;
      }
      if (data.value !== locale) {
        this.$i18n.locale = data.value;
        localStorage.setItem('locale', data.value);
        this.localeLnag = data.name;
      }
      this.reload();
      this.$router.back();
    },
  },
};
</script>

<style scoped>
  .section {
    margin: 50px auto 30px auto;
    width: 690px;
  }
  .section >>> .van-cell {
    background-color: #202634;
  }
  .section >>> .van-cell__value {
    text-align: right;
  }
</style>
<style lang="scss" scoped>
  ul {
    li {
      height: 100px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40px;
      color: #fff;
      font-size:28px;
      background: url("../../assets/familyTree/select-icon.png") no-repeat 610px center #202634;
      background-size: 40px 40px;
      &.act {
        background: url("../../assets/familyTree/selected-icon.png") no-repeat 610px center #202634;
        background-size: 40px 40px;
      }
    }
  }
</style>
