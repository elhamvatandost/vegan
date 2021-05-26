<template>
  <form>
    <v-data-table :headers="headers" :items="getList" sort-by="_id" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>گروه خدمات</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1500px">
            <template v-slot:activator="{ on }">
              <v-btn color="light-green darken-3" dark class="mb-2" v-on="on">گروه خدمات جدید</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="2">
                      <v-text-field
                        v-model="editedItem.index"
                        label="وزن"
                        :error-messages="indexErr"
                        required
                        @input="$v.editedItem.index.$touch()"
                        @blur="$v.editedItem.index.$touch()"
                        type="number"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="10">
                      <v-text-field
                        v-model="editedItem.name"
                        :error-messages="nameErr"
                        required
                        @input="$v.editedItem.name.$touch()"
                        @blur="$v.editedItem.name.$touch()"
                        label="نام"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
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
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="success" :disabled="$v.editedItem.$invalid" @click="save">ذخیره</v-btn>
                <v-btn class="error" text @click="close">انصراف</v-btn>
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
        text: "وزن",
        align: "start",
        value: "index"
      },
      { text: "نام", value: "name" },
      { text: "عکس", sortable: false, value: "icon" },
      { text: "ویرایش / حذف", value: "_id", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      index: "",
      name: "",
      icon: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "ثبت گروه خدمات جدید"
        : "ویرایش گروه خدمات";
    },
    getList() {
      return this.$store.getters.getCategoryList;
    },
    nameErr() {
      const errors = [];
      if (!this.$v.editedItem.name.$dirty) return errors;
      !this.$v.editedItem.name.required && errors.push("نام را وارد کنید");
      return errors;
    },
    iconErr() {
      const errors = [];
      if (!this.$v.editedItem.icon.$dirty) return errors;
      !this.$v.editedItem.icon.required && errors.push("عکس را وارد کنید");
      return errors;
    },
    indexErr() {
      const errors = [];
      if (!this.$v.editedItem.index.$dirty) return errors;
      !this.$v.editedItem.index.required && errors.push("وزن را وارد کنید");
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

  methods: {
    async editItem(item) {
      this.editedIndex = item._id;
      this.editedItem = await this.$store.dispatch(
        "getCategory",
        this.editedIndex
      );
      this.editedItem.index = this.editedItem.index.toString();
      this.dialog = true;
    },

    deleteItem(item) {
      const index = item._id;
      if (confirm("آیا از حذف اطمینان دارید ؟")) {
        this.$store.dispatch("rmvCategory", index).then(() => {
          this.text = " گروه خدمات حذف شد .";
          this.snackbar = true;
        });
      }
    },

    close() {
      this.$v.$reset();
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = {
          index: "",
          name: "",
          icon: ""
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
            "editCategory",
            Object.assign(
              {
                _id: this.editedIndex
              },
              this.editedItem
            )
          )
          .then(() => {
            this.text = "گروه خدمات مورد نظر ویرایش شد .";
            this.snackbar = true;
          });
      } else {
        this.$store.dispatch("addCategory", this.editedItem).then(() => {
          this.text = "گروه خدمات اضافه شد .";
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
      index: { required },
      name: { required },
      icon: { required }
    }
  },
  created() {
    this.$store.dispatch("getCategoryList");
  }
};
</script>