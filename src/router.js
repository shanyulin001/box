import Vue from 'vue';
import Router from 'vue-router';
import tabBarWarp from './views/tabBarWarp.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'tabBarWarp',
    component: tabBarWarp,
    redirect: '/wallet',
    meta: { keepAlive: true },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: { keepAlive: false, title: '首页' },
        component: () => import(/* webpackChunkName: "home" */ './views/home/home.vue'),
      },
      {
        path: 'game',
        name: 'game',
        meta: { keepAlive: false, title: '游戏' },
        component: () => import(/* webpackChunkName: "find" */ './views/game/game.vue'),
      },
      {
        path: 'find',
        name: 'find',
        meta: { keepAlive: false, title: '发现' },
        component: () => import(/* webpackChunkName: "find" */ './views/find/find.vue'),
      },
      {
        path: 'fastflash',
        name: 'fastflash',
        meta: { keepAlive: false, title: '快讯' },
        component: () => import(/* webpackChunkName: "find" */ './views/find/fastflash.vue'),
      },
      {
        path: 'wallet',
        name: 'wallet',
        meta: { keepAlive: false, title: '钱包' },
        component: () => import(/* webpackChunkName: "find" */ './views/wallet/wallet.vue'),
      },
      {
        path: 'user',
        name: 'user',
        meta: { keepAlive: false, title: '我的' },
        component: () => import(/* webpackChunkName: "user" */ './views/user/user.vue'),
      },
    ],
  },
  {
    path: 'addAccout',
    name: 'addAccout',
    meta: { keepAlive: false, title: '添加钱包' },
    component: () => import(/* webpackChunkName: "find" */ './views/wallet/addAccout.vue'),
  },
  {
    path: 'mnemonicImport',
    name: 'mnemonicImport',
    meta: { keepAlive: false, title: '导入CTT账号' },
    component: () => import(/* webpackChunkName: "find" */ './views/wallet/mnemonicImport.vue'),
  },
  {
    path: 'quickCreation',
    name: 'quickCreation',
    meta: { keepAlive: false, title: '快速创建' },
    component: () => import(/* webpackChunkName: "find" */ './views/wallet/quickCreation.vue'),
  },
  {
    path: 'backupMnemonics',
    name: 'backupMnemonics',
    meta: { keepAlive: false, title: '备份助记词' },
    component: () => import(/* webpackChunkName: "find" */ './views/wallet/backupMnemonics.vue'),
  },
  {
    path: 'transferMoney',
    name: 'transferMoney',
    meta: { keepAlive: false, title: '去中心化转账' },
    component: () => import(/* webpackChunkName: "find" */ './views/wallet/transferMoney.vue'),
  },
  {
    path: 'collectMoney',
    name: 'collectMoney',
    meta: { keepAlive: false, title: '去中心收款' },
    component: () => import(/* webpackChunkName: "find" */ './views/wallet/collectMoney.vue'),
  },
  {
    path: 'confirmBackup',
    name: 'confirmBackup',
    meta: { keepAlive: false, title: '确认备份信息' },
    component: () => import(/* webpackChunkName: "find" */ './views/wallet/confirmBackup.vue'),
  },
  {
    path: 'privateKeyImport',
    name: 'privateKeyImport',
    meta: { keepAlive: false, title: '导入CTT账号' },
    component: () => import(/* webpackChunkName: "find" */ './views/wallet/privateKeyImport.vue'),
  },
  {
    path: 'iframePage',
    name: 'iframePage',
    meta: { keepAlive: false, title: '游戏' },
    component: () => import(/* webpackChunkName: "find" */ './views/game/iframePage.vue'),
  },
  {
    path: '/exchangeCTT',
    name: 'exchangeCTT',
    meta: { keepAlive: false, title: '兑换CTT' },
    component: () => import(/* webpackChunkName: "exchangeCTT" */ './views/game/exchangeCTT.vue'),
  },
  {
    path: '/buyGameCurrency',
    name: 'buyGameCurrency',
    meta: { keepAlive: false, title: '购买游戏币' },
    component: () => import(/* webpackChunkName: "exchangeCTT" */ './views/game/buyGameCurrency.vue'),
  },
  {
    path: '/developerResidence',
    name: 'developerResidence',
    meta: { keepAlive: false, title: '开发者入驻' },
    component: () => import(/* webpackChunkName: "exchangeCTT" */ './views/game/developerResidence.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { keepAlive: false, title: '登录' },
    component: () => import(/* webpackChunkName: "account" */ './views/account/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { keepAlive: false, title: '注册' },
    component: () => import(/* webpackChunkName: "account" */ './views/account/register.vue'),
  },
  {
    path: '/bindEmail',
    name: 'bindEmail',
    meta: { keepAlive: false, title: '注册' },
    component: () => import(/* webpackChunkName: "account" */ './views/account/bindEmail.vue'),
  },
  {
    path: '/verifyMobile',
    name: 'verifyMobile',
    meta: { keepAlive: false, title: '验证手机号码' },
    component: () => import(/* webpackChunkName: "account" */ './views/account/verifyMobile.vue'),
  },
  {
    path: '/assetDetail',
    name: 'assetDetail',
    meta: { keepAlive: false, title: '资产详情' },
    component: () => import(/* webpackChunkName: "assetDetail" */ './views/home/assetDetail.vue'),
  },
  {
    path: '/setPassword',
    name: 'setPassword',
    meta: { keepAlive: false, title: '设置密码' },
    component: () => import(/* webpackChunkName: "setPassword" */ './views/account/setPassword.vue'),
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    meta: { keepAlive: false, title: '用户详情' },
    component: () => import(/* webpackChunkName: "userInfo" */ './views/user/userInfo.vue'),
  },
  {
    path: '/about',
    name: 'about',
    meta: { keepAlive: false, title: '关于我们' },
    component: () => import(/* webpackChunkName: "about" */ './views/user/about.vue'),
  },
  {
    path: '/scanPage',
    name: 'scanPage',
    meta: { keepAlive: false, title: '扫一扫' },
    component: () => import(/* webpackChunkName: "scanPage" */ './views/scanPage.vue'),
  },
  {
    path: '/share',
    name: 'share',
    meta: { keepAlive: false, title: '推荐分享' },
    component: () => import(/* webpackChunkName: "share" */ './views/user/share.vue'),
  },
  {
    path: '/setting',
    name: 'setting',
    meta: { keepAlive: false, title: '系统设置' },
    component: () => import(/* webpackChunkName: "setting" */ './views/user/setting.vue'),
  },
  {
    path: '/billList',
    name: 'billList',
    meta: { keepAlive: false, title: '账单' },
    component: () => import(/* webpackChunkName: "billList" */ './views/invest/billList.vue'),
  },
  {
    path: '/billDetail',
    name: 'billDetail',
    meta: { keepAlive: true, title: '账单详情' },
    component: () => import(/* webpackChunkName: "billDetail" */ './views/invest/billDetail.vue'),
  },
  {
    path: '/withDraw',
    name: 'withDraw',
    meta: { keepAlive: false, title: '折跃' },
    component: () => import(/* webpackChunkName: "withDraw" */ './views/invest/withDraw.vue'),
  },
  {
    path: '/handlerDraw',
    name: 'handlerDraw',
    meta: { keepAlive: true, title: '立即折跃' },
    component: () => import(/* webpackChunkName: "handlerDraw" */ './views/invest/handlerDraw.vue'),
  },
  {
    path: '/extract',
    name: 'extract',
    meta: { keepAlive: true, title: '提现' },
    component: () => import(/* webpackChunkName: "extract" */ './views/home/extract.vue'),
  },
  {
    path: '/recharge',
    name: 'recharge',
    meta: { keepAlive: false, title: '充值' },
    component: () => import(/* webpackChunkName: "recharge" */ './views/home/recharge.vue'),
  },
  {
    path: '/coinList',
    name: 'coinList',
    meta: { keepAlive: false, title: '选择币种' },
    component: () => import(/* webpackChunkName: "coinList" */ './views/home/coinList.vue'),
  },
  {
    path: '/changeAccount',
    name: 'changeAccount',
    meta: { title: '修改手机号码' },
    component: () => import(/* webpackChunkName: "changeAccount" */ '@/views/account/changeAccount'),
  },
  {
    path: '/bindMobile',
    name: 'bindMobile',
    meta: { title: '绑定手机号码' },
    component: () => import(/* webpackChunkName: "bindMobile" */ '@/views/account/bindMobile'),
  },
  {
    path: '/invite',
    name: 'invite',
    meta: { title: '我的推荐' },
    component: () => import(/* webpackChunkName: "bindMobile" */ '@/views/user/invite'),
  },
  {
    path: '/smartRobot',
    name: 'smartRobot',
    meta: { title: '智能机器人' },
    component: () => import(/* webpackChunkName: "bindMobile" */ '@/views/user/smartRobot'),
  },
  {
    path: '/transferAccounts',
    name: 'transferAccounts',
    meta: { title: '转账' },
    component: () => import(/* webpackChunkName: "bindMobile" */ '@/views/home/transferAccounts'),
  },
  {
    path: '/finddetails',
    name: 'finddetails',
    meta: { title: '云智头条' },
    component: () => import(/* webpackChunkName: "bindMobile" */ '@/views/find/finddetails'),
  },
  {
    path: '/flashdetails',
    name: 'flashdetails',
    meta: { title: '云智快讯' },
    component: () => import(/* webpackChunkName: "bindMobile" */ '@/views/find/flashdetails'),
  },
  {
    path: '*',
    name: '404',
    redirect: '/',
    meta: { keepAlive: true },
  },
];

const router = new Router({
  routes,
});
router.beforeEach((to, from, next) => {
  const noPermission = ['login', 'setPassword', 'verifyMobile', 'register','home', 'wallet', 'game', 'user', 'about', 'developerResidence', 
        'addAccout', 'backupMnemonics', 'collectMoney','confirmBackup', 'mnemonicImport', 'privateKeyImport', 'quickCreation', 'transferMoney','scanPage'];
  // 需要验证token的页面
  if (!noPermission.includes(to.name)) {
    if (!localStorage.token || localStorage.token === 'undefined') {
      next({ name: 'login', replace: true });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
