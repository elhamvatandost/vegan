<template>
  <v-form>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>ثبت کاربر جدید</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="نام"
                  v-model="fullname"
                  outlined
                  :error-messages="fullnameError"
                  required
                  @input="$v.fullname.$touch()"
                  @blur="$v.fullname.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="نام کاربری"
                  v-model="userName"
                  outlined
                  :error-messages="userNameError"
                  required
                  @input="$v.userName.$touch()"
                  @blur="$v.userName.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="رمز عبور"
                  v-model="password"
                  :error-messages="passwordError"
                  required
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="پست الکترونیکی"
                  v-model="email"
                  :error-messages="emailError"
                  required
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                  outlined
                ></v-text-field>
              </v-col>
              <v-btn
                color="success"
                @click="addUser"
                :disabled="$v.$invalid"
                class="mr-4"
              >ثبت اطلاعات</v-btn>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>لیست کاربران</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="headers"
                  :items="getList"
                  :items-per-page="5"
                  class="elevation-1"
                >
                  <template v-slot:item.status="{ item }">
                    <v-label v-if="item.status == 0">مدیر سیستم</v-label>
                    <v-label v-else>کاربر</v-label>
                  </template>
                  <template v-slot:item._id="{ item }">
                    <v-icon class="mr-2" @click="deActive(item)">mdi-close-circle</v-icon>
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
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      snackbar: false,
      text: "",
      fullname: "",
      email: "",
      userName: "",
      password: "",
      panel: [0, 1],
      headers: [
        {
          text: "نام کاربری",
          align: "start",
          sortable: false,
          value: "userName"
        },
        { text: "نام", value: "fullname" },
        { text: "پست الکترونیکی", value: "email" },
        {
          text: "تاریخ عضویت",
          value: "existDate"
        },
        {
          text: "موقعیت",
          value: "status"
        },
        {
          text: "غیرفعال کردن",
          value: "_id"
        }
      ]
    };
  },
  methods: {
    addUser() {
      this.$v.$touch();
      this.$store.dispatch("addUser", {
        fullname: this.fullname,
        email: this.email,
        userName: this.userName,
        password: this.password
      });
      this.$v.$reset();
      this.fullname = "";
      this.email = "";
      this.userName = "";
      this.password = "";
      this.text = "کاربر جدید اضافه شد .";
      this.snackbar = true;
    },
    deActive(item) {
      if (confirm("آیا کاربر غیرفعال شود ؟")) {
        this.$store.dispatch("deActive", {
          _id: item._id
        });
      }
    }
  },
  computed: {
    getList() {
      return this.$store.getters.getUsersList;
    },
    fullnameError() {
      const errors = [];
      if (!this.$v.fullname.$dirty) return errors;
      !this.$v.fullname.required && errors.push("نام را وارد کنید");
      !this.$v.fullname.minLength && errors.push("نام کمتر از ۵ حرف است");
      return errors;
    },
    userNameError() {
      const errors = [];
      if (!this.$v.userName.$dirty) return errors;
      !this.$v.userName.required && errors.push("نام کاربری را وارد کنید");
      !this.$v.userName.minLength &&
        errors.push("نام کاربری کمتر از ۱۰ حرف است");
      !this.$v.userName.unique && errors.push("نام کاربری تکراری است");
      return errors;
    },
    passwordError() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("رمز عبور را وارد کنید");
      !this.$v.password.minLength && errors.push("رمز عبور کمتر از ۱۰ حرف است");
      return errors;
    },
    emailError() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("پست الکترونیکی را وارد کنید");
      !this.$v.email.email && errors.push("پست الکترونیکی معتبر وارد کنید");
      return errors;
    }
  },
  validations: {
    fullname: { required, minLength: minLength(5) },
    userName: {
      required,
      minLength: minLength(10),
      unique: function(val) {
        if (val === "") return true;
        return this.$http
          .get("Users/isValidUserName", {
            params: { userName: val },
            headers: { x_auth: this.$cookie.get("Etta_Power_Token") }
          })
          .then(
            res => {
              return !res.body.isExist;
            },
            err => {
              return false;
            }
          );
      }
    },
    email: { required, email },
    password: { required, minLength: minLength(10) }
  },
  created() {
    this.$store.dispatch("getUserList");
  }
};
</script>

<style>
</style>