<template>
  <div class="container">
    <SearchBar />
    <SearchResultsMini />
    <TopMovies />
  </div>
</template>

<script>
import TopMovies from '@/components/TopMovies.vue'
import SearchBar from '@/components/SearchBar.vue'
import SearchResultsMini from '@/components/SearchResultsMini.vue'

export default {
  components: { TopMovies, SearchBar, SearchResultsMini },
}
</script>

<style lang="scss">
button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: var(--prime-color);
  border: 2px solid var(--prime-color);
  color: #fff;
  font-size: 1.2rem;

  &:hover {
    background-color: var(--prime-color-dark);
    border: 2px solid var(--prime-color-dark);
    cursor: pointer;
  }
}
.movie-card {
  background-position: center;
  background-size: cover;
  background-repeat: repeat;
  color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  height: 100%;
  border-radius: 0.5rem;
  transition: box-shadow 0.3s;

  &:hover {
    outline: 2px solid var(--prime-color);
    box-shadow: 0px 0px 12px var(--prime-color);
  }

  .gradian {
    background: rgb(0, 0, 0);
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 45%,
      rgba(0, 0, 0, 0.8547618876652223) 65%,
      rgba(0, 0, 0, 1) 100%
    );
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 0.5rem;
    height: 100%;
  }
  .score {
    display: inline-flex;
    background-color: var(--prime-color);
    color: #fff;
    padding: 0.5rem;
    font-size: 2.3rem;
    border-radius: 0.5rem 0 1rem 0;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
  }
  .type {
    display: inline-flex;
    background-color: var(--prime-color);
    color: #fff;
    padding: 0.3rem 0.5rem 0.3rem 0.3rem;
    font-size: 0.8rem;
    border-radius: 0 1rem 1rem 0;
    margin-top: 2rem;
  }
  .title {
    // margin-top: 3rem;
    padding-inline: 0.5rem;
    margin-top: 15rem;

    h3 {
      font-size: 1.7rem;
      font-weight: 700;
      color: #fff;
    }
  }
  .extras {
    font-size: 0.9rem;
    margin-top: 0.5rem;
    padding-inline: 0.5rem;
  }
  .summary {
    margin-top: 1rem;
    font-size: 0.8rem;
    font-weight: 300;
    padding-inline: 0.5rem;
    line-height: 1.2rem;
    color: #f5f5f5;
    margin-top: 2rem;
  }
  .filler {
    opacity: 0;
  }

  .button {
    display: inline-flex;
    justify-content: center;
    padding-bottom: 1rem;
  }
  button {
    margin-top: 2rem;
    padding: 0.2rem 1rem;
    border-radius: 0.5rem;
    background-color: var(--prime-color);
    border: 2px solid var(--prime-color);
    color: #fff;
    font-size: 1rem;

    &:hover {
      background-color: var(--prime-color-dark);
      border: 2px solid var(--prime-color-dark);
      cursor: pointer;
    }
  }
  // div:nth-of-type(4) {
  //   margin-top: auto;
  // }
  div:nth-of-type(1) {
    margin-bottom: auto;
  }
}
h2 {
  margin-bottom: 1rem;
}
</style>
