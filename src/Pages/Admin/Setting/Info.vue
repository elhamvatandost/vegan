<template>
  <v-form>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header>اطلاعات</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field
                  label="سرتیتر"
                  v-model="subtitle"
                  outlined
                  :error-messages="subtitleErr"
                  required
                  @input="$v.subtitle.$touch()"
                  @blur="$v.subtitle.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
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
              <v-col cols="12" sm="4">
                <v-text-field
                  label="URL"
                  v-model="url"
                  outlined
                  :error-messages="urlErr"
                  required
                  @input="$v.url.$touch()"
                  @blur="$v.url.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  outlined
                  v-model="emails"
                  label="پست‌الکترونیکی"
                  :error-messages="emailsErr"
                  required
                  @input="$v.emails.$touch()"
                  @blur="$v.emails.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="time"
                  label="ساعت کار"
                  outlined
                  :error-messages="timeErr"
                  required
                  @input="$v.time.$touch()"
                  @blur="$v.time.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <autocomplete
                  source="https://api.c1t.ir/api/upload/images?q="
                  results-value="_id"
                  results-display="filename"
                  class="v-text-field"
                  placeholder="لوگو  ..."
                  @selected="selected"
                  @clear="cleared"
                  @input="$v.logo.$touch()"
                  @blur="$v.logo.$touch()"
                  :request-headers="authHeaders"
                ></autocomplete>
                <span style="color: red">{{ logoErr.toString() }}‌</span>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="آدرس دفتر"
                  v-model="location"
                  outlined
                  :error-messages="locationErr"
                  required
                  @input="$v.location.$touch()"
                  @blur="$v.location.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="لینک آدرس دفتر"
                  v-model="locationLink"
                  :error-messages="locationLinkErr"
                  required
                  @input="$v.locationLink.$touch()"
                  @blur="$v.locationLink.$touch()"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  label="واتسآپ"
                  v-model="whatsApp"
                  :error-messages="whatsAppErr"
                  required
                  @input="$v.whatsApp.$touch()"
                  @blur="$v.whatsApp.$touch()"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  label="تلگرام"
                  v-model="telegram"
                  outlined
                  :error-messages="telegramErr"
                  required
                  @input="$v.telegram.$touch()"
                  @blur="$v.telegram.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  label="اینستاگرام"
                  v-model="instagram"
                  outlined
                  :error-messages="instagramErr"
                  required
                  @input="$v.instagram.$touch()"
                  @blur="$v.instagram.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-combobox
                  multiple
                  outlined
                  v-model="phones"
                  label="تلفن‌ها"
                  chips
                  deletable-chips
                  :error-messages="phonesErr"
                  required
                  @input="$v.phones.$touch()"
                  @blur="$v.phones.$touch()"
                  class="tag-input"
                ></v-combobox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-combobox
                  multiple
                  outlined
                  v-model="tags"
                  label="تگ‌ها"
                  chips
                  deletable-chips
                  :error-messages="tagsErr"
                  required
                  @input="$v.tags.$touch()"
                  @blur="$v.tags.$touch()"
                  class="tag-input"
                ></v-combobox> </v-col
              >‍
              <div class="title">درباره‌ما</div>
              <v-col cols="12">
                <autocomplete
                  source="https://api.c1t.ir/api/upload/images?q="
                  results-value="_id"
                  results-display="filename"
                  class="v-text-field"
                  placeholder="عکس درباره‌ما  ..."
                  @selected="aselected"
                  @clear="acleared"
                  @input="$v.aboutImg.$touch()"
                  @blur="$v.aboutImg.$touch()"
                  :request-headers="authHeaders"
                ></autocomplete>
                <span style="color: red">{{ aboutImgErr.toString() }}‌</span>
              </v-col>
              <v-col cols="12">
                <label>متن درباره‌ما</label>
                <app-editor
                  v-model="about"
                  @input="$v.about.$touch()"
                  @blur="$v.about.$touch()"
                ></app-editor>
                <span style="color: red">{{ aboutErr.toString() }}</span>
              </v-col>
              <v-btn
                color="success"
                class="mr-2"
                @click="click"
                :disabled="$v.$invalid"
              >
                ‍ ثبت اطلاعات ‍
              </v-btn>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-snackbar v-model="snackbar" :multi-line="true" top color="white">
      <span style="color: black">{{ text }}</span>
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
    autocomplete: Autocomplete,
    "app-editor": VueEditor,
  },
  data() {
    return {
      snackbar: false,
      text: "",
      phones: [],
      emails: [],
      instagram: "",
      telegram: "",
      whatsApp: "",
      title: "",
      subtitle: "",
      url: "",
      time: "",
      location: "",
      locationLink: "",
      tags: [],
      logo: "",
      panel: [0, 1],
      about: "",
      aboutImg: "",
    };
  },
  methods: {
    click() {
      this.$store.dispatch("addInfo", {
        phones: this.phones,
        email: this.emails,
        instagram: this.instagram,
        telegram: this.telegram,
        whatsapp: this.whatsApp,
        title: this.title,
        subtitle: this.subtitle,
        url: this.url,
        time: this.time,
        location: this.location,
        locationLink: this.locationLink,
        tags: this.tags,
        logo: this.logo,
        aboutImg: this.aboutImg,
        about: this.about,
      });
      this.text = "اطلاعات شما ویرایش شد .";
      this.snackbar = true;
    },
    async initialize() {
      let a = await this.$store.dispatch("getInfo");
      return a;
    },
    selected(item) {
      this.logo = item.value;
    },
    cleared() {
      this.logo = "";
    },
    aselected(item) {
      this.aboutImg = item.value;
    },
    acleared() {
      this.aboutImg = "";
    },
  },
  computed: {
    subtitleErr() {
      const errors = [];
      if (!this.$v.subtitle.$dirty) return errors;
      !this.$v.subtitle.required && errors.push("زیرتیتر را وارد کنید");
      return errors;
    },
    aboutErr() {
      const errors = [];
      if (!this.$v.about.$dirty) return errors;
      !this.$v.about.required && errors.push("متن درباره‌ما را وارد کنید");
      return errors;
    },
    aboutImgErr() {
      const errors = [];
      if (!this.$v.aboutImg.$dirty) return errors;
      !this.$v.aboutImg.required && errors.push("عکس درباره‌ما را وارد کنید");
      return errors;
    },
    titleErr() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push("تیتر را وارد کنید");
      return errors;
    },
    urlErr() {
      const errors = [];
      if (!this.$v.url.$dirty) return errors;
      !this.$v.url.required && errors.push("url را وارد کنید");
      return errors;
    },
    timeErr() {
      const errors = [];
      if (!this.$v.time.$dirty) return errors;
      !this.$v.time.required && errors.push("ساعت کار را وارد کنید");
      return errors;
    },
    locationErr() {
      const errors = [];
      if (!this.$v.location.$dirty) return errors;
      !this.$v.location.required && errors.push("آدرس دفتر را وارد کنید");
      return errors;
    },
    locationLinkErr() {
      const errors = [];
      if (!this.$v.locationLink.$dirty) return errors;
      !this.$v.locationLink.required &&
        errors.push("لینک آدرس دفتر را وارد کنید");
      return errors;
    },
    whatsAppErr() {
      const errors = [];
      if (!this.$v.whatsApp.$dirty) return errors;
      !this.$v.whatsApp.required && errors.push("واتسآپ را وارد کنید");
      return errors;
    },
    telegramErr() {
      const errors = [];
      if (!this.$v.telegram.$dirty) return errors;
      !this.$v.telegram.required && errors.push("تلگرام را وارد کنید");
      return errors;
    },
    instagramErr() {
      const errors = [];
      if (!this.$v.instagram.$dirty) return errors;
      !this.$v.instagram.required && errors.push("اینستاگرام را وارد کنید");
      return errors;
    },
    phonesErr() {
      const errors = [];
      if (!this.$v.phones.$dirty) return errors;
      !this.$v.phones.required && errors.push("تلفن‌ها را وارد کنید");
      return errors;
    },
    emailsErr() {
      const errors = [];
      if (!this.$v.emails.$dirty) return errors;
      !this.$v.emails.required &&
        errors.push("پست‌های الکترونیکی را وارد کنید");
      return errors;
    },
    tagsErr() {
      const errors = [];
      if (!this.$v.tags.$dirty) return errors;
      !this.$v.tags.required && errors.push("نگ‌ها را وارد کنید");
      return errors;
    },
    logoErr() {
      const errors = [];
      if (!this.$v.logo.$dirty) return errors;
      !this.$v.logo.required && errors.push("لوگو را وارد کنید");
      return errors;
    },
    authHeaders() {
      return {
        x_auth: this.$cookie.get("Etta_Power_Token"),
      };
    },
  },
  validations: {
    subtitle: { required },
    title: { required },
    url: { required },
    time: { required },
    location: { required },
    locationLink: { required },
    whatsApp: { required },
    telegram: { required },
    instagram: { required },
    phones: { required },
    emails: { required },
    tags: { required },
    logo: { required },
    about: { required },
    aboutImg: { required },
  },
  created() {
    this.initialize().then((info) => {
      if (info != null) {
        this.subtitle = info.subtitle;
        this.title = info.title;
        this.url = info.url;
        this.time = info.time;
        this.phones = info.phones;
        this.location = info.location;
        this.locationLink = info.locationLink;
        this.whatsApp = info.whatsapp;
        this.telegram = info.telegram;
        this.instagram = info.instagram;
        this.emails = info.email;
        this.tags = info.tags;
        this.logo = info.logo;
        this.about = info.about;
        this.aboutImg = info.aboutImg;
      }
    });
  },
};
</script>

<style>
</style>