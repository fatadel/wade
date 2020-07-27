<template>
  <div class="verification-container">Verifications.</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "oVerification",
  created() {
    this.$store.commit("SidebarStore/setActiveElement", this.$route.params.id);
  },
  watch: {
    // Check if router id changed and change active sidebar element
    "$route.params.id"(id) {
      this.$store.commit("SidebarStore/setActiveElement", id);
    },
  },
});
</script>


<style scoped>
.verification-container {
  padding: 7px;
}
</style>
