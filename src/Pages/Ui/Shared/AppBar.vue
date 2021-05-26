<template>
  <v-row class="mr-5">
    <v-btn
      color="light-green darken-3"
      class="font-weight-bold"
      text
      elevation="0"
      :to="{ name: 'home' }"
      exact
    >
      <v-icon class="ml-1">mdi-home-outline</v-icon>صفحه اصلی
    </v-btn>
    <div class="text-center">
      <v-menu open-on-hover offset-y left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="light-green darken-3"
            class="font-weight-bold"
            text
            elevation="0"
            v-bind="attrs"
            v-on="on"
            :to="{ name: 'categories' }"
          >
            <v-icon class="ml-1">mdi-puzzle-outline</v-icon>خدمات
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="item in items.slice(0,7)"
            :key="item._id"
            :to="{ name: 'service-list', params: { cat: item.title } }"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="text-center">
      <v-menu open-on-hover offset-y left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="light-green darken-3"
            class="font-weight-bold"
            text
            elevation="0"
            v-bind="attrs"
            v-on="on"
            :to="{ name: 'ui-groups' }"
          >
            <v-icon class="ml-1">mdi-barcode</v-icon>محصولات
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in cards.slice(0,7)"
            :key="item._id"
            :to="{ name: 'product-list', params: { gp: item.title } }"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-btn
      color="light-green darken-3"
      class="font-weight-bold"
      text
      elevation="0"
      :to="{ name: 'ui-videos' }"
    >
      <v-icon class="ml-1">mdi-video-outline</v-icon>ویدئوها
    </v-btn>
    <v-btn
      color="light-green darken-3"
      class="font-weight-bold"
      text
      elevation="0"
      :to="{ name: 'ui-about' }"
    >
      <v-icon class="ml-1">mdi-information-outline</v-icon>درباره‌ما
    </v-btn>
    <v-btn
      color="light-green darken-3"
      class="font-weight-bold"
      text
      elevation="0"
      @click="click"
    >
      <v-icon class="ml-1">mdi-deskphone</v-icon>تماس‌با‌ما
    </v-btn>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    items: [],
    cards: [],
    dialog: false,
  }),
  methods: {
    click() {
      window.scrollTo(
        0,
        document.body.scrollHeight || document.documentElement.scrollHeight
      );
    },
    async initialize() {
      let a = await this.$store.dispatch("getUiCategories");
      return a;
    },
    async _initialize() {
      let a = await this.$store.dispatch("getUiGroups", 10);
      return a;
    },
  },
  created() {
    this.initialize(0).then((list) => {
      list.forEach((element) => {
        this.items.push({
          _id: element._id,
          title: element.name,
        });
      });
    });
    this._initialize(0).then((list) => {
      list.forEach((element) => {
        this.cards.push({
          _id: element._id,
          title: element.name,
        });
      });
    });
  },
};
</script>

<style>
</style>