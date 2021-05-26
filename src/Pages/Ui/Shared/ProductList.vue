<template>
  <div>
    <v-container role>
      <v-row dense>
        <v-col v-for="(card,i) in cards" :key="i" cols="12" sm="6" md="4" xs="12">
          <v-card max-width="344" class="mx-auto">
            <v-list-item>
              <v-list-item-avatar>
                <v-icon color="light-green darken-3" large>mdi-barcode</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{card.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-img :src="card.picture" height="194"></v-img>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon
                      color="light-green darken-3"
                      @click="open({alias : card.alias , gp : card.gp})"
                    >mdi-eye</v-icon>
                  </v-btn>
                </template>
                <span>نمایش محصول</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    v-on="on"
                    v-clipboard="share({alias : card.alias , gp : card.gp})"
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
      snackbar: false
    };
  },
  props: {
    cards : Array
  },
  methods: {
    share(item) {
      return `${window.location.origin}/product/${item.gp}/${item.alias}`;
    },
    clipboardSuccessHandler() {
      this.snackbar = true;
      this.text = "لینک محصول مورد نظر کپی شد .";
    },
    open(item) {
      this.$router.push({
        name: "ui-product",
        params: { gp: item.gp, product: item.alias }
      });
    }
  }
};
</script>

<style>
</style>