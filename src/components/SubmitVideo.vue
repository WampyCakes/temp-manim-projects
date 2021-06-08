<template>
  <div
    class="modal fade"
    id="submissionModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="submissionModal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div id="carousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="modal-header">
                <img
                  draggable="False"
                  src="../assets/manim-logo-light-background.svg"
                  width="70"
                  height="50"
                />
                <h4 class="modal-title">Login Information</h4>
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
                <p class="stylized-p">
                  In order to submit your work to the Manim Showcase, you must
                  login with GitHub. This enables us to run the Showcase as a
                  small community-maintained project with the user features
                  you'd expect.
                  <strong class="stylized-p"
                    >You will not be required to login until after you have
                    filled out the submission form.</strong
                  >
                </p>
                <p class="stylized-p">
                  When authorizing the Manim Showcase to act on behalf of your
                  GitHub account, we ask for the most restrictive permissions we
                  can. GitHub's most restrictive permission set grants broader
                  access than we will ever use. We will never touch your
                  repositories or store information from GitHub outside what is
                  required for the OAuth flow,
                  <strong class="stylized-p">ever.</strong> The only action we
                  will take for you is interacting with the official Manim
                  Showcase repository. If you would like to revoke access after
                  submitting your work,
                  <a
                    href="https://github.com/settings/connections/applications/84d5919b313ea4acaf44"
                    >you may do so here.</a
                  >
                </p>
                <p class="stylized-p">We appreciate your understanding.</p>
                <div class="modal-footer">
                  <button type="button" class="btn" data-dismiss="modal">
                    Close
                  </button>
                  <button type="button" class="btn" v-on:click="next()">
                    Continue
                  </button>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="modal-header">
                <img
                  draggable="False"
                  src="../assets/manim-logo-light-background.svg"
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
              <div class="modal-body">
                <form id="form" class="needs-validation mr-1" novalidate>
                  <!-- All fields must disallow double quotes and backslashes. These are the only characters that can give JSON trouble according to some StackOverflow answers.
                        May be possible to accept double quotes and backslashes and automatically escape them? Haven't tried. Maybe in the future *shrug* -->
                  <div class="input-group mt-1 mb-3">
                    <span class="input-group-text">Title</span>
                    <input
                      type="text"
                      class="form-control"
                      aria-label="Title"
                      v-model="title"
                      pattern='[^"\\]{5,175}'
                      required
                    />
                    <div class="invalid-feedback">
                      Please include a title for the video that is between 5-175
                      characters and does not contain a <strong>\</strong> or
                      <strong>"</strong>.
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text">Author</span>
                    <input
                      type="text"
                      class="form-control"
                      name="author"
                      aria-label="Author"
                      v-model="author"
                      pattern='[^"\\]{2,30}'
                      required
                    />
                    <div class="invalid-feedback">
                      Please include an author for the video that is between
                      2-30 characters and does not contain a
                      <strong>\</strong> or <strong>"</strong>.
                    </div>
                  </div>
                  <!-- <div class="input-group mb-3">
                    <span class="input-group-text"
                      >GitHub username (optional)</span
                    >
                    <input
                      type="text"
                      class="form-control"
                      name="gh_username"
                      aria-label="GitHub username"
                      v-model="gh_user"
                      pattern='[^"\\]{2,30}'
                      placeholder="Your GitHub username is required to edit this video in the future"
                    />
                    <div class="invalid-feedback">invalid github usernmae</div>
                  </div> -->
                  <!-- <div class="input-group mb-3">
                    <span class="input-group-text">Credit (optional)</span>
                    <input
                      type="text"
                      class="form-control"
                      name="credit"
                      placeholder="Link to your repository profile or YouTube channel"
                      pattern='[^"\\]*\bgithub.com\b[^"\\]*|[^"\\]*\bgitlab.com\b[^"\\]*|[^"\\]*\bbitbucket.org\b[^"\\]*|[^"\\]*\byoutube.com\b[^"\\]*'
                      aria-label="Credit"
                      maxlength="150"
                      v-model="credit"
                    />
                    <div class="invalid-feedback">
                      The link must point to a GitHub, GitLab, or BitBucket
                      profile or a YouTube channel.
                    </div>
                  </div> -->
                  <div class="form-group mb-3">
                    <input
                      class="form-check-input"
                      style="height: 18px"
                      type="checkbox"
                      name="credit"
                      id="credit"
                      v-model="credit"
                      checked
                    />
                    <label class="form-check-label" for="credit">
                      Display a link to my GitHub profile
                    </label>
                  </div>
                  <div class="input-group mb-3">
                    <!-- Instead of complaining about my awful regexes, how about you fix them, eh?
                    And then after you fix my regexes, make sure the correct data from the URL
                    is being passed to the data properties. Otherwise preview and the submission will break. -->
                    <!-- Older, crappier regex [^"\\]*watch\?v=[^"\\]*|[^"\\]*\bvimeo.com/\b[0-9]* -->
                    <!-- https://regex101.com/r/ymwi2n/1 -->
                    <span class="input-group-text">Video URL</span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="YouTube or Vimeo URL"
                      aria-label="Video URL"
                      pattern='^(?:https:\/\/)(?:www\.)?(?:youtube\.com\/watch\?v=([^&\n]+)|vimeo.com\/([a-zA-Z\d]+))$'
                      maxlength="150"
                      v-model="url"
                      required
                    />
                    <div class="invalid-feedback">
                      YouTube links should look like
                      <code>https://www.youtube.com/watch?v=dQw4w9WgXcQ</code>
                      and Vimeo links should look like
                      <code>https://vimeo.com/148751763</code>
                    </div>
                  </div>
                  <div class="input-group">
                    <span class="input-group-text">Description</span>
                    <textarea
                      class="form-control"
                      id="description"
                      aria-label="Description"
                      placeholder="Detailed information about the video. You may include links to further information on the topic(s)."
                      minlength="20"
                      maxlength="500"
                      v-on:keyup="updateCount()"
                      v-model="description"
                      style="background-image: none !important"
                      required
                    ></textarea>
                    <div id="descriptionChars" class="customValidation">
                      Double quotes and backslashes are not allowed.
                    </div>
                    <div class="invalid-feedback">
                      Please include a description of the video.
                    </div>
                  </div>
                  <div class="char-count">
                    <span id="current">0</span>
                    <span id="maximum"> / 500</span>
                  </div>
                  <!-- <p class="mt-3">While optional, we highly encourage including source code!</p> -->
                  <div class="input-group mb-3">
                    <span class="input-group-text">Source Code (optional)</span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="While optional, we highly encourage including a link to source code!"
                      pattern='[^"\\]*\bgithub.com\b[^"\\]*|[^"\\]*\bgitlab.com\b[^"\\]*|[^"\\]*\bbitbucket.org\b[^"\\]*'
                      aria-label="Source"
                      maxlength="150"
                      v-model="source"
                    />
                    <div class="invalid-feedback">
                      The link must point to a GitHub, GitLab, or BitBucket
                      repository.
                    </div>
                  </div>
                  <p class="stylized-p">
                    Fields, Subfields, and Tags should provide terse, relevant
                    information about the video that will help people sort Manim
                    videos by their specific interests.
                  </p>
                  <div class="input-group mb-3">
                    <span class="input-group-text">Fields</span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Mathematics, Science, Music"
                      aria-label="Fields"
                      pattern='([^"\\,]){1,20}(, ([^"\\,]){1,20}){0,2}'
                      v-model="fields"
                      required
                    />
                    <div class="invalid-feedback">
                      Fields must be no longer than 20 characters, be separated
                      by commas, and cannot contain a <strong>\</strong> or
                      <strong>"</strong> (Max: 3 fields, Minimum: 1)
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text">Subfields</span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Group Theory, Cell Theory"
                      aria-label="Subfields"
                      pattern='([^"\\,]){1,25}(, ([^"\\,]){1,25}){0,2}'
                      v-model="subfields"
                      required
                    />
                    <div class="invalid-feedback">
                      Subfields must be no longer than 25 characters, be
                      separated by commas, and cannot contain a
                      <strong>\</strong> or <strong>"</strong> (Max: 3
                      subfields, Minimum: 1)
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text">Tags</span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Nodes, Trees, Sorting"
                      aria-label="Tags"
                      pattern='([^"\\,]){1,25}(, ([^"\\,]){1,25}){0,2}'
                      v-model="tags"
                      required
                    />
                    <div class="invalid-feedback">
                      Tags must be no longer than 25 characters, be separated by
                      commas, and cannot contain a <strong>\</strong> or
                      <strong>"</strong> (Max: 3 tags, Minimum: 1)
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text">Video Language</span>
                    <select
                      id="languages"
                      class="form-control"
                      v-model="language"
                      style="background-image: none !important"
                    >
                      <option value="af">Afrikaans</option>
                      <option value="sq">Albanian - shqip</option>
                      <option value="am">Amharic - አማርኛ</option>
                      <option value="ar">Arabic - العربية</option>
                      <option value="an">Aragonese - aragonés</option>
                      <option value="hy">Armenian - հայերեն</option>
                      <option value="ast">Asturian - asturianu</option>
                      <option value="az">Azerbaijani - azərbaycan dili</option>
                      <option value="eu">Basque - euskara</option>
                      <option value="be">Belarusian - беларуская</option>
                      <option value="bn">Bengali - বাংলা</option>
                      <option value="bs">Bosnian - bosanski</option>
                      <option value="br">Breton - brezhoneg</option>
                      <option value="bg">Bulgarian - български</option>
                      <option value="ca">Catalan - català</option>
                      <option value="ckb">
                        Central Kurdish - کوردی (دەستنوسی عەرەبی)
                      </option>
                      <option value="zh-HK">
                        Chinese (Hong Kong) - 中文（香港）
                      </option>
                      <option value="zh-CN">
                        Chinese (Simplified) - 中文（简体）
                      </option>
                      <option value="zh-TW">
                        Chinese (Traditional) - 中文（繁體）
                      </option>
                      <option value="co">Corsican</option>
                      <option value="hr">Croatian - hrvatski</option>
                      <option value="cs">Czech - čeština</option>
                      <option value="da">Danish - dansk</option>
                      <option value="nl">Dutch - Nederlands</option>
                      <option value="en" selected="selected">English</option>
                      <option value="eo">Esperanto - esperanto</option>
                      <option value="et">Estonian - eesti</option>
                      <option value="fo">Faroese - føroyskt</option>
                      <option value="fil">Filipino</option>
                      <option value="fi">Finnish - suomi</option>
                      <option value="fr">French - français</option>
                      <option value="gl">Galician - galego</option>
                      <option value="ka">Georgian - ქართული</option>
                      <option value="de">German - Deutsch</option>
                      <option value="el">Greek - Ελληνικά</option>
                      <option value="gn">Guarani</option>
                      <option value="gu">Gujarati - ગુજરાતી</option>
                      <option value="ha">Hausa</option>
                      <option value="haw">Hawaiian - ʻŌlelo Hawaiʻi</option>
                      <option value="he">Hebrew - עברית</option>
                      <option value="hi">Hindi - हिन्दी</option>
                      <option value="hu">Hungarian - magyar</option>
                      <option value="is">Icelandic - íslenska</option>
                      <option value="id">Indonesian - Indonesia</option>
                      <option value="ia">Interlingua</option>
                      <option value="ga">Irish - Gaeilge</option>
                      <option value="it">Italian - italiano</option>
                      <option value="ja">Japanese - 日本語</option>
                      <option value="kn">Kannada - ಕನ್ನಡ</option>
                      <option value="kk">Kazakh - қазақ тілі</option>
                      <option value="km">Khmer - ខ្មែរ</option>
                      <option value="ko">Korean - 한국어</option>
                      <option value="ku">Kurdish - Kurdî</option>
                      <option value="ky">Kyrgyz - кыргызча</option>
                      <option value="lo">Lao - ລາວ</option>
                      <option value="la">Latin</option>
                      <option value="lv">Latvian - latviešu</option>
                      <option value="ln">Lingala - lingála</option>
                      <option value="lt">Lithuanian - lietuvių</option>
                      <option value="mk">Macedonian - македонски</option>
                      <option value="ms">Malay - Bahasa Melayu</option>
                      <option value="ml">Malayalam - മലയാളം</option>
                      <option value="mt">Maltese - Malti</option>
                      <option value="mr">Marathi - मराठी</option>
                      <option value="mn">Mongolian - монгол</option>
                      <option value="ne">Nepali - नेपाली</option>
                      <option value="no">Norwegian - norsk</option>
                      <option value="oc">Occitan</option>
                      <option value="or">Oriya - ଓଡ଼ିଆ</option>
                      <option value="om">Oromo - Oromoo</option>
                      <option value="ps">Pashto - پښتو</option>
                      <option value="fa">Persian - فارسی</option>
                      <option value="pl">Polish - polski</option>
                      <option value="pt">Portuguese - português</option>
                      <option value="pa">Punjabi - ਪੰਜਾਬੀ</option>
                      <option value="qu">Quechua</option>
                      <option value="ro">Romanian - română</option>
                      <option value="rm">Romansh - rumantsch</option>
                      <option value="ru">Russian - русский</option>
                      <option value="gd">Scottish Gaelic</option>
                      <option value="sr">Serbian - српски</option>
                      <option value="sh">
                        Serbo-Croatian - Srpskohrvatski
                      </option>
                      <option value="sn">Shona - chiShona</option>
                      <option value="sd">Sindhi</option>
                      <option value="si">Sinhala - සිංහල</option>
                      <option value="sk">Slovak - slovenčina</option>
                      <option value="sl">Slovenian - slovenščina</option>
                      <option value="so">Somali - Soomaali</option>
                      <option value="st">Southern Sotho</option>
                      <option value="es">Spanish - español</option>
                      <option value="su">Sundanese</option>
                      <option value="sw">Swahili - Kiswahili</option>
                      <option value="sv">Swedish - svenska</option>
                      <option value="tg">Tajik - тоҷикӣ</option>
                      <option value="ta">Tamil - தமிழ்</option>
                      <option value="tt">Tatar</option>
                      <option value="te">Telugu - తెలుగు</option>
                      <option value="th">Thai - ไทย</option>
                      <option value="ti">Tigrinya - ትግርኛ</option>
                      <option value="to">Tongan - lea fakatonga</option>
                      <option value="tr">Turkish - Türkçe</option>
                      <option value="tk">Turkmen</option>
                      <option value="tw">Twi</option>
                      <option value="uk">Ukrainian - українська</option>
                      <option value="ur">Urdu - اردو</option>
                      <option value="ug">Uyghur</option>
                      <option value="uz">Uzbek - o‘zbek</option>
                      <option value="vi">Vietnamese - Tiếng Việt</option>
                      <option value="wa">Walloon - wa</option>
                      <option value="cy">Welsh - Cymraeg</option>
                      <option value="fy">Western Frisian</option>
                      <option value="xh">Xhosa</option>
                      <option value="yi">Yiddish</option>
                      <option value="yo">Yoruba - Èdè Yorùbá</option>
                      <option value="zu">Zulu - isiZulu</option>
                    </select>
                    <span class="input-group-text ml-1">Manim Version</span>
                    <select
                      id="versions"
                      class="form-control"
                      v-model="version"
                      style="background-image: none !important"
                      required
                    >
                      <option value="" disabled selected>
                        Select the version that rendered this video
                      </option>
                      <option value="3b1b">3Blue1Brown version</option>
                    </select>
                  </div>
                  <div class="form-group mb-3">
                    <input
                      class="form-check-input"
                      style="height: 18px"
                      type="checkbox"
                      name="checkbox"
                      id="checkbox"
                      required
                    />
                    <label class="form-check-label text-left" for="checkbox">
                      I am submitting a video that is my own and understand that
                      all of this information will be publicly available.
                    </label>
                  </div>
                  <div class="modal-footer">
                    <button type="submit" class="btn">Preview</button>
                  </div>
                </form>
              </div>
            </div>
            <div class="carousel-item">
              <div class="modal-header">
                <img
                  draggable="False"
                  src="../assets/manim-logo-light-background.svg"
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
              <div class="modal-body">
                <div class="container-fluid">
                  <div
                    class="col border p-4 d-flex flex-column position-static m-2"
                  >
                    <manim-video v-if="ready" :videoData="getData(false)" :showVersionModal="false"/>
                  </div>
                  <!-- <form class="needs-validation mr-1" novalidate>
                            <div class="form-group mb-3">
                                <input class="form-check-input" type="checkbox" id="confirm" required>
                                <label class="form-check-label" for="confirm">
                                    Everything looks good! (Accuracy, Spelling, etc.)
                                </label>
                            </div>
                        </form> -->
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn" v-on:click="edit()">
                    Edit
                  </button>
                  <button type="submit" class="btn" v-on:click="submit()">
                    <i class="icon-github"></i> Submit
                  </button>
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="modal-header">
                <img
                  draggable="False"
                  src="../assets/manim-logo-light-background.svg"
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
              <div
                v-if="loading"
                class="spinner spinner-border m-3"
                role="status"
              >
                <span class="sr-only">Working...</span>
              </div>
              <div id="status"></div>
              <div class="modal-footer">
                <button
                  v-if="conflict"
                  type="button"
                  class="btn"
                  v-on:click="edit()"
                >
                  Edit
                </button>
                <button
                  v-if="retry && loading == false"
                  type="button"
                  class="btn"
                  v-on:click="submit()"
                >
                  Retry
                </button>
                <button type="button" class="btn" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ManimVideo from "./ManimVideo.vue";
