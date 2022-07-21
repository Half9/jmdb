<template>
  <header>
    <router-link to="/">
      <h1><span>Jimmy</span>MovieDB</h1>
    </router-link>
  </header>

  <main>
    <router-view :key="$route.params" />
  </main>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;900&display=swap");

:root {
  --prime-color: #fe4141;
  --prime-color-dark: #fe0101;
  --color-dark: #1e1b26;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Fira Sans", sans-serif;
}

body {
  background-color: #211f1f;
  color: #fff;
}
html,
body {
  margin: 0px;
  height: 100%;
}

a {
  text-decoration: none;
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1rem;
  background-color: #0d0c0c;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
  z-index: 99999;
  position: relative;

  h1 {
    color: #fff;
    font-size: 3rem;
    font-weight: 900;
    // letter-spacing: 0.01rem;

    span {
      color: var(--prime-color);
    }
  }
}
h2 {
  color: #fff;
  font-size: 2rem;
  font-weight: 900;
}
.container {
  max-width: 1200px;

  margin: 0 auto;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.grid2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.grid1 {
  display: grid;
  grid-template-columns: 1fr;
}
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.flex-end {
  justify-content: flex-end;
}
.flex-center {
  align-items: center;
}
.flex-wrap {
  flex-wrap: wrap;
}
.flex-nowrap {
  flex-wrap: nowrap;
}
.flex-nogap {
  gap: 0 !important;
}
.splide__pagination {
  bottom: -1rem !important;
  .is-active {
    background-color: var(--prime-color) !important;
  }
}
.splide__arrow {
  background-color: var(--prime-color) !important;
  &:hover {
    border: 0;
  }
}
@media (max-width: 1000px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 800px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .container {
    padding: 0 1rem;
  }
}
@media (max-width: 380px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
