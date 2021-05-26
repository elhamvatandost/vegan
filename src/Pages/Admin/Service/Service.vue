<template>
  <v-form>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>اضافه کردن خدمت</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="نام"
                  v-model="name"
                  :error-messages="nameErr"
                  required
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="نام مستعار"
                  v-model="alias"
                  :error-messages="aliasErr"
                  required
                  @input="$v.alias.$touch()"
                  @blur="$v.alias.$touch()"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <label>متن</label>
                <app-editor v-model="txt" required @input="$v.txt.$touch()" @blur="$v.txt.$touch()"></app-editor>
                <span style="color:red">{{txtErr.toString()}}</span>
              </v-col>

              <v-col cols="12" sm="6">
                <v-combobox
                  multiple
                  outlined
                  v-model="tags"
                  label="تگها"
                  chips
                  :error-messages="tagErr"
                  required
                  @input="$v.tags.$touch()"
                  @blur="$v.tags.$touch()"
                  deletable-chips
                  class="tag-input"
                ></v-combobox>
              </v-col>
              <v-col cols="12" sm="6">
                <autocomplete
                  source="https://api.c1t.ir/api/blog/category/cat?q="
                  results-value="_id"
                  results-display="name"
                  class="v-text-field"
                  placeholder=" گروه خدمات ..."
                  @selected="selected"
                  @clear="cleared"
                  @input="$v.catId.$touch()"
                  @blur="$v.catId.$touch()"
                  :request-headers="authHeaders"
                ></autocomplete>
                <span style="color:red">{{catErr.toString()}}</span>
              </v-col>‍
              <v-btn color="success" class="mr-2" @click="addService" :disabled="$v.$invalid">
                ‍ ثبت اطلاعات
                ‍
              </v-btn>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>لیست خدمات</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="headers"
                  :items="getList"
                  :items-per-page="5"
                  item-key="_id"
                  class="elevation-1"
                >
                  <template v-slot:item._id="{ item }">
                    <v-icon class="mr-2" @click="send(item)">mdi-pencil</v-icon>
                    <v-icon class="mr-2" @click="del(item)">mdi-delete</v-icon>
                  </template>
                </v-data-table>
              </v-col>
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
import { VueEditor } from "vue2-editor";
import { required } from "vuelidate/lib/validators";
import Autocomplete from "vuejs-auto-complete";
export default {
  data() {
    return {
      text: "",
      snackbar: false,
      name: "",
      alias: "",
      txt: "",
      catId: "",
      tags: [],
      panel: [0, 1],
      headers: [
        {
          text: "نام‌ خدمت",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "ویرایش / حذف", value: "_id", sortable: false }
      ]
    };
  },
  components: {
    "app-editor": VueEditor,
    autocomplete: Autocomplete
  },
  computed: {
    getList() {
      return this.$store.getters.getServiceList;
    },
    nameErr() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("نام را وارد کنید");
      return errors;
    },
    aliasErr() {
      const errors = [];
      if (!this.$v.alias.$dirty) return errors;
      !this.$v.alias.required && errors.push("نام مستعار را وارد کنید");
      return errors;
    },
    txtErr() {
      const errors = [];
      if (!this.$v.txt.$dirty) return errors;
      !this.$v.txt.required && errors.push("متن را وارد کنید");
      return errors;
    },
    catErr() {
      const errors = [];
      if (!this.$v.catId.$dirty) return errors;
      !this.$v.catId.required && errors.push("گروه خدمات را وارد کنید");
      return errors;
    },
    tagErr() {
      const errors = [];
      if (!this.$v.tags.$dirty) return errors;
      !this.$v.tags.required && errors.push("تگ‌ها را وارد کنید");
      return errors;
    },
    authHeaders() {
      return {
        x_auth: this.$cookie.get("Etta_Power_Token")
      };
    }    
  },
  methods: {
    send(item) {
      this.$router.push({ name: "service-detail", params: { id: item._id } });
    },
    del(item) {
      if (confirm("آیا از حذف اطمینان دارید؟")) {
        this.$store.dispatch("rmvService", item._id).then(() => {
          this.text = "خدمت شما حذف شد.";
          this.snackbar = true;
        });
      }
    },
    addService() {
      this.$store
        .dispatch("addService", {
          name: this.name,
          alias: this.alias,
          text: this.txt,
          catId: this.catId,
          tags: this.tags
        })
        .then(() => {
          this.$v.$reset();
          this.name = "";
          this.alias = "";
          this.txt = ".";
          this.catId = "";
          this.tags = [];
          this.text = "خدمت شما ثبت شد .";
          this.snackbar = true;
        });
    },
    selected(a) {
      this.catId = a.value;
    },
    cleared() {
      this.catId = "";
    }
  },
  validations: {
    name: { required },
    alias: { required },
    txt: { required },
    tags: { required },
    catId: { required }
  },
  created() {
    this.$store.dispatch("getServiceList");
  }
};
</script>

<style>
</style>