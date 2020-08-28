<template>
  <div id="app">
    <main class="main-content">
      <div class="padding-wrap">
        <router-view role="main"/>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      loggedIn: false
    }
  }
}
</script>

<style lang="scss">
// define CSS custom props
:root {
  /* These custom props define our elevation levels. */
  --elevation-sm: #{$elevation-sm};
  --elevation-md: #{$elevation-md};
  --elevation-lg: #{$elevation-lg};
}

* {
  box-sizing: border-box;

  &:focus {
    outline: none;
  }
}

svg {
  height: 2rem;
  width: 2rem;
}

html {
  height: 100%;
  font-size: 16px;
}

input,
button {
  // Chrome's browser styles need to be more explicitly overriden for certain element types.
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
}

body {
  overflow: hidden;
  height: 100%;
  margin: 0px;
  background-color: $dendrite;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  text-align: center;
  color: $black;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1 1 auto;
  overflow: auto;
  width: 100%;
  text-align: initial;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  position: relative;
}

.padding-wrap {
  flex: 1;
  padding: 1rem;
  overflow-x: hidden;
  overflow-y: visible;
}
</style>
