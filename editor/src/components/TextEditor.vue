<template>
  <div>
    <h2> Text editor </h2>
    <div id="editor-div">
      <QuillEditor theme="snow" id="editor"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextEditor",
  inject: ['socket'],
  data() {
    return {
      webSocket: this.socket,
    }
  },
  created() {
    console.log(this.webSocket);
    this.webSocket.sendHello();
  }
}
</script>

<style scoped>

</style>