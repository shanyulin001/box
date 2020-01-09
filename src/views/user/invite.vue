<template>
    <div class="invite-wrap">
      <van-nav-bar :title="$t('user.t13')" left-arrow @click-left="$router.back()"/>
      <div class="wrap">
        <div class="total" v-if="total > 0">共计{{ total }}位推荐人</div>
        <div class="list">
          <template v-if="list.length > 0">
            <ul>
              <li v-for="(item, index) in list" :key="index">
                <div class="l">
                  <img :src="item.avatar || defaultSrc" @error="defaultAvatar($event)" alt="">
                  <div class="info">
                    <p>{{ item.username || item.nickname }}</p>
                    <p>{{ item.mobile || item.email }}</p>
                  </div>
                </div>
                <div class="r">
                  已投资<span>{{ item.sum_integral }}</span>USDT
                </div>
              </li>
            </ul>
          </template>
          <template v-else>
            <div class="no-data" @click="getData">
              <p>暂无数据</p>
            </div>
          </template>
        </div>
      </div>
    </div>
</template>

<script>
import { getInviteList } from '@/api';

export default {
    name: 'invite',
    data() {
        return {
          list: [],
          total: '',
          defaultSrc: require('./../../assets/default-avatar.png'),
        };
    },
    mounted() {
      this.getData();
    },
    methods: {
      async getData() {
        try {
          const params = {
            page_size: 100,
            current_page: 1,
          };
          const load = this.$toast.loading({ duration: 0 });
          const res = await getInviteList(params);
          load.clear();
          this.list = res.data.list;
          this.total = res.data.total_count;
        }catch (e) {
          console.log(e);
        }
      },
    },
};
</script>

<style lang="scss" scoped>
.invite-wrap {
  .wrap {
    padding: 0 40px;
    .total {
      margin: 20px 0;
      font-size:24px;
      color: #5A5F6C;
    }
    .list {
      ul {
        li {
          height: 160px;
          background: rgba(32,38,52,1);
          border-radius: 16px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 15px;
          .l {
            display: flex;
            align-items: center;
            img {
              width: 100px;
              height: 100px;
              border-radius: 50%;
              margin-right: 20px;
            }
            .info {
              color: #5A5F6C;
              font-size:24px;
              line-height:38px;
              p {
                &:first-child {
                  color: #fff;
                }
              }
            }
          }
          .r {
            font-size: 24px;
            color: #B5BAC5;
            span {
              color: #FFDD5C;
            }
          }
        }
      }
    }
  }
}
</style>
