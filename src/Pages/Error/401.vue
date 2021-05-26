<template>
    <v-app>
    <div>
      <v-banner single-line>
      <v-icon
        slot="icon"
        color="warning"
        size="36"
      >
         mdi-security-network
      </v-icon>
      صفحه مورد نظر در دسترس نیست
      </v-banner>
            <v-banner single-line>
      <v-icon
        slot="icon"
        color="warning"
        size="36"
      >
          mdi-wifi
      </v-icon>
      اینترنت شما ضعیف است
      </v-banner>
    </div>
  </v-app>
</template>

<script>
export default {
  head: {
    title: function() {
      return {
        inner: "عدم دسترسی"
      };
    }
  }
}
</script>

<style>

</style>