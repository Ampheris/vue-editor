<template>

  <!-- CREATE NEW MODAL -->
  <div class="modal fade" id="createNewModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createNewModalName">Create new document</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="sendForm">
            <div class="mb-3 form-group">
              <label for="documentTitle" class="float-start">Title</label>
              <input id="documentTitle" class="form-control" type="text"
                     v-model="newDocument.title">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click.prevent="createNewDocument">Create</button>
            </div>
          </form>
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
          <form @submit.prevent="sendForm">
            <div class="mb-3 form-group">
              <select class="form-select" aria-label="Default select example" id="issue-options" v-model="idOfDocument">
                <option v-for="(value, key) in documents" :key="key"
                        :value="key">{{ value['name'] }}
                </option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click.prevent="createNewDocument">Create</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
  <!-- END OF GET ALL DOCUMENT MODAL-->
</template>

<script>

export default {
  name: "GenericModals",
  props: ['documents'],
  data() {
    return {
      idOfDocument: '',
      newDocument: {
        title: '',
        content: 'your new document here...'
      },
    }
  },
}
</script>

<style scoped>

</style>