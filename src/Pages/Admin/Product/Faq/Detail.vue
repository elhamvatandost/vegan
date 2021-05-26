<template>
  <v-form>
    <v-expansion-panels v-model="panel" multiple>
      <v-col cols="12" sm="6">
        <v-btn block class="gray dark" v-if="this.form1.customer"><v-icon>mdi-account-box-outline</v-icon>{{this.form1.customer.name}}</v-btn>
      </v-col>
      <v-col cols="12" sm="6">
        <v-btn block class="gray dark" v-if="this.form1.customer"><v-icon>mdi-phone</v-icon>{{this.form1.customer.phone}}</v-btn>
      </v-col>
      <v-expansion-panel>
        <v-expansion-panel-header>ویرایش پرسش‌ و پاسخ‌</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12" sm="8">
                <v-text-field
                  label="تیتر"
                  v-model="form1.title"
                  outlined
                  :error-messages="titleErr"
                  required
                  @input="$v.form1.title.$touch()"
                  @blur="$v.form1.title.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-switch v-model="form1.status" label="وضعیت"></v-switch>
              </v-col>
              <v-col cols="12">
                <label>متن پرسش‌</label>
                <app-editor
                  v-model="form1.question"
                  required
                  @input="$v.form1.question.$touch()"
                  @blur="$v.form1.question.$touch()"
                ></app-editor>
                <span style="color:red">{{ questionErr.toString() }}‌</span>
              </v-col>
              <v-col cols="12">
                <label>متن پاسخ‌</label>
                <app-editor
                  v-model="form1.answer"
                  required
                  @input="$v.form1.answer.$touch()"
                  @blur="$v.form1.answer.$touch()"
                ></app-editor>
                <span style="color:red">{{ answerErr.toString() }}‌</span>
              </v-col>‍
              <v-btn color="success" class="mr-3" @click="editFaq" :disabled="$v.form1.$invalid">
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
                  class="v-text-field"
                  placeholder="نام محصول ..."
                  @selected="selected"
                  @clear="cleared"
                  @input="$v.form2.selected.$touch()"
                  @blur="$v.form2.selected.$touch()"
                  :request-headers="authHeaders"
                ></autocomplete>
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
import { required } from "vuelidate/lib/validators";
import { VueEditor } from "vue2-editor";
import Autocomplete from "vuejs-auto-complete";
export default {
  components: {
    "app-editor": VueEditor,
    autocomplete: Autocomplete
  },
  data() {
    return {
      snackbar: false,
      text: "",
      form1: {
        title: "",
        question: "",
        answer: "",
        status: false,
        customer: {}
      },
      form2: {
        selected: ""
      },
      panel: [0, 1],
      headers: [
        {
          text: "نام محصول",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "حذف", value: "_id", sortable: false }
      ]
    };
  },
  computed: {
    titleErr() {
      const errors = [];
      if (!this.$v.form1.title.$dirty) return errors;
      !this.$v.form1.title.required && errors.push("تیتر را وارد کنید");
      return errors;
    },
    questionErr() {
      const errors = [];
      if (!this.$v.form1.question.$dirty) return errors;
      !this.$v.form1.question.required && errors.push("متن پرسش را وارد کنید");
      return errors;
    },
    answerErr() {
      const errors = [];
      if (!this.$v.form1.answer.$dirty) return errors;
      !this.$v.form1.answer.required && errors.push("متن پاسخ را وارد کنید");
      return errors;
    },
    getList() {
      return this.$store.getters.getRelatedSingleFaq;
    },
    authHeaders() {
      return {
        x_auth: this.$cookie.get("Etta_Power_Token")
      };
    }
  },
  methods: {
    editFaq() {
      this.$store
        .dispatch("editSingleFaq", {
          _id: this.$route.params.id,
          title: this.form1.title,
          question: this.form1.question,
          answer: this.form1.answer,
          status: this.form1.status
        })
        .then(() => {
          this.snackbar = true;
          this.text = "faq ویرایش شد .";
        });
    },
    del(item) {
      if (confirm("آیا از حذف اطمینان دارید؟")) {
        this.$store
          .dispatch("rmvFaqRelated", {
            _id: this.$route.params.id,
            rid: item._id
          })
          .then(() => {
            this.snackbar = true;
            this.text = "محصول مد نظر از لیست حذف شد .";
          });
      }
    },
    addProduct() {
      this.$store
        .dispatch("addFaqRelated", {
          _id: this.$route.params.id,
          related: this.form2.selected
        })
        .then(() => {
          this.form2.selected = "";
          this.snackbar = true;
          this.text = "محصول مد نظر به لیست اضافه شد .";
        });
    },
    selected(a) {
      this.form2.selected = a.value;
    },
    cleared() {
      this.form2.selected = "";
    },
    async initialize() {
      let obj = await this.$store.dispatch(
        "getSingleFaq",
        this.$route.params.id
      );
      this.form1 = {
        title: obj.title,
        question: obj.question,
        answer: obj.answer,
        status: obj.status,
        customer: obj.customer
      };
      this.$store.dispatch("getRelatedSingleFaq", this.$route.params.id);
    }
  },
  watch: {
    $route() {
      this.initialize();
    }
  },
  validations: {
    form1: {
      answer: { required },
      question: { required },
      title: { required }
    },
    form2: {
      selected: { required }
    }
  },
  created() {
    this.initialize();
  }
};
</script>

<style>
</style>