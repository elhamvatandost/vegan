<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="7" md="8" xs="12">
          <v-card class="mx-auto">
            <v-container>
              <v-row>
                <v-col v-for="(item, i) in items" :key="i" cols="12">
                  <v-card
                    @click="open({
                    alias : item.alias,
                    cat : item.cat
                  })"
                  >
                    <div class="d-flex flex-no-wrap justify-space-between">
                      <div>
                        <v-card-title class="headline" v-text="item.name"></v-card-title>
                      </div>
                      <v-avatar class="ma-3" size="125" tile>
                        <v-img :src="item.pic"></v-img>
                      </v-avatar>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12" sm="5" md="4" xs="12">
          <CatList />
        </v-col>
      </v-row>
    </v-container>
    <br />
    <div class="text-center">
      <v-pagination color="light-green darken-3" v-model="page" :length="count" :total-visible="7"></v-pagination>
    </div>
    <br />
  </div>
</template>

<script>
import CatList from "../Shared/CatList";
export default {
  data() {
    return {
      page: 1,
      count: 1,
      items: []
    };
  },
  methods: {
    async initialize(page) {
      let a = await this.$store.dispatch("getUiContents", {
        page,
        cat: this.$route.params.cat
      });
      return a;
    },
    async pageinit(cat) {
      let a = await this.$store.dispatch("getUiContentsPage", cat);
      return a;
    },
    open(item) {
      this.$router.push({
        name: "ui-service",
        params: { cat: item.cat, service: item.alias }
      });
    }
  },
  components: {
    CatList
  },
  watch: {
    page: function(val) {
      this.items = [];
      this.initialize(this.page - 1).then(list => {
        list.forEach(element => {
          this.items.push({
            _id: element._id,
            name: element.name,
            alias: element.alias,
            cat: element.cat,
            pic: this.$store.getters.getStaticsUrl + element.picture
          });
        });
      });
    },
    $route(to, from) {
      this.items = [];
      this.initialize(this.page - 1).then(list => {
        list.forEach(element => {
          this.items.push({
            _id: element._id,
            name: element.name,
            alias: element.alias,
            cat: element.cat,
            pic: this.$store.getters.getStaticsUrl + element.picture
          });
        });
      });
      this.pageinit(this.$route.params.cat).then(res => {
        this.count = parseInt(res, 10);
      });
      this.page = 1;
    }
  },
  created() {
    this.items = [];
    this.initialize(0).then(list => {
      list.forEach(element => {
        if (element.picture == null) {
          this.items.push({
            _id: element._id,
            name: element.name,
            alias: element.alias,
            cat: element.cat
          });
        } else {
          this.items.push({
            _id: element._id,
            pic: this.$store.getters.getStaticsUrl + element.picture,
            name: element.name,
            alias: element.alias,
            cat: element.cat
          });
        }
      });
    });
    this.pageinit("").then(res => {
      this.count = parseInt(res, 10);
    });
  },
  head: {
    title: function() {
      return {
        inner: "لیست خدمات"
      };
    }
  }
};
</script>
<style>
</style>