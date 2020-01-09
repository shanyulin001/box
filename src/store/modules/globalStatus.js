export default {
  state: {
    slideDirection: 'default',
    slideClass: {
      push: 'page-push',
      pop: 'page-pop',
    },
  },
  mutations: {
    slideDirectionChange(state, val) {
      state.slideDirection = state.slideClass[val];
    },
  },
};
