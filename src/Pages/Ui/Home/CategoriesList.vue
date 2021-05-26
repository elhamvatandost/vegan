<template>
  <div>
    <div class="mx-auto" style="margin-top:30px">
      <v-list-item two-line class="text-center">
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">گروه خدمات ارائه شده</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
    <v-container role>
      <v-timeline dense align-top>
        <v-timeline-item v-for="item in items" :key="item._id" large>
          <template v-slot:icon>
            <v-avatar>
              <img :src="item.icon" />
            </v-avatar>
          </template>
          <v-card class="elevation-2" @click="open(item.name)">
            <v-card-title class="headline">{{item.name}}</v-card-title>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-container>
    <v-col cols="12" class="text-center">
      <v-btn dark class="light-green darken-3" :to="{name : 'categories'}">خدمات بیشتر</v-btn>
    </v-col>
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
    open(item) {
      if (item !== this.$route.params.cat) {
        this.$router.push({
          name: "service-list",
          params: { cat: item }
        });
      }
    }
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

<style>
</style>