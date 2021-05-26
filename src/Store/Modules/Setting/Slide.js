import Vue from "vue";
const { errorHandler } = require("../../Utils/ErrorHandler");

const state = {
  slides: [],
  singleSlide: {}
};
const getters = {
  getSlideList(state) {
    return state.slides;
  },
  getSingleSlide(state) {
    return state.singleSlide;
  }
};
const mutations = {
  pushSlide(state, slide) {
    state.slides.push(slide);
  },
  pullSlide(state, id) {
    for (var i = 0; i < state.slides.length; i++) {
      if (state.slides[i]._id === id) {
        state.slides.splice(i, 1);
      }
    }
  },
  setSlides(state, list) {
    state.slides = list;
  },
  setSingleSlide(state, slide) {
    state.singleSlide = slide;
  }
};
const actions = {
  addSlide(context, slide) {
    context.commit("setLoading", true);
    Vue.http
      .post("info/slide", slide, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pushSlide", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  editSlide(context, slide) {
    context.commit("setLoading", true);
    Vue.http
      .put("info/slide", slide, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pullSlide", slide._id);
          context.commit("pushSlide", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  rmvSlide(context, id) {
    context.commit("setLoading", true);
    Vue.http
      .delete("info/slide/" + id, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pullSlide", id);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  getSlide({ getters, commit }, id) {
    commit("setLoading", true);
    return new Promise((resolve, reject) => {
      Vue.http
        .get("info/slide/admin/" + id, {
          headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
        })
        .then(
          res => {
            commit("setLoading", false);
            commit("setSingleSlide", res.body);
            resolve(getters.getSingleSlide);
          },
          err => {
            commit("setLoading", false);
            errorHandler(err);
          }
        );
    });
  },
  getSlideList(context) {
    context.commit("setLoading", true);
    Vue.http
      .get("info/slide/admin", {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setSlides", res.body);
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
