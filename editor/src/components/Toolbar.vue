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
            <li v-if="loggedIn">
              <a id="create-document" class="nav-link" data-bs-toggle="modal" data-bs-target="#createNewModal">
                <font-awesome-icon icon="fa-solid fa-plus"/>
                Create new</a>
            </li>
            <li v-if="loggedIn">
              <a id="open-document" class="nav-link" @click="getAllDocuments" data-bs-toggle="modal"
                 data-bs-target="#getAllModal">
                <font-awesome-icon icon="fa-solid fa-folder-open"/>
                Open document</a>
            </li>
            <li class="nav-item" v-if="loggedIn">
              <a class="nav-link" @click.prevent="downloadPDF">
                <font-awesome-icon icon="fa-solid fa-download" id="downloadPDF"/>
                Download PDF</a>
            </li>
            <li v-if="!loggedIn">
              <a id="login-button" class="nav-link" data-bs-toggle="modal"
                 data-bs-target="#loginModal">
                <font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket"/>
                Login</a>
            </li>
            <li v-if="!loggedIn">
              <a id="register-button" class="nav-link" data-bs-toggle="modal"
                 data-bs-target="#registerModal">
                <font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket"/>
                Register</a>
            </li>
            <li v-if="loggedIn">
              <a id="sendInvite" class="nav-link" data-bs-toggle="modal"
                 data-bs-target="#sendInviteModal">
                <font-awesome-icon icon="fa-solid fa-paper-plane"/>
                Send invite</a>
            </li>
            <li v-if="loggedIn">
              <a id="logout-button" class="nav-link" @click="handleLogout">
                <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket"/>
                Logout</a>
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
    <div class="modal fade" id="getAllModal" tabindex="-1" aria-labelledby="getAllModal" aria-hidden="true">
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

    <!-- LOGIN FORM MODAL -->
    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginModalTitle">Login</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3 form-group">
              <label for="username" class="float-start">Email</label>
              <input id="username" class="form-control" type="text" placeholder="Your email..."
                     v-model="user.email">

              <label for="password" class="float-start">Password</label>
              <input id="password" class="form-control" type="password" placeholder="Your password..."
                     v-model="user.password">
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="handleLogin">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- REGISTER FORM MODAL -->
    <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="loginModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="registerModalTitle">Register new account</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3 form-group">
              <label for="usernameReg" class="float-start">Email</label>
              <input id="usernameReg" class="form-control" type="text" placeholder="Your email..."
                     v-model="user.email">

              <label for="passwordReg" class="float-start">Password</label>
              <input id="passwordReg" class="form-control" type="password" placeholder="Your password..."
                     v-model="user.password">
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="handleRegister">Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SEND INVITE FORM MODAL -->
    <div class="modal fade" id="sendInviteModal" tabindex="-1" aria-labelledby="sendInviteModal" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="sendInviteModalTitle">Send invite to your document</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <small>Adding a co-editor for the following document: {{ this.currentFile.name }}</small>
            <div class="mb-3 form-group">
              <label for="usernameReg" class="float-start">Email</label>
              <input id="usernameReg" class="form-control" type="text"
                     placeholder="The email of the one you want to invite..."
                     v-model="invite.email">
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" @click="sendEmail">Register
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
import {pdfExporter} from "quill-to-pdf";
import {saveAs} from 'file-saver';


export default {
  name: "ToolbarItem",
  inject: ['socket'],
  props: ['editor'],
  data() {
    return {
      webSocket: this.socket,
      idOfDocument: '',
      newDocument: {
        name: '',
        content: 'your new document here...',
        user: ''
      },
      documents: [],
      currentFile: {
        id: '',
        name: '',
        content: '',
      },
      user: {
        email: '',
        password: '',
      },
      invite: {
        email: '',
        documentId: ''
      }
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    async downloadPDF() {
      if (this.idOfDocument) {
        const quillDelta = this.editor.getContents();
        const pdfBlob = await pdfExporter.generatePdf(quillDelta);
        let underScoredName = this.currentFile.name.split(' ').join('_');

        saveAs(pdfBlob, `${underScoredName}.pdf`);
      }
    },
    async createNew() {
      try {
        this.newDocument.user = this.currentUser._id;

        await APIService.createNew(this.newDocument);
        let newDocuments = await APIService.getAllDocuments(this.currentUser._id);
        this.documents = newDocuments.data.data.yourDocuments;
      } catch (e) {
        console.log('Error: failed to create document');
      }
    },
    async getAllDocuments() {
      let result = await APIService.getAllDocuments(this.currentUser._id);
      this.documents = result.data.data.yourDocuments;
    },
    async openDocument() {
      let result = await APIService.getSpecificFile(this.idOfDocument);
      this.currentFile.content = result.data.file.content;
      this.currentFile.name = result.data.file.name;
      this.currentFile.id = result.data.file._id;

      let editor = document.getElementsByClassName('ql-editor');
      editor[0].innerHTML = this.currentFile.content;

      this.webSocket.createRoom(this.currentFile.id);
      this.$emit('getDocId', this.currentFile.id)
    },
    handleLogin() {
      this.$store.dispatch("auth/login", this.user);
    },
    handleRegister() {
      this.message = "";
      this.$store.dispatch("auth/register", this.user);
    },
    handleLogout() {
      this.$store.dispatch("auth/logout");
      this.currentFile = {
        id: '',
        name: '',
        content: '',
      }
      this.idOfDocument = '';

      let editor = document.getElementsByClassName('ql-editor');
      editor[0].innerHTML = '';
    },
    async sendEmail() {
      const mailOptions = {
        to: this.invite.email,
        subject: `You're invited to co-edit a document`,
        text: `You're invited by ${this.currentUser.email} to edit the document called ${this.currentFile.name}.
        Follow this link: www.student.bth.se/~macl16/editor . When you register on the page you will be automatically added to the document.`,
        documentId: this.idOfDocument
      };

      await APIService.sendEmail(mailOptions);
    }
  }
}
</script>

<style scoped>
li {
  cursor: pointer;
}
</style>