<template>
  <MonacoEditor
    class="style-mCodeEditor"
    theme="vs-dark"
    :language="language"
    v-model="value"
    :options="options"
  ></MonacoEditor>
</template>

<script lang="ts">
import Vue from "vue";
import MonacoEditor from "vue-monaco";

export default Vue.extend({
  name: "mCodeEditor",
  components: {
    MonacoEditor,
  },
  props: {
    language: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: false,
      default: "",
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    options: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      value: this.code || this.placeholder,
      options: {
        minmap: {
          enabled: false, // TODO: not working to disable minimap
        },
      },
    };
  },
  watch: {
    code(newVal) {
      this.value = newVal; // handles prop changes (from outside)
    },
  },
});
</script>

<style scoped>
.style-mCodeEditor,
.style-mCodeEditor .monaco-editor {
  width: 100%;
  height: 100%;
  /* makes editor responsive */
  resize: vertical;
  overflow: auto;
}
</style>
