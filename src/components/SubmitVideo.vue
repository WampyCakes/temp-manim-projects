<template>
<div class="modal fade" id="disabledModal" tabindex="-1" role="dialog" aria-labelledby="disabledModal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Video Submission Form</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <p>The video submission form has been temporarily disabled. Check back at a later time!</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="submissionModal" tabindex="-1" role="dialog" aria-labelledby="submissionModal" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <img draggable="False" src="../assets/manim-logo-light-background.svg" width="70" height="50"/>
        <h4 class="modal-title" id="myModalLabel">Video Submission Form</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="carousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <form id="form" class="needs-validation mr-1" novalidate>
                        <!-- All fields must disallow double quotes and backslashes. These are the only characters that can give JSON trouble according to some StackOverflow answers. -->
                        <!-- May be possible to accept double quotes and backslashes and automatically escape them? Haven't tried. Maybe in the future *shrug* -->
                        <div class="input-group mt-1 mb-3">
                            <span class="input-group-text">Title</span>
                            <input type="text" class="form-control" aria-label="Title" v-model="title" pattern='[^"\\]{5,175}' required>
                            <div class="invalid-feedback">
                                Please include a title for the video that is between 5-175 characters and does not contain a <strong>\</strong> or <strong>"</strong>.
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Author</span>
                            <input type="text" class="form-control" aria-label="Author" v-model="author" pattern='[^"\\]{2,30}' required>
                            <div class="invalid-feedback">
                                Please include an author for the video that is between 2-30 characters and does not contain a <strong>\</strong> or <strong>"</strong>.
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Credit (optional)</span>
                            <!-- Instead of complaining about my awful regexes, how about you fix them, eh? -->
                            <!-- And then after you fix my regexes, make sure the correct data from the URL -->
                            <!-- is being passed to the data properties. Otherwise preview and the submission will break. -->
                            <input type="text" class="form-control" placeholder="Link to repository or YouTube profile" 
                            pattern='[^"\\]*\bgithub.com\b[^"\\]*|[^"\\]*\bgitlab.com\b[^"\\]*|[^"\\]*\bbitbucket.org\b[^"\\]*|[^"\\]*\byoutube.com\b[^"\\]*' aria-label="Credit" maxlength="150" v-model="credit">
                            <div class="invalid-feedback">
                                The link must point to a GitHub, GitLab, or BitBucket profile or a YouTube channel.
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Video URL</span>
                            <input type="text" id="url" class="form-control"
                            placeholder="YouTube or Vimeo URL" aria-label="Video URL" pattern='[^"\\]*watch\?v=[^"\\]*|[^"\\]*\bvimeo.com/\b[0-9]*' maxlength="150" v-model="url" required>
                            <div class="invalid-feedback">
                                YouTube links should look like <code>https://www.youtube.com/watch?v=dQw4w9WgXcQ</code> and Vimeo links should look like
                                <code>https://vimeo.com/148751763</code>
                            </div>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text">Description</span>
                            <textarea class="form-control" id="description" aria-label="Description" placeholder="Detailed information about the video" 
                            minlength="20" maxlength="500" v-on:keyup="updateCount()" v-model="description" required></textarea>
                            <div id="descriptionChars" class="customValidation">Double quotes and backslashes are not allowed.</div>
                            <div class="invalid-feedback">
                                Please include a description of the video.
                            </div>
                        </div>
                        <div class="char-count">
                            <span id="current">0</span>
                            <span id="maximum"> / 500</span>
                        </div>
                        <p class="mt-3">While optional, we highly encourage including source code!</p>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Source Code (optional)</span>
                            <input type="text" class="form-control" placeholder="Link to the video code's repository" pattern='[^"\\]*\bgithub.com\b[^"\\]*|[^"\\]*\bgitlab.com\b[^"\\]*|[^"\\]*\bbitbucket.org\b[^"\\]*'
                             aria-label="Source" maxlength="150" v-model="source">
                            <div class="invalid-feedback">
                                The link must point to a GitHub, GitLab, or BitBucket repository.
                            </div>
                        </div>
                        <p>Fields, Subfields, and Tags should provide terse, relevant information about the video that will help people sort Manim videos by their specific interests.</p>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Fields</span>
                            <input type="text" class="form-control" placeholder="Mathematics, Science, Music" aria-label="Fields"
                            pattern='([^"\\,]){1,20}(, ([^"\\,]){1,20}){0,2}' v-model="fields" required>
                            <div class="invalid-feedback">
                                Fields must be no longer than 20 characters, be separated by commas, and cannot contain a <strong>\</strong> or <strong>"</strong>  (Max: 3 fields, Minimum: 1)
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Subfields</span>
                            <input type="text" class="form-control" placeholder="Group Theory, Cell Theory" aria-label="Subfields"
                            pattern='([^"\\,]){1,25}(, ([^"\\,]){1,25}){0,2}' v-model="subfields" required>
                            <div class="invalid-feedback">
                                Subfields must be no longer than 25 characters, be separated by commas, and cannot contain a <strong>\</strong> or <strong>"</strong>  (Max: 3 subfields, Minimum: 1)
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Tags</span>
                            <input type="text" class="form-control" placeholder="Nodes, Trees, Sorting" aria-label="Tags"
                            pattern='([^"\\,]){1,25}(, ([^"\\,]){1,25}){0,2}' v-model="tags" required>
                            <div class="invalid-feedback">
                                Tags must be no longer than 25 characters, be separated by commas, and cannot contain a <strong>\</strong> or <strong>"</strong>  (Max: 3 tags, Minimum: 1)
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <input class="form-check-input" type="checkbox" name="checkbox" id="checkbox" required>
                            <label class="form-check-label" for="checkbox">
                                I am submitting a video that is my own.
                            </label>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary" v-on:click="preview()">Preview</button>
                        </div>
                    </form>
                </div>
                <div class="carousel-item">
                    <div class="container-fluid">
                        <div class="col border p-4 d-flex flex-column position-static m-2">
                            <manim-video v-if="ready" :videoData="getData()"/>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" v-on:click="previous()">Edit</button>
                        <button type="button" class="btn btn-primary" v-on:click="submit()">Submit</button>
                    </div>
                </div>
                <div class="carousel-item">
                    <p>{{ json }}</p>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" v-on:click="previous()">Edit</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import ManimVideo from './ManimVideo.vue'
