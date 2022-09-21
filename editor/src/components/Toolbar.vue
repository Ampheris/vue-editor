<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Vue Editor</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" @click.prevent="saveText">
                <font-awesome-icon icon="fa-solid fa-floppy-disk"/>
                Save</a>
            </li>
            <li>
              <a id="create-document" class="nav-link" data-bs-toggle="modal" data-bs-target="#createNewModal">
                <font-awesome-icon icon="fa-solid fa-plus"/>
                Create new</a>
            </li>
            <li>
              <a id="open-document" class="nav-link" @click="getAllDocuments" data-bs-toggle="modal"
                 data-bs-target="#getAllModal">
                <font-awesome-icon icon="fa-solid fa-folder-open"/>
                Open document</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- CREATE NEW MODAL -->
    <div class="modal fade" id="createNewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createNewModalName">Create new document</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3 form-group">
              <label for="documentTitle" class="float-start">Title</label>
              <input id="documentTitle" class="form-control" type="text"
                     v-model="newDocument.name">
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="createNew">Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END OF CREATE NEW MODAL-->

    <!-- GET ALL DOCUMENT MODAL -->
    <div class="modal fade" id="getAllModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Open document</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3 form-group">
              <select class="form-select" aria-label="Default select example" id="issue-options" v-model="idOfDocument">
                <option v-for="(value, key) in documents" :key="key"
                        :value="value._id">{{ value.name }}
                </option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="openDocument">Open file
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  <!-- END OF GET ALL DOCUMENT MODAL-->
</template>

<script>
import APIService from "@/services/api.services";

export default {
  name: "ToolbarItem",
  inject: ['socket'],
  data() {
    return {
      webSocket: this.socket,
      idOfDocument: '',
      newDocument: {
        name: '',
        content: 'your new document here...'
      },
      documents: [],
      currentFile: {
        id: '',
        name: '',
        content: '',
      }
    }
  },
  methods: {
    async saveText() {
      let text = document.getElementsByClassName('ql-editor');
      console.log(`Printing content of text editor:`);
      console.log(text[0].innerHTML);

      this.currentFile.content = text[0].innerHTML;


      await APIService.updateDocument(this.currentFile, this.currentFile.id);
    },
    async createNew() {
      try {
        await APIService.createNew(this.newDocument);
        let newDocuments = await APIService.getAllDocuments();
        this.documents = newDocuments.data.files;
      } catch (e) {
        console.log('Error: failed to create document');
      }
    },
    async getAllDocuments() {
      let result = await APIService.getAllDocuments();
      this.documents = result.data.files;
    },
    async openDocument() {
      let result = await APIService.getSpecificFile(this.idOfDocument);
      this.currentFile.content = result.data.file.content;
      this.currentFile.name = result.data.file.name;
      this.currentFile.id = result.data.file._id;

      let editor = document.getElementsByClassName('ql-editor');
      editor[0].innerHTML = this.currentFile.content;

      this.webSocket.createRoom(this.currentFile.id);
    }
  }
}
</script>

<style scoped>
li {
  cursor: pointer;
}
</style>