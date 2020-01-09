<template>
  <div id="app">
    <transition :name="$store.state.globalStatus.slideDirection">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive && g.reloadStatus"
                     class="routerView">
        </router-view>
      </keep-alive>
    </transition>
    <transition :name="$store.state.globalStatus.slideDirection">
      <router-view v-if="!$route.meta.keepAlive && g.reloadStatus"
                   class="routerView"
      ></router-view>
    </transition>
    <div v-transfer-dom data-transfer="true">
      <scan-page v-if="showScan"></scan-page>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import scanPage from '@/views/scanPage.vue';

export default {
  name: 'App',
  data() {
    return {
      g: this.global,
    };
  },
  components: { scanPage },
  computed: {
    ...mapState([
      'showScan', 'balanceList',
    ]),
  },
  created() {
    const pagePush = this.$router.push;
    // let prevKey = window.history.state ? window.history.state.key : 0;
    this.$router.push = (...arg) => {
      this.$store.commit('slideDirectionChange', 'pop');
      pagePush.call(this.$router, ...arg);
    };
    // 对后退、前进、 ROUTER.BACK
    // window.addEventListener('popstate', () => {
    //   // const nextKey = state.state ? state.state.key : 0;
    //   // console.log(prevKey, nextKey);
    //   // if (Number(nextKey) > Number(prevKey)) {
    //   //   this.$store.commit('slideDirectionChange', 'push');
    //   // } else {
    //   //   this.$store.commit('slideDirectionChange', 'pop');
    //   // }
    //   // prevKey = nextKey;
    //   this.$store.commit('slideDirectionChange', 'pop');
    // });
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions([
      'updateUserData',
      'updateBalanceList',
    ]),
    init() {
      // 如果没有uuid就设置uuid
      if (localStorage.userData && Object.keys(localStorage.userData).length > 0) {
        const { userData } = localStorage;
        this.updateUserData(JSON.parse(userData));
      }
      if (localStorage.balanceList && Object.keys(localStorage.balanceList).length > 0) {
        const { balanceList } = localStorage;
        this.updateBalanceList(JSON.parse(balanceList));
      }
      // this.getAssetList().then(() => {
      //   this.getBalanceList();
      // });
    },
  },
};
</script>

<style lang="scss">
  @import "styles/app";
  .px-pdb50 {
    padding-bottom: 50px !important;
  }
  .mr40 {
    margin-right: 40px !important;
  }
  .routerView {
    position: absolute;
    background-color: #151924;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: transform .5s ease;
  }
</style>
