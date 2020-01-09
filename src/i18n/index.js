import Vue from 'vue';
import VueI18n from 'vue-i18n';
import zh from './zh';
import en from './en';
import ja from './ja';

Vue.use(VueI18n);

const messages = {
  'en-us': Object.assign({}, en),
  'zh-cn': Object.assign({}, zh),
  'ja-JP': Object.assign({}, ja),
};

const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'zh-cn',
  messages,
});

export default i18n;
