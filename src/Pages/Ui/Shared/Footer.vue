<template>
  <v-row justify="center">
    <v-col cols="12" sm="6">
      <v-list>
        <v-list-item>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-action v-bind="attrs" v-on="on">
                <v-icon color="light-green darken-3">mdi-deskphone</v-icon>
              </v-list-item-action>
            </template>
            <span>تلفن‌ها</span>
          </v-tooltip>

          <v-list-item-content>
            <v-list-item-title dir="ltr" class="text-right">{{
              this.phones.toString().replace(/,/g, "  |  ")
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>
        <v-list-item>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-action v-bind="attrs" v-on="on">
                <v-icon color="light-green darken-3">mdi-clock</v-icon>
              </v-list-item-action>
            </template>
            <span>ساعت کاری</span>
          </v-tooltip>

          <v-list-item-content>
            <v-list-item-title>{{ this.time }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>
        <v-list-item @click="openmap()">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-action v-bind="attrs" v-on="on">
                <v-icon color="light-green darken-3">mdi-map-marker</v-icon>
              </v-list-item-action>
            </template>
            <span>نشانی</span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title>{{ this.location }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col cols="12" sm="6" class="text-center">
      <v-row>
        <v-card
          class="mx-auto"
          width="150"
          height="150"
          elevation="0"
        ><v-img src="/src/assets/icon1.png"></v-img></v-card>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    location: String,
    locationLink: String,
    time: String,
    phones: String,
  },
  methods: {
    openmap() {
      window.open(this.locationLink , "_blank");
    },
  },
};
</script>