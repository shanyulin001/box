<template>
    <div class="bill-list-wrap">
      <van-nav-bar
        :title="$t('billList.t1')"
        left-arrow
        @click-left="$router.back()"
        @click-right="show = !show"
      >
        <i class="filter-icon" slot="right" />
      </van-nav-bar>
      <div class="page-view">
        <p class="tip2">{{ $t('billList.t2') }}</p>
        <van-pull-refresh
                v-model="refreshing"
                @refresh="onRefresh(0)"
        >
            <van-list
                    class="list"
                    v-model="loading"
                    :finished="finished"
                    :finished-text="$t('billList.t3')"
                    @load="onLoad"
            >
                <div class="item van-hairline--bottom" v-for="(item, i) in list"
                     :key="i" @click="toPage(item)">
                    <div class="l" :class="'t' + item.type.key">
                        <p>{{ item.type.value }}</p>
                        <p>{{ item | showName }}</p>
                    </div>
                    <div class="r">
                        <p>{{ item.number }}</p>
                        <p>{{ item.add_time | formatDate('YYYY-MM-DD HH:mm') }}</p>
                    </div>
                </div>
            </van-list>
        </van-pull-refresh>
      </div>
      <van-actionsheet
        v-model="show"
        :actions="actions"
        @select="onSelect"
        :cancel-text="$t('button.t8')"
      />
    </div>
</template>

<script>
import { getUserAssetList } from '@/api';

export default {
    name: 'billList',
    data() {
        return {
            list: [],
            page: {
                size: 100,
                total: 0,
                current: 0,
            },
            loading: false,
            finished: false,
            refreshing: false,
            currentType: '',
            // 1充值  2 提现 3游戏 4折跃 5拾取折跃 6流失 9转账给别人 10被人转账到账
            actions: [
              { value: 0, name: this.$t('billList.t10') },
              { value: 1, name: this.$t('billList.t4') },
              { value: 2, name: this.$t('billList.t5') },
              { value: 3, name: this.$t('billList.t6') },
              { value: 4, name: this.$t('billList.t7') },
              { value: 5, name: this.$t('billList.t8') },
              { value: 6, name: this.$t('billList.t9') },
              { value: 9, name: this.$t('billList.t11') },
              { value: 10, name: this.$t('billList.t11') },
            ],
            show: false,
        };
    },
    mounted() {},
    methods: {
        onRefresh() {
            this.page = {
                size: 10,
                total: 0,
                current: 1,
            };
            this.getUserAssetList();
        },
        onLoad() {
            this.loading = true;
            this.page.current += 1;
            this.getUserAssetList();
        },
        async getUserAssetList() {
            try {
                // const start = this.moment().add('month', 0).format('YYYY-MM') + '-01';
                const params = {
                    page_size: this.page.size,
                    current_page: this.page.current,
                    asset: '',
                    min_date: '',
                    max_date: '',
                    // min_date: start,
                    // max_date: this.moment(start).add('month', 1).add('days', -1).format('YYYY-MM-DD'),
                    type: this.currentType, // 1充值 2 提现 3游戏
                };
                const { data } = await getUserAssetList(params);
                this.list = data.list;
                this.page.total = data.total_count;
                this.loading = false;
                this.refreshing = false;
                if (this.list.length === data.total_count) {
                    this.finished = true;
                }
            } catch (e) {
                console.log(e);
            }
        },
        toPage(val) {
            this.$router.push({
                name: 'billDetail',
                query: {
                  id: val.id,
                },
            });
        },
        onSelect(val) {
          this.currentType = val.value > 0 ? val.value : '';
          this.show = false;
          this.page.current = 1;
          this.getUserAssetList();
        },
    },
}
</script>

<style scoped>
  [class*=van-hairline]::after {
    border-color: #fff!important;
  }
</style>
<style lang="scss" scoped>
.bill-list-wrap {
    .tip2 {
        margin-top: 40px;
        margin-bottom: 20px;
        font-size: 28px;
        font-weight: 400;
        color: #fff;
        padding-left: 40px;
    }
    .list {
        padding: 0 40px;
        .item {
            height: 120px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 25px 0 10px;
            background-color: #151924;
            border-radius: 6px;
            /*&:not(:last-child) {*/
            /*  border-bottom: 2px solid #fff; !*no*!*/
            /*}*/
            .l {
                height: 50px;
                padding-left: 70px;
                background: url("../../assets/familyTree/status-1-icon.png") no-repeat left center;
                background-size: 50px 50px;
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
            p {
                font-weight:400;
                line-height: 28px;
                &:first-of-type {
                    font-size: 30px;
                    color: #fff;
                    margin-bottom: 8px;
                }
                &:last-of-type {
                    font-size: 24px;
                    color: #5A5F6C;

                }
            }
        }
    }
}
</style>
