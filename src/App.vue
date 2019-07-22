<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light">
      <router-link to="/">
        <a class="navbar-brand">WorkBoard</a>
      </router-link>
    </nav>
    <router-view />
  </div>
</template>
<style lang="scss">
@import "bootstrap/scss/bootstrap.scss";
</style>