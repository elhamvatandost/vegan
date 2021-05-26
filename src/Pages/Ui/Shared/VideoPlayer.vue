<template>
  <div>
    <video ref="videoPlayer" controls style="width: 100%;">
    </video>
  </div>
</template>

<script>
export default {
  name: "VideoPlayer",
  props: {
    video: String
  },
  watch: {
    video: function(val) {
      if (this.video) {
        this.$refs.videoPlayer.src =
          this.$store.getters.getStaticsUrl + this.video;
      }
    }
  }
};
</script>