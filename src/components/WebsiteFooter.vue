<template>
    <footer class="bg-dark">
       <div class="container">
         <p>ManimCommunity takes no responsibility for, is not affiliated with, and does not endorse any user-submitted content on this website (including, but not limited to, video content and linked source code).</p> 
          <a
            href="https://docs.manim.community/en/latest/conduct.html#contact-information"
            class="nav-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button type="button" class="btn btn-outline-light">
              Report a video
            </button>
          </a>
       </div>
    </footer>
</template>

<script>
export default {
  name: "WebsiteFooter"
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
}

footer {
    margin-top: 3.5rem;
    padding: 1.5rem;
    bottom: 0;
    width: 100%;
    /* position: absolute; */
}

p {
  color: rgb(223, 223, 223);
  font-size: 16px;
  margin-bottom: 0px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>