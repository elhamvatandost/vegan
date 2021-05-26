<template>
  <div>
    <GroupsList limit="100" />
  </div>
</template>

<script>
import GroupsList from "../Shared/GroupsList";

export default {
  data() {
    return {};
  },
  components: {
    GroupsList
  },
  head: {
    title: function() {
      return {
        inner: "لیست گروه محصولات"
      };
    }
  }
};
</script>