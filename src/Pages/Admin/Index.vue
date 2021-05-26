<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app right>
      <app-menu></app-menu>
    </v-navigation-drawer>

    <v-app-bar app color="light-green darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" :to="{ name: 'home'}" target="_blank">
            <v-icon>mdi-web</v-icon>
          </v-btn>
        </template>
        <span>نمایش وب‌سایت</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="signOut">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>خروج از پنل ادمین</span>
      </v-tooltip>
    </v-app-bar>

    <v-content style="margin:20px!important;">
      <router-view></router-view>
    </v-content>

    <v-footer color="grey darken-3" app></v-footer>
  </v-app>
</template>

<script>
import Menu from "./Shared/AppSideMenu";
export default {
  components: {
    "app-menu": Menu
  },
  name: "LayoutsDemosBaselineFlipped",
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    signOut() {
      this.$store.dispatch("signout");
    }
  },
  head: {
    title: function() {
      return {
        inner: "پنل مدیریتی"
      };
    }
  }
};
</script>

