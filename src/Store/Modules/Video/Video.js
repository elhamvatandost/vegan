import Vue from "vue";
const { errorHandler } = require("../../Utils/ErrorHandler");
const state = {
  list: [],
  singleVideo: {},
  singleVideoRelateds: []
};
const getters = {
  getVideoList(state) {
    return state.list;
  },
  getSingleVideo(state) {
    return state.singleVideo;
  },
  getRelatedSingleVideo(state) {
    return state.singleVideoRelateds;
  }
};
const mutations = {
  setVideoList(state, list) {
    state.list = list;
  },
  pushVideo(state, video) {
    state.list.push(video);
  },
  pullVideo(state, id) {
    for (var i = 0; i < state.list.length; i++) {
      if (state.list[i]._id === id) {
        state.list.splice(i, 1);
      }
    }
  },
  setSingleVideo(state, video) {
    state.singleVideo = video;
  },
  setRelatedSingleVideo(state, list) {
    state.singleVideoRelateds = list;
  },
  pushVideoRelated(state, product) {
    state.singleVideoRelateds.push(product);
  },
  pullVideoRelated(state, id) {
    for (var i = 0; i < state.singleVideoRelateds.length; i++) {
      if (state.singleVideoRelateds[i]._id === id) {
        state.singleVideoRelateds.splice(i, 1);
      }
    }
  }
};
const actions = {
  getVideoList(context) {
    context.commit("setLoading", true);
    Vue.http
      .get("video", {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setVideoList", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  getRelatedSingleVideo(context, id) {
    context.commit("setLoading", true);
    Vue.http
      .get("video/relateds/" + id, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setRelatedSingleVideo", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  addVideo(context, video) {
    context.commit("setLoading", true);
    Vue.http
      .post("video", video, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pushVideo", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  rmvVideo(context, id) {
    context.commit("setLoading", true);
    Vue.http
      .delete("video/del/" + id, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pullVideo", id);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  getSingleVideo({ getters, commit }, id) {
    commit("setLoading", true);
    return new Promise((resolve, reject) => {
      Vue.http
        .get("video/detail/" + id, {
          headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
        })
        .then(
          res => {
            commit("setLoading", false);
            commit("setSingleVideo", res.body);
            resolve(getters.getSingleVideo);
          },
          err => {
            commit("setLoading", false);
            errorHandler(err);
          }
        );
    });
  },
  editSingleVideo(context, video) {
    context.commit("setLoading", true);
    Vue.http
      .put("video", video, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setSingleVideo", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  addVideoRelated({ dispatch , commit }, related) {
    commit("setLoading", true);
    Vue.http
      .put("video/relateds", related, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          commit("setLoading", false);
          dispatch("getRelatedSingleVideo", related._id);
        },
        err => {
          commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  rmvVideoRelated({ dispatch , commit }, tmp) {
    commit("setLoading", true);
    Vue.http
      .delete(`video/relateds/${tmp._id}/${tmp.relid}`, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          commit("setLoading", false);
          dispatch("getRelatedSingleVideo", tmp._id);
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
