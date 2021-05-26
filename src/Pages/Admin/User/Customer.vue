<template>
  <v-form>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>لیست مشتریان</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="headers"
                  v-model="selected"
                  :items="getCustomerList"
                  :items-per-page="5"
                  show-select
                  :single-select="false"
                  item-key="_id"
                  class="elevation-1"
                ></v-data-table>
              </v-col>
              <v-btn
                color="error"
                @click="rmvCustomer"
                :disabled="this.selected.length == 0 ? true : false"
                class="mr-3"
              >
                ‍ حذف علامت‌دارها
                ‍
              </v-btn>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-snackbar v-model="snackbar" :multi-line="true" top color="white">
      <span style="color : black">{{ text }}</span>
      <v-btn color="red" text @click="snackbar = false">بستن</v-btn>
    </v-snackbar>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      text: "",
      panel: [0],
      headers: [
        { text: "نام", align: "start", sortable: false, value: "name" },
        { text: "تلفن", value: "phone" },
        { text: "تاریخ ثبت", value: "date" },
        { text: "توضیحات", value: "product" },
      ],
      selected: []
    };
  },
  methods: {
    rmvCustomer() {
      this.$store.dispatch("rmvCustomer", this.selected).then(() => {
        this.selected = [];
        this.snackbar = true;
        this.text = "مشتریان مورد نظر حذف شدند .";
      });
    }
  },
  computed: {
    getCustomerList() {
      return this.$store.getters.getCustomerList;
    },

  },
  created() {
    this.$store.dispatch("getCustomerList");
  }
};
</script>

<style>
</style>