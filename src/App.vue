<template>
  <website-header/>
  <div
    class="modal fade"
    id="submissionFinishModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="submissionFinishModal"
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
        <div id="app.vue_status"></div>
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
  <website-body/>
  <website-footer/>
</template>

<script>
import WebsiteHeader from './components/WebsiteHeader.vue';
// import SubmitVideo from './components/SubmitVideo.vue';
import WebsiteBody from './components/WebsiteBody.vue';
import WebsiteFooter from './components/WebsiteFooter.vue';
import { Modal } from 'bootstrap';
const RVerify = window.RVerify;
const crypto = require('crypto');

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
    this.setJWTCookie('testValue')
    // this.deleteCookies();
    console.log("cookie", this.getJWTCookie());
    console.log(document.cookie);
  },
  // mounted() {
  //   this.clicked = true;
  // },
  methods: {
    setJWTCookie(value) {
      document.cookie = `jwt=${value};SameSite=Lax`;
    },
    // REMOVE DELETECOOKIES METHOD AFTER TESTING IS DONE
    deleteCookies() {
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    },
    getJWTCookie() {
      var name = 'jwt=';
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    async submit() {

      // Retry button calls this method. Some things shouldn't happen like opening the modal. Some things should be done like putting the loading thing back on
      // Retry is also broken right now because the OAuth stuff will be messed up.

      document.getElementById("app.vue_status").innerHTML = "";
      new Modal(document.getElementById("submissionFinishModal")).show();
      let data = JSON.parse(sessionStorage.getItem('data'));
      data['code'] = this.authCode;
      data['auth_state'] = this.state;
      console.log(data);

      let html;
      const response = await fetch("https://showcase.manim.workers.dev/", {
        method: "POST",
        body: JSON.stringify(data),
        credentials: 'include'
      }).catch((error) => {
        this.loading = false;
        this.retry = true;
        html = `<p style="font-size: 18px;font-family: Garamond, serif;">It appears that there was an error while sending your video submission. You may try resubmitting your video in a little while or you can submit an issue on our <a href="${this.github_url}"> GitHub repository.</a> The error has been logged to your browser console.</p>`;
        document.getElementById("app.vue_status").innerHTML = html;
        console.error("Submission Error:", error);
      });
      this.loading = false;
      if (response.status == 409) {
        this.conflict = true;
        html =
          '<p style="font-size: 18px;font-family: Garamond, serif;">Oh no! There is already a video with the same title by the same author. Please adjust.</p>';
        document.getElementById("app.vue_status").innerHTML = html;
      } else if (response.status == 400){
          response.json().then((data) => {
            if(data.extraInfo == "Taken"){
              html = `<p style="font-size: 18px;font-family: Garamond, serif;">Oh no! It appears this author name is taken already. Please adjust.</p>`;
            }else{
              html = `<p style="font-size: 18px;font-family: Garamond, serif;">Oh no! It appears you have used a different author name in the past. Please change it to the one you used previously (${data.extraInfo}).</p>`;
            }
            document.getElementById("app.vue_status").innerHTML = html;
          });
      } else if (response.status == 500) {
        response.json().then((data) => {
          if(data.extraInfo == 'Login'){
            RVerify.configure({
              tolerance: 8,
              duration: 500,
              mask: 0.5,
              maskClosable: true,
              title: "Upload Your Manim Video - Captcha",
              text: "Use the slider to orient the picture upright",
              album: [
                "tiger.jpg",
                "eagle.jpg",
                "gosling.jpg",
                "kitten.jpg",
                "wolf.jpg",
                "bird.jpg",
              ],
            });

            RVerify.action(function (result) {
              if (result == 1) {
                setTimeout(() => {
                  let state = encodeURIComponent(
                    crypto.randomBytes(16).toString("base64")
                  );
                  sessionStorage.setItem("state", state);
                  sessionStorage.setItem("data", JSON.stringify(self.getData(true)));
                  window.location.replace(
                    `https://github.com/login/oauth/authorize?client_id=84d5919b313ea4acaf44&scope=public_repo&state=${encodeURIComponent(
                      state
                    )}`
                  );
                }, 500);
              }
            });
          }else if(data.extraInfo == 'Unavailable'){
            html = `<p style="font-size: 18px;font-family: Garamond, serif;">It appears that GitHub was down when we made our request. You may try resubmitting your video in a little while.</a></p>`;
            document.getElementById("app.vue_status").innerHTML = html;
          }else{
            html = `<p style="font-size: 18px;font-family: Garamond, serif;">It appears that we had an internal error while trying to submit your video. The error has been logged for troubleshooting. You may try resubmitting your video in a little while or you can submit an issue on our <a href="${this.github_url}"> GitHub repository.</a></p>`;
            document.getElementById("app.vue_status").innerHTML = html;
          }
        });
        this.retry = true;
      } else if (response.status == 200) {
        response.json().then((data) => {
          html = `<p style="font-size: 18px;font-family: Garamond, serif;">Thank you for submitting your Manim video! Once it has been approved, your video will appear on the Manim Showcase within 6 hours. <a href="${data.extraInfo}"> You can view your submission here.</a> If your video does not appear on the Showcase after a while, changes may have been requested <a href="${data.extraInfo}"> here.</a> </p>`;
          document.getElementById("app.vue_status").innerHTML = html;
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
  min-height: 100%;
  /* position: relative; */
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
