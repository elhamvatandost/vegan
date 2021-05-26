import Vue from "vue";
const { errorHandler } = require("../../../Utils/ErrorHandler");

const state = {
  Groups: [],
  singleGroup: {}
};
const getters = {
  getGroupList(state) {
    return state.Groups;
  },
  getSingleGroup(state) {
    return state.singleGroup;
  }
};
const mutations = {
  pushGroup(state, Group) {
    state.Groups.push(Group);
  },
  pullGroup(state, id) {
    for (var i = 0; i < state.Groups.length; i++) {
      if (state.Groups[i]._id === id) {
        state.Groups.splice(i, 1);
      }
    }
  },
  setGroups(state, list) {
    state.Groups = list;
  },
  setSingleGroup(state, Group) {
    state.singleGroup = Group;
  }
};
const actions = {
  addGroup(context, Group) {
    context.commit("setLoading", true);
    Vue.http
      .post("product/group", Group, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pushGroup", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  editGroup(context, Group) {
    context.commit("setLoading", true);
    Vue.http
      .put("product/group", Group, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pullGroup", Group._id);
          context.commit("pushGroup", res.body);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  rmvGroup(context, id) {
    context.commit("setLoading", true);
    Vue.http
      .delete("product/group/" + id, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pullGroup", id);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  getGroup({ getters, commit }, id) {
    commit("setLoading", true);
    return new Promise((resolve, reject) => {
      Vue.http
        .get("product/group/detail/" + id, {
          headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
        })
        .then(
          res => {
            commit("setLoading", false);
            commit("setSingleGroup", res.body);
            resolve(getters.getSingleGroup);
          },
          err => {
            commit("setLoading", false);
            errorHandler(err);
          }
        );
    });
  },
  getGroupList(context) {
    context.commit("setLoading", true);
    Vue.http
      .get("product/group", {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setGroups", res.body);
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
