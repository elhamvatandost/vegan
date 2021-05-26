<template>
  <div>
    <div class="mx-auto" style="margin-top:30px">
      <v-list-item two-line class="text-center">
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">گروه محصولات ارائه شده</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
    <v-container role>
      <v-row dense>
        <v-col v-for="card in cards" :key="card._id" cols="12" md="4" sm="6" xs="12">
          <v-card>
            <v-img
              :src="card.icon"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.name"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" @click="open(card.name)">
                    <v-icon color="light-green darken-3">mdi-eye</v-icon>
                  </v-btn>
                </template>
                <span>نمایش گروه محصول</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    v-on="on"
                    v-clipboard="share(card.name)"
                    v-clipboard:success="clipboardSuccessHandler"
                  >
                    <v-icon color="light-green darken-3">mdi-share-variant</v-icon>
                  </v-btn>
                </template>
                <span>اشتراک</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-avatar class="text-center" size="30">
                      <span class="black--text">{{card.count}}</span>
                    </v-avatar>
                  </v-btn>
                </template>
                <span>تعداد محصولات</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-col cols="12" class="text-center" v-if="list == 1">
      <v-btn dark class="light-green darken-3" :to="{name : 'ui-groups'}">محصولات بیشتر</v-btn>
    </v-col>
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
      text: "",
      snackbar: false,
      cards: []
    };
  },
  methods: {
    share(item) {
      return `${window.location.origin}/product/${item}`;
    },clipboardSuccessHandler(){
      this.snackbar = true;
      this.text = "لینک گروه محصول مورد نظر کپی شد .";
    },
    open(item) {
      this.$router.push({
        name: "product-list",
        params: { gp: item}
      });
    },
    async initialize() {
      let a = await this.$store.dispatch("getUiGroups", this.limit);
      return a;
    }
  },
  props: {
    limit: String ,
    list : String
  },
  created() {
    this.initialize().then(list => {
      list.forEach(element => {
        this.cards.push({
          _id: element._id,
          icon: this.$store.getters.getStaticsUrl + element.icon,
          name: element.name,
          count: element.count
        });
      });
    });
  }
};
</script>