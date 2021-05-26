import Vue from "vue";
const { errorHandler } = require("../../../Utils/ErrorHandler");

const state = {
  features: [],
  singleFeature: {}
};
const getters = {
  getFeatureList(state) {
    return state.features;
  },
  getSingleFeature(state) {
    return state.singleFeature;
  }
};
const mutations = {
  pushFeature(state, feature) {
    state.features.push(feature);
  },
  pullFeature(state, id) {
    for (var i = 0; i < state.features.length; i++) {
      if (state.features[i]._id === id) {
        state.features.splice(i, 1);
      }
    }
  },
  setFeatures(state, list) {
    state.features = list;
  },
  setSingleFeature(state, feature) {
    state.singleFeature = feature;
  }
};
const actions = {
  addFeature(context, feature) {
    context.commit("setLoading", true);
    Vue.http
      .post("product/feature", feature, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pushFeature", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  editFeature(context, feature) {
    context.commit("setLoading", true);
    Vue.http
      .put("product/feature", feature, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pullFeature", feature._id);
          context.commit("pushFeature", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  rmvFeature(context, id) {
    context.commit("setLoading", true);
    Vue.http
      .delete("product/feature/" + id, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pullFeature", id);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  getFeature({ getters, commit }, id) {
    commit("setLoading", true);
    return new Promise((resolve, reject) => {
      Vue.http
        .get("product/feature/detail/" + id, {
          headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
        })
        .then(
          res => {
            commit("setLoading", false);
            commit("setSingleFeature", res.body);
            resolve(getters.getSingleFeature);
          },
          err => {
            commit("setLoading", false);
            errorHandler(err);
          }
        );
    });
  },
  getFeatureList(context) {
    context.commit("setLoading", true);
    Vue.http
      .get("product/feature", {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setFeatures", res.body);
        },
        err => {
          context.commit("setLoading", false);
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
