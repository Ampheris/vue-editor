<template>
  <div>
    <ToolbarItem @getDocId="getDocId" :editor="editor"/>
    <TextEditor :docId="docId" @getQuill="getQuill"/>
  </div>
</template>

<script>
import ToolbarItem from "@/components/Toolbar";
import TextEditor from "@/components/TextEditor";

export default {
  name: "FrontPage",
  components: {TextEditor, ToolbarItem},
  data() {
    return {
      docId: 0,
      editor: null,
    }
  },
  methods: {
    getDocId(id) {
      this.docId = id;
    },
    getQuill(value) {
      this.editor = value;
    }
  },
}
</script>

<style scoped>

</style>