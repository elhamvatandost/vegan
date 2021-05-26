<template>
  <div>
    <div class="mx-auto" style="margin-top:30px">
      <v-list-item two-line class="text-center">
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">ویدیوهای ارائه شده</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
    <v-container role>
      <v-row dense>
        <v-col v-for="card in cards" :key="card._id" cols="12" md="4" sm="6" xs="12">
          <v-card max-width="344" class="mx-auto">
            <v-list-item>
              <v-list-item-avatar>
                <v-icon color="light-green darken-3" large>mdi-video</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{card.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-img :src="card.pic" height="194"></v-img>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon large color="light-green darken-3" @click="open(card.alias)">mdi-play</v-icon>
                  </v-btn>
                </template>
                <span>نمایش ویدیو</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    v-on="on"
                    v-clipboard="share(card.alias)"
                    v-clipboard:success="clipboardSuccessHandler"
                  >
                    <v-icon color="light-green darken-3">mdi-share-variant</v-icon>
                  </v-btn>
                </template>
                <span>اشتراک</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div class="text-center">
      <v-pagination color="light-green darken-3" v-model="page" :length="count" :total-visible="7"></v-pagination>
    </div>
    <br />
    <v-snackbar v-model="snackbar" :multi-line="true" top color="white">
      <span style="color : black">{{ text }}</span>
      <v-btn color="red" text @click="snackbar = false">بستن</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      text: "",
      page: 1,
      count: 1,
      cards: []
    };
  },
  methods: {
    share(item) {
      return `${window.location.origin}/video/${item}`;
    },
    clipboardSuccessHandler() {
      this.snackbar = true;
      this.text = "لینک ویدیو مورد نظر کپی شد .";
    },
    open(item) {
      this.$router.push({
        name: "ui-video",
        params: { video: item }
      });
    },
    async initialize(page) {
      let a = await this.$store.dispatch("getUiVideos", page);
      return a;
    },
    async pageinit() {
      let a = await this.$store.dispatch("getUiVideosPage");
      return a;
    }
  },
  watch: {
    page: function(val) {
      this.cards = [];
      this.initialize(this.page - 1).then(list => {
        list.forEach(element => {
          this.cards.push({
            _id: element._id,
            name: element.name,
            alias: element.alias,
            pic: this.$store.getters.getStaticsUrl + element.pic
          });
        });
      });
    }
  },
  created() {
    this.initialize(0).then(list => {
      list.forEach(element => {
        this.cards.push({
          _id: element._id,
          name: element.name,
          alias: element.alias,
          pic: this.$store.getters.getStaticsUrl + element.pic
        });
      });
    });
    this.pageinit().then(res => {
      this.count = parseInt(res, 10);
    });
  },
  head: {
    title: function() {
      return {
        inner: "لیست ویدیوها"
      };
    }
  }
};
</script>