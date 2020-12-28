<template>
  <!-- <iframe src="https://grand-auspicious-plough.glitch.me/" frameborder="0"></iframe> -->
  <button v-on:click="captcha()">Yee</button>
  <div id="list" class="container-fluid">
    <div v-for="item in grid().value()" class="row flex-md-row mb-4 h-md-250 position-relative" v-bind:key="item">
      <div v-for="project in item" class="col border rounded shadow-lg p-4 d-flex flex-column position-static m-2" v-bind:key="project">
        <div class="container-fluid pl-0">
          <strong v-for="tag in project[8]" v-bind:key="tag" style="border: 3px solid; color: #fff; border-radius: .9rem; padding: 3px; margin: 3px; float: left" 
          v-bind:style="{background: colors[project[8].indexOf(tag)], borderColor: colors[project[8].indexOf(tag)]}">
          {{ tag }}
          </strong>
        </div>
        <strong class="m-3 text-wrap" style="font-size: 20px; color: #000; font-style: italic">{{ project[0] }}</strong>
        <strong class="mb-3 text-left">By <p class="d-inline" v-if="project[1] == ''">Anonymous</p> {{ project[1] }}</strong>
        <div class="embed-responsive embed-responsive-16by9">
          <!-- <iframe class="embed-responsive-item" v-bind:src="project[2]" allowfullscreen></iframe> -->
        </div>
        <p class="mb-auto py-3 ml-5 text-left">{{ project[5] }}</p>
        <div>
          <p tabindex="0" class="btn btn-outline-light hover-card mt-4 d-flex" style="align-items: center; background: white; color: black; float: left"
          data-trigger="focus" data-toggle="popover" data-placement="right" title="Subfields" v-bind:data-content="[project[7].length === 0 ? 'No subfields listed' : project[7]
          .join(', ')]">Fields: {{ project[6].join(', ') }} ❯ </p>
          <a class="" v-if="project[3] !== ''" v-bind:href="project[3]">
            <button type="button" class="btn btn-outline-light hover-card mt-3" style="background: white; color: black; float: right">
              Video source code available on GitHub <img height="45" width="45" draggable="false" src="../assets/github-logo.svg">
            </button>
          </a>
        </div>
      </div>
      <div v-if="item.length == 1" class="col m-2"></div>
    </div>
  </div>
  <div v-if="numberOfPages > 1" class="pageHolder">
    <div v-on:click="previous()" class="arrow hover" v-if="currentPage > 1">←</div>
    <div v-on:click="changePage(page)" v-for="page in pageNumbers" v-bind:key="page" v-bind:class="{'pageNumber': (page != '...'), 'ellipsis': (page == '...' || page == '..'), 'hover': (page != currentPage), 'activePageNumber': (page == currentPage)}" v-bind:id="page.toString()">
    <!-- <div v-on:click="changePage(page)" v-for="page in pageNumbers" v-bind:key="page" v-bind:class="{'pageNumber': (page != '...'), 'activePageNumber': (page == currentPage)}" v-bind:id="page.toString()"> -->
      {{ page }}
    </div>
    <div v-on:click="next()" class="arrow hover">→</div>
  </div>
</template>

