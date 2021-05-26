<template>
  <v-app>
    <div>
      <v-banner single-line>
      <v-icon
        slot="icon"
        color="warning"
        size="36"
      >
        mdi-bug
      </v-icon>
      صفحه مورد نظر وجود ندارد
      </v-banner>
    </div>
  </v-app>
</template>

<script>
export default {
  head: {
    title: function() {
      return {
        inner: "صفحه مورد نظر یافت نشد"
      };
    }
  }
}
</script>

<style>

</style>