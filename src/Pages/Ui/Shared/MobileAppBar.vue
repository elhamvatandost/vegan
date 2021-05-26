<template>
  <v-list dense>
    <router-link
      tag="v-list-item"
      active-class="active"
      :to="{ name: 'home' }"
      exact
    >
      <v-list-item-action>
        <v-icon>mdi mdi-home-outline</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>صفحه اصلی</v-list-item-title>
      </v-list-item-content>
    </router-link>
    <v-list-group prepend-icon=">mdi mdi-puzzle-outline" no-action>
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>خدمات</v-list-item-title>
        </v-list-item-content>
      </template>
      <router-link
        tag="v-list-item"
        active-class="active"
        v-for="item in items"
        :key="item._id"
        exact
        :to="{ name: 'service-list', params: { cat: item.title } }"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </router-link>
      <router-link
        tag="v-list-item"
        active-class="active"
        :to="{ name: 'categories' }"
        exact
      >
        <v-list-item-content>
          <v-list-item-title>همه مطالب</v-list-item-title>
        </v-list-item-content>
      </router-link>
    </v-list-group>
    <v-list-group prepend-icon=">mdi mdi-barcode" no-action>
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>محصولات</v-list-item-title>
        </v-list-item-content>
      </template>
      <router-link
        tag="v-list-item"
        active-class="active"
        v-for="item in cards.slice(0, 7)"
        :key="item._id"
        exact
        :to="{ name: 'product-list', params: { gp: item.title } }"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </router-link>
      <router-link
        tag="v-list-item"
        active-class="active"
        :to="{ name: 'ui-groups' }"
        exact
      >
        <v-list-item-content>
          <v-list-item-title>همه محصولات</v-list-item-title>
        </v-list-item-content>
      </router-link>
    </v-list-group>
    <router-link
      tag="v-list-item"
      active-class="active"
      :to="{ name: 'ui-videos' }"
    >
      <v-list-item-action>
        <v-icon>mdi mdi-video</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>ویدیوها</v-list-item-title>
      </v-list-item-content>
    </router-link>
    <router-link
      tag="v-list-item"
      active-class="active"
      :to="{ name: 'ui-about' }"
    >
      <v-list-item-action>
        <v-icon>mdi mdi-information-outline</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>درباره‌ما</v-list-item-title>
      </v-list-item-content>
    </router-link>
    <v-list-item @click="click">
      <v-list-item-action>
        <v-icon>mdi mdi-deskphone</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>تماس‌با‌ما</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data: () => ({
    items: [],
    cards: [],
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

<style scoped>
.active {
  background-color: #ccc6c6;
}
</style>