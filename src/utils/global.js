import { getUserinfo, getBalanceList, getAssetList, verifyPassword, createFinal, getVersion } from '@/api';
import Big from 'big.js';
import CryptoJS from 'crypto-js';
import config from '@/config.js';

export default {
  Big,
  global: {
    reloadStatus: true,
    version: config.version,
    appname: config.appname,
  },
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    // this.$router.replace({ name: 'login' });
    this.$router.replace({ name: 'user'})
    this.reload();
  },
  Pixel: window.devicePixelRatio >= 2 ? '@2x' : '',
  defaultAvatar(e) {
    e.target.src = require('../assets/default-avatar.png');
  },
  getUuid() {
    if (window.device) {
      return window.device.uuid;
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : ((r & 0x3) | 0x8);
      return v.toString(16);
    });
  },
  setUuid() {
    if (!localStorage.uuid) {
      const uuid = this.getUuid();
      localStorage.setItem('uuid', uuid);
    }
  },
  async verifyPwd(wallet, password) {
    const auxiliaryWord = wallet.auxiliary_word2 || wallet.auxiliary_word;
    const data = {
      auxiliary_word: auxiliaryWord,
      password,
      device_id: wallet.device_id,
    };
    return verifyPassword(data);
  },
  reload() {
    this.global.reloadStatus = false;
    this.$nextTick(() => {
      this.global.reloadStatus = true;
    });
  },
  updateUserData() {
    getUserinfo().then((res) => {
      if (res.code === '1') {
        this.$store.dispatch('updateUserData', res.data);
      } else {
        this.$toast.fail(res.msg);
      }
    });
  },
  getBalanceList() {
    getBalanceList().then((res) => {
      if (res.code === '1') {
        this.$store.dispatch('updateBalanceList', res.data);
      } else {
        this.$toast.fail(res.msg);
      }
    });
  },
  getAssetList() {
    // 获取币种对应的信息，有兑换比例等
    return new Promise((resolve) => {
      getAssetList().then((res) => {
        if (res.code === '1') {
          this.$store.dispatch('updateAssetList', res.data.list);
        } else {
          this.$toast.fail(res.msg);
        }
        resolve();
      });
    });
  },
  // 首次登录默认创建一个多链钱包
  defaultCreateWallet(val) {
    const params = {
      device_id: localStorage.uuid,
      password: val,
      password1: val,
      name: 'wallet',
    };
    const { walletList } = this.$store.state;
    return new Promise((resolve) => {
      createFinal(params).then((res) => {
        if (res.code === '1') {
          this.$toast.loading().clear();
          if (walletList.length === 0) {
            this.$store.dispatch('updateMainWallet', res.data);
          }
          this.$store.dispatch('updateWalletList', res.data);
          resolve(res);
        } else {
          this.$toast.fail(res.msg);
        }
      });
    });
  },
  // 复制文字
  copyText(val) {
    console.log(window);
    // window.cordova.plugins.clipboard.copy(val, () => {
    //   this.$toast('复制成功');
    // });
    const input = document.createElement('input');
    input.value = val;
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, input.value.length);
    document.execCommand('Copy');
    document.body.removeChild(input);
    this.$toast('复制成功');
  },
  // 扫码
  scanCode2() {
    return new Promise((resolve, reject) => {
      if (window.QRScanner) {
        window.QRScanner.prepare((err, status) => {
          if (err) {
            reject({ msg: '二维码相机插件错误' });
          }
          if (status.authorized) {
            document.getElementById('app').classList.add('qr-active');
            this.$store.commit('changeScan', true);
            window.QRScanner.scan((err2, text) => {
              if (err2) {
                reject({ msg: err2 });
              } else {
                resolve(text);
              }
              window.QRScanner.hide();
              window.QRScanner.destroy();
              document.getElementById('app').classList.remove('qr-active');
              this.$store.commit('changeScan', false);
            });
            window.QRScanner.show();
          } else if (status.denied) {
            reject({ msg: '二维码相机没有权限' });
          } else {
            reject({ msg: '二维码相机没有权限' });
          }
        });
      } else {
        reject({ msg: '二维码相机插件错误' });
      }
    });
  },
  // 更新版本
  getVersion() {
    return new Promise((resolve, reject) => {
      this.$toast.loading();
      const params = {
        plat: 'android',
      };
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        params.plat = 'ios';
      }
      console.log(params);
      getVersion(params).then((res) => {
        this.$toast.loading().clear();
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 解密方法
  decrypt(word) {
    const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF');
    const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');

    const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS.AES.decrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  },
  // 加密方法
  encrypt(word) {
    const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF');
    const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');

    const srcs = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
  },
};
