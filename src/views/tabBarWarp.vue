<template>
  <div class="tabBarWrap">
    <router-view/>
    <tabBar>
    </tabBar>
  </div>
</template>

<script>
  import tabBar from '@/components/tabBar.vue';

  export default {
    name: 'tabBarWrap',
    components: { tabBar },
  };
</script>
