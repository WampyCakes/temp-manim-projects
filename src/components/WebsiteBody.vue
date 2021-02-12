<template>
  <!-- Implement a results per page dropdown. It will have to update this.perPage and MAY need a watcher or something like that to reset 
  this.data to new amount. Additionally, by using Vue's reactivity, it should be possible to not hard-code the possible values into
  the dropdown. Instead, they would be fetched from an array in data and manipulated. Or an input where the user can specify how many pages.
  Once a user sets a preference for perPage, save it to their localstorage in the browser. This selection should maybe not render unless there is
  more than one page of videos UNLESS the user has previously set the results per page, in which case it should always show so that the default
  can be reset. -->

  <!-- <div class="text-left" style="margin-left: 2rem;">
    Results per page: <input type="text" class="perPageInput" v-model="perPage">
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
        Results per page: {{ perPage }}
      </button>
      <ul class="dropdown-menu">
        <li>15</li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </div>
  </div> -->

  <!-- This spinner will only appear while 0 videos are loaded -->
  <div v-if="data.length == 0" class="spinner spinner-border" role="status">
    <!-- Works for now; new bootstrap version changed sr-only to visually-hidden -->
    <span class="sr-only">Loading...</span>
  </div>

  <!-- This is where the videos are injected into the page -->
  <div id="list" class="container-fluid">
    <div v-for="item in grid().value()" class="row flex-md-row mb-4 h-md-250 position-relative" v-bind:key="item">
      <div v-for="project in item" class="col border rounded shadow-lg p-4 d-flex flex-column position-static m-2" v-bind:key="project">
        <manim-video :videoData="project"/>
      </div>
      <!-- A very hacky way to ensure that if there is an odd number of videos, the last video does not take up the space
      of two videos. This should have a good CSS/Bootstrap fix, but for sake of expediency, for now, there is simply an
      empty div taking up the space. -->
      <div v-if="item.length == 1" class="col m-2"></div>
    </div>
  </div>

  <!-- If there is more than one page of videos, we render a page selector at the bottom. -->
  <div v-if="numberOfPages > 1" class="pageHolder">
    <div v-on:click="previous()" class="arrow hover" v-if="currentPage > 1">←</div>
    <!-- We apply some classes to each page number. Certain "page numbers" receive different classes. -->
    <div v-on:click="changePage(page)" v-for="page in pageNumbers" v-bind:key="page" v-bind:class="{'pageNumber': (page != '...'), 'ellipsis': (page == '...' || page == '..'), 'hover': (page != currentPage), 'activePageNumber': (page == currentPage)}" v-bind:id="page.toString()">
      {{ page }}
    </div>
    <div v-on:click="next()" class="arrow hover">→</div>
  </div>
</template>

<script>
import $ from 'jquery'
import ManimVideo from './ManimVideo.vue'
const Lazy = window.Lazy

export default {
  components: { 
    ManimVideo 
  },
  name: 'WebsiteBody',
  created() {
    // videos.json is the file which holds all approved Manim videos. 
    fetch('videos.json')
      .then(response => response.json())
      .then(json => {
        // We only want to actually load in as many as we need for a page. Lazy.js documentation provides more information
        this.data = Lazy(json).take(this.perPage)
        this.fetchedData = Lazy(json)
        this.numberOfPages = Math.ceil(this.fetchedData.size()/this.perPage)
        // Generate page numbers once we have our data
        this.getPageNumbers()
      })
    
  },
  updated() {
    $('[data-toggle="popover"]').popover({trigger:'hover'})
  },
  data() {
    return {
      data: [],
      // perPage is the number of Manim videos to load on a page. This *can* be changed to any number
      // Putting it too high will make load time and memory usage insanely high. This should become
      // editable through a "results per page" option above the video list. There should also be a max
      // set on end users.
      perPage: 10,
      numberOfPages: 0,
      // visiblePages is the number of pages to show at a time at the bottom. This number is not always enforced. 
      // There are usually going to be more. This value acts as base value for calculations.
      // The actual number will be visiblePages + a few more, depending on the conditions below.
      visiblePages: 5,
      pageNumbers: [],
      currentPage: 1,
      counter: 0
    }
  },
  methods: {
    grid() {
      // This value sets the number of videos to show in a literal row. For example, 3 will make 3 videos
      // per row on the webpage. I do not remember why I did it this way, but it works well.
      return Lazy(this.data).chunk(2)
    },
    getPageNumbers() {
      // Imagine that the current page is 5. pagesPerSide is determining how many pages on the left and right of 5 to show. If it's 2, we would see pages 3-7
      // Different calculations are needed for odd and even visiblePages since even numbers do not have a center.
      var pagesPerSide = this.visiblePages%2 == 0 ? [(this.visiblePages/2)-1, this.visiblePages/2] : [Math.floor(this.visiblePages/2), Math.floor(this.visiblePages/2)]
      
      if(this.numberOfPages <= this.visiblePages)
        // If we do not exceed visiblePages, no need for complicated logic. Show all the pages.
        this.pageNumbers = this.range(1, this.numberOfPages)
      else {
        // I don't want to document how the rest of this logic works. It should be self-explanatory enough given some thinking through different conditions.
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
          // Notice that in one direction we use '..' and in the other we use '...'
          // If you change them to both be '...' have fun figuring out which one was clicked. Different things must be executed depending on which is clicked.
          if(this.currentPage + pagesPerSide[1] == this.numberOfPages)
            this.pageNumbers.concat(this.numberOfPages)
          else if(this.currentPage + pagesPerSide[1] < this.numberOfPages)
            this.pageNumbers.push('...', this.numberOfPages)

          // This is old stuff from when I was making the pages logic. After it has been determined the pages logic completely works, this is safe to delete.
          // else{
          //   this.pageNumbers.push('...', this.numberOfPages)
          // }
          
          // if(this.currentPage + pagesPerSide[1] == this.numberOfPages-1)
          //   this.pageNumbers.concat(this.numberOfPages)
          // else
          //   this.pageNumbers.push('...', this.numberOfPages)
        }
      }
      // Same with this stuff. Tbh I don't remember what it did. But it should be good to go if pages completely work after more thorough testing.
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

      // Just like before, let's only load what we need.
      if(page == 1)
        this.data = Lazy(this.fetchedData).take(this.perPage)
      else
        this.data = Lazy(this.fetchedData).rest((page-1)*this.perPage).take(this.perPage)
      this.currentPage = page
      this.getPageNumbers()
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
    // The following comments were from testing of implementing an infinite scroll. After beginning, I do not think an infinite scroll
    // would work well for our free setup. Pages work well. loadMore() and the IntersectionObserver will live here as the beginning
    // of an infinite scroll until a later date, but it is likely a very bad idea to implement.

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
.perPageInput {
  border-radius: .5rem;
  border: 2px solid #454866;
  width: 3.5rem;
  height: 2rem;    
}

.pageHolder {
  display: inline-flex;
  flex-wrap: wrap;
  margin: 1rem 0 2rem 0;
}

.pageNumber {
  flex-shrink: 0;
  background: #e07a5f;
  cursor: pointer;
  padding: 1rem; 
  color: white;
}

.activePageNumber {
  background: #454866;
}

.ellipsis {
  flex-shrink: 0;
  cursor: pointer;
  padding: 1rem;
  background: #81b29a;
  color: white;
  font-weight: bolder;
}

.hover:hover {
  background-color: rgba(69, 72, 102, 0.75);
}

.arrow {
  flex-shrink: 0;
  cursor: pointer;
  padding: 1rem;
  color: white;
  background: #81b29a;
}
</style>