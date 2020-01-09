<template>
  <van-tabbar v-model="active">
    <van-tabbar-item :to="{name: tabBarNames[0]}" replace>
      <span>{{ $t('nav.home') }}</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ?
        require(`@/assets/icon-youxi-act@2x.png`) :
        require(`@/assets/icon-youxi@2x.png`)"
      >
    </van-tabbar-item>
    <van-tabbar-item :to="{name: tabBarNames[1]}" replace>
      <span>{{ $t('nav.find') }}</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ?
        require(`@/assets/icon-find-act.png`) :
        require(`@/assets/icon-find.png`)"
      >
    </van-tabbar-item>
    <van-tabbar-item :to="{name: tabBarNames[2]}" replace>
      <span>{{ $t('nav.wallet') }}</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ?
        require(`@/assets/icon-qianbao-act@2x.png`) :
        require(`@/assets/icon-qianbao@2x.png`)"
      >
    </van-tabbar-item>
    <van-tabbar-item :to="{name: tabBarNames[3]}" replace>
      <span>{{ $t('nav.CFT') }}</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ?
        require(`@/assets/icon-C2C-1@2x.png`) :
        require(`@/assets/icon-C2C-2@2x.png`)"
      >
    </van-tabbar-item>
    <van-tabbar-item :to="{name: tabBarNames[4]}" replace>
      <span>{{ $t('nav.me') }}</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ?
        require(`@/assets/icon-wode-act@2x.png`) :
        require(`@/assets/icon-wode@2x.png`)"
      >
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
  export default {
    name: 'tabBar',
    components: {},
    data() {
      return {
        active: 0,
        tabBarNames: [
          'game', 'find', 'wallet', 'home', 'user',
        ],
      };
    },
    computed: {},
    watch: {
      $route(val) {
        const index = this.tabBarNames.findIndex(name => name === val.name);
        this.active = index !== -1 ? index : 0;
        if (index > -1) {
          this.$store.commit('slideDirectionChange', '');
        }
      },
    },
    methods: {
    },
    created() {
      const index = this.tabBarNames.findIndex(name => name === this.$route.name);
      this.active = index !== -1 ? index : 0;
    },
    mounted() {},
  };
</script>

<style lang="scss" scoped>

</style>
