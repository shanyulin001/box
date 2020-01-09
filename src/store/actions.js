import * as types from './mutation-types';

export default {
  updateUserData({ commit }, val) {
    commit(types.USER_DATA, val);
    localStorage.userData = JSON.stringify(val);
  },
  updateWalletList({ commit }, val) {
    commit(types.WALLET_LIST, val);
  },
  updateMainWallet({ commit }, val) {
    commit(types.MAIN_WALLET, val);
  },
  updateBalanceList({ commit }, val) {
    commit(types.BALANCE_LIST, val);
  },
  updateAssetList({ commit }, val) {
    commit(types.ASSET_LIST, val);
  },
};
