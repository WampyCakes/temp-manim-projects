<template>
  <header class="border-bottom border-dark mb-4">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" draggable="False" href="https://www.manim.community/">
        <img title="Manim Community Home" draggable="False" src="../assets/manim-logo.svg" width="75" height="75" alt="Manim Community Logo"/>
        Manim Community
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#social" aria-controls="social" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="social">
        <button type="button" class="btn btn-outline-light" v-on:click="captcha()">
          <strong>Upload Your Manim Video</strong>
        </button>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="https://docs.manim.community" class="nav-link" target="_blank" rel="noopener noreferrer">
              <button type="button" class="btn btn-outline-light">
                <i class="icon-book"></i> Documentation
              </button>
            </a>
          </li>
          <li class="nav-item">
            <a href="https://github.com/ManimCommunity/manim" class="nav-link" target="_blank">
              <button type="button" class="btn btn-outline-light">
                <i class="icon-github"></i> GitHub
              </button>
            </a>
          </li>
          <li class="nav-item">
            <a href="https://twitter.com/manim_community/" class="nav-link" target="_blank" rel="noopener noreferrer">
              <button type="button" class="btn btn-outline-light">
                <i class="icon-twitter"></i> Twitter
              </button>
            </a>
          </li>
          <li class="nav-item">
            <a href="https://discord.gg/mMRrZQW" class="nav-link" target="_blank" rel="noopener noreferrer">
              <button type="button" class="btn btn-outline-light">
                <i class="icon-discord"></i> Discord
              </button>
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/r/manim/" class="nav-link nav-item" target="_blank" rel="noopener noreferrer">
              <button type="button" class="btn btn-outline-light">
                <i class="icon-reddit"></i> Reddit
              </button>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <submit-video :value="clicked"></submit-video>
</template>

<script>
import SubmitVideo from './SubmitVideo.vue'

export default {
  name: 'Navbar',
  components: {
    SubmitVideo
  },
  data() {
    return {
      clicked: false
    }
  },
  methods: {
    captcha() {
      this.clicked = true
    }
  }
}
</script>

<style scoped>
i {
  font-size: 1.3rem;
}
/* .nav-item {
  font-family: sans-serif;
  font-size: 1rem;
  text-decoration: none;
  color: white;
  margin: 10px 10px;
  border-radius: 10px;
}

.nav-item > i {
  font-size: 1.5rem;
  color: white;
}

.nav-item:hover {
  text-decoration: none;
  background-color: white;
  color: black;
  transition: all 0.3s ease;
} */
</style>