import * as types from './mutation-types';

export default {
  [types.USER_DATA](state, val) {
    state.userData = Object.assign({}, state.userData, val);
  },
  [types.WALLET_LIST](state, val) {
    const idList = state.walletList.map(res => res.id);
    const index = idList.indexOf(val.id);
    if (Array.isArray(val)) {
      state.walletList = val;
    } else if (index > -1) {
      state.walletList.splice(index, 1, val);
    } else {
      state.walletList.push(val);
    }
    localStorage.setItem('walletList', JSON.stringify(state.walletList));
  },
  [types.MAIN_WALLET](state, val) {
    state.mainWallet = Object.assign({}, state.mainWallet, val);
    localStorage.setItem('mainWallet', JSON.stringify(state.mainWallet));
  },
  [types.BALANCE_LIST](state, val) {
    state.balanceList = val;
    localStorage.setItem('balanceList', JSON.stringify(val));
  },
  [types.ASSET_LIST](state, val) {
    state.assetList = val;
    localStorage.setItem('assetList',  JSON.stringify(val));
  },
  changeScan(state, val) {
    state.showScan = val;
  },
};
