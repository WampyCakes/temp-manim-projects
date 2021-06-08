<template>
  <div
    class="modal fade"
    id="versionModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="versionModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <img
            draggable="False"
            src="../assets/manim-logo-light-background.svg"
            width="70"
            height="50"
          />
          <h5 class="modal-title">{{ manimName }}</h5>
          <strong class="latest ml-3" v-if="version == latest">latest version</strong>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="version != '3b1b'">
            <p>
              These are the links for {{ manimName }}. It can be installed
              through PyPi or Chocolatey
              <a :href="installation">(installation instructions)</a>
              or run from source from GitHub. Documentation can be
              <a :href="docs">found here.</a>
            </p>
            <div id="releases">
              <a :href="pypiRelease">PyPi release</a>
              <a :href="chocolateyRelease">Chocolatey Release</a>
              <a :href="githubRelease">GitHub Release</a>
            </div>
          </div>
          <div v-else>
            <p>
              3Blue1Brown originally made Manim, but it is no longer recommended
              to be used by most users. A fork that is more stable can be found
              at <a href="https://www.manim.community/">Manim Community.</a> If
              you would like more information on 3Blue1Brown's version,
              <a href="https://github.com/3b1b/manim">you can check here.</a></p>
              <p>
              The code for a Manim video usually requires some changes between the community version and
              3Blue1Brown's version. As this video
              was rendered using 3Blue1Brown's version, it is recommended that it also be run on 3Blue1Brown's version.
            </p>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-red" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import $ from "jquery";

export default {
  name: "ManimVersionModal",
  props: {
    version: { String, required: true },
  },
  data() {
    return {
      latest: ''
    }
  },
  created() {
    fetch("manim-versions.json")
      .then((response) => response.json())
      .then((versions) => {
        this.latest = versions[0];
      });
  },
  computed: {
    manimName() {
      return this.version == "3b1b"
        ? "3Blue1Brown's Manim"
        : `Manim Community v${this.version}`;
    },
    pypiRelease() {
      return `https://pypi.org/project/manim/${this.version}/`;
    },
    chocolateyRelease() {
      return `https://chocolatey.org/packages/manimce/${this.version}`;
    },
    githubRelease() {
      return `https://github.com/ManimCommunity/manim/releases/tag/v${this.version}`;
    },
    installation() {
      return `https://docs.manim.community/en/v${this.version}/installation.html`;
    },
    docs() {
      return `https://docs.manim.community/en/v${this.version}/`;
    },
  },
  mounted() {
    // For some reason jquery seems to be necessary for this event to be caught..
    $(document).on("hidden.bs.modal", "#versionModal", () => {
      // Makes it possible to open the modal again after it's been closed.
      this.$parent.versionClicked = false;
    });
    new Modal(document.getElementById("versionModal")).show();
  },
};
</script>

<style scoped>
#releases {
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-between;
}

a {
  color: #e07a5f;
  text-decoration: none;
}

.latest {
  border: 3px solid#81b29a;
  background-color:#81b29a;
  color: white;
  border-radius: 0.9rem;
  padding: 3px 8px 3px 8px;
  cursor: default;
}
</style>