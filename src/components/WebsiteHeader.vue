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
        ManimCommunity
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
        <!-- <button
          type="button"
          class="btn btn-outline-light"
          v-on:click="captcha()"
        > -->
        <a
          href="https://github.com/login/oauth/authorize?client_id=84d5919b313ea4acaf44&scope=public_repo"
        >
          <button type="button" class="btn btn-outline-light">
            <strong>Upload Your Manim Video</strong>
          </button>
        </a>
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
  <!-- See explanation for :value="clicked" later in this file -->
  <!-- <submit-video :value="clicked"></submit-video> -->
</template>

<script>
// import SubmitVideo from "./SubmitVideo.vue";

export default {
  name: "WebsiteHeader",
  // components: {
  //   SubmitVideo,
  // },
  /* Because Vue allows breaking parts of a website up into components, we store the entirety of our Navbar here, but the
  "Submit a Manim Video" button is located in the Navbar. Because we want the submission form to be its own component,
  we have to trigger the SubmitVideo to show on the screen when the button is clicked. The SubmitVideo component
  waits for clicked to be true and then becomes visible. */
  data() {
    return {
      clicked: false,
    };
  },
  methods: {
    captcha() {
      this.clicked = true;
    },
  },
};
</script>

<style scoped>
i {
  font-size: 1.3rem;
}
</style>