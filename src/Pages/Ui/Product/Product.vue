<template>
  <div>
    <v-container role class="mt-5">
      <v-banner elevation="3">
        <v-icon slot="icon" color="light-green darken-3" size="36">mdi-barcode</v-icon>
        {{ this.group }}
        <template v-slot:actions>
          <v-btn
            color="light-green darken-3"
            class="mb-2"
            text
            :to="{ name: 'product-list', params: { gp: group } }"
            >نمایش تمام محصولات این گروه</v-btn
          >
        </template>
      </v-banner>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12" md="4" sm="6" xs="12">
          <v-card role max-height="300">
            <v-carousel
              hide-delimiters
              :show-arrows-on-hover="true"
              max-height="300"
            >
              <v-carousel-item
                max-height="300"
                v-for="(item, i) in pictures"
                :key="i"
                :src="item"
              ></v-carousel-item>
            </v-carousel>
          </v-card>
        </v-col>
        <v-col cols="12" md="8" sm="6" xs="12">
          <v-card min-height="300" class="mx-auto pa-5" elevation="2">
            <div class="text--light-green darken-3 headline text-justify">{{
              this.name
            }}</div>
            <p class="text--disabled">{{
              this.alias
            }}</p>
            <br />
            <br />
            <v-btn block dark class="green mt-11" @click="cost">
              <v-icon>mdi-cash-multiple</v-icon>قیمت را به من اطلاع بده !
            </v-btn>
            <v-btn
              block
              class="light-green darken-3 mt-2"
              v-clipboard="share()"
              v-clipboard:success="clipboardSuccessHandler"
            >
              <v-icon>mdi-share-variant</v-icon>اشتراک
            </v-btn>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-tabs show-arrows left>
              <v-tab>
                <v-icon right>mdi-clipboard-text</v-icon>سایر توضیحات
              </v-tab>
              <v-tab>
                <v-icon right>mdi-presentation</v-icon>ویژگی‌ها و مزایا
              </v-tab>
              <v-tab> <v-icon right>mdi-table</v-icon>مشخصات </v-tab>
              <v-tab> <v-icon right>mdi-message-video</v-icon>ویدیوها </v-tab>
              <v-tab> <v-icon right>mdi-barcode</v-icon>محصولات مرتبط </v-tab>
              <v-tab>
                <v-icon right>mdi-help-circle</v-icon>سوالات متداول
              </v-tab>

              <v-tab-item>
                <v-card flat>
                  <v-card-text v-html="this.text"></v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <FeatureList :cards="features" />
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-simple-table>
                      <template v-slot:default>
                        <tbody>
                          <tr v-for="item in details" :key="item._id">
                            <td>{{ item.title }}</td>
                            <td>{{ item.value }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <VideoList :cards="videos" />
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <ProductList :cards="relateds" />
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <FaqList :cards="faqs" />
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" :multi-line="true" top color="white">
      <span style="color: black">{{ snackbarText }}</span>
      <v-btn color="red" text @click="snackbar = false">بستن</v-btn>
    </v-snackbar>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>اطلاع از قیمت</v-card-title>
        <v-card-text>
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
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="send" :disabled="$v.form.$invalid"
            >ثبت</v-btn
          >
          <v-btn color="red" btn dark @click="dialog = false">بستن</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ProductList from "../Shared/ProductList";
import VideoList from "../Shared/VideoList";
import FeatureList from "../Shared/FeatureList";
import FaqList from "../Shared/FaqList";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      form: {
        phone: "",
        name: "",
      },
      dialog: false,
      snackbarText: "",
      snackbar: false,
      group: this.$route.params.gp,
      name: "",
      text: "",
      pictures: [],
      relateds: [],
      videos: [],
      details: [],
      features: [],
      faqs: [],
      alias: "",
    };
  },
  components: {
    ProductList,
    VideoList,
    FeatureList,
    FaqList,
  },
  watch: {
    $route(to, from) {
      this.initialize().then((res) => {
        this.name = res.name;
        this.alias = res.alias;
        this.text = res.text;
        this.faqs = res.faqs;
        res.details.sort((a, b) => {
          if (a.index < b.index) {
            return -1;
          } else {
            return 1;
          }
        });
        this.details = res.details;
        res.features.sort((a, b) => {
          if (a.index < b.index) {
            return -1;
          } else {
            return 1;
          }
        });
        res.features.forEach((element) => {
          this.features.push({
            _id: element._id,
            title: element.title,
            text: element.text,
            show: false,
            picture: this.$store.getters.getStaticsUrl + element.pic,
          });
        });
        res.relateds.forEach((element) => {
          this.relateds.push({
            _id: element._id,
            gp: element.gp,
            name: element.name,
            alias: element.alias,
            picture: this.$store.getters.getStaticsUrl + element.picture,
          });
        });
        res.videos.forEach((element) => {
          this.videos.push({
            _id: element._id,
            name: element.name,
            alias: element.alias,
            picture: this.$store.getters.getStaticsUrl + element.pic,
          });
        });
        res.attaches.sort((a, b) => {
          if (a.index < b.index) {
            return -1;
          } else {
            return 1;
          }
        });
        res.attaches.forEach((element) => {
          this.pictures.push(
            this.$store.getters.getStaticsUrl + element.attach
          );
        });
      });
    },
    name: function (val) {
      document.title = "کلوپ وِگان  -   " + val;
    },
  },
  methods: {
    async initialize() {
      let a = await this.$store.dispatch("getUiProduct", {
        gp: this.$route.params.gp,
        alias: this.$route.params.product,
      });
      return a;
    },
    share() {
      return `${window.location.origin}/product/${this.$route.params.gp}/${this.$route.params.product}`;
    },
    clipboardSuccessHandler() {
      this.snackbar = true;
      this.snackbarText = "محصول مورد نظر کپی شد .";
    },
    cost() {
      this.$v.form.$reset();
      this.form.name = "";
      this.form.phone = "";
      this.dialog = true;
    },
    send() {
      this.$store
        .dispatch(
          "postUiCustomer",
          Object.assign(
            {
              product: this.name,
            },
            this.form
          )
        )
        .then(() => {
          this.$v.form.$reset();
          this.dialog = false;
          this.snackbar = true;
          this.snackbarText = "درخواست شما ثبت شد با شما تماس گرفته خواهد شد .";
        });
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
  },
  created() {
    this.initialize().then((res) => {
      this.name = res.name;
      this.text = res.text;
      this.faqs = res.faqs;
      this.alias = res.alias;
      res.details.sort((a, b) => {
        if (a.index < b.index) {
          return -1;
        } else {
          return 1;
        }
      });
      this.details = res.details;
      res.features.sort((a, b) => {
        if (a.index < b.index) {
          return -1;
        } else {
          return 1;
        }
      });
      res.features.forEach((element) => {
        this.features.push({
          _id: element._id,
          title: element.title,
          text: element.text,
          show: false,
          picture: this.$store.getters.getStaticsUrl + element.pic,
        });
      });
      res.relateds.forEach((element) => {
        this.relateds.push({
          _id: element._id,
          gp: element.gp,
          name: element.name,
          alias: element.alias,
          picture: this.$store.getters.getStaticsUrl + element.picture,
        });
      });
      res.videos.forEach((element) => {
        this.videos.push({
          _id: element._id,
          name: element.name,
          alias: element.alias,
          picture: this.$store.getters.getStaticsUrl + element.pic,
        });
      });
      res.attaches.sort((a, b) => {
        if (a.index < b.index) {
          return -1;
        } else {
          return 1;
        }
      });
      res.attaches.forEach((element) => {
        this.pictures.push(this.$store.getters.getStaticsUrl + element.attach);
      });
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
    },
  },
  head: {
    title: function () {
      return {
        inner: this.name,
      };
    },
  },
};
</script>

<style>
</style>