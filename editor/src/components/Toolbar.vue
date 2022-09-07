<template>
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
            <a class="nav-link" href="#" @click.prevent="saveText">
              <font-awesome-icon icon="fa-solid fa-floppy-disk"/>
              Save</a>
          </li>
          <li>
            <a class="nav-link" data-bs-toggle="modal" data-bs-target="#createNewModal">
              <font-awesome-icon icon="fa-solid fa-plus"/>
              Create new</a>
          </li>
          <li>
            <a class="nav-link" data-bs-toggle="modal" data-bs-target="#getAllModal">
              <font-awesome-icon icon="fa-solid fa-folder-open"/>
              Open document</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <GenericModals :documents="documents"/>
</template>

<script>
import GenericModals from "@/components/GenericModals";
import APIService from "@/services/api.services";

export default {
  name: "ToolbarItem",
  components: {GenericModals},
  data() {
    return {
      documents: []
    }
  },
  async created() {
    let result = await APIService.getAllDocuments();
    this.documents = result.data.files;
  },
  methods: {
    saveText() {
      let text = document.getElementsByClassName('ql-editor');
      console.log(`Printing content of text editor:`);
      console.log(text[0].innerHTML);
    },
    createNew() {
      // Open modal
    }
  }
}
</script>

<style scoped>

</style>