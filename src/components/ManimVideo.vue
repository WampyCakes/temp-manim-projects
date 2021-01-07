<template>
  <div class="container-fluid pl-0">
    <strong v-for="tag in videoData[9]" v-bind:key="tag" class="tags" 
    v-bind:style="{background: colors[videoData[9].indexOf(tag)], borderColor: colors[videoData[9].indexOf(tag)]}">
      {{ tag }}
    </strong>
  </div>
  <strong class="title m-3 text-wrap">{{ videoData[1] }}</strong>
  <strong class="mb-3 text-left">By <p class="d-inline" v-if="videoData[2] == ''">Anonymous</p> <a v-bind:href="videoData[3]">{{ videoData[2] }}</a></strong>
  <div class="embed-responsive embed-responsive-16by9">
    <iframe class="embed-responsive-item" v-bind:src="videoData[4]" allowfullscreen></iframe>
  </div>
  <p class="description mb-auto py-3 text-center">{{ videoData[5] }}</p>
  <div>
    <!-- .hover-card can optionally be added to the Fields <p>. It was removed because increasing the size slightly jerks the popover farther to the right -->
    <p class="fields btn btn-outline-light mt-3 d-flex"
      data-trigger="focus" data-toggle="popover" data-placement="right" title="Subfields" v-bind:data-content="[videoData[8].length == 0 ? 'No subfields listed' : videoData[8]
      .join(', ')]">Fields: {{ videoData[7].join(', ') }} ❯ </p>
    <a class="" v-if="videoData[6] !== ''" v-bind:href="videoData[6]">
      <button type="button" class="source btn btn-outline-light hover-card mt-3">
        Video source code available on GitHub <img height="45" width="45" draggable="false" src="../assets/github-logo.svg">
      </button>
    </a>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'ManimVideo',
  props: {
    videoData: Array
  },
  updated() {
    $('[data-toggle="popover"]').popover({trigger:'hover'})
  },
  data() {
    return{
      colors: ["#81b29a", "#454866", "#e07a5f"]
    }
  }
}
</script>

<style scoped>
.tags {
  border: 3px solid; 
  color: #fff; 
  border-radius: .9rem; 
  padding: 3px; 
  margin: 3px; 
  float: left
}

.title {
  font-size: 20px; 
  color: #000; 
  font-family: 'Courier New', monospace;
}

.description {
  font-size: 20px; 
  font-family: Garamond, serif;
}

.fields {
  align-items: center; 
  background: white; 
  color: black; 
  float: left; 
  /* 57px is the height of the source code button when the viewport is large.
  This needs to be dynamically set. It isn't right now. */
  height: 57px; 
  box-shadow: 0 4px 6px 0 rgba(22, 22, 26, 0.18); 
  cursor: pointer;
}

.source {
  background: white;
  color: black; 
  float: right
}

a {
  color: #e07a5f;
  text-decoration: none;
}
</style>