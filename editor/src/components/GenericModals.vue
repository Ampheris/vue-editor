<template>
<h1>hej</h1>
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