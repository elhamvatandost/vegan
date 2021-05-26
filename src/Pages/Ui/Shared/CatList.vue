<template>
  <div>
    <v-card max-width="450" class="mx-auto">
      <v-list>
        <v-list-item @click="openAll()">
          <v-list-item-avatar color="light-green darken-3">
            <v-icon dark>mdi-library-books</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>همه مطالب</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-for="(item, index) in items">
          <v-divider :key="index"></v-divider>
          <v-list-item
            :key="item._id"
            :class="cat === item.name ? 'active-sub' : ''"
            @click="open(item.name)"
          >
            <v-list-item-avatar>
              <v-img :src="item.icon"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async initialize() {
      let a = await this.$store.dispatch("getUiCategories");
      return a;
    },
    openAll() {
      if (this.$route.params.cat) {
        this.$router.push({
          name: "categories"
        });
      }
    },
    open(item) {
      if (item !== this.$route.params.cat) {
        this.$router.push({
          name: "service-list",
          params: { cat: item }
        });
      }
    }
  },
  props: {
    cat: String
  },
  created() {
    this.initialize(0).then(list => {
      list.forEach(element => {
        this.items.push({
          _id: element._id,
          name: element.name,
          icon: this.$store.getters.getStaticsUrl + element.icon
        });
      });
    });
  }
};
</script>

<style scoped>
.active-sub {
  background-color: #c5cccc;
}
</style>