const RVerify = window.RVerify;
const crypto = require("crypto");
// const bootstrap = window.bootstrap
// import * as bootstrap from 'bootstrap'
import { Modal, Carousel } from "bootstrap";
import $ from "jquery";

export default {
  name: "SubmitVideo",
  props: {
    showForm: { Boolean, required: true },

    // formData: Object
    // authCode: String
  },
  components: {
    ManimVideo,
  },
  watch: {
    showForm: function (newValue) {
      if (newValue == true) {
        this.modal = new Modal(document.getElementById("submissionModal"));
        this.modal.show();
      }
    },
  },
  created() {
    // console.log(window.location.toString().includes('code'));
    fetch("manim-versions.json")
      .then((response) => response.json())
      .then((versions) => {
        var versionsDropdown = document.getElementById("versions");
        for (const version of versions) {
          versionsDropdown.options.add(
            new Option(`Manim Community v${version}`, version, false)
          );
        }
      });

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
  },
  mounted() {
    // Don't allow double quotes or backslashes in the description so that we don't mess up our char counter.
    document.getElementById("description").addEventListener("keypress", (e) => {
      if (e.key == '"' || e.key == "\\") {
        e.preventDefault();
        document.getElementById("descriptionChars").style.display = "unset";
      } else document.getElementById("descriptionChars").style.display = "none";
    });

    // Reset most form values on submission so that you can submit another video
    // For some reason jquery seems to be necessary for this event to be caught..
    $(document).on("hidden.bs.modal", "#submissionModal", () => {
      // Makes it possible to open the modal again after it's been closed.
      this.$parent.submissionForm = false;
      if (this.submitted) {
        this.title = "";
        this.url = "";
        this.description = "";
        this.source = "";
        this.fields = "";
        this.subfields = "";
        this.tags = "";
        this.version = "";
        document.getElementsByName("checkbox")[0].checked = false;
        document.getElementById("current").textContent = 0;
        new Carousel(document.querySelector("#carousel"), {
          interval: false,
        }).to(0);
      }
    });

    var self = this;
    Array.prototype.slice
      .call(document.querySelectorAll(".needs-validation"))
      .forEach(function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (!form.checkValidity()) form.classList.add("was-validated");
            else {
              if (form.id == "form") {
                self.ready = true;
                new Carousel(document.querySelector("#carousel"), {
                  interval: false,
                }).next();
              } /*else {
                    self.submit();
                }*/
            }
          },
          false
        );
      });

    // document.getElementById('form').addEventListener('change', () => {
    //   this.$parent.formData = this.getData(true);//$emit('formUpdate', this.getData(true));
    // })

    // Array.prototype.slice.call(document.querySelectorAll('[changes]'))
    //     .forEach(function (field) {
    //     field.addEventListener('change', () => {
    //         if(document.getElementById('confirm').checked)
    //             document.getElementById('confirm').checked = false
    //     }, false)
    //     })
  },
  data() {
    return {
      github_url: "",
      colors: ["#81b29a", "#454866", "#e07a5f"],
      title: "",
      author: "",
      // gh_user: "",
      credit: true,
      url: "",
      description: "",
      source: "",
      fields: "",
      subfields: "",
      tags: "",
      language: "en",
      version: "",
      status: "",
      loading: true,
      ready: false,
      conflict: false,
      retry: false,
      submitted: false,
    };
  },
  updated() {
    // this.modal = new Modal(document.getElementById('submissionModal'))
    // this.modal.show();
    // if(!this.disabled){
    //     if(this.$parent.clicked == true)
    //         this.captcha()
    // }else{
    //     new Modal(document.getElementById('disabledModal')).show();
    //     this.$parent.clicked = false
    // }
    $('[data-toggle="popover"]').popover({ trigger: "hover" });
  },
  methods: {
    // captcha() {
    //   this.$parent.clicked = false
    //   var self = this
    //   RVerify.action(function(res){
    //     if(res == 1){
    //         setTimeout(() => {
    //         self.modal.show()
    //         }, 500)
    //     }
    //   });
    // },
    getData(keys) {
      var JSONData = {
        date: new Date().toISOString().substring(0, 10),
        state: "unreviewed",
        title: this.title.trim(),
        author: this.author.trim(),
        // github_user: this.gh_user.trim(),
        credit: this.credit,
        video_url: this.handleURL().trim(),
        description: this.description.trim(),
        source: this.source.trim(),
        fields: this.fields.trim().split(", "),
        subfields: this.subfields.trim().split(", "),
        tags: this.tags.trim().split(", "),
        language: this.language.trim(),
        version: this.version.trim(),
      };
      if (keys) return JSONData;
      else return Object.values(JSONData);
    },
    handleURL() {
      if (this.url.includes("="))
        return "https://www.youtube.com/embed/" + this.url.split("=")[1];
      else
        return "https://player.vimeo.com/video/" + this.url.split(".com/")[1];
    },
    updateCount() {
      document.querySelector("#current").textContent = document.querySelector(
        "#description"
      ).value.length;
    },
    next() {
      new Carousel(document.querySelector("#carousel"), {
        interval: false,
      }).next();
    },
    edit() {
      this.conflict = false;
      new Carousel(document.querySelector("#carousel"), { interval: false }).to(
        1
      );
    },
    async submit() {
      let html;
      this.loading = true;
        document.getElementById("status").innerHTML = "";
        new Carousel(document.querySelector("#carousel"), { interval: false }).to(
          3
        );
      var self = this;
      this.modal.hide();
      RVerify.action(function (result) {
        if (result == 1) {
          setTimeout(async () => {
            self.modal.show();
            const response = await fetch("https://showcase.manim.workers.dev/", {
              method: "POST",
              body: JSON.stringify(self.getData(true)),
              credentials: 'include'
            }).catch((error) => {
              self.loading = false;
              document.getElementById("status").style.display = "unset";
              self.retry = true;
              html = `<p style="font-size: 18px;font-family: Garamond, serif; margin-bottom: 0;">It appears that there was an error while sending your video submission. You may try resubmitting your video in a little while or you can submit an issue on our <a href="${self.github_url}"> GitHub repository.</a> The error has been logged to your browser console.</p>`;
              document.getElementById("status").innerHTML = html;
              console.error("Submission Error:", error);
            });
            self.loading = false;
            document.getElementById("status").style.display = "unset";
            if (response.status == 409) {
              self.conflict = true;
              html =
                '<p style="font-size: 18px;font-family: Garamond, serif; margin-bottom: 0;">Oh no! There is already a video with the same title by the same author. Please adjust.</p>';
              document.getElementById("status").innerHTML = html;
            } else if (response.status == 400){
                response.json().then((data) => {
                  if(data.extraInfo == "Taken"){
                    html = `<p style="font-size: 18px;font-family: Garamond, serif; margin-bottom: 0;">Oh no! It appears this author name is taken already. Please adjust.</p>`;
                  }else{
                    html = `<p style="font-size: 18px;font-family: Garamond, serif; margin-bottom: 0;">Oh no! It appears you have used a different author name in the past. Please change it to the one you used previously (${data.extraInfo}).</p>`;
                  }
                  self.conflict = true;
                  self.retry = false;
                  document.getElementById("status").innerHTML = html;
                });
            } else if (response.status == 500) {
              response.json().then((data) => {
                if(data.extraInfo == 'Login'){
                  self.modal.hide();
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
                  html = `<p style="font-size: 18px;font-family: Garamond, serif; margin-bottom: 0;">It appears that GitHub was down when we made our request. You may try resubmitting your video in a little while.</a></p>`;
                  document.getElementById("status").innerHTML = html;
                }else{
                  html = `<p style="font-size: 18px;font-family: Garamond, serif; margin-bottom: 0;">It appears that we had an internal error while trying to submit your video. The error has been logged for troubleshooting. You may try resubmitting your video in a little while or you can submit an issue on our <a href="${self.github_url}"> GitHub repository.</a></p>`;
                  document.getElementById("status").innerHTML = html;
                }
              });
              self.retry = true;
            } else if (response.status == 200) {
              response.json().then((data) => {
                html = `<p style="font-size: 18px;font-family: Garamond, serif; margin-bottom: 0;">Thank you for submitting your Manim video! Once it has been approved, your video will appear on the Manim Showcase within 6 hours. <a href="${data.extraInfo}"> You can view your submission here.</a> If your video does not appear on the Showcase after a while, changes may have been requested <a href="${data.extraInfo}"> here.</a> </p>`;
                document.getElementById("status").innerHTML = html;
                self.submitted = true;
                document.getElementById("form").classList.remove("was-validated");
              });
            }
            // let state = encodeURIComponent(
            //   crypto.randomBytes(16).toString("base64")
            // );
            // sessionStorage.setItem("state", state);
            // sessionStorage.setItem("data", JSON.stringify(self.getData(true)));
            // window.location.replace(
            //   `https://github.com/login/oauth/authorize?client_id=84d5919b313ea4acaf44&scope=public_repo&state=${encodeURIComponent(
            //     state
            //   )}`
            // );
          }, 500);
        }
      });
      // const response = await fetch("https://showcase.manim.workers.dev/", {
      //   method: "POST",
      //   body: JSON.stringify(this.getData(true)),
      // }).catch((error) => {
      //   this.loading = false;
      //   this.retry = true;
      //   html = `<p style="font-size: 18px;font-family: Garamond, serif;">It appears that there was an error while sending your video submission. You may try resubmitting your video in a little while or you can submit an issue on our <a href="${this.github_url}"> GitHub repository.</a> The error has been logged to your browser console.</p>`;
      //   document.getElementById("status").innerHTML = html;
      //   console.error("Submission Error:", error);
      // });
      // this.loading = false;
      // if (response.status == 409) {
      //   this.conflict = true;
      //   html =
      //     '<p style="font-size: 18px;font-family: Garamond, serif;">Oh no! There is already a video with the same title by the same author. Please adjust.</p>';
      //   document.getElementById("status").innerHTML = html;
      // } else if (response.status == 500) {
      //   html = `<p style="font-size: 18px;font-family: Garamond, serif;">It appears that we had an internal error while trying to submit your video. The error has been logged for troubleshooting. You may try resubmitting your video in a little while or you can submit an issue on our <a href="${this.github_url}"> GitHub repository.</a></p>`;
      //   document.getElementById("status").innerHTML = html;
      //   this.retry = true;
      // } else if (response.status == 200) {
      //   response.json().then((data) => {
      //     html = `<p style="font-size: 18px;font-family: Garamond, serif;">Thank you for submitting your Manim video! Once it has been approved, your video will appear on the Manim Showcase within 6 hours. <a href="${data.url}"> You can view your submission here.</a> If your video does not appear on the Showcase after a while, changes may have been requested <a href="${data.url}"> here.</a> </p>`;
      //     document.getElementById("status").innerHTML = html;
      //     this.submitted = true;
      //     document.getElementById("form").classList.remove("was-validated");
      //   });
      // }
    },
  },
};
</script>

<style scoped>
#status {
  display: none;
  padding: 1rem;
}

.modal-header {
  align-items: center;
}

.form-check-input {
  margin-left: auto;
}

.form-check-label {
  margin-left: 1.25rem;
}

.input-group-text {
  color: white !important;
  background-color: #343a40 !important;
  border: 1px solid #343a40 !important;
  border-radius: 0;
}

.btn {
  color: white;
  background-color: #e07a5f;
  border-color: #e07a5f;
}

.customValidation {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}

.char-count {
  float: right;
}

.stylized-p {
  font-size: 18px;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}

strong {
  font-size: 15px;
}

code {
  color: #81b29a;
  font-weight: bolder;
  white-space: nowrap;
}

p {
  font-size: 18px;
  font-family: Garamond, serif;
}

@media only screen and (max-width: 500px) {
  span,
  input {
    font-size: 0.75rem;
    text-overflow: ellipsis;
  }
}
</style>
