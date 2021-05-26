<template>
  <v-form>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>ثبت پرسش‌ و پاسخ‌</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="تیتر"
                  v-model="title"
                  outlined
                  :error-messages="titleErr"
                  required
                  @input="$v.title.$touch()"
                  @blur="$v.title.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <label>متن پرسش‌</label>
                <app-editor
                  v-model="question"
                  required
                  @input="$v.question.$touch()"
                  @blur="$v.question.$touch()"
                ></app-editor>
                <span style="color:red">{{ questionErr.toString() }}‌</span>
              </v-col>
              <v-col cols="12">
                <label>متن پاسخ‌</label>
                <app-editor
                  v-model="answer"
                  required
                  @input="$v.answer.$touch()"
                  @blur="$v.answer.$touch()"
                ></app-editor>
                <span style="color:red">{{ answerErr.toString() }}‌</span>
              </v-col>‍
              <v-btn color="success" @click="addFaq" class="mr-3" :disabled="$v.$invalid">
                ‍ ثبت اطلاعات
                ‍
              </v-btn>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>لیست پرسش‌ها و پاسخ‌ها</v-expansion-panel-header>
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
                  <template v-slot:item.status="{ item }">
                    <v-label v-if="item.status == 1">فعال</v-label>
                    <v-label v-else>غیرفعال</v-label>
                  </template>
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
import { required } from "vuelidate/lib/validators";
import { VueEditor } from "vue2-editor";
export default {
  components: {
    "app-editor": VueEditor
  },
  data() {
    return {
      text: "",
      snackbar: false,
      title: "",
      question: "",
      answer: "",
      panel: [0, 1],
      headers: [
        {
          text: "تیتر سوال",
          align: "start",
          sortable: false,
          value: "title"
        },
        {
          text: "وضعیت",
          value: "status"
        },
        {
          text: "تاریخ ثبت",
          value: "date"
        },
        { text: "ویرایش / حذف", value: "_id", sortable: false }
      ]
    };
  },
  methods: {
    send(item) {
      this.$router.push({ name: "faq-detail", params: { id: item._id } });
    },
    del(item) {
      if (confirm("آیا از حذف آن اطمینان داری ؟")) {
        this.$store.dispatch("rmvFaq", item._id).then(() => {
          this.text = "faq شما حذف شد.";
          this.snackbar = true;
        });
      }
    },
    addFaq() {
      this.$store
        .dispatch("addFaq", {
          title: this.title,
          question: this.question,
          answer: this.answer
        })
        .then(() => {
          this.$v.$reset();
          this.title = "";
          this.question = ".";
          this.answer = ".";
          this.text = "faq شما ثبت شد.";
          this.snackbar = true;
        });
    }
  },
  computed: {
    getList() {
      return this.$store.getters.getFaqList;
    },
    titleErr() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push("تیتر را وارد کنید");
      return errors;
    },
    questionErr() {
      const errors = [];
      if (!this.$v.question.$dirty) return errors;
      !this.$v.question.required && errors.push("متن پرسش را وارد کنید");
      return errors;
    },
    answerErr() {
      const errors = [];
      if (!this.$v.answer.$dirty) return errors;
      !this.$v.answer.required && errors.push("متن پاسخ را وارد کنید");
      return errors;
    }
  },
  validations: {
    answer: { required },
    question: { required },
    title: { required }
  },
  created() {
    this.$store.dispatch("getFaqList");
  }
};
</script>

<style>
</style>