<template>
  <v-form>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>ویرایش محصول</v-expansion-panel-header>
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
                  source="https://api.c1t.ir/api/product/group/gp?q="
                  results-value="_id"
                  results-display="name"
                  :error-messages="groupErr"
                  class="v-text-field"
                  placeholder=" گروه محصولات ..."
                  @selected="groupSelected"
                  @clear="groupCleared"
                  @input="$v.form1.groupId.$touch()"
                  @blur="$v.form1.groupId.$touch()"
                  :request-headers="authHeaders"
                ></autocomplete>
                <span style="color:red">{{groupErr.toString()}}</span>
              </v-col>‍
              <v-btn
                color="success"
                class="mr-2"
                :disabled="$v.form1.$invalid"
                @click="editProduct"
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
      <v-expansion-panel>
        <v-expansion-panel-header>لیست ویژگی و مزایا</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  label="وزن"
                  type="number"
                  v-model="form4.index"
                  :error-messages="featureIndexErr"
                  @input="$v.form4.index.$touch()"
                  @blur="$v.form4.index.$touch()"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="9">
                <autocomplete
                  source="https://api.c1t.ir/api/product/feature/feature?q="
                  results-value="_id"
                  results-display="title"
                  class="v-text-field"
                  @selected="featureSelected"
                  @clear="featureCleared"
                  @input="$v.form4.feature.$touch()"
                  @blur="$v.form4.feature.$touch()"
                  placeholder="ویژگی و مزایا ..."
                  :request-headers="authHeaders"
                ></autocomplete>
                <span style="color:red">{{featureErr.toString()}}</span>
              </v-col>‍
              <v-btn color="light-green darken-3" class="mr-2" @click="addFeature" :disabled="$v.form4.$invalid">
                ‍ اضافه کردن
                ‍
              </v-btn>
              <v-col cols="12">
                <v-data-table
                  :headers="f_headers"
                  :items="getFeatureList"
                  :items-per-page="5"
                  item-key="_id"
                  class="elevation-1"
                >
                  <template v-slot:item._id="{ item }">
                    <v-icon class="mr-2" @click="deleteFeature(item)">mdi-delete</v-icon>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>لیست مشخصات</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="8" md="2">
                <v-text-field
                  label="وزن"
                  type="number"
                  v-model="form5.index"
                  :error-messages="detailIndexErr"
                  @input="$v.form5.index.$touch()"
                  @blur="$v.form5.index.$touch()"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="8" md="5">
                <v-text-field
                  label="تیتر"
                  outlined
                  v-model="form5.title"
                  :error-messages="titleErr"
                  @input="$v.form5.title.$touch()"
                  @blur="$v.form5.title.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="8" md="5">
                <v-text-field
                  v-model="form5.value"
                  :error-messages="valueErr"
                  @input="$v.form5.value.$touch()"
                  @blur="$v.form5.value.$touch()"
                  label="مقدار"
                  outlined
                ></v-text-field>
              </v-col>‍
              <v-btn color="light-green darken-3" class="mr-2" @click="addDetail" :disabled="$v.form5.$invalid">
                ‍ اضافه کردن
                ‍
              </v-btn>

              <v-col cols="12">
                <v-data-table
                  :headers="d_headers"
                  :items="getDetailList"
                  :items-per-page="5"
                  item-key="_id"
                  class="elevation-1"
                >
                  <template v-slot:item._id="{ item }">
                    <v-icon class="mr-2" @click="deleteDetail(item)">mdi-delete</v-icon>
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
        groupId: ""
      },
      form2: {
        related: ""
      },
      form3: {
        index: "",
        attach: ""
      },
      form4: {
        index: "",
        feature: ""
      },
      form5: {
        index: "",
        title: "",
        value: ""
      },
      panel: [0, 1, 2, 3, 4],
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
      ],
      f_headers: [
        {
          text: "وزن",
          align: "start",
          value: "index"
        },
        {
          text: "نام",
          align: "start",
          value: "name"
        },
        { text: "حذف", value: "_id", sortable: false }
      ],
      d_headers: [
        {
          text: "وزن",
          align: "start",
          value: "index"
        },
        {
          text: "تیتر",
          value: "title"
        },
        {
          text: "مقدار",
          value: "value"
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
    groupSelected(a) {
      this.form1.groupId = a.value;
    },
    groupCleared() {
      this.form1.groupId = "";
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
    featureSelected(a) {
      this.form4.feature = a.value;
    },
    featureCleared() {
      this.form4.feature = "";
    },
    deleteAttach(item) {
      if (confirm("آیا از حذف اطمینان دارید؟")) {
        this.$store
          .dispatch("rmvProductAttach", {
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
          .dispatch("rmvProductRelated", {
            _id: this.$route.params.id,
            rid: item._id
          })
          .then(() => {
            this.text = "محصول مربوطه از این لیست حذف شد.";
            this.snackbar = true;
          });
      }
    },
    deleteDetail(item) {
      if (confirm("آیا از حذف اطمینان دارید؟")) {
        this.$store
          .dispatch("rmvProductDetial", {
            _id: this.$route.params.id,
            did: item._id
          })
          .then(() => {
            this.text = "مشخصات مربوطه از این لیست حذف شد.";
            this.snackbar = true;
          });
      }
    },
    deleteFeature(item) {
      if (confirm("آیا از حذف اطمینان دارید؟")) {
        this.$store
          .dispatch("rmvProductFeature", {
            _id: this.$route.params.id,
            fid: item._id
          })
          .then(() => {
            this.text = "ویژگی و مزایا مربوطه از این لیست حذف شد.";
            this.snackbar = true;
          });
      }
    },
    addRelated() {
      this.$store
        .dispatch("addProductRelated", {
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
    addFeature() {
      this.$store
        .dispatch("addProductFeature", {
          _id: this.$route.params.id,
          index: this.form4.index,
          feature: this.form4.feature
        })
        .then(() => {
          this.$v.form4.$reset();
          this.form4.index = "";
          this.form4.feature = "";
          this.text = "ویژگی و مزایا مربوطه به این لیست اضافه شد.";
          this.snackbar = true;
        });
    },
    addAttach() {
      this.$store
        .dispatch("addProductAttach", {
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
    addDetail() {
      this.$store
        .dispatch("addProductDetail", {
          _id: this.$route.params.id,
          title: this.form5.title,
          value: this.form5.value,
          index: this.form5.index
        })
        .then(() => {
          this.$v.form5.$reset();
          this.form5.title = "";
          this.form5.index = "";
          this.form5.value = "";
          this.text = "مشخصات مربوطه به این لیست اضافه شد.";
          this.snackbar = true;
        });
    },
    editProduct() {
      this.$store
        .dispatch(
          "editSingleProduct",
          Object.assign(
            { _id: this.$route.params.id },
            {
              name: this.form1.name,
              alias: this.form1.alias,
              text: this.form1.text,
              tags: this.form1.tags,
              groupId: this.form1.groupId
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
        "getSingleProduct",
        this.$route.params.id
      );
      this.form1 = {
        name: obj.name,
        alias: obj.alias,
        text: obj.text,
        tags: obj.tags,
        groupId: obj.groupId
      };
      this.$store.dispatch("getRelatedSingleProduct", this.$route.params.id);
      this.$store.dispatch("getDetailSingleProduct", this.$route.params.id);
      this.$store.dispatch("getFeatureSingleProduct", this.$route.params.id);
      this.$store.dispatch("getAttachSingleProduct", this.$route.params.id);
    }
  },
  computed: {
    getAttachesList() {
      return this.$store.getters.getAttachesSingleProduct;
    },
    getProductList() {
      return this.$store.getters.getRelatedSingleProduct;
    },
    getDetailList() {
      return this.$store.getters.getDetailsSingleProduct;
    },
    getFeatureList() {
      return this.$store.getters.getFeaturesSingleProduct;
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
    groupErr() {
      const errors = [];
      if (!this.$v.form1.groupId.$dirty) return errors;
      !this.$v.form1.groupId.required &&
        errors.push("گروه محصولات را وارد کنید");
      return errors;
    },
    titleErr() {
      const errors = [];
      if (!this.$v.form5.title.$dirty) return errors;
      !this.$v.form5.title.required && errors.push("تیتر را وارد کنید");
      return errors;
    },
    valueErr() {
      const errors = [];
      if (!this.$v.form5.value.$dirty) return errors;
      !this.$v.form5.value.required && errors.push("مقدار را وارد کنید");
      return errors;
    },
    detailIndexErr() {
      const errors = [];
      if (!this.$v.form5.index.$dirty) return errors;
      !this.$v.form5.index.required && errors.push(" وزن را وارد کنید");
      return errors;
    },
    featureIndexErr() {
      const errors = [];
      if (!this.$v.form4.index.$dirty) return errors;
      !this.$v.form4.index.required && errors.push(" وزن را وارد کنید");
      return errors;
    },
    attachIndexErr() {
      const errors = [];
      if (!this.$v.form3.index.$dirty) return errors;
      !this.$v.form3.index.required && errors.push(" وزن را وارد کنید");
      return errors;
    },
    featureErr() {
      const errors = [];
      if (!this.$v.form4.feature.$dirty) return errors;
      !this.$v.form4.feature.required &&
        errors.push(" ویژگی و مزایا را وارد کنید");
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
      groupId: { required }
    },
    form2: {
      related: { required }
    },
    form3: {
      index: { required },
      attach: { required }
    },
    form4: {
      index: { required },
      feature: { required }
    },
    form5: {
      index: { required },
      title: { required },
      value: { required }
    }
  },
  watch: {
    $route() {}
  },
  created() {
    this.initialize();
  }
};
</script>

<style>
</style>