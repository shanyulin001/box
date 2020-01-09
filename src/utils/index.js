import Vue from 'vue';
import moment from 'moment';
import global from './global';
import http from '../api/axios';
import directive from '../directives/index';
import filters from '../filters/index';

const fn = {
  ...global,
  http,
  moment,
};
Object.keys(fn)
  .forEach((key) => {
    Vue.prototype[key] = fn[key];
  });
Object.keys(directive)
  .forEach((key) => {
    Vue.directive(key, directive[key]);
  });
Object.keys(filters)
  .forEach((key) => {
    Vue.filter(key, filters[key]);
  });
