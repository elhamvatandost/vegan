<template>
  <v-form>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>ویرایش خدمت</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="نام"
                  v-model="form1.name"
                  :error-messages="nameErr"
                  @input="$v.form1.name.$touch()"
                  @blur="$v.form1.name.$touch()"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="نام مستعار"
                  outlined
                  v-model="form1.alias"
                  :error-messages="aliasErr"
                  @input="$v.form1.alias.$touch()"
                  @blur="$v.form1.alias.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <label>متن</label>
                <app-editor
                  v-model="form1.text"
                  @input="$v.form1.text.$touch()"
                  @blur="$v.form1.text.$touch()"
                ></app-editor>
                <span style="color:red">{{textErr.toString()}}</span>
              </v-col>
              <v-col cols="12" sm="6">
                <v-combobox
                  multiple
                  outlined
                  :error-messages="tagsErr"
                  v-model="form1.tags"
                  @input="$v.form1.tags.$touch()"
                  @blur="$v.form1.tags.$touch()"
                  label="تگها"
                  chips
                  deletable-chips
                  class="tag-input"
                ></v-combobox>
              </v-col>
              <v-col cols="12" sm="6">
                <autocomplete
                  source="https://api.c1t.ir/api/blog/category/cat?q="
                  results-value="_id"
                  results-display="name"
                  :error-messages="catErr"
                  class="v-text-field"
                  placeholder=" گروه خدمات ..."
                  @selected="catSelected"
                  @clear="catCleared"
                  @input="$v.form1.catId.$touch()"
                  @blur="$v.form1.catId.$touch()"
                  :request-headers="authHeaders"
                ></autocomplete>
                <span style="color:red">{{catErr.toString()}}</span>
              </v-col>‍
              <v-btn
                color="success"
                class="mr-2"
                @click="editService"
                :disabled="$v.form1.$invalid"
              >
                ‍ ثبت اطلاعات
                ‍
              </v-btn>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>لیست محصولات وابسته</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12">
                <autocomplete
                  source="https://api.c1t.ir/api/product/product?q="
                  results-value="_id"
                  results-display="name"
                  :error-messages="relatedErr"
                  class="v-text-field"
                  placeholder=" محصولات ..."
                  @selected="relatedSelected"
                  @clear="relatedCleared"
                  @input="$v.form2.related.$touch()"
                  @blur="$v.form2.related.$touch()"
                  :request-headers="authHeaders"
                ></autocomplete>
                <span style="color:red">{{relatedErr.toString()}}</span>
              </v-col>‍
              <v-btn color="light-green darken-3" class="mr-2" @click="addRelated" :disabled="$v.form2.$invalid">
                ‍ اضافه کردن
                ‍
              </v-btn>
              <v-col cols="12">
                <v-data-table
                  :headers="headers"
                  :items="getProductList"
                  :items-per-page="5"
                  item-key="_id"
                  class="elevation-1"
                >
                  <template v-slot:item._id="{ item }">
                    <v-icon class="mr-2" @click="deleteProduct(item)">mdi-delete</v-icon>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>لیست عکس‌ها</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  label="وزن"
                  type="number"
                  v-model="form3.index"
                  :error-messages="attachIndexErr"
                  @input="$v.form3.index.$touch()"
                  @blur="$v.form3.index.$touch()"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="8">
                <autocomplete
                  source="https://api.c1t.ir/api/upload/images?q="
                  results-value="_id"
                  results-display="filename"
                  :error-messages="attachErr"
                  class="v-text-field"
                  placeholder=" عکس ..."
                  @selected="attachSelected"
                  @clear="attachCleared"
                  @input="$v.form3.attach.$touch()"
                  @blur="$v.form3.attach.$touch()"
                  :request-headers="authHeaders"
                ></autocomplete>
                <span style="color:red">{{attachErr.toString()}}</span>
              </v-col>‍
              <v-btn color="light-green darken-3" class="mr-2" @click="addAttach" :disabled="$v.form3.$invalid">
                ‍ اضافه کردن
                ‍
              </v-btn>
              <v-col cols="12">
                <v-data-table
                  :headers="a_headers"
                  :items="getAttachesList"
                  :items-per-page="5"
                  item-key="_id"
                  class="elevation-1"
                >
                  <template v-slot:item.attach="{ item }">
                    <v-icon class="mr-2" @click="showAttach(item)">mdi-eye</v-icon>
                  </template>
                  <template v-slot:item._id="{ item }">
                    <v-icon class="mr-2" @click="deleteAttach(item)">mdi-delete</v-icon>
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
      snackbar: false,
      text: "",
      form1: {
        name: "",
        alias: "",
        text: "",
        tags: [],
        cattId: ""
      },
      form2: {
        related: ""
      },
      form3: {
        attach: "",
        index: ""
      },
      panel: [0, 1, 2],
      headers: [
        {
          text: "نام‌",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "حذف", value: "_id", sortable: false }
      ],
      a_headers: [
        {
          text: "وزن",
          align: "start",
          value: "index"
        },
        {
          text: "نمایش",
          sortable: false,
          value: "attach"
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
    catSelected(a) {
      this.form1.catId = a.value;
    },
    catCleared() {
      this.form1.catId = "";
    },
    relatedSelected(a) {
      this.form2.related = a.value;
    },
    relatedCleared() {
      this.form2.related = "";
    },
    attachSelected(a) {
      this.form3.attach = a.value;
    },
    attachCleared() {
      this.form3.attach = "";
    },
    deleteAttach(item) {
      if (confirm("آیا از حذف اطمینان دارید؟")) {
        this.$store
          .dispatch("rmvServiceAttach", {
            _id: this.$route.params.id,
            aid: item._id
          })
          .then(() => {
            this.text = "عکس مربوطه از این لیست حذف شد.";
            this.snackbar = true;
          });
      }
    },
    deleteProduct(item) {
      if (confirm("آیا از حذف اطمینان دارید؟")) {
        this.$store
          .dispatch("rmvServiceRelated", {
            _id: this.$route.params.id,
            rid: item._id
          })
          .then(() => {
            this.text = "محصول مربوطه از این لیست حذف شد.";
            this.snackbar = true;
          });
      }
    },
    addRelated() {
      this.$store
        .dispatch("addServiceRelated", {
          _id: this.$route.params.id,
          related: this.form2.related
        })
        .then(() => {
          this.$v.form2.$reset();
          this.form2.related = "";
          this.text = "محصول مربوطه به این لیست اضافه شد.";
          this.snackbar = true;
        });
    },
    addAttach() {
      this.$store
        .dispatch("addServiceAttach", {
          _id: this.$route.params.id,
          index: this.form3.index,
          attach: this.form3.attach
        })
        .then(() => {
          this.$v.form3.$reset();
          this.form3.index = "";
          this.form3.attach = "";
          this.text = "عکس مربوطه به این لیست اضافه شد.";
          this.snackbar = true;
        });
    },
    editService() {
      this.$store
        .dispatch(
          "editSingleService",
          Object.assign(
            { _id: this.$route.params.id },
            {
              name: this.form1.name,
              alias: this.form1.alias,
              text: this.form1.text,
              tags: this.form1.tags,
              catId: this.form1.catId
            }
          )
        )
        .then(() => {
          this.snackbar = true;
          this.text = "اظلاعات شما ویرایش شد .";
        });
    },
    showAttach(item) {
      window.open(this.$store.getters.getStaticsUrl + item.attach, "_blank");
    },
    async initialize() {
      let obj = await this.$store.dispatch(
        "getSingleService",
        this.$route.params.id
      );
      this.form1 = {
        name: obj.name,
        alias: obj.alias,
        text: obj.text,
        tags: obj.tags,
        catId: obj.catId
      };
      this.$store.dispatch("getRelatedSingleService", this.$route.params.id);
      this.$store.dispatch("getAttachSingleService", this.$route.params.id);
    }
  },
  computed: {
    getAttachesList() {
      return this.$store.getters.getAttachesSingleService;
    },
    getProductList() {
      return this.$store.getters.getRelatedSingleService;
    },
    relatedErr() {
      const errors = [];
      if (!this.$v.form2.related.$dirty) return errors;
      !this.$v.form2.related.required && errors.push("محصول را وارد کنید");
      return errors;
    },
    attachErr() {
      const errors = [];
      if (!this.$v.form3.attach.$dirty) return errors;
      !this.$v.form3.attach.required && errors.push("عکس را وارد کنید");
      return errors;
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
    textErr() {
      const errors = [];
      if (!this.$v.form1.text.$dirty) return errors;
      !this.$v.form1.text.required && errors.push("متن را وارد کنید");
      return errors;
    },
    tagsErr() {
      const errors = [];
      if (!this.$v.form1.tags.$dirty) return errors;
      !this.$v.form1.tags.required && errors.push("تگ‌ها را وارد کنید");
      return errors;
    },
    catErr() {
      const errors = [];
      if (!this.$v.form1.catId.$dirty) return errors;
      !this.$v.form1.catId.required && errors.push("گروه خدمات را وارد کنید");
      return errors;
    },
    attachIndexErr() {
      const errors = [];
      if (!this.$v.form3.index.$dirty) return errors;
      !this.$v.form3.index.required && errors.push(" وزن را وارد کنید");
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
      text: { required },
      tags: { required },
      catId: { required }
    },
    form2: {
      related: { required }
    },
    form3: {
      index: { required },
      attach: { required }
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