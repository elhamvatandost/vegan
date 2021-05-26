<template>
  <v-container role>
    <v-row dense>
      <v-expansion-panels>
        <v-expansion-panel v-for="(item,i) in cards" :key="i">
          <v-expansion-panel-header>{{item.title}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-sheet color="pa-5 lime lighten-4" v-html="item.question"></v-sheet>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <v-sheet color="pa-5 grey lighten-3" v-html="item.answer"></v-sheet>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    cards: Array
  }
};
</script>

<style>
</style>