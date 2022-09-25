<template>
  <div>
    <ToolbarItem @getDocId="getDocId"/>
    <TextEditor :docId="docId"/>
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
      docId: 0
    }
  },
  methods: {
    getDocId(id) {
      this.docId = id;
    }
  }
}
</script>

<style scoped>

</style>