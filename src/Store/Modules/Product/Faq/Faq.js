import Vue from "vue";
const { errorHandler } = require("../../../Utils/ErrorHandler");

const state = {
  list: [],
  singleFaq: {},
  singleFaqRelateds: []
};
const getters = {
  getFaqList(state) {
    return state.list;
  },
  getSingleFaq(state) {
    return state.singleFaq;
  },
  getRelatedSingleFaq(state) {
    return state.singleFaqRelateds;
  }
};
const mutations = {
  setFaqList(state, list) {
    state.list = list;
  },
  pushFaq(state, faq) {
    state.list.push(faq);
  },
  pullFaq(state, id) {
    for (var i = 0; i < state.list.length; i++) {
      if (state.list[i]._id === id) {
        state.list.splice(i, 1);
      }
    }
  },
  setSingleFaq(state, faq) {
    state.singleFaq = faq;
  },
  setRelatedSingleFaq(state, list) {
    state.singleFaqRelateds = list;
  },
  pushFaqRelated(state, product) {
    state.singleFaqRelateds.push(product);
  },
  pullFaqRelated(state, id) {
    for (var i = 0; i < state.singleFaqRelateds.length; i++) {
      if (state.singleFaqRelateds[i]._id === id) {
        state.singleFaqRelateds.splice(i, 1);
      }
    }
  }
};
const actions = {
  getFaqList(context) {
    context.commit("setLoading", true);
    Vue.http
      .get("product/faq", {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setFaqList", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  getRelatedSingleFaq(context, id) {
    context.commit("setLoading", true);
    Vue.http
      .get("product/faq/relateds/" + id, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setRelatedSingleFaq", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  addFaq(context, faq) {
    context.commit("setLoading", true);
    Vue.http
      .post("product/faq", faq, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pushFaq", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  rmvFaq(context, id) {
    context.commit("setLoading", true);
    Vue.http
      .delete("product/faq/del/" + id, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pullFaq", id);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  getSingleFaq({ commit, getters }, id) {
    commit("setLoading", true);
    return new Promise((resolve, reject) => {
      Vue.http
        .get("product/faq/detail/" + id, {
          headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
        })
        .then(
          res => {
            commit("setLoading", false);
            commit("setSingleFaq", res.body);
            resolve(getters.getSingleFaq);
          },
          err => {
            commit("setLoading", false);
            errorHandler(err);
          }
        );
    });
  },
  editSingleFaq(context, faq) {
    context.commit("setLoading", true);
    Vue.http
      .put("product/faq", faq, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setSingleFaq", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  addFaqRelated({ dispatch, commit }, related) {
    commit("setLoading", true);
    Vue.http
      .put("product/faq/relateds", related, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          commit("setLoading", false);
          dispatch("getRelatedSingleFaq", related._id);
        },
        err => {
          commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  rmvFaqRelated({ dispatch, commit }, tmp) {
    commit("setLoading", true);
    Vue.http
      .delete(`product/faq/relateds/${tmp._id}/${tmp.rid}`, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          commit("setLoading", false);
          dispatch("getRelatedSingleFaq", tmp._id);
        },
        err => {
          commit("setLoading", false);
          errorHandler(err);
        }
      );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
