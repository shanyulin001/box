export default {
  radioList(state) {
    const res = {};
    state.assetList.forEach((item) => {
      res[item.code] = item;
    });
    return res;
  },
  coinList(state) {
    const obj = {};
    state.assetList.forEach((item) => {
      obj[item.code] = item;
    });
    // console.log('obj', obj);
    return state.balanceList.map((item,index) => {
      if (obj[item.asset]) {
        const { ratio } = obj[item.asset];
        return {
          ...item,
          ratio,
        };
      } else {
        return {
          ...item,
          ratio: 0,
        };
      }
    });
  },
};

