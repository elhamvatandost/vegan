<template>
  <div>
    <v-container role class="mt-5">
      <v-banner elevation="3">
        <v-icon slot="icon" color="light-green darken-3" size="36">mdi-barcode</v-icon>
        {{ this.group }}
        <template v-slot:actions>
          <v-btn color="light-green darken-3" class="mb-2" text :to="{ name: 'ui-groups' }"
            >نمایش تمام گروه محصولات</v-btn
          >
        </template>
      </v-banner>
    </v-container>
    <div class="mx-auto" style="margin-top: 30px">
      <v-list-item two-line class="text-center">
        <v-list-item-content>
          <v-list-item-title class="headline mb-1"
            >محصولات ارائه شده</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </div>
    <ProductList :cards="cards" />
  </div>
</template>

<script>
import ProductList from "../Shared/ProductList";
export default {
  data() {
    return {
      text: "",
      snackbar: false,
      cards: [],
      group: this.$route.params.gp,
    };
  },
  components: {
    ProductList,
  },
  methods: {
    async initialize() {
      let a = await this.$store.dispatch(
        "getUiProducts",
        this.$route.params.gp
      );
      return a;
    },
  },
  watch: {
    $route(to, from) {
      this.cards = [];
      this.initialize().then((list) => {
        list.forEach((element) => {
          if (element.picture == null) {
            this.cards.push({
              _id: element._id,
              name: element.name,
              alias: element.alias,
              gp: this.$route.params.gp,
            });
          } else {
            this.cards.push({
              _id: element._id,
              picture: this.$store.getters.getStaticsUrl + element.picture,
              name: element.name,
              alias: element.alias,
              gp: this.$route.params.gp,
            });
          }
        });
      });
    },
  },
  created() {
    this.initialize().then((list) => {
      list.forEach((element) => {
        if (element.picture == null) {
          this.cards.push({
            _id: element._id,
            name: element.name,
            alias: element.alias,
            gp: this.$route.params.gp,
          });
        } else {
          this.cards.push({
            _id: element._id,
            picture: this.$store.getters.getStaticsUrl + element.picture,
            name: element.name,
            alias: element.alias,
            gp: this.$route.params.gp,
          });
        }
      });
    });
  },
  head: {
    title: function () {
      return {
        inner: this.group,
      };
    },
  },
};
</script>