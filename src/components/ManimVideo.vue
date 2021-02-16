<template>
  <!-- What is included in the <template> tag is what is rendered for each video. It uses the videoData prop to get the data
  for each element in the list div -->
  <div class="container-fluid pl-0 pr-0">
    <strong
      v-for="tag in videoData[10]"
      v-bind:key="tag"
      class="tags"
      v-bind:style="{
        background: colors[videoData[10].indexOf(tag)],
        borderColor: colors[videoData[10].indexOf(tag)],
      }"
    >
      {{ tag }}
    </strong>
    <strong
      class="status"
      title="This video has not been watched in its entirety by the ManimCommunity team"
      >{{ videoData[1] }}</strong
    >
  </div>
  <strong class="title m-3 text-wrap">{{ videoData[2] }}</strong>
  <strong class="mb-3 text-left"
    >By
    <!-- This should never happen, but just in case. -->
    <p class="d-inline" v-if="videoData[3] == ''">Anonymous</p>
    {{
      videoData[3]
    }}</strong>
    <!-- <a v-bind:href="videoData[5].length == 0 ? '//:0' : videoData[5]">{{
      videoData[3]
    }}</a></strong> -->
  
  <div class="embed-responsive embed-responsive-16by9">
    <iframe
      class="embed-responsive-item"
      v-bind:src="videoData[5]"
      allowfullscreen
    ></iframe>
  </div>
  <p class="description mb-auto py-3 text-center">{{ videoData[6] }}</p>
  <strong class="text-right">Made with {{ videoData[12] == '3b1b' ? "3Blue1Brown's Manim" : "ManimCommunity v"+videoData[12]}}</strong>
  <div>
    <!-- .hover-card can optionally be added to the Fields <p>. It was removed because increasing the size slightly jerks the popover farther to the right -->
    <!-- This should never happen, but just in case, include a message for no subfields -->
    <p
      class="fields btn btn-outline-light mt-3 d-flex"
      data-trigger="focus"
      data-toggle="popover"
      data-placement="right"
      title="Subfields"
      v-bind:data-content="[
        videoData[9].length == 0
          ? 'No subfields listed'
          : videoData[9].join(', '),
      ]"
    >
      Fields: {{ videoData[8].join(", ") }} ❯
    </p>
    <a class="" v-if="videoData[7] !== ''" v-bind:href="videoData[7]">
      <button
        type="button"
        class="source btn btn-outline-light hover-card mt-3"
      >
        Video source code available on GitHub
        <img
          height="45"
          width="45"
          draggable="false"
          src="../assets/github-logo.svg"
        />
      </button>
    </a>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "ManimVideo",
  props: {
    /* Takes in videoData as an Array, this Array is just the values of the JSON originally used to submit the video.
    Values were removed from keys to save space in the videos.json file by the insertion process.
    They should always appear in the same order, hence why we reference the values above using indices.
    If testing, you can console.log videoData */
    videoData: Array,
  },
  updated() {
    // Subfields are shown on a Bootstrap popover which needs enabled.
    $('[data-toggle="popover"]').popover({ trigger: "hover" });
  },
  data() {
    return {
      // The ManimCommunity colors used to style tags
      colors: ["#81b29a", "#454866", "#e07a5f"],
    };
  },
};
</script>

<style scoped>
.tags {
  border: 3px solid;
  color: #fff;
  border-radius: 0.9rem;
  padding: 3px;
  margin: 3px;
  float: left;
}

.status {
  border: 3px solid rgb(255, 117, 117);
  color: rgb(255, 117, 117);
  border-radius: 0.9rem;
  padding: 3px;
  margin: 3px;
  float: right;
  cursor: default;
}

.title {
  font-size: 20px;
  color: #000;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  /* font-family: "Courier New", monospace; */
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
  float: right;
}

a {
  color: #e07a5f;
  text-decoration: none;
}
</style>