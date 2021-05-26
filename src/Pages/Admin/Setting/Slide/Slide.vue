<template>
  <v-form>
    <v-data-table :headers="headers" :items="getList" sort-by="_id" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>اسلایدها</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1500px">
            <template v-slot:activator="{ on }">
              <v-btn color="light-green darken-3" dark class="mb-2" v-on="on">اسلاید جدید</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.subtitle"
                        :error-messages="subtitleErr"
                        required
                        @input="$v.editedItem.subtitle.$touch()"
                        @blur="$v.editedItem.subtitle.$touch()"
                        label="سرتیتر"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.title"
                        :error-messages="titleErr"
                        required
                        @input="$v.editedItem.title.$touch()"
                        @blur="$v.editedItem.title.$touch()"
                        label="تیتر"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.index"
                        :error-messages="indexErr"
                        required
                        @input="$v.editedItem.index.$touch()"
                        @blur="$v.editedItem.index.$touch()"
                        type="number"
                        label="وزن"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <autocomplete
                        source="https://api.c1t.ir/api/upload/images?q="
                        results-value="_id"
                        results-display="filename"
                        class="v-text-field"
                        placeholder="عکس  ..."
                        @selected="selected"
                        @clear="cleared"
                        @input="$v.editedItem.picture.$touch()"
                        @blur="$v.editedItem.picture.$touch()"
                        :request-headers="authHeaders"
                      ></autocomplete>
                      <span style="color:red">{{ pictureErr.toString() }}‌</span>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.link"
                        :error-messages="linkErr"
                        required
                        @input="$v.editedItem.link.$touch()"
                        @blur="$v.editedItem.link.$touch()"
                        label="لینک"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="success" :disabled="$v.editedItem.$invalid" @click="save">ذخیره</v-btn>
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
      <template v-slot:item.picture="{ item }">
        <v-icon @click="showimage(item)">mdi-image</v-icon>
      </template>
    </v-data-table>
    <v-snackbar v-model="snackbar" :multi-line="true" top color="white">
      <span style="color : black">{{ text }}</span>
      <v-btn color="red" text @click="snackbar = false">بستن</v-btn>
    </v-snackbar>
  </v-form>
</template>


<script>
import Autocomplete from "vuejs-auto-complete";
import { required, integer } from "vuelidate/lib/validators";
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
        text: "تیتر",
        align: "start",
        sortable: false,
        value: "title"
      },
      { text: "عکس", sortable: false, value: "picture" },
      { text: "ویرایش / حذف", value: "_id", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      subtitle: "",
      title: "",
      index: "0",
      link: "",
      picture: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "ثبت اسلاید جدید" : "ویرایش اسلاید";
    },
    getList() {
      return this.$store.getters.getSlideList;
    },
    subtitleErr() {
      const errors = [];
      if (!this.$v.editedItem.subtitle.$dirty) return errors;
      !this.$v.editedItem.subtitle.required &&
        errors.push("سرتیتر را وارد کنید");
      return errors;
    },
    titleErr() {
      const errors = [];
      if (!this.$v.editedItem.title.$dirty) return errors;
      !this.$v.editedItem.title.required && errors.push("تیتر را وارد کنید");
      return errors;
    },
    indexErr() {
      const errors = [];
      if (!this.$v.editedItem.index.$dirty) return errors;
      !this.$v.editedItem.index.required && errors.push("وزن را وارد کنید");
      return errors;
    },
    linkErr() {
      const errors = [];
      if (!this.$v.editedItem.link.$dirty) return errors;
      !this.$v.editedItem.link.required && errors.push("لینک را وارد کنید");
      return errors;
    },
    pictureErr() {
      const errors = [];
      if (!this.$v.editedItem.picture.$dirty) return errors;
      !this.$v.editedItem.picture.required && errors.push("عکس را وارد کنید");
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
        "getSlide",
        this.editedIndex
      );
      this.editedItem.index = this.editedItem.index.toString();
      this.dialog = true;
    },
    deleteItem(item) {
      const index = item._id;
      if (confirm("آیا از حذف اطمینان دارید ؟")) {
        this.$store.dispatch("rmvSlide", index);
        this.snackbar = true;
        this.text = "اسلاید مورد نظر حذف شد .";
      }
    },
    selected(item) {
      this.editedItem.picture = item.value;
    },
    cleared() {
      this.editedItem.picture = "";
    },
    close() {
      this.$v.$reset();
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = {
          subtitle: "",
          title: "",
          index: "0",
          link: "",
          picture: ""
        };
        this.editedIndex = -1;
      });
    },
    showimage(item) {
      window.open(this.$store.getters.getStaticsUrl + item.picture , "_blank");
    },
    save() {
      if (this.editedIndex != -1) {
        this.$store
          .dispatch(
            "editSlide",
            Object.assign(
              {
                _id: this.editedIndex
              },
              this.editedItem
            )
          )
          .then(() => {
            this.text = "اسلاید مورد نظر ویرایش شد .";
            this.snackbar = true;
          });
      } else {
        this.$store.dispatch("addSlide", this.editedItem).then(() => {
          this.text = "اسلاید اضافه شد .";
          this.snackbar = true;
        });
      }
      this.$store.dispatch("getSlideList");
      this.close();
    }
  },
  validations: {
    editedItem: {
      subtitle: { required },
      title: { required },
      index: { required },
      link: { required },
      picture: { required }
    }
  },
  created() {
    this.$store.dispatch("getSlideList");
  }
};
</script>