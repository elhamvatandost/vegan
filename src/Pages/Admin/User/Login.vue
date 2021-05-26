<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="نام کاربری"
                    v-model="userName"
                    prepend-icon=">mdi mdi-account"
                    type="username"
                    :error-messages="userNameError"
                    required
                    @input="$v.userName.$touch()"
                    @blur="$v.userName.$touch()"
                  ></v-text-field>

                  <v-text-field
                    label="رمز عبور"
                    v-model="password"
                    prepend-icon=">mdi mdi-lock"
                    type="password"
                    :error-messages="passwordError"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="signin" :disabled="$v.$invalid" color="light-green darken-3">ورود</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-snackbar v-model="snackbar" :multi-line="true" top color="white">
      <span style="color : black">{{ text }}</span>
      <v-btn color="red" text @click="snackbar = false">بستن</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      text: "",
      snackbar: "",
      userName: "",
      password: ""
    };
  },
  methods: {
    async signin() {
      this.$v.$touch();
      let isAuth = await this.$store.dispatch("signin", {
        userName: this.userName,
        password: this.password
      });
      if (isAuth == true) {
        this.$router.push({ name: "admin" });
      } else {
        (this.snackbar = true), (this.text = "اطلاعات وارد شده صحیح نمی‌باشد.");
      }
    }
  },
  validations: {
    userName: { required },
    password: { required }
  },
  computed: {
    userNameError() {
      const errors = [];
      if (!this.$v.userName.$dirty) return errors;
      !this.$v.userName.required && errors.push("نام کاربری را وارد کنید");
      return errors;
    },
    passwordError() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("رمز عبور را وارد کنید");
      return errors;
    }
  },
  head: {
    title: function() {
      return {
        inner: "صفحه ورودی"
      };
    }
  }
};
</script>