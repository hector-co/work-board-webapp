<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <router-link to="/">
        <a class="navbar-brand">WorkBoard</a>
      </router-link>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/boards">
              <a class="nav-link">Boards</a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container">
      <div class="row">
        <div class="col-sm">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "bootstrap/scss/bootstrap.scss";
</style>