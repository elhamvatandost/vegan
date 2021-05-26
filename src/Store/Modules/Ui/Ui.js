import Vue from "vue";
const { errorHandler } = require("../../Utils/ErrorHandler");
const jwt = require("jsonwebtoken");

const state = {
  loading: "",
  page: "",
  info: {},
  uiSlides: [],
  groups: [],
  products: [],
  videos: [],
  categories: [],
  contents: [],
  video: {},
  content: {},
  product: {}
};

const getters = {
  getLoading(state) {
    return state.loading;
  },
  getUiInfo(state) {
    return state.info;
  },
  getUiSlides(state) {
    return state.uiSlides;
  },
  getUiGroups(state) {
    return state.groups;
  },
  getUiProducts(state) {
    return state.products;
  },
  getUiProduct(state) {
    return state.product;
  },
  getUiVideos(state) {
    return state.videos;
  },
  getUiVideo(state) {
    return state.video;
  },
  getUiPage(state) {
    return state.page;
  },
  getUiCategories(state) {
    return state.categories;
  },
  getUiContents(state) {
    return state.contents;
  },
  getUiContent(state) {
    return state.content;
  }
};

const mutations = {
  setLoading(state, val) {
    state.loading = val;
  },
  setUiInfo(state, info) {
    state.info = info;
  },
  setUiSlides(state, slides) {
    state.uiSlides = slides;
  },
  setGroups(state, groups) {
    state.groups = groups;
  },
  setUiProducts(state, products) {
    state.products = products;
  },
  setUiProduct(state, product) {
    state.product = product;
  },
  setUiVideos(state, videos) {
    state.videos = videos;
  },
  setUiVideo(state, video) {
    state.video = video;
  },
  setUiPage(state, page) {
    state.page = page;
  },
  setUiCategories(state, categories) {
    state.categories = categories;
  },
  setUiContents(state, contents) {
    state.contents = contents;
  },
  setUiContent(state, content) {
    state.content = content;
  }
};

