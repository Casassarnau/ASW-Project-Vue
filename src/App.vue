<template>
  <div class="content">
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-md">
          <router-link class="navbar-brand" to="/">HackerNews</router-link>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" v-bind:class="{ active: $route.path == '/newest' }" to="/newest">New</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" v-bind:class="{ active: $route.path == '/ask' }" to="/ask">Ask</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" v-bind:class="{ active: $route.path == '/submit' }" to="/submit">Submit</router-link>
              </li>
            </ul>
            <div></div>
            <ul class="navbar-nav d-flex flex-row-reverse" style="width: 100%">
              <li class="nav-item">
                <router-link class="nav-link" to="/submit">Logout</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" v-bind:class="{ active: $route.path == '/profile' }" to="/profile">Profile</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    created () {
            document.title = "HackerNews";
        }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
}
body {
  color: whitesmoke !important;
  background-color: #2c3e50 !important;
}
</style>
