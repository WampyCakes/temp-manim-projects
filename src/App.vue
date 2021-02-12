<template>
  <!-- <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
    integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=="
    crossorigin="anonymous"
  /> -->
  <website-header/>
  <website-body/>
  <website-footer/>
</template>

<script>
import WebsiteHeader from './components/WebsiteHeader.vue'
import WebsiteBody from './components/WebsiteBody.vue'
import WebsiteFooter from './components/WebsiteFooter.vue'

export default {
  name: 'App',
  components: {
    WebsiteHeader,
    WebsiteBody,
    WebsiteFooter
  },
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
  /* margin-top: 60px; */
}
</style>
