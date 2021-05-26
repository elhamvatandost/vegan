<template>
  <v-app>
    <v-system-bar dark color="light-green darken-3" window dir="ltr" fixed>
      <v-icon class="ml-5 mb-1" size="23">mdi-deskphone</v-icon>
      <span class="ml-2">{{
        this.phones.toString().replace(/,/g, "  |  ")
      }}</span>
    </v-system-bar>
    <div v-if="this.$vuetify.breakpoint.width > 850">
      <v-app-bar fixed class="mt-8">
        <AppBar />
      </v-app-bar>
    </div>
    <div v-else>
      <v-navigation-drawer v-model="drawer" app>
        <MobileAppBar />
      </v-navigation-drawer>
      <v-app-bar color="light-green darken-3" app dark class="mt-8">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="ml-2">
        </v-app-bar-nav-icon>
        منو دسترسی سریع
      </v-app-bar>
    </div>
    <div class="mx-auto" style="margin-top: 100px">
      <v-list-item two-line>
        <v-list-item-content class="mt-5">
          <p class="headline mb-1 text-justify">{{ this.title }}</p>
          <p class="subtitle-2 text--disabled text-justify">
            {{ this.subtitle }}
          </p>
        </v-list-item-content>

        <v-img
          :src="this.logo"
          tile
          class="d-none d-sm-flex"
          max-width="90"
          max-height="90"
          color="grey"
        ></v-img>
      </v-list-item>
    </div>
    <v-divider></v-divider>
    <router-view></router-view>
    <v-divider></v-divider>
    <v-row>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn
            color="light-green darken-3"
            dark
            large
            fixed
            absolute
            bottom
            fab
            v-on="on"
            style="margin: 0px 20px 70px 0px"
          >
            <v-icon large>mdi-help-circle</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">پرسش و پاسخ</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.name"
                    :error-messages="nameErr"
                    required
                    @input="$v.form.name.$touch()"
                    @blur="$v.form.name.$touch()"
                    label="نام"
                    dense
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    :error-messages="phoneErr"
                    required
                    @input="$v.form.phone.$touch()"
                    @blur="$v.form.phone.$touch()"
                    v-model="form.phone"
                    label="تلفن همراه"
                    dense
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    :error-messages="textErr"
                    required
                    @input="$v.form.text.$touch()"
                    @blur="$v.form.text.$touch()"
                    v-model="form.text"
                    label="متن پرسش"
                    dense
                    outlined
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="send" :disabled="$v.form.$invalid"
              >ثبت</v-btn
            >
            <v-btn color="red" btn dark @click="close()">بستن</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-snackbar v-model="snackbar" :multi-line="true" top color="white">
      <span style="color: black">{{ snackbarText }}</span>
      <v-btn color="red" text @click="snackbar = false">بستن</v-btn>
    </v-snackbar>
    <Footer
      :location="this.location"
      :locationLink="this.locationLink"
      :phones="this.phones"
      :time="this.time"
    />
    <v-footer>
      <v-card flat tile width="100%" class="lighten-1 text-center">
        <v-card-text>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-4"
                icon
                v-bind="attrs"
                v-on="on"
                @click="emailClick"
              >
                <v-icon color="light-green darken-3" size="24px">mdi-email</v-icon>
              </v-btn>
            </template>
            <span>پست الکترونیکی</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-4"
                icon
                v-bind="attrs"
                v-on="on"
                @click="telegramClick"
              >
                <v-icon color="light-green darken-3" size="24px">mdi-telegram</v-icon>
              </v-btn>
            </template>
            <span>تلگرام</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-4"
                icon
                v-bind="attrs"
                v-on="on"
                @click="instagramClick"
              >
                <v-icon color="light-green darken-3" size="24px">mdi-instagram</v-icon>
              </v-btn>
            </template>
            <span>اینستاگرام</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-4"
                icon
                v-bind="attrs"
                v-on="on"
                @click="whatsappClick"
              >
                <v-icon color="light-green darken-3" size="24px">mdi-whatsapp</v-icon>
              </v-btn>
            </template>
            <span>واتسآپ</span>
          </v-tooltip>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>


<script>
import Footer from "./Shared/Footer";
import AppBar from "./Shared/AppBar";
import MobileAppBar from "./Shared/MobileAppBar";
import { required } from "vuelidate/lib/validators";

export default {
  components: {
    Footer,
    AppBar,
    MobileAppBar,
  },
  data() {
    return {
      alert: true,
      drawer: false,
      pageWidth: true,
      form: {
        phone: "",
        name: "",
        text: "",
      },
      snackbarText: "",
      snackbar: false,
      dialog: false,
      phones: "",
      location: "",
      locationLink: "",
      time: "",
      email: "",
      telegram: "",
      instagram: "",
      whatsapp: "",
      logo: "",
      title: "",
      subtitle: "",
      url: "",
    };
  },
  methods: {
    emailClick() {
      window.open(this.email, "_blank");
    },
    telegramClick() {
      window.open(this.telegram, "_blank");
    },
    instagramClick() {
      window.open(this.instagram, "_blank");
    },
    whatsappClick() {
      window.open(this.whatsapp, "_blank");
    },
    async initialize() {
      let a = await this.$store.dispatch("getUiInfo");
      return a;
    },
    send() {
      this.$store
        .dispatch("postUiFaq", {
          question: this.form.text,
          customer: {
            name: this.form.name,
            phone: this.form.phone,
          },
        })
        .then(() => {
          this.$v.form.$reset();
          this.form.name = "";
          this.form.text = "";
          this.form.phone = "";
          this.dialog = false;
          this.snackbar = true;
          this.snackbarText = "پرسش شما ثبت شد .";
        });
    },
    close() {
      this.$v.form.$reset();
      this.form.name = "";
      this.form.text = "";
      this.form.phone = "";
      this.dialog = false;
    },
  },
  computed: {
    nameErr() {
      const errors = [];
      if (!this.$v.form.name.$dirty) return errors;
      !this.$v.form.name.required && errors.push("نام را وارد کنید");
      return errors;
    },
    phoneErr() {
      const errors = [];
      if (!this.$v.form.phone.$dirty) return errors;
      !this.$v.form.phone.required && errors.push("تلفن همراه را وارد کنید");
      !this.$v.form.phone.mobile && errors.push("تلفن همراه معتبر نیست .");
      return errors;
    },
    textErr() {
      const errors = [];
      if (!this.$v.form.text.$dirty) return errors;
      !this.$v.form.text.required && errors.push("متن پرسش را وارد کنید");
      return errors;
    },
  },
  created() {
    this.initialize().then((info) => {
      if (info != null) {
        this.subtitle = info.subtitle;
        this.title = info.title;
        this.url = info.url;
        this.time = info.time;
        this.phones = info.phones.toString();
        this.location = info.location;
        this.locationLink = info.locationLink;
        this.whatsapp = info.whatsapp;
        this.telegram = info.telegram;
        this.instagram = info.instagram;
        this.email = info.email;
        this.tags = info.tags;
        this.logo = this.$store.getters.getStaticsUrl + info.logo;
      }
    });
  },
  validations: {
    form: {
      name: { required },
      phone: {
        required,
        mobile: function (val) {
          if (val === "") return true;
          if (val.length != 11) {
            return false;
          } else {
            if (
              val[0].replace("۰", "0") != "0" ||
              val[1].replace("۹", "9") != "9"
            ) {
              return false;
            } else {
              return true;
            }
          }
        },
      },
      text: { required },
    },
  },
};
</script>