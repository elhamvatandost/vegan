<template>
  <form>
    <v-data-table :headers="headers" :items="getList" sort-by="_id" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>ویژگی و مزایا</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1500px">
            <template v-slot:activator="{ on }">
              <v-btn color="light-green darken-3" dark class="mb-2" v-on="on">ویژگی و مزایا جدید</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.title"
                        :error-messages="titleErr"
                        required
                        @input="$v.editedItem.title.$touch()"
                        @blur="$v.editedItem.title.$touch()"
                        label="نام"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <autocomplete
                        source="https://api.c1t.ir/api/upload/images?q="
                        results-value="_id"
                        results-display="filename"
                        class="v-text-field"
                        placeholder="عکس  ..."
                        @selected="selected"
                        @clear="cleared"
                        @input="$v.editedItem.icon.$touch()"
                        @blur="$v.editedItem.icon.$touch()"
                        :request-headers="authHeaders"
                      ></autocomplete>
                      <span style="color:red">{{ iconErr.toString() }}‌</span>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="editedItem.text"
                        :error-messages="textErr"
                        required
                        @input="$v.editedItem.text.$touch()"
                        @blur="$v.editedItem.text.$touch()"
                        label="متن"
                        outlined
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="success" @click="save" :disabled="$v.editedItem.$invalid">ذخیره</v-btn>
                <v-btn class="error" @click="close">انصراف</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item._id="{ item }">
        <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:item.icon="{ item }">
        <v-icon @click="showimage(item)">mdi-image</v-icon>
      </template>
    </v-data-table>
    <v-snackbar v-model="snackbar" :multi-line="true" top color="white">
      <span style="color : black">{{ text }}</span>
      <v-btn color="red" text @click="snackbar = false">بستن</v-btn>
    </v-snackbar>
  </form>
</template>


<script>
import Autocomplete from "vuejs-auto-complete";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    autocomplete: Autocomplete
  },
  data: () => ({
    snackbar: false,
    text: "",
    dialog: false,
    headers: [
      {
        text: "نام",
        align: "start",
        sortable: false,
        value: "title"
      },
      { text: "عکس", sortable: false, value: "icon" },
      { text: "ویرایش / حذف", value: "_id", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      title: "",
      icon: "",
      text: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "ثبت ویژگی و مزایا جدید"
        : "ویرایش ویژگی و مزایا";
    },
    getList() {
      return this.$store.getters.getFeatureList;
    },
    titleErr() {
      const errors = [];
      if (!this.$v.editedItem.title.$dirty) return errors;
      !this.$v.editedItem.title.required && errors.push("نام را وارد کنید");
      return errors;
    },
    iconErr() {
      const errors = [];
      if (!this.$v.editedItem.icon.$dirty) return errors;
      !this.$v.editedItem.icon.required && errors.push("عکس را وارد کنید");
      return errors;
    },
    textErr() {
      const errors = [];
      if (!this.$v.editedItem.text.$dirty) return errors;
      !this.$v.editedItem.text.required && errors.push("متن را وارد کنید");
      return errors;
    },
    authHeaders() {
      return {
        x_auth: this.$cookie.get("Etta_Power_Token")
      };
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.$store.dispatch("getFeatureList");
  },

  methods: {
    async editItem(item) {
      this.editedIndex = item._id;
      this.editedItem = await this.$store.dispatch(
        "getFeature",
        this.editedIndex
      );
      this.dialog = true;
    },

    deleteItem(item) {
      const index = item._id;
      if (confirm("آیا از حذف اطمینان دارید ؟")) {
        this.$store.dispatch("rmvFeature", index).then(() => {
          this.text = "ویژگی و مزایا حذف شد .";
          this.snackbar = true;
        });
      }
    },

    close() {
      this.$v.$reset();
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = {
          title: "",
          icon: "",
          text: ""
        };
        this.editedIndex = -1;
      });
    },
    showimage(item) {
      window.open(this.$store.getters.getStaticsUrl + item.icon, "_blank");
    },
    save() {
      if (this.editedIndex != -1) {
        this.$store
          .dispatch(
            "editFeature",
            Object.assign(
              {
                _id: this.editedIndex
              },
              this.editedItem
            )
          )
          .then(() => {
            this.text = "ویژگی و مزایا مورد نظر ویرایش شد .";
            this.snackbar = true;
          });
      } else {
        this.$store.dispatch("addFeature", this.editedItem).then(() => {
          this.text = "ویژگی و مزایا اضافه شد .";
          this.snackbar = true;
        });
      }
      this.close();
    },
    selected(item) {
      this.editedItem.icon = item.value;
    },
    cleared() {
      this.editedItem.icon = "";
    }
  },
  validations: {
    editedItem: {
      text: { required },
      title: { required },
      icon: { required }
    }
  }
};
</script>