<template>
  <v-form>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>ویرایش ویديو</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="نام"
                  v-model="form1.name"
                  :error-messages="nameErr"
                  required
                  @input="$v.form1.name.$touch()"
                  @blur="$v.form1.name.$touch()"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="نام مستعار"
                  v-model="form1.alias"
                  :error-messages="aliasErr"
                  required
                  @input="$v.form1.alias.$touch()"
                  @blur="$v.form1.alias.$touch()"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <label>متن</label>
                <app-editor
                  v-model="form1.txt"
                  required
                  @input="$v.form1.txt.$touch()"
                  @blur="$v.form1.txt.$touch()"
                ></app-editor>
                <span style="color:red">{{txtErr.toString()}}</span>
              </v-col>
              <v-col cols="12" sm="6">
                <autocomplete
                  source="https://api.c1t.ir/api/upload/videos?q="
                  results-value="_id"
                  results-display="filename"
                  class="v-text-field"
                  placeholder="ویدیو ..."
                  @selected="fileSelect"
                  @clear="fileCleared"
                  @input="$v.form1.select.$touch()"
                  @blur="$v.form1.select.$touch()"
                  :request-headers="authHeaders"
                ></autocomplete>
                <span style="color:red">{{fileErr.toString()}}</span>
              </v-col>
              <v-col cols="12" sm="6">
                <autocomplete
                  source="https://api.c1t.ir/api/upload/images?q="
                  results-value="_id"
                  results-display="filename"
                  class="v-text-field"
                  placeholder="عکس ..."
                  @selected="picSelect"
                  @clear="picDel"
                  @input="$v.form1.pic.$touch()"
                  @blur="$v.form1.pic.$touch()"
                  :request-headers="authHeaders"
                ></autocomplete>
                <span style="color:red">{{pictureErr.toString()}}</span>
              </v-col>
              <v-col cols="12">
                <v-combobox
                  multiple
                  outlined
                  v-model="form1.tags"
                  label="تگها"
                  chips
                  :error-messages="tagErr"
                  required
                  @input="$v.form1.tags.$touch()"
                  @blur="$v.form1.tags.$touch()"
                  deletable-chips
                  class="tag-input"
                ></v-combobox>
              </v-col>‍
              <v-btn color="success" class="mr-2" @click="editVideo" :disabled="$v.form1.$invalid">
                ‍ ثبت اطلاعات
                ‍
              </v-btn>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>لیست محصولات مرتبط</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12">
                <autocomplete
                  source="https://api.c1t.ir/api/product/product?q="
                  results-value="_id"
                  results-display="name"
                  class="v-text-field"
                  placeholder="نام محصول ..."
                  @selected="productSelect"
                  @clear="productCleared"
                  @input="$v.form2.select.$touch()"
                  @blur="$v.form2.select.$touch()"
                  :request-headers="authHeaders"
                ></autocomplete>
                <span style="color:red">{{productErr.toString()}}</span>
              </v-col>‍
              <v-btn color="light-green darken-3" @click="addProduct" :disabled="$v.form2.$invalid" class="mr-2">
                ‍ اضافه کردن
                ‍
              </v-btn>
              <v-col cols="12">
                <v-data-table
                  :headers="headers"
                  :items="getList"
                  :items-per-page="5"
                  item-key="_id"
                  class="elevation-1"
                >
                  <template v-slot:item._id="{ item }">
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
      form1: {
        name: "",
        alias: "",
        txt: "",
        select: "",
        tags: [],
        select: "",
        pic: ""
      },
      form2: {
        select: ""
      },
      panel: [0, 1],
      headers: [
        {
          text: "نام‌ محصول",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "حذف", value: "_id", sortable: false }
      ]
    };
  },
  components: {
    "app-editor": VueEditor,
    autocomplete: Autocomplete
  },
  methods: {
    productSelect(tmp) {
      this.form2.select = tmp.value;
    },
    productCleared() {
      this.form2.select = "";
    },
    fileSelect(tmp) {
      this.form1.select = tmp.value;
    },
    fileCleared() {
      this.form1.select = "";
    },
    picSelect(item) {
      this.pic = item.value;
    },
    picDel() {
      this.pic = "";
    },
    del(item) {
      this.$store.dispatch("rmvVideoRelated", {
        _id : this.$route.params.id,
        relid : item._id
      }).then(() => {
        this.text = "محصول مربوطه این ویدیو حذف شد.";
        this.snackbar = true;
      });
    },
    addProduct() {
      this.$store.dispatch("addVideoRelated", {
        _id :  this.$route.params.id,
        related : this.form2.select
      }).then(() => {
        this.text = "محصول مربوطه به این ویدیو اضافه شد.";
        this.snackbar = true;
      });
    },
    editVideo() {
      this.$store
        .dispatch(
          "editSingleVideo",
          Object.assign(
            { _id: this.$route.params.id },
            {
              name: this.form1.name,
              alias: this.form1.alias,
              text: this.form1.txt,
              attach: this.form1.select,
              tags: this.form1.tags,
              pic: this.form1.pic
            }
          )
        )
        .then(() => {
          this.text = " ویدیو ویرایش شد.";
          this.snackbar = true;
        });
    },
    async initialize() {
      let obj = await this.$store.dispatch(
        "getSingleVideo",
        this.$route.params.id
      );
      this.form1 = {
        name: obj.name,
        alias: obj.alias,
        txt: obj.text,
        tags: obj.tags,
        pic: obj.pic,
        select: obj.attach
      };
      this.$store.dispatch("getRelatedSingleVideo" , this.$route.params.id);
    }
  },
  computed: {
    getList() {
      return this.$store.getters.getRelatedSingleVideo;
    },
    nameErr() {
      const errors = [];
      if (!this.$v.form1.name.$dirty) return errors;
      !this.$v.form1.name.required && errors.push("نام را وارد کنید");
      return errors;
    },
    aliasErr() {
      const errors = [];
      if (!this.$v.form1.alias.$dirty) return errors;
      !this.$v.form1.alias.required && errors.push("نام مستعار را وارد کنید");
      return errors;
    },
    txtErr() {
      const errors = [];
      if (!this.$v.form1.txt.$dirty) return errors;
      !this.$v.form1.txt.required && errors.push("متن را وارد کنید");
      return errors;
    },
    fileErr() {
      const errors = [];
      if (!this.$v.form1.select.$dirty) return errors;
      !this.$v.form1.select.required && errors.push("فایل را وارد کنید");
      return errors;
    },
    tagErr() {
      const errors = [];
      if (!this.$v.form1.tags.$dirty) return errors;
      !this.$v.form1.tags.required && errors.push("تگ‌ها را وارد کنید");
      return errors;
    },
    productErr() {
      const errors = [];
      if (!this.$v.form2.select.$dirty) return errors;
      !this.$v.form2.select.required && errors.push("مجصول را وارد کنید");
      return errors;
    },
    pictureErr() {
      const errors = [];
      if (!this.$v.form1.pic.$dirty) return errors;
      !this.$v.form1.pic.required && errors.push("عکس را وارد کنید");
      return errors;
    },
    authHeaders() {
      return {
        x_auth: this.$cookie.get("Etta_Power_Token")
      };
    }
  },
  validations: {
    form1: {
      name: { required },
      alias: { required },
      txt: { required },
      tags: { required },
      select: { required },
      pic: { required }
    },
    form2: {
      select: { required }
    }
  },
  watch: {
    $route() {
      this.initialize();
    }
  },
  created() {
    this.initialize();
  }
};
</script>

<style>
</style>