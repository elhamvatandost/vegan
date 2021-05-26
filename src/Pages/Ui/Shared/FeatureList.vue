<template>
  <div>
    <v-container role>
      <v-row dense>
        <v-col v-for="(card,i) in cards" :key="i" cols="12" sm="6" md="4" xs="12">
          <v-card class="mx-auto" max-width="344">
            <v-img :src="card.picture" height="200px"></v-img>
            <v-card-title style="font-size: 15px;">{{card.title}}</v-card-title>
            <v-card-actions>
              متن
              <v-spacer></v-spacer>
              <v-btn icon @click="card.show = !card.show">
                <v-icon>{{ card.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="card.show">
                <v-divider></v-divider>
                <v-card-text>{{card.text}}</v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
export default {
  data: () => ({
    show: []
  }),
  props: {
    cards: Array
  },
  created() {
    this.cards.forEach(element => {
      this.show.push(false);
    });
  }
};
</script>