module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': ['error', {
      props: false,
      // ignorePropertyModificationsFor: [
      //   'vm',
      //   'state',
      //   'data',
      // ]
    }],
    'linebreak-style': [0 ,'error', 'windows'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides:[
    {
      'files':['*.vue'],
      'rules':{
        'indent':'off'
      }
    }
  ]
};
