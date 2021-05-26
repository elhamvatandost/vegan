<template>
  <div>
    <router-view></router-view>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="80"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
export default {
  methods: {
    changeRTL() {
      this.$vuetify.rtl = true;
    },
  },
  computed : {
    loading(){
      return this.$store.getters.getLoading;
    }
  }
};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>