const actions = {
  getUiInfo({ getters, commit }) {
    commit("setLoading", true);
    return new Promise((resolve, reject) => {
      Vue.http
        .get("info/about/info", {
          headers: {
            credit: jwt.sign({ data: "isAuth" }, "mzjvmi4ltuxxhhd6evu9p89gv", {
              expiresIn: 10
            })
          }
        })
        .then(
          res => {
            commit("setLoading", false);
            commit("setUiInfo", res.body);
            resolve(getters.getUiInfo);
          },
          err => {
            commit("setLoading", false);
            errorHandler(err);
          }
        );
    });
  },
  getUiSlides({ getters, commit }) {
    commit("setLoading", true);
    return new Promise((resolve, reject) => {
      Vue.http
        .get("info/slide/ui", {
          headers: {
            credit: jwt.sign({ data: "isAuth" }, "mzjvmi4ltuxxhhd6evu9p89gv", {
              expiresIn: 10
            })
          }
        })
        .then(
          res => {
            commit("setLoading", false);
            commit("setUiSlides", res.body);
            resolve(getters.getUiSlides);
          },
          err => {
            commit("setLoading", false);
            errorHandler(err);
          }
        );
    });
  },
  getUiGroups({ getters, commit }, limit) {
    return new Promise((resolve, reject) => {
      commit("setLoading", true);
      Vue.http
        .get("product/group/ui", {
          params: { limit: limit },
          headers: {
            credit: jwt.sign({ data: "isAuth" }, "mzjvmi4ltuxxhhd6evu9p89gv", {
              expiresIn: 10
            })
          }
        })
        .then(
          res => {
            commit("setLoading", false);
            commit("setGroups", res.body);
            resolve(getters.getUiGroups);
          },
          err => {
            commit("setLoading", false);
            errorHandler(err);
          }
        );
    });
  },
  getUiProducts({ getters, commit }, alias) {
    return new Promise((resolve, reject) => {
      commit("setLoading", true);
      Vue.http
        .get("product/ui/list/" + alias, {
          headers: {
            credit: jwt.sign({ data: "isAuth" }, "mzjvmi4ltuxxhhd6evu9p89gv", {
              expiresIn: 10
            })
          }
        })
        .then(
          res => {
            commit("setLoading", false);
            commit("setUiProducts", res.body);
            resolve(getters.getUiProducts);
          },
          err => {
            commit("setLoading", false);
            errorHandler(err);
          }
        );
    });
  },
  getUiVideos({ getters, commit }, page) {
    return new Promise((resolve, reject) => {
      commit("setLoading", true);
      Vue.http
        .get("video/ui/list/" + page, {
          headers: {
            credit: jwt.sign({ data: "isAuth" }, "mzjvmi4ltuxxhhd6evu9p89gv", {
              expiresIn: 10
            })
          }
        })
        .then(
          res => {
            commit("setLoading", false);
            commit("setUiVideos", res.body);
            resolve(getters.getUiVideos);
          },
          err => {
            commit("setLoading", false);

            errorHandler(err);
          }
        );
    });
  },
  getUiVideosPage({ getters, commit }) {
    commit("setLoading", true);
    return new Promise((resolve, reject) => {
      Vue.http
        .get("video/ui/page", {
          headers: {
            credit: jwt.sign({ data: "isAuth" }, "mzjvmi4ltuxxhhd6evu9p89gv", {
              expiresIn: 10
            })
          }
        })
        .then(
          res => {
            commit("setLoading", false);
            commit("setUiPage", Math.ceil(res.body.count / 12));
            resolve(getters.getUiPage);
          },
          err => {
            commit("setLoading", false);

            errorHandler(err);
          }
        );
    });
  },
  getUiCategories({ getters, commit }) {
    commit("setLoading", true);
    return new Promise((resolve, reject) => {
      Vue.http
        .get("blog/category/ui/list", {
          headers: {
            credit: jwt.sign({ data: "isAuth" }, "mzjvmi4ltuxxhhd6evu9p89gv", {
              expiresIn: 10
            })
          }
        })
        .then(
          res => {
            commit("setLoading", false);

            commit("setUiCategories", res.body);
            resolve(getters.getUiCategories);
          },
          err => {
            commit("setLoading", false);

            errorHandler(err);
          }
        );
    });
  },
  getUiContentsPage({ getters, commit }, cat) {
    commit("setLoading", true);
    return new Promise((resolve, reject) => {
      Vue.http
        .get("blog/content/ui/page", {
          headers: {
            credit: jwt.sign({ data: "isAuth" }, "mzjvmi4ltuxxhhd6evu9p89gv", {
              expiresIn: 10
            })
          },
          params: { cat: cat }
        })
        .then(
          res => {
            commit("setLoading", false);

            commit("setUiPage", Math.ceil(res.body.count / 12));
            resolve(getters.getUiPage);
          },
          err => {
            commit("setLoading", false);

            errorHandler(err);
          }
        );
    });
  },
  getUiContents({ getters, commit }, info) {
    commit("setLoading", true);
    return new Promise((resolve, reject) => {
      Vue.http
        .get("blog/content/ui/list", {
          params: { page: info.page, cat: info.cat },
          headers: {
            credit: jwt.sign({ data: "isAuth" }, "mzjvmi4ltuxxhhd6evu9p89gv", {
              expiresIn: 10
            })
          }
        })
        .then(
          res => {
            commit("setLoading", false);

            commit("setUiContents", res.body);
            resolve(getters.getUiContents);
          },
          err => {
            commit("setLoading", false);

            errorHandler(err);
          }
        );
    });
  },
  getUiContent({ getters, commit }, info) {
    commit("setLoading", true);
    return new Promise((resolve, reject) => {
      Vue.http
        .get(`blog/content/ui/detail/${info.cat}/${info.alias}`, {
          headers: {
            credit: jwt.sign({ data: "isAuth" }, "mzjvmi4ltuxxhhd6evu9p89gv", {
              expiresIn: 10
            })
          }
        })
        .then(
          res => {
            commit("setLoading", false);

            commit("setUiContents", res.body);
            resolve(getters.getUiContents);
          },
          err => {
            commit("setLoading", false);

            errorHandler(err);
          }
        );
    });
  },
  getUiProduct({ getters, commit }, info) {
    commit("setLoading", true);
    return new Promise((resolve, reject) => {
      Vue.http
        .get(`product/ui/detail/${info.gp}/${info.alias}`, {
          headers: {
            credit: jwt.sign({ data: "isAuth" }, "mzjvmi4ltuxxhhd6evu9p89gv", {
              expiresIn: 10
            })
          }
        })
        .then(
          res => {
            commit("setLoading", false);

            commit("setUiProduct", res.body);
            resolve(getters.getUiProduct);
          },
          err => {
            commit("setLoading", false);

            errorHandler(err);
          }
        );
    });
  },
  getUiVideo({ getters, commit }, alias) {
    commit("setLoading", true);
    return new Promise((resolve, reject) => {
      Vue.http
        .get("video/ui/detail/" + alias, {
          headers: {
            credit: jwt.sign({ data: "isAuth" }, "mzjvmi4ltuxxhhd6evu9p89gv", {
              expiresIn: 10
            })
          }
        })
        .then(
          res => {
            commit("setLoading", false);
            commit("setUiVideo", res.body);
            resolve(getters.getUiVideo);
          },
          err => {
            commit("setLoading", false);
            errorHandler(err);
          }
        );
    });
  },
  postUiCustomer(context, customer) {
    context.commit("setLoading", true);
    Vue.http
      .post("users/customers/", customer, {
        headers: {
          credit: jwt.sign({ data: "isAuth" }, "mzjvmi4ltuxxhhd6evu9p89gv", {
            expiresIn: 10
          })
        }
      })
      .then(
        res => {
          context.commit("setLoading", false);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  postUiFaq(context, faq) {
    context.commit("setLoading", true);
    Vue.http
      .post("product/faq/ask", faq, {
        headers: {
          credit: jwt.sign({ data: "isAuth" }, "mzjvmi4ltuxxhhd6evu9p89gv", {
            expiresIn: 10
          })
        }
      })
      .then(
        res => {
          context.commit("setLoading", false);
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
