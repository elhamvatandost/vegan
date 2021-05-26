import Vue from "vue";
const { errorHandler } = require("../../../Utils/ErrorHandler");

const state = {
  categories: [],
  singleCategory: {}
};
const getters = {
  getCategoryList(state) {
    return state.categories;
  },
  getSingleCategory(state) {
    return state.singleCategory;
  }
};
const mutations = {
  pushCategory(state, Category) {
    state.categories.push(Category);
  },
  pullCategory(state, id) {
    for (var i = 0; i < state.categories.length; i++) {
      if (state.categories[i]._id === id) {
        state.categories.splice(i, 1);
      }
    }
  },
  setCategories(state, list) {
    state.categories = list;
  },
  setSingleCategory(state, Category) {
    state.singleCategory = Category;
  }
};
const actions = {
  addCategory(context, Category) {
    context.commit("setLoading", true);
    Vue.http
      .post("blog/category", Category, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pushCategory", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  editCategory(context, Category) {
    context.commit("setLoading", true);
    Vue.http
      .put("blog/category", Category, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pullCategory", Category._id);
          context.commit("pushCategory", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  rmvCategory(context, id) {
    context.commit("setLoading", true);
    Vue.http
      .delete("blog/category/" + id, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pullCategory", id);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  getCategory({ commit, getters }, id) {
    commit("setLoading", true);
    return new Promise((resolve, reject) => {
      Vue.http
        .get("blog/category/detail/" + id, {
          headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
        })
        .then(
          res => {
            commit("setLoading", false);
            commit("setSingleCategory", res.body);
            resolve(getters.getSingleCategory);
          },
          err => {
            commit("setLoading", false);
            errorHandler(err);
          }
        );
    });
  },
  getCategoryList(context) {
    context.commit("setLoading", true);
    Vue.http
      .get("blog/category", {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setCategories", res.body);
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
