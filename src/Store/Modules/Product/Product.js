import Vue from "vue";
const { errorHandler } = require("../../Utils/ErrorHandler");

const state = {
  list: [],
  singleProduct: {},
  singleProductRelateds: [],
  singleProductAttaches: [],
  singleProductDetails: [],
  singleProductFeatures: []
};
const getters = {
  getProductList(state) {
    return state.list;
  },
  getSingleProduct(state) {
    return state.singleProduct;
  },
  getRelatedSingleProduct(state) {
    return state.singleProductRelateds;
  },
  getAttachesSingleProduct(state) {
    return state.singleProductAttaches;
  },
  getDetailsSingleProduct(state) {
    return state.singleProductDetails;
  },
  getFeaturesSingleProduct(state) {
    return state.singleProductFeatures;
  }
};
const mutations = {
  setProductList(state, list) {
    state.list = list;
  },
  pushProduct(state, Product) {
    state.list.push(Product);
  },
  pullProduct(state, id) {
    for (var i = 0; i < state.list.length; i++) {
      if (state.list[i]._id === id) {
        state.list.splice(i, 1);
      }
    }
  },
  setSingleProduct(state, Product) {
    state.singleProduct = Product;
  },
  setRelatedSingleProduct(state, list) {
    state.singleProductRelateds = list;
  },
  pushProductRelated(state, product) {
    state.singleProductRelateds.push(product);
  },
  pullProductRelated(state, id) {
    for (var i = 0; i < state.singleProductRelateds.length; i++) {
      if (state.singleProductRelateds[i]._id === id) {
        state.singleProductRelateds.splice(i, 1);
      }
    }
  },
  setAttachSingleProduct(state, list) {
    state.singleProductAttaches = list;
  },
  pushProductAttach(state, attach) {
    state.singleProductAttaches.push(attach);
  },
  pullProductAttach(state, id) {
    for (var i = 0; i < state.singleProductAttaches.length; i++) {
      if (state.singleProductAttaches[i]._id === id) {
        state.singleProductAttaches.splice(i, 1);
      }
    }
  },
  setDetailSingleProduct(state, list) {
    state.singleProductDetails = list;
  },
  pushProductDetail(state, Detail) {
    state.singleProductDetails.push(Detail);
  },
  pullProductDetail(state, id) {
    for (var i = 0; i < state.singleProductDetails.length; i++) {
      if (state.singleProductDetails[i]._id === id) {
        state.singleProductDetails.splice(i, 1);
      }
    }
  },
  setFeatureSingleProduct(state, list) {
    state.singleProductFeatures = list;
  },
  pushProductFeature(state, Feature) {
    state.singleProductFeatures.push(Feature);
  },
  pullProductFeature(state, id) {
    for (var i = 0; i < state.singleProductFeatures.length; i++) {
      if (state.singleProductFeatures[i]._id === id) {
        state.singleProductFeatures.splice(i, 1);
      }
    }
  }
};
const actions = {
  getProductList(context) {
    context.commit("setLoading", true);
    Vue.http
      .get("product", {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setProductList", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  getRelatedSingleProduct(context, id) {
    context.commit("setLoading", true);
    Vue.http
      .get("product/relateds/" + id, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setRelatedSingleProduct", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  getDetailSingleProduct(context, id) {
    context.commit("setLoading", true);
    Vue.http
      .get("product/details/" + id, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setDetailSingleProduct", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  getFeatureSingleProduct(context, id) {
    context.commit("setLoading", true);
    Vue.http
      .get("product/features/" + id, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setFeatureSingleProduct", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  getAttachSingleProduct(context, id) {
    context.commit("setLoading", true);
    Vue.http
      .get("product/attaches/" + id, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setAttachSingleProduct", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  addProduct(context, Product) {
    context.commit("setLoading", true);
    Vue.http
      .post("product", Product, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pushProduct", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  rmvProduct(context, id) {
    context.commit("setLoading", true);
    Vue.http
      .delete("product/del/" + id, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pullProduct", id);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  getSingleProduct({ getters, commit }, id) {
    commit("setLoading", true);
    return new Promise((resolve, reject) => {
      Vue.http
        .get("product/detail/" + id, {
          headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
        })
        .then(
          res => {
            commit("setLoading", false);
            commit("setSingleProduct", res.body);
            resolve(getters.getSingleProduct);
          },
          err => {
            commit("setLoading", false);
            errorHandler(err);
          }
        );
    });
  },
  editSingleProduct(context, Product) {
    context.commit("setLoading", true);
    Vue.http
      .put("product", Product, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setSingleProduct", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  addProductRelated({ dispatch, commit }, related) {
    commit("setLoading", true);
    Vue.http
      .put("product/relateds", related, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          commit("setLoading", false);
          dispatch("getRelatedSingleProduct", related._id);
        },
        err => {
          commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  rmvProductRelated({ dispatch, commit }, tmp) {
    commit("setLoading", true);
    Vue.http
      .delete(`product/relateds/${tmp._id}/${tmp.rid}`, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          commit("setLoading", false);
          dispatch("getRelatedSingleProduct", tmp._id);
        },
        err => {
          commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  addProductAttach({ dispatch, commit }, attach) {
    commit("setLoading", true);
    Vue.http
      .put("product/attaches", attach, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          commit("setLoading", false);
          dispatch("getAttachSingleProduct", attach._id);
        },
        err => {
          commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  rmvProductAttach({ dispatch, commit }, tmp) {
    commit("setLoading", true);
    Vue.http
      .delete(`product/attaches/${tmp._id}/${tmp.aid}`, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          commit("setLoading", false);
          dispatch("getAttachSingleProduct", tmp._id);
        },
        err => {
          commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  addProductDetail({ dispatch, commit }, detail) {
    commit("setLoading", true);
    Vue.http
      .put("product/details", detail, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          commit("setLoading", false);
          dispatch("getDetailSingleProduct", detail._id);
        },
        err => {
          commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  rmvProductDetial({ dispatch, commit }, tmp) {
    commit("setLoading", true);
    Vue.http
      .delete(`product/details/${tmp._id}/${tmp.did}`, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          commit("setLoading", false);
          dispatch("getDetailSingleProduct", tmp._id);
        },
        err => {
          commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  addProductFeature({ dispatch, commit }, feature) {
    commit("setLoading", true);
    Vue.http
      .put("product/features", feature, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          commit("setLoading", false);
          dispatch("getFeatureSingleProduct", feature._id);
        },
        err => {
          commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  rmvProductFeature({ dispatch, commit }, tmp) {
    commit("setLoading", true);
    Vue.http
      .delete(`product/features/${tmp._id}/${tmp.fid}`, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          commit("setLoading", false);
          dispatch("getFeatureSingleProduct", tmp._id);
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
