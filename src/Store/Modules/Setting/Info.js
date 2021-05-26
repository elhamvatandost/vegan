import Vue from "vue";
const { errorHandler } = require("../../Utils/ErrorHandler");

const state = {
  info: {}
};
const getters = {
  getInfo(state) {
    return state.info;
  }
};
const mutations = {
  setInfo(state, info) {
    state.info = info;
  }
};
const actions = {
  addInfo(context, info) {
    context.commit("setLoading", true);
    Vue.http
      .post("info/about", info, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setInfo", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  getInfo({ getters, commit }) {
    commit("setLoading", true);
    return new Promise((resolve, reject) => {
      Vue.http
        .get("info/about", {
          headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
        })
        .then(
          res => {
            commit("setLoading", false);
            commit("setInfo", res.body);
            resolve(getters.getInfo);
          },
          err => {
            commit("setLoading", false);
            errorHandler(err);
          }
        );
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
