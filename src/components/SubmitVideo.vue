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
                            <input type="text" class="form-control" aria-label="Title" v-model="title" pattern='[^"\\]{5,175}' required changes>
                            <div class="invalid-feedback">
                                Please include a title for the video that is between 5-175 characters and does not contain a <strong>\</strong> or <strong>"</strong>.
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Author</span>
                            <input type="text" class="form-control" name="author" aria-label="Author" v-model="author" pattern='[^"\\]{2,30}' required changes>
                            <div class="invalid-feedback">
                                Please include an author for the video that is between 2-30 characters and does not contain a <strong>\</strong> or <strong>"</strong>.
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Credit (optional)</span>
                            <!-- Instead of complaining about my awful regexes, how about you fix them, eh? -->
                            <!-- And then after you fix my regexes, make sure the correct data from the URL -->
                            <!-- is being passed to the data properties. Otherwise preview and the submission will break. -->
                            <input type="text" class="form-control" name="credit" placeholder="Link to your repository profile or YouTube channel" 
                            pattern='[^"\\]*\bgithub.com\b[^"\\]*|[^"\\]*\bgitlab.com\b[^"\\]*|[^"\\]*\bbitbucket.org\b[^"\\]*|[^"\\]*\byoutube.com\b[^"\\]*' aria-label="Credit" maxlength="150" v-model="credit" changes>
                            <div class="invalid-feedback">
                                The link must point to a GitHub, GitLab, or BitBucket profile or a YouTube channel.
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Video URL</span>
                            <input type="text" class="form-control"
                            placeholder="YouTube or Vimeo URL" aria-label="Video URL" pattern='[^"\\]*watch\?v=[^"\\]*|[^"\\]*\bvimeo.com/\b[0-9]*' maxlength="150" v-model="url" required changes>
                            <div class="invalid-feedback">
                                YouTube links should look like <code>https://www.youtube.com/watch?v=dQw4w9WgXcQ</code> and Vimeo links should look like
                                <code>https://vimeo.com/148751763</code>
                            </div>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text">Description</span>
                            <textarea class="form-control" id="description" aria-label="Description" placeholder="Detailed information about the video" 
                            minlength="20" maxlength="500" v-on:keyup="updateCount()" v-model="description" required changes></textarea>
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
                             aria-label="Source" maxlength="150" v-model="source" changes>
                            <div class="invalid-feedback">
                                The link must point to a GitHub, GitLab, or BitBucket repository.
                            </div>
                        </div>
                        <p>Fields, Subfields, and Tags should provide terse, relevant information about the video that will help people sort Manim videos by their specific interests.</p>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Fields</span>
                            <input type="text" class="form-control" placeholder="Mathematics, Science, Music" aria-label="Fields"
                            pattern='([^"\\,]){1,20}(, ([^"\\,]){1,20}){0,2}' v-model="fields" required changes>
                            <div class="invalid-feedback">
                                Fields must be no longer than 20 characters, be separated by commas, and cannot contain a <strong>\</strong> or <strong>"</strong>  (Max: 3 fields, Minimum: 1)
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Subfields</span>
                            <input type="text" class="form-control" placeholder="Group Theory, Cell Theory" aria-label="Subfields"
                            pattern='([^"\\,]){1,25}(, ([^"\\,]){1,25}){0,2}' v-model="subfields" required changes>
                            <div class="invalid-feedback">
                                Subfields must be no longer than 25 characters, be separated by commas, and cannot contain a <strong>\</strong> or <strong>"</strong>  (Max: 3 subfields, Minimum: 1)
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Tags</span>
                            <input type="text" class="form-control" placeholder="Nodes, Trees, Sorting" aria-label="Tags"
                            pattern='([^"\\,]){1,25}(, ([^"\\,]){1,25}){0,2}' v-model="tags" required changes>
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
                            <button type="submit" class="btn btn-primary">Preview</button>
                        </div>
                    </form>
                </div>
                <div class="carousel-item">
                    <div class="container-fluid">
                        <div class="col border p-4 d-flex flex-column position-static m-2">
                            <manim-video v-if="ready" :videoData="getData()"/>
                        </div>
                        <form class="needs-validation mr-1" novalidate>
                            <div class="form-group mb-3">
                                <input class="form-check-input" type="checkbox" id="confirm" required>
                                <label class="form-check-label" for="confirm">
                                    Everything looks good! (Accuracy, Spelling, etc.)
                                </label>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" v-on:click="edit()">Edit</button>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="carousel-item">
                    <div v-if="loading" class="spinner spinner-border m-3" role="status">
                        <span class="sr-only">Working...</span>
                    </div>
                    <div id="status"></div>
                    <div class="modal-footer">
                        <button v-if="conflict" type="button" class="btn btn-primary" v-on:click="edit()">Edit</button>
                        <button v-if="retry && loading == false" type="button" class="btn btn-primary" v-on:click="submit()">Retry</button>
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

    $(document).on('hidden.bs.modal', '#submissionModal', () => {
        if(this.submitted){
            this.title = ''
            this.url = ''
            this.description = ''
            this.source = ''
            this.fields = ''
            this.subfields = ''
            this.tags = ''
            document.getElementsByName('checkbox')[0].checked = false
            document.getElementById('current').textContent = 0
            new bootstrap.Carousel(document.querySelector('#carousel'), {interval: false}).to(0)
        }
    })

    var self = this;
    Array.prototype.slice.call(document.querySelectorAll('.needs-validation'))
        .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault()
            event.stopPropagation()
            if (!form.checkValidity())
                form.classList.add('was-validated')
            else{
                if(form.id == 'form'){
                    self.ready = true;
                    new bootstrap.Carousel(document.querySelector('#carousel'), {interval: false}).next()    
                }else {
                    self.submit();
                }
            }
        }, false)
        })
    
    Array.prototype.slice.call(document.querySelectorAll('[changes]'))
        .forEach(function (field) {
        field.addEventListener('change', () => {
            if(document.getElementById('confirm').checked)
                document.getElementById('confirm').checked = false
        }, false)
        })
  },
  data() {
    return {
        // Setting "disabled" to true will turn off the submission form after a redeploy. This is a safety feature! Don't remove.
        disabled: true,
        github_url: '',
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
        status: '',
        loading: true,
        ready: false,
        conflict: false,
        retry: false,
        submitted: false
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
      RVerify.action(function(res){
        if(res == 1){
            setTimeout(() => {
            self.modal.show()
            }, 500)
        }
      });
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
    edit() {
        this.conflict = false;
        new bootstrap.Carousel(document.querySelector('#carousel'), {interval: false}).to(0)
    },
    async submit() {
        var JSONData = {
            "date": new Date().toISOString().substring(0, 10),
            "title": this.title.trim(),
            "author": this.author.trim(),
            "credit": this.credit.trim(),
            "video_url": this.handleURL().trim(),
            "description": this.description.trim(),
            "source": this.source.trim(),
            "fields": this.fields.trim().split(', '),
            "subfields": this.subfields.trim().split(', '),
            "tags": this.tags.trim().split(', ')
        }
        let html;
        this.loading = true;
        document.getElementById('status').innerHTML = '';
        new bootstrap.Carousel(document.querySelector('#carousel'), {interval: false}).to(2)

        const response = await fetch('https://showcase.manim.workers.dev/', {
            method: 'POST',
            body: JSON.stringify(JSONData)
        }).catch((error) => {
            this.loading = false;
            this.retry = true;
            html = `<p style="font-size: 18px;font-family: Garamond, serif;">It appears that there was error while sending your video submission. You may try resubmitting your video in a little while or you can submit an issue on our <a href="${this.github_url}"> GitHub repository.</a> The error has been logged to your browser console.</p>`
            document.getElementById('status').innerHTML = html;
            console.error('Submission Error:', error);
        });
        this.loading = false;
        if(response.status == 409){
            this.conflict = true;
            html = '<p style="font-size: 18px;font-family: Garamond, serif;">Oh no! There is already a video with the same title by the same author. Please adjust.</p>'
            document.getElementById('status').innerHTML = html;
        }else if(response.status == 500){
            html = `<p style="font-size: 18px;font-family: Garamond, serif;">It appears that we had an internal error while trying to submit your video. The error has been logged for troubleshooting. You may try resubmitting your video in a little while or you can submit an issue on our <a href="${this.github_url}"> GitHub repository.</a></p>`
            document.getElementById('status').innerHTML = html;
            this.retry = true;
        }else if(response.status == 200){
            response.json().then(data => {
                html = `<p style="font-size: 18px;font-family: Garamond, serif;">Thank you for submitting your Manim video! Once it has been approved, your video will appear on the Manim Showcase within 6 hours. <a href="${data.url}"> You can view your submission here.</a> If your video does not appear on the Showcase after a while, changes may have been requested <a href="${data.url}"> here.</a> </p>`
                document.getElementById('status').innerHTML = html;
                this.submitted = true;
            })
        }
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

p {
    font-size: 18px; 
    font-family: Garamond, serif;
}

@media only screen and (max-width: 500px) {
    span, input {
        font-size: 0.75rem;
        text-overflow: ellipsis;
    }
}
</style>