const RVerify = window.RVerify
// const bootstrap = window.bootstrap
import * as bootstrap from 'bootstrap'
import $ from 'jquery'

export default {
  name: 'SubmitVideo',
  props: {
      value: Boolean
  },
  components: {
      ManimVideo
  },
  created() {
    RVerify.configure({
      tolerance: 8,
      duration: 500,
      mask: 0.5,
      title: "Upload Your Manim Video - Captcha",
      text: "Use the slider to orient the picture upright",
      album: [
        "https://cdn.jsdelivr.net/gh/WampyCakes/temp-manim-projects/cdn/tiger.jpg",
        "https://cdn.jsdelivr.net/gh/WampyCakes/temp-manim-projects/cdn/eagle.jpg",
        "https://cdn.jsdelivr.net/gh/WampyCakes/temp-manim-projects/cdn/gosling.jpg",
        "https://cdn.jsdelivr.net/gh/WampyCakes/temp-manim-projects/cdn/kitten.jpg",
        "https://cdn.jsdelivr.net/gh/WampyCakes/temp-manim-projects/cdn/wolf.jpg",
        "https://cdn.jsdelivr.net/gh/WampyCakes/temp-manim-projects/cdn/bird.jpg",
      ]
    });
  },
  mounted() {
      document.getElementById('description').addEventListener('keypress', (e) => {
        if(e.key == '"' || e.key == '\\'){
            e.preventDefault()
            document.getElementById('descriptionChars').style.display = 'unset'
        }else
            document.getElementById('descriptionChars').style.display = 'none'
    })
  },
  data() {
    return {
        // Setting "disabled" to true will turn off the submission form after a redeploy. This is a safety feature! Don't remove.
        disabled: false,
        colors: ["#81b29a", "#454866", "#e07a5f"],
        title: '',
        author: '',
        credit: '',
        url: '',
        description: '',
        source: '',
        fields: '',
        subfields: '',
        tags: '',
        json: '',
        ready: false
    }
  },
  updated() {
    this.modal = new bootstrap.Modal(document.getElementById('submissionModal'))
    if(!this.disabled){
        if(this.$parent.clicked == true)
            this.captcha()
    }else{
        new bootstrap.Modal(document.getElementById('disabledModal')).show();
        this.$parent.clicked = false
    }
    $('[data-toggle="popover"]').popover({trigger:'hover'})
  },
  methods: {
    captcha() {
      this.$parent.clicked = false
      var self = this
      self.modal.show()
    //   RVerify.action(function(res){
    //     if(res == 1){
    //         setTimeout(() => {
    //         self.modal.show()
    //         }, 500)
    //     }
    //   });
    },
    getData() {
        return [
            new Date().toISOString().substring(0, 10),
            this.title.trim(),
            this.author.trim(),
            this.credit.trim(),
            this.handleURL().trim(),
            this.description.trim(),
            this.source.trim(),
            this.fields.trim().split(', '),
            this.subfields.trim().split(', '),
            this.tags.trim().split(', ')
            // "date": new Date().toISOString().substring(0, 10),
            // "title": this.title,
            // "author": this.author,
            // "credit": this.credit,
            // "video_url": this.url,
            // "description": this.description,
            // "source": this.source,
            // "fields": this.fields,
            // "subfields": this.subfields,
            // "tags": this.tags
        ]
    },
    handleURL() {
        if(this.url.includes('='))
            return 'https://www.youtube.com/embed/'+this.url.split('=')[1]
        else
            return 'https://player.vimeo.com/video/'+this.url.split('.com/')[1]
    },
    updateCount() {
        document.querySelector('#current').textContent = document.querySelector('#description').value.length
    },
    previous() {
        new bootstrap.Carousel(document.querySelector('#carousel'), {interval: false}).prev()
    },
    preview() {
        var forms = document.querySelectorAll('.needs-validation')
        var self = this;

        Array.prototype.slice.call(forms)
            .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault()
                event.stopPropagation()
                if (!form.checkValidity())
                    form.classList.add('was-validated')
                else{
                    self.ready = true;
                    new bootstrap.Carousel(document.querySelector('#carousel'), {interval: false}).next()
                }
            }, false)
            })
    },
    submit() {
        // var xhr = new XMLHttpRequest();
        // xhr.open("POST", 'https://showcase.manim.workers.dev/', true);
        // xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
        // xhr.send(JSON.stringify({
        //     value: data
        // }));
        // document.getElementById('form').reset()
        // document.querySelector('#current').textContent = 0
        // new bootstrap.Carousel(document.querySelector('#carousel'), {interval: false}).to(0)
        fetch('https://showcase.manim.workers.dev/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(this.getData())
            // mode: 'no-cors'
            })
            .then(response => response.json())
            .then(data => {
                this.json = data
                console.log('Success:', data);
                // document.getElementById('form').reset()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        new bootstrap.Carousel(document.querySelector('#carousel'), {interval: false}).next()
    }
  }
}
</script>

<style scoped>
.modal-header {
    align-items: center
}

.customValidation {
    display: none;
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
}

.char-count {
    float: right;
}

strong {
    font-size: 15px;
}

code {
    color: #81b29a;
    font-weight: bolder;
    white-space: nowrap
}

@media only screen and (max-width: 500px) {
    span, input {
        font-size: 0.75rem;
        text-overflow: ellipsis;
    }
}
</style>