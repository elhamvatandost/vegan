<template>
  <v-form>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>بارگذاری فایل</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12" sm="8">
                <v-text-field
                  v-model="name"
                  :error-messages="nameErr"
                  required
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
                  label="نام فایل"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-file-input
                  @change="handleFileUpload"
                  :error-messages="fileErr"
                  required
                  @input="$v.file.$touch()"
                  @blur="$v.file.$touch()"
                  label="فایل"
                  outlined
                ></v-file-input>
              </v-col>‍
              <v-btn color="success" class="mr-3" @click="addFile" :disabled="$v.$invalid">
                ‍ ثبت اطلاعات
                ‍
              </v-btn>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>لیست فایل‌ها</v-expansion-panel-header>
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
                    <v-icon class="mr-2" @click="show(item)">mdi-eye</v-icon>
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
export default {
  data() {
    return {
      panel: [0, 1],
      file: {},
      name: "",
      snackbar: false,
      text: "",
      headers: [
        {
          text: "نام فایل",
          align: "start",
          sortable: false,
          value: "filename"
        },
        { text: "نمایش / حذف", value: "_id", sortable: false }
      ]
    };
  },
  computed: {
    nameErr() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("نام را وارد کنید");
      return errors;
    },
    fileErr() {
      const errors = [];
      if (!this.$v.file.$dirty) return errors;
      !this.$v.file.required && errors.push("فایل را وارد کنید");
      return errors;
    },
    getList() {
      return this.$store.getters.getFileList;
    }
  },
  methods: {
    show(item) {
      window.open(this.$store.getters.getFileUrl + item.filename, "_blank");
    },
    del(item) {
      if (confirm("آیا از حذف اطمینان دارید ؟")) {
        this.$store.dispatch("rmvFile", item._id).then(() => {
          this.text = "فایل شما حذف شد.";
          this.snackbar = true;
        });
      }
    },
    addFile() {
      this.$store
        .dispatch("addFile", {
          name: this.name,
          file: this.file
        })
        .then(() => {
          this.$v.$reset();
          this.name = "";
          this.file = "";
          this.text = "فایل شما ثبت شد .";
          this.snackbar = true;
        });
    },
    handleFileUpload(tmp) {
      this.file = tmp;
    }
  },
  validations: {
    name: { required },
    file: { required }
  },
  created() {
    this.$store.dispatch("getFileList");
  }
};
</script>

<style>
</style>