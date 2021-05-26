import Vue from "vue";
const { errorHandler } = require("../../Utils/ErrorHandler");

const state = {
  list: [],
  singleService: {},
  singleServiceRelateds: [],
  singleServiceAttaches: []
};
const getters = {
  getServiceList(state) {
    return state.list;
  },
  getSingleService(state) {
    return state.singleService;
  },
  getRelatedSingleService(state) {
    return state.singleServiceRelateds;
  },
  getAttachesSingleService(state) {
    return state.singleServiceAttaches;
  }
};
const mutations = {
  setServiceList(state, list) {
    state.list = list;
  },
  pushService(state, service) {
    state.list.push(service);
  },
  pullService(state, id) {
    for (var i = 0; i < state.list.length; i++) {
      if (state.list[i]._id === id) {
        state.list.splice(i, 1);
      }
    }
  },
  setSingleService(state, service) {
    state.singleService = service;
  },
  setRelatedSingleService(state, list) {
    state.singleServiceRelateds = list;
  },
  pushServiceRelated(state, product) {
    state.singleServiceRelateds.push(product);
  },
  pullServiceRelated(state, id) {
    for (var i = 0; i < state.singleServiceRelateds.length; i++) {
      if (state.singleServiceRelateds[i]._id === id) {
        state.singleServiceRelateds.splice(i, 1);
      }
    }
  },
  setAttachSingleService(state, list) {
    state.singleServiceAttaches = list;
  },
  pushServiceAttach(state, attach) {
    state.singleServiceAttaches.push(attach);
  },
  pullServiceAttach(state, id) {
    for (var i = 0; i < state.singleServiceAttaches.length; i++) {
      if (state.singleServiceAttaches[i]._id === id) {
        state.singleServiceAttaches.splice(i, 1);
      }
    }
  }
};
const actions = {
  getServiceList(context) {
    context.commit("setLoading", true);
    Vue.http
      .get("blog/content", {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setServiceList", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  getRelatedSingleService(context, id) {
    context.commit("setLoading", true);
    Vue.http
      .get("blog/content/relateds/" + id, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setRelatedSingleService", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  getAttachSingleService(context, id) {
    context.commit("setLoading", true);
    Vue.http
      .get("blog/content/attaches/" + id, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setAttachSingleService", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  addService(context, service) {
    context.commit("setLoading", true);
    Vue.http
      .post("blog/content", service, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pushService", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  rmvService(context, id) {
    context.commit("setLoading", true);
    Vue.http
      .delete("blog/content/del/" + id, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pullService", id);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  getSingleService({ getters, commit }, id) {
    commit("setLoading", true);
    return new Promise((resolve, reject) => {
      Vue.http
        .get("blog/content/detail/" + id, {
          headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
        })
        .then(
          res => {
            commit("setLoading", false);
            commit("setSingleService", res.body);
            resolve(getters.getSingleService);
          },
          err => {
            commit("setLoading", false);
            errorHandler(err);
          }
        );
    });
  },
  editSingleService(context, service) {
    context.commit("setLoading", true);
    Vue.http
      .put("blog/content", service, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setSingleService", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  addServiceRelated({ dispatch , commit }, related) {
    commit("setLoading", true);
    Vue.http
      .put("blog/content/relateds", related, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          commit("setLoading", false);
          dispatch("getRelatedSingleService", related._id);
        },
        err => {
          commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  rmvServiceRelated({ dispatch , commit }, tmp) {
    commit("setLoading", true);
    Vue.http
      .delete(`blog/content/relateds/${tmp._id}/${tmp.rid}`, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          commit("setLoading", false);
          dispatch("getRelatedSingleService", tmp._id);
        },
        err => {
          commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  addServiceAttach({ dispatch , commit }, attach) {
    commit("setLoading", true);
    Vue.http
      .put("blog/content/attaches", attach, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          commit("setLoading", false);
          dispatch("getAttachSingleService", attach._id);
        },
        err => {
          commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  rmvServiceAttach({ dispatch , commit }, tmp) {
    commit("setLoading", true);
    Vue.http
      .delete(`blog/content/attaches/${tmp._id}/${tmp.aid}`, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          commit("setLoading", false);
          dispatch("getAttachSingleService", tmp._id);
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
