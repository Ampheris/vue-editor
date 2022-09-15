<template>

  <!-- CREATE NEW MODAL -->
  <div>
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
  name: "GenericModals",
  data() {
    return {
      idOfDocument: '',
      newDocument: {
        name: '',
        content: 'your new document here...'
      },
      documents: [],
    }
  },
  async created() {
    let result = await APIService.getAllDocuments();
    this.documents = result.data.files;
  },
  methods: {
    async createNew() {
      try {
        await APIService.createNew(this.newDocument);
        let newDocuments = await APIService.getAllDocuments();
        this.documents = newDocuments.data.files;
      } catch (e) {
        console.log('Error: failed to create document');
      }
    },
    openDocument() {
      this.$emit('openDoc', this.idOfDocument);
    }
  },
}
</script>

<style scoped>

</style>