<template>
  <header class="border-bottom border-dark mb-4">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a
        class="navbar-brand"
        draggable="False"
        href="https://www.manim.community/"
      >
        <img
          title="ManimCommunity Home"
          draggable="False"
          src="../assets/manim-logo.svg"
          width="75"
          height="75"
          alt="ManimCommunity Logo"
        />
        Manim Showcase
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#social"
        aria-controls="social"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="social">
        <!-- See explanation for captcha() later in this file -->
        <button
          type="button"
          class="btn btn-outline-light"
          v-on:click="form()"
        >
        <!-- <a -->
          <!-- href="https://github.com/login/oauth/authorize?client_id=84d5919b313ea4acaf44&scope=public_repo" -->
        <!-- > -->
          <!-- <button type="button" class="btn btn-outline-light"> -->
            <strong>Upload Your Manim Video</strong>
          </button>
        <!-- </a> -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a
              href="https://docs.manim.community"
              class="nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" class="btn btn-outline-light">
                <i class="icon-book"></i> Documentation
              </button>
            </a>
          </li>
          <li class="nav-item">
            <a
              href="https://github.com/ManimCommunity/manim"
              class="nav-link"
              target="_blank"
            >
              <button type="button" class="btn btn-outline-light">
                <i class="icon-github"></i> GitHub
              </button>
            </a>
          </li>
          <li class="nav-item">
            <a
              href="https://twitter.com/manim_community/"
              class="nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" class="btn btn-outline-light">
                <i class="icon-twitter"></i> Twitter
              </button>
            </a>
          </li>
          <li class="nav-item">
            <a
              href="https://discord.gg/mMRrZQW"
              class="nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" class="btn btn-outline-light">
                <i class="icon-discord"></i> Discord
              </button>
            </a>
          </li>
          <li>
            <a
              href="https://www.reddit.com/r/manim/"
              class="nav-link nav-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" class="btn btn-outline-light">
                <i class="icon-reddit"></i> Reddit
              </button>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>

  <!-- This modal only shows if disabled is true -->
  <div class="modal fade" id="disabledModal" tabindex="-1" role="dialog" aria-labelledby="disabledModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <img draggable="False" src="../assets/manim-logo-light-background.svg" width="70" height="50"/>
          <h5 class="modal-title">Video Submission Form</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <p>The video submission form has been temporarily disabled. Check back at a later time!</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-red" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <submit-video v-if="submissionForm"/>
  <!-- <div id="carousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModal" aria-hidden="true">
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <img draggable="False" src="../assets/manim-logo-light-background.svg" width="70" height="50"/>
                <h5 class="modal-title">Login Warning</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">
                <p>In order to submit your work to the Manim Showcase, you must login with GitHub. This enables us to run the Showcase as 
                a small community-maintained project with the user features you'd expect. <strong>You will not be required to login until after you
                have filled out the submission form.</strong></p>
                <p>When authorizing the Manim Showcase to act on behalf of your GitHub account, we ask for the most restrictive permissions we can.
                GitHub's most restrictive permission set grants broader access than we will ever use. We will never touch your repositories or store information 
                from GitHub outside what is required for the OAuth flow, <strong>ever.</strong> The only action we will take for you is interacting with the official Manim 
                Showcase repository. If you would like to revoke access after submitting your work, <a href="https://github.com/settings/connections/applications/84d5919b313ea4acaf44">you may do so here.</a></p>
                <p>We appreciate your understanding.</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-red" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-red" v-on:click="next()">Continue</button>
              </div>
            </div>
          </div>
        </div>
        <submit-video v-if="document.getElementById('proceeded').classList.contains('active')"/>
      </div>
    </div>
  </div> -->

  <!-- <a v-bind:href="login_url">
                  <button type="button" class="btn btn-red">
                    <i class="icon-github"></i> Login with GitHub
                  </button>
                </a> -->
  <!-- See explanation for :value="clicked" later in this file -->
  <!-- <submit-video :value="clicked"></submit-video> -->
</template>

<script>
import SubmitVideo from "./SubmitVideo.vue";
import { Modal } from 'bootstrap';

// const RVerify = window.RVerify;
// const crypto = require('crypto');

export default {
  name: "WebsiteHeader",
  components: {
    SubmitVideo
  },
  /* Because Vue allows breaking parts of a website up into components, we store the entirety of our Navbar here, but the
  "Submit a Manim Video" button is located in the Navbar. Because we want the submission form to be its own component,
  we have to trigger the SubmitVideo to show on the screen when the button is clicked. The SubmitVideo component
  waits for clicked to be true and then becomes visible. */
  data() {
    return {
      // Setting "disabled" to true will turn off the submission form after a redeploy. This is a safety feature! Don't remove.
      disabled: true,
      submissionForm: false,
      login_url: ''
      // clicked: false,
    };
  },
  // created() {
  //   RVerify.configure({
  //     tolerance: 8,
  //     duration: 500,
  //     mask: 0.5,
  //     maskClosable: true,
  //     title: "Upload Your Manim Video - Captcha",
  //     text: "Use the slider to orient the picture upright",
  //     album: [
  //       "tiger.jpg",
  //       "eagle.jpg",
  //       "gosling.jpg",
  //       "kitten.jpg",
  //       "wolf.jpg",
  //       "bird.jpg",
  //     ]
  //   });
  // },
  methods: {
    form() {
      if(this.disabled){
        new Modal(document.getElementById('disabledModal')).show();
      }else{
        // new Modal(document.getElementById('loginModal')).show();
        this.submissionForm = true;
      }
    },
  //   captcha() {
  //     var self = this;
  //       RVerify.action(function(result){
  //         if(result == 1){
  //             setTimeout(() => {
  //               new Modal(document.getElementById('loginModal')).show();
  //               let state = encodeURIComponent(crypto.randomBytes(16).toString('base64'));
  //               sessionStorage.setItem('state', state)
  //               console.log(sessionStorage.getItem('state'));
  //               self.login_url = `https://github.com/login/oauth/authorize?client_id=84d5919b313ea4acaf44&scope=public_repo&state=${encodeURIComponent(state)}`
  //               // self.modal.show()
  //             }, 500)
  //         }
  //       });
  //   }
  },
}
</script>

<style scoped>
i {
  font-size: 1.3rem;
}

/* p {
  font-size: 18px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
} */

/* .modal-header {
    align-items: center
} */

/* .btn-red {
    color: white;
    background-color: #e07a5f;
    border-color: #e07a5f;
} */
</style>
