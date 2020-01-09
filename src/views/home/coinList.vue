<template>
    <div class="coin-list page-layout">
      <van-nav-bar
        :title="$t('coinList.t1')"
        left-arrow
        @click-left="$router.back()"
      >
        <span slot="right" style="color: #fff" @click="toPage">{{ $t('button.t7') }}</span>
      </van-nav-bar>
      <div class="wrap">
        <ul>
          <li v-for="(item, index) in balanceList" :key="index"
              @click="selectCoin(item)"
              :class="{'act': activeId === item.id }"
          >
            <div class="info">{{ item | showName }}</div>
            <i class="select"></i>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'coinList',
    data() {
        return {
          activeId: '',
        };
    },
    computed: {
      ...mapState(['balanceList']),
    },
    mounted() {
    },
    methods: {
      toPage() {
        if (this.activeId) {
          this.$router.push({ name: 'extract', query: { asset: this.activeId } });
        }
      },
      selectCoin(val) {
        this.activeId = val.id;
      },
    },
};
</script>

<style lang="scss" scoped>
.coin-list {
  .wrap {
    ul {
      width: 670px;
      margin: 20px auto;
      li {
        height: 128px;
        border-radius: 10px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        color: #fff;
        background: url("../../assets/familyTree/select-icon.png") no-repeat 610px center #202634;
        background-size: 40px 40px;
        &.act {
          background: url("../../assets/familyTree/selected-icon.png") no-repeat 610px center #202634;
          background-size: 40px 40px;
        }
      }
    }
  }
}
</style>
