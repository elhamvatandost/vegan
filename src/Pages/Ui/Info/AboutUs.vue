<template>
  <div>
    <v-row class="mt-3">
      <v-col cols="12" md="6" sm="6" xs="12" class="text-center mt-3 pr-12">
        <v-sheet v-html="text"></v-sheet>
      </v-col>
      <v-col cols="12" md="6" sm="6" xs="12" class="text-center pl-12">
        <v-sheet>
          <v-img class="max-auto pa-5" :src="img"></v-img>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: "",
      text: "",
    };
  },
  methods: {
    async initialize() {
      let a = await this.$store.dispatch("getUiInfo");
      return a;
    },
  },
  created() {
    this.initialize().then((info) => {
      this.img =
        this.$store.getters.getStaticsUrl +
        info.aboutImg;
      this.text = info.about;
    });
  },
};
</script>

<style>
</style>