<template>
  <v-form>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>پروفایل</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field
                  label="نام"
                  outlined
                  v-model="form1.fullname"
                  :error-messages="fullnameError"
                  required
                  @input="$v.form1.fullname.$touch()"
                  @blur="$v.form1.fullname.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  label="نام کاربری"
                  v-model="form1.userName"
                  outlined
                  :error-messages="userNameError"
                  required
                  @input="$v.form1.userName.$touch()"
                  @blur="$v.form1.userName.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="form1.email"
                  label="پست الکترونیکی"
                  :error-messages="emailError"
                  required
                  @input="$v.form1.email.$touch()"
                  @blur="$v.form1.email.$touch()"
                  outlined
                ></v-text-field>
              </v-col>

              <v-btn
                @click="editprofile"
                :disabled="$v.form1.$invalid"
                color="success"
                class="mr-2"
                dark
              >ویرایش پروفایل</v-btn>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>تغییر رمز عبور</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="رمز عبور"
                  v-model="form2.password"
                  :error-messages="passwordError"
                  required
                  @input="$v.form2.password.$touch()"
                  @blur="$v.form2.password.$touch()"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn
                  color="success"
                  @click="editpassword"
                  :disabled="$v.form2.$invalid"
                  class="mr-2"
                >ویرایش رمز عبور</v-btn>
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
  data: () => {
    return {
      snackbar: false,
      text: "",
      panel: [0, 1],
      form1: {
        fullname: "",
        email: "",
        userName: ""
      },
      form2: {
        password: ""
      }
    };
  },
  computed: {
    fullnameError() {
      const errors = [];
      if (!this.$v.form1.fullname.$dirty) return errors;
      !this.$v.form1.fullname.required && errors.push("نام را وارد کنید");
      !this.$v.form1.fullname.minLength && errors.push("نام کمتر از ۵ حرف است");
      return errors;
    },
    userNameError() {
      const errors = [];
      if (!this.$v.form1.userName.$dirty) return errors;
      !this.$v.form1.userName.required &&
        errors.push("نام کاربری را وارد کنید");
      !this.$v.form1.userName.minLength &&
        errors.push("نام کاربری کمتر از ۱۰ حرف است");
      !this.$v.form1.userName.unique && errors.push("نام کاربری تکراری است");
      return errors;
    },
    passwordError() {
      const errors = [];
      if (!this.$v.form2.password.$dirty) return errors;
      !this.$v.form2.password.required && errors.push("رمز عبور را وارد کنید");
      !this.$v.form2.password.minLength &&
        errors.push("رمز عبور کمتر از ۱۰ حرف است");
      return errors;
    },
    emailError() {
      const errors = [];
      if (!this.$v.form1.email.$dirty) return errors;
      !this.$v.form1.email.required &&
        errors.push("پست الکترونیکی را وارد کنید");
      !this.$v.form1.email.email &&
        errors.push("پست الکترونیکی معتبر وارد کنید");
      return errors;
    }
  },
  validations: {
    form1: {
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
      email: { required, email }
    },
    form2: {
      password: { required, minLength: minLength(10) }
    }
  },
  methods: {
    editpassword() {
      this.$store.dispatch("changePassword", this.form2.password);
      this.text = "رمز عبور شما ویرایش شد .";
      this.snackbar = true;
    },
    editprofile() {
      this.$store.dispatch("editProfile", this.form1);
      this.text = "پروفایل شما ویرایش شد.";
      this.snackbar = true;
    },
    async initialize() {
      let a = await this.$store.dispatch("getProfile");
      return a;
    }
  },
  created() {
    this.initialize().then(a => {
      this.form1 = a;
    });
  }
};
</script>