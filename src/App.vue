<template>
  <website-header />
  <div
    class="modal fade"
    id="submissionModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="submissionModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <img
            draggable="False"
            src="./assets/manim-logo-light-background.svg"
            width="70"
            height="50"
          />
          <h4 class="modal-title">Video Submission Form</h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div v-if="loading" class="spinner spinner-border m-3" role="status">
          <span class="sr-only">Working...</span>
        </div>
        <div id="status"></div>
        <div class="modal-footer">
          <button v-if="conflict" type="button" class="btn btn-red" v-on:click="edit()">
            Edit
          </button>
          <button
            v-if="retry && loading == false"
            type="button"
            class="btn btn-red"
            v-on:click="submit()"
          >
            Retry
          </button>
          <button type="button" class="btn btn-red" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <!-- <submit-video v-if="authCode != ''" :authCode="authCode"></submit-video> -->
  <website-body />
  <website-footer />
</template>

<script>
import WebsiteHeader from './components/WebsiteHeader.vue';
// import SubmitVideo from './components/SubmitVideo.vue';
import WebsiteBody from './components/WebsiteBody.vue';
import WebsiteFooter from './components/WebsiteFooter.vue';
import { Modal } from 'bootstrap';

export default {
  name: 'App',
  components: {
    WebsiteHeader,
    // SubmitVideo,
    WebsiteBody,
    WebsiteFooter
  },
  data() {
    return {
      authCode: '',
      loading: true,
      retry: false,
      conflict: false,
      clicked: false
    }
  },
  mounted() {
    let params = new URLSearchParams(window.location.search);
    let state = decodeURI(params.get('state'));

    if(params.get('code') != null && state != null){
      console.log(window.location.search);
      console.log(sessionStorage.getItem('state'));
      console.log('decoded', state);
      if(state == sessionStorage.getItem('state')){
        this.authCode = params.get('code');
        this.state = state;
        this.submit();
      }else{
        console.error('Received a state parameter in the URL that does not match the stored state.');
      }
      
      window.history.replaceState(window.history.state, '', window.location.toString().replace(window.location.search, ''))

    }else if(params.get('code') != null || state != null){
      window.history.replaceState(window.history.state, '', window.location.toString().replace(window.location.search, ''))
    }
    sessionStorage.removeItem('state');
    // sessionStorage.removeItem('data');
    // console.log(sessionStorage.getItem('state'));
    // console.log(this.checkURL());
    // console.log(encodeURIComponent(crypto.randomBytes(16).toString('base64')));
  },
  // mounted() {
  //   this.clicked = true;
  // },
  methods: {
    async submit() {
      document.getElementById("status").innerHTML = "";
        new Modal(document.getElementById("submissionModal")).show();
        let data = JSON.parse(sessionStorage.getItem('data'));
        data['code'] = this.authCode;
        data['auth_state'] = this.state;
        console.log(data);

        let html;
        const response = await fetch("https://showcase.manim.workers.dev/", {
          method: "POST",
          body: JSON.stringify(data),
        }).catch((error) => {
          this.loading = false;
          this.retry = true;
          html = `<p style="font-size: 18px;font-family: Garamond, serif;">It appears that there was an error while sending your video submission. You may try resubmitting your video in a little while or you can submit an issue on our <a href="${this.github_url}"> GitHub repository.</a> The error has been logged to your browser console.</p>`;
          document.getElementById("status").innerHTML = html;
          console.error("Submission Error:", error);
        });
        this.loading = false;
        if (response.status == 409) {
          this.conflict = true;
          html =
            '<p style="font-size: 18px;font-family: Garamond, serif;">Oh no! There is already a video with the same title by the same author. Please adjust.</p>';
          document.getElementById("status").innerHTML = html;
        } else if (response.status == 500) {
          html = `<p style="font-size: 18px;font-family: Garamond, serif;">It appears that we had an internal error while trying to submit your video. The error has been logged for troubleshooting. You may try resubmitting your video in a little while or you can submit an issue on our <a href="${this.github_url}"> GitHub repository.</a></p>`;
          document.getElementById("status").innerHTML = html;
          this.retry = true;
        } else if (response.status == 200) {
          response.json().then((data) => {
            html = `<p style="font-size: 18px;font-family: Garamond, serif;">Thank you for submitting your Manim video! Once it has been approved, your video will appear on the Manim Showcase within 6 hours. <a href="${data.url}"> You can view your submission here.</a> If your video does not appear on the Showcase after a while, changes may have been requested <a href="${data.url}"> here.</a> </p>`;
            document.getElementById("status").innerHTML = html;
            this.submitted = true;
            document.getElementById("form").classList.remove("was-validated");
          });
        }
    }
    // checkURL() {
    //   return window.location.toString().includes('code')
    // }
  }
}
</script>
<style>
/* @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
@import './main.css'; */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.modal-header {
  align-items: center;
}

.btn-red {
  color: white;
  background-color: #e07a5f;
  border-color: #e07a5f;
}
</style>
