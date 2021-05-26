import Vue from "vue";

const state = {
  files: []
};
const { errorHandler } = require("../../Utils/ErrorHandler");

const path = require("path");

const getters = {
  getFileList(state) {
    return state.files;
  },
  getFileUrl() {
    return "https://api.c1t.ir/api/upload/files/";
  },
  getStaticsUrl() {
    return "https://api.c1t.ir/api/upload/statics/";
  }
};
const mutations = {
  pushFile(state, File) {
    state.files.push(File);
  },
  pullFile(state, id) {
    for (var i = 0; i < state.files.length; i++) {
      if (state.files[i]._id === id) {
        state.files.splice(i, 1);
      }
    }
  },
  setFiles(state, list) {
    state.files = list;
  }
};
const actions = {
  addFile({ dispatch , commit }, file) {
    commit("setLoading", true);
    let formData = new FormData();
    formData.append(
      "file",
      file.file,
      file.name + path.extname(file.file.name)
    );
    Vue.http
      .post("upload/", formData, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          commit("setLoading", false);
          dispatch("getFileList");
        },
        err => {
          commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  rmvFile(context, id) {
    context.commit("setLoading", true);
    Vue.http
      .delete("upload/files/" + id, {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("pullFile", id);
        },
        err => {
          context.commit("setLoading", false);
          errorHandler(err);
        }
      );
  },
  getFileList(context) {
    context.commit("setLoading", true);
    Vue.http
      .get("upload/list", {
        headers: { x_auth: Vue.cookie.get("Etta_Power_Token") }
      })
      .then(
        res => {
          context.commit("setLoading", false);
          context.commit("setFiles", res.body);
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