<script>
// const _ = require("lodash")
import $ from 'jquery'
// const Lazy = require('lazy.js')
const Lazy = window.Lazy
const RVerify = window.RVerify
// import json from '../../static/submissions.json'
// import json from '../../public/submissions.json'
// import json from '../../public/output2.json'
export default {
  name: 'Projects',
  // created() {
  //   fetch('https://raw.githubusercontent.com/WampyCakes/manim-projects/main/submissions.json')
  //     .then(response => response.json())
  //     .then(json => {
  //       this.data = json
  //     })
  // },
  created() {
    // fetch('submissions.json').then(response => {
    //   const reader = response.json().getReader();
    //   for(var i = 0; i < 100; i++){
    //     this.data.push(reader.read().json())
    //   }
    // });
    fetch('output2.json')
      .then(response => response.json())
      .then(json => {
        this.data = Lazy(json).take(this.perPage)
        this.fetchedData = Lazy(json)
        this.numberOfPages = Math.ceil(this.fetchedData.size()/this.perPage)
        this.getPageNumbers()
        // console.log(this.numberOfPages);
      })
    
    RVerify.configure({
      tolerance: 10,
      duration: 500,
      mask: 0.5,
      title: "Upload Your Manim Video",
      text: "Use the slider to orient the picture upright",
      album: [
        "tiger.jpg",
        "eagle.jpg",
        "gosling.jpg",
        "kitten.jpg",
        "wolf.jpg",
        "bird.jpg",
      ]
    });
  },
  // mounted() {
  //   // this.$nextTick(() => {
  //   $('[data-toggle="popover"]').popover({trigger:'hover'})  
  //   // })
  // },
  // mounted() {
  //   var observer = new IntersectionObserver(this.loadMore(), {root: document.getElementById('list'), threshold: 1});
  //   console.log(observer);
  //   // observer.observe($('#list').last());
  // },
  updated() {
    // if(this.currentPage == 1)
    //   document.getElementById(1).classList.add('activePageNumber')
    $('[data-toggle="popover"]').popover({trigger:'hover'})
  },
  data() {
    return{
      data: [],
      colors: ["#81b29a", "#454866", "#e07a5f"],
      perPage: 10,
      numberOfPages: 0,
      // The number of pages to show at a time at the bottom. This number is not always enforced. 
      // There are usually going to be more. This value acts as base value for calculations.
      // The actual number will be visiblePages + a few more, depending on the conditions.
      visiblePages: 5,
      pageNumbers: [],
      currentPage: 1,
      counter: 0
    }
  },
  // computed: {
  //   grid() {
  //     return Lazy(this.data).chunk(2)
  //     // return _.chunk(Lazy(this.data).value(), 2)
  //   },
  //   // numberOfPages() {
  //   //   // console.log(this.fetchedData);
  //   //   return Array(Math.ceil((this.fetchedData.size()/this.perPage)+1)).slice(1)
  //   //   // return Array((this.fetchedData/this.perPage)+1).slice(1)
  //   // }
  //   // colors() {
  //   //   return ["#81b29a", "#454866", "#e07a5f"]
  //   // }
  // },
  // watch: {
  //   numberOfPages() {
  //     // console.log(this.fetchedData);
  //     return Array(Math.ceil((this.fetchedData.size()/this.perPage)+1)).slice(1)
  //     // return Array((this.fetchedData/this.perPage)+1).slice(1)
  //   }
  // },
  methods: {
    captcha() {
      RVerify.action(function(res){
        console.log(res);
      });
    },
    grid() {
      return Lazy(this.data).chunk(2)
    },
    getPageNumbers() {
      var pagesPerSide = this.visiblePages%2 == 0 ? [(this.visiblePages/2)-1, this.visiblePages/2] : [Math.floor(this.visiblePages/2), Math.floor(this.visiblePages/2)]
      if(this.numberOfPages <= this.visiblePages)
        this.pageNumbers = this.range(1, this.numberOfPages)
      else {
        if(this.currentPage <= Math.ceil(this.visiblePages/2)){
          if(this.numberOfPages != this.visiblePages+1)
            this.pageNumbers = this.range(1, this.visiblePages).concat('...').concat(this.numberOfPages)
          else
            this.pageNumbers = this.range(1, this.numberOfPages)
        }else{
          if(this.currentPage + pagesPerSide[1] > this.numberOfPages)
            this.pageNumbers = this.range((this.currentPage - pagesPerSide[0]) - (this.numberOfPages - this.currentPage), this.currentPage).concat(this.range(this.currentPage+1, this.numberOfPages))
          else
            this.pageNumbers = this.range(this.currentPage - pagesPerSide[0], this.currentPage).concat(this.range(this.currentPage+1, this.currentPage + pagesPerSide[1]))
          
          if(this.currentPage - pagesPerSide[0] == 2)
            this.pageNumbers.unshift(1)
          else if(this.currentPage - pagesPerSide[0] == 3)
            this.pageNumbers.unshift(1, 2)
          else
            this.pageNumbers.unshift(1, '..')

          if(this.currentPage + pagesPerSide[1] == this.numberOfPages)
            this.pageNumbers.concat(this.numberOfPages)
          else if(this.currentPage + pagesPerSide[1] < this.numberOfPages)
            this.pageNumbers.push('...', this.numberOfPages)
          // else{
          //   console.log('cat');
          //   this.pageNumbers.push('...', this.numberOfPages)
          // }
          
          // if(this.currentPage + pagesPerSide[1] == this.numberOfPages-1)
          //   this.pageNumbers.concat(this.numberOfPages)
          // else
          //   this.pageNumbers.push('...', this.numberOfPages)
        }
      }
        // return this.getPageArray(this.numberOfPages)
      // else
      //   return this.getPageArray(this.visiblePages).concat('...').concat(this.numberOfPages)
    },
    previous() {
      this.changePage(this.currentPage-1)
    },
    next() {
      this.changePage(this.currentPage+1)
    },
    range(start, stop) {
      return Array((stop - start)+1).fill(start).map((x, y) => x + y)
    },
    changePage(page) {
      if(page == '...'){
        page = this.pageNumbers[this.pageNumbers.indexOf(page)-1]+1
      } else if(page == '..'){
        page = this.pageNumbers[this.pageNumbers.indexOf(page)+1]-1
      }
      if(page == 1)
        this.data = Lazy(this.fetchedData).take(this.perPage)
      else
        this.data = Lazy(this.fetchedData).rest((page-1)*this.perPage).take(this.perPage)
      this.currentPage = page
      this.getPageNumbers()
    }
    // loadMore() {
    //   this.counter += 1
    //   this.fetchedData = this.fetchedData.rest(this.counter*this.perPage)
    //   this.data = Lazy(this.data).concat(this.fetchedData.take(this.perPage))
    //   // this.data.push(this.fetchedData.take(10))
    //   // this.data = this.fetchedData.take(this.counter)
    // }
  }
}
// var observer = new IntersectionObserver((e, observer) => {
//   if(e.isIntersecting){
//     this.loadMore()
//     observer.unobserve(e)
//   }
// }, {root: document.querySelector('#list'), threshold:1});
// // console.log(document.querySelector('#list > div:last-child'));
// observer.observe(document.querySelector('#list > div:last-child'));
</script>

<style scoped>
.pageHolder {
  /* border: 10px solid #e07a5f;
  border-radius: 25%; */
  display: inline-flex;
  flex-wrap: wrap;
  margin: 1rem 0 2rem 0;
  /* justify-content: center; */
}

.pageNumber {
  flex-shrink: 0;
  background: #e07a5f;
  cursor: pointer;
  /* margin: 0 .5rem 0 .5rem; */
  /* margin: 0 0 1rem 1rem; */
  padding: 1rem; 
  /* background: #e07a5f; */
  color: white;
  /* border: 3px solid #e07a5f;
  border-radius: 25%; */
}

.activePageNumber {
  /* border-color: #454866; */
  background: #454866;
}

.ellipsis {
  flex-shrink: 0;
  cursor: pointer;
  /* margin: 0 0 1rem 1rem; */
  padding: 1rem;
  background: #81b29a;
  color: white;
  font-weight: bolder;
  /* border: 3px solid #81b29a;
  border-radius: 25%; */
}

.hover:hover {
  background-color: rgba(69, 72, 102, 0.75);
}

.arrow {
  flex-shrink: 0;
  cursor: pointer;
  /* font-size: larger; */
  padding: 1rem;
  color: white;
  background: #81b29a;
}
</style>