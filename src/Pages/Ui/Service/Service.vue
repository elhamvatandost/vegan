<template>
  <div>
    <v-container role class="mt-5">
      <v-banner elevation="3">
        <v-icon slot="icon" color="light-green darken-3" size="36">mdi-puzzle</v-icon>
        {{this.cat}}
        <template v-slot:actions>
          <v-btn
            color="light-green darken-3"
            class="mb-2"
            text
            :to="{name : 'service-list' , params : {cat : cat}}"
          >نمایش تمام خدمات</v-btn>
        </template>
      </v-banner>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card role>
            <v-carousel>
              <v-carousel-item
                v-for="(item,i) in pictures"
                :key="i"
                :src="item"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-sheet class="mx-auto pa-3" elevation="2">
            <p class="headline text-justify">{{this.name}}</p>
          </v-sheet>
        </v-col>
        <v-col cols="12">
          <v-sheet class="mx-auto pa-4" elevation="2">
            <p class="text-justify" v-html="this.text"></p>
          </v-sheet>
        </v-col>
        <v-col cols="12" v-if="this.relateds.length != 0">
          <div class="mx-auto" style="margin-top:30px">
            <v-list-item two-line class="text-center">
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">محصولات مرتبط</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <ProductList :cards="relateds" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProductList from "../Shared/ProductList";

export default {
  data() {
    return {
      cat: this.$route.params.cat,
      name: "",
      text: "",
      relateds: [],
      pictures: []
    };
  },
  components: {
    ProductList
  },
  watch: {
    name: function(val) {
      document.title = "کلوپ وِگان  -   " + val;
    }
  },
  methods: {
    async initialize() {
      let a = await this.$store.dispatch("getUiContent", {
        cat: this.$route.params.cat,
        alias: this.$route.params.service
      });
      return a;
    }
  },
  created() {
    this.initialize().then(res => {
      this.name = res.name;
      this.text = res.text;
      res.attaches.sort((a, b) => {
        if (a.index < b.index) {
          return -1;
        } else {
          return 1;
        }
      });
      res.attaches.forEach(element => {
        this.pictures.push(this.$store.getters.getStaticsUrl + element.attach);
      });
      res.relateds.forEach(element => {
        this.relateds.push({
          _id: element._id,
          gp: element.gp,
          name: element.name,
          alias: element.alias,
          picture: this.$store.getters.getStaticsUrl + element.picture
        });
      });
    });
  },
  head: {
    title: function() {
      return {
        inner: this.name
      };
    }
  }
};
</script>

<style>
</style>