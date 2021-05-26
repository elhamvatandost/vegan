<template>
  <div>
    <v-carousel cycle>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.picture"
        reverse-transition="fade-transition"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        @click="click(item.link)"
      >
        <v-row style="margin-top:210px" align="center" justify="center">
          <v-col cols="12" class="display-1 text-center" style="color : white">{{ item.title }}</v-col>
          <v-col cols="12" class="headline text-center" style="color : white">{{item.subtitle}}</v-col>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <v-divider></v-divider>
    <CategoriesList />
    <v-divider></v-divider>
    <GroupsList limit="6" list="1" />
    <v-snackbar v-model="snackbar" :multi-line="true" top color="white">
      <span style="color : black">{{ snackbarText }}</span>
      <v-btn color="red" text @click="snackbar = false">بستن</v-btn>
    </v-snackbar>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>برای مشاوره رایگان اطلاعات خود را وارد کنید</v-card-title>
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
          <v-btn color="success" @click="send" :disabled="$v.form.$invalid">ثبت</v-btn>
          <v-btn color="red" btn dark @click="dialog = false">بستن</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import GroupsList from "../Shared/GroupsList";
import CategoriesList from "./CategoriesList";
export default {
  components: {
    GroupsList,
    CategoriesList
  },
  data() {
    return {
      items: [],
      form: {
        phone: "",
        name: ""
      },
      dialog: true,
      snackbarText: "",
      snackbar: false,
    };
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
    }
  },
  methods: {
    click(item) {
      window.open(item, "_blank");
    },
    async initialize() {
      let a = await this.$store.dispatch("getUiSlides");
      return a;
    },
    send() {
      this.$store
        .dispatch(
          "postUiCustomer",
          Object.assign(
            {
              product: 'مشاوره'
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
    }
  },
  created() {
    this.initialize().then(slides => {
      slides.forEach(element => {
        this.items.push({
          title: element.title,
          subtitle: element.subtitle,
          picture: this.$store.getters.getStaticsUrl + element.picture,
          link: element.link
        });
      });
    });
  },
  validations: {
    form: {
      name: { required },
      phone: {
        required,
        mobile: function(val) {
          if (val === "") return true;
          if (val.length != 11) {
            return false;
          } else {
            if (val[0].replace('۰','0') != "0" || val[1].replace('۹','9') != "9") {
              return false;
            } else {
              return true;
            }
          }
        }
      }
    }
  },
  head: {
    title: function() {
      return {
        inner: 'صفحه اصلی'
      };
    }
  }
};
</script>

<style>
</style>