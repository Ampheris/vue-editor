<template>
  <div>
    <h2> Text editor </h2>
    <div id="editor-div">
      <QuillEditor theme="snow" id="editor" @textChange="editingText" @ready="editorReady"/>
    </div>
  </div>
</template>

<script>
import {QuillEditor} from "@vueup/vue-quill";

export default {
  name: "TextEditor",
  inject: ['socket'],
  components: {
    QuillEditor,
  },
  props: ['docId'],
  data() {
    return {
      editor: null,
      webSocket: this.socket,
      doc: {
        _id: this.docId,
        html: '',
        diff: null,
      },
    }
  },
  created() {
    console.log(this.webSocket);
    this.webSocket.sendHello();

    this.webSocket.socket.on("doc", (data) => {
      this.doc.html = data.html;
      //this.editor.setContents(data.diff);
      this.editor.pasteHTML(this.doc.html, 'silent');
      console.log(`From backend: ${data.html}`);
    });
  },
  methods: {
    editorReady(quill) {
      this.editor = quill;
    },
    editingText(delta) {
      console.log(`Document id: ${this.docId}`);

      if (this.docId !== 0) {
        console.log(`delta: ${JSON.stringify(delta.delta)}`);
        let temp = document.getElementsByClassName('ql-editor');

        this.doc._id = this.docId;
        this.doc.html = temp[0].innerHTML;
        this.doc.diff = delta.delta;

        this.webSocket.liveUpdate(this.doc);
      }
    },
  }

}
</script>

<style scoped>

</style>