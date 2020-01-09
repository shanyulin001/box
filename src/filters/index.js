import moment from 'moment';
import Big from 'big.js';

export default {
  formatDate(val, format) {
    return moment(val).format(format);
  },
  filterCEC(val) {
    let res = 0;
    if (val) {
      res = parseFloat(val) === parseInt(val, 10) ? parseInt(val, 10) : new Big(Number(val)).toFixed(4);
    }
    return res;
  },
  showName(val) {
    let res = val.asset;
    if (val.asset === 'USDT') {
      res = val.chain_protocol_type === 1 ? 'USDT-OMNI' : 'USDT-ERC20';
    }
    return res;
  },
};
