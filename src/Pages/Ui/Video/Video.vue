<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" class="max-auto">
          <video-player :video="getSrc" :options="this.videoOptions" />
        </v-col>
        <v-col cols="12">
          <v-sheet class="mx-auto pa-3" elevation="2">
            <p class="headline text-justify">{{ this.name }}</p>
          </v-sheet>
        </v-col>
        <v-col cols="12">
          <v-sheet class="mx-auto pa-4" elevation="2">
            <p class="text-justify" v-html="this.text"></p>
          </v-sheet>
        </v-col>
        <v-col cols="12" v-if="this.relateds.length != 0">
          <div class="mx-auto" style="margin-top:30px">
            <v-list-item two-line class="text-center">
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">محصولات مرتبط</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <ProductList :cards="relateds" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import VideoPlayer from "../Shared/VideoPlayer";
import ProductList from "../Shared/ProductList";
export default {
  components: {
    VideoPlayer,
    ProductList
  },
  data() {
    return {
      name: "",
      text: "",
      attach: "",
      relateds: [],
      videoOptions: {
        fluid: true,
        controls: true,
        autoplay: true,
        muted: true
      }
    };
  },
  methods: {
    async initialize() {
      let a = await this.$store.dispatch(
        "getUiVideo",
        this.$route.params.video
      );
      return a;
    }
  },
  computed: {
    getSrc() {
      return this.attach;
    }
  },
  created() {
    this.initialize().then(res => {
      this.name = res.name;
      this.text = res.text;
      this.attach = res.attach;
      this.relateds = [];
      res.relateds.forEach(element => {
        this.relateds.push({
          _id: element._id,
          gp: element.gp,
          name: element.name,
          alias: element.alias,
          picture: this.$store.getters.getStaticsUrl + element.picture
        });
      });
    });
  },
  watch: {
    name: function(val) {
      document.title = "کلوپ وِگان  -   " + val;
    }
  },
  head: {
    title: function() {
      return {
        inner: this.name
      };
    }
  }
};
</script>
