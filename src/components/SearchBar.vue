<template>
  <div class="search-outer">
    <div class="search">
      <form
        @keyup="searchItems()"
        @keydown.enter="$router.push({ path: `/search/` + `${search}` })"
        @click.prevent="searchItems()"
      >
        <input
          type="text"
          placeholder="Search for movies or series"
          v-model="search"
          @focus="showResults = true"
          @blur="showResults = false"
        />
        <button v-if="search != ''" @click="clearSearch()">X</button>
        <input
          type="submit"
          value="Search"
          @click="$router.push({ path: `/search/` + `${search}` })"
        />
      </form>
      <div class="search-results" v-if="showResults" @mousedown.prevent>
        <div class="wrapper">
          <ul>
            <li v-for="(item, id) in searchResult.slice(0, 12)" :key="id">
              <router-link :to="'/' + item.media_type + '/' + item.id">
                {{ item.name }}{{ item.title }}
                <span>{{ item.media_type }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const search = ref("");
    const searchResult = ref([]);
    const picUrl = "https://image.tmdb.org/t/p/w500";
    const showResults = ref(false);

    if (window.localStorage.getItem("searchHistory") !== null) {
      search.value = JSON.parse(window.localStorage.getItem("searchHistory"));
    }

    if (window.localStorage.getItem("searchResultHistory") !== null) {
      searchResult.value = JSON.parse(
        window.localStorage.getItem("searchResultHistory")
      );
    }

    const clearSearch = () => {
      search.value = "";
    };

    const searchItems = async () => {
      if (search.value != "") {
        await fetch(`/.netlify/functions/searchItems`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: search.value,
        })
          .then((response) => response.json())
          .then((data) => {
            searchResult.value = data.data.results;
            window.localStorage.setItem(
              "searchResultHistory",
              JSON.stringify(searchResult.value)
            );
            window.localStorage.setItem(
              "searchHistory",
              JSON.stringify(search.value)
            );
          });
      }
    };

    return {
      search,
      searchResult,
      searchItems,
      picUrl,
      clearSearch,
      showResults,
    };
  },
};
</script>

<style lang="scss" scoped>
.search-outer {
  background-color: #fff;
  width: 80%;
  border-radius: 0.5rem;
  border: 2px solid var(--prime-color);
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.search {
  width: 100%;
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    button {
      background-color: #fff;
      color: #000;
      border: 0;
    }

    input[type="text"] {
      padding: 0.5rem 1rem;
      font-size: 1.2rem;
      width: 100%;
      border: 0;
      background-color: rgba(0, 0, 0, 0);

      &:focus {
        outline: 0;
      }
    }
    input[type="submit"] {
      padding: 0.5rem 1rem;
      z-index: 999;

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
  }
}

.wrapper {
  text-align: left;
  margin: 0 auto;
  background-color: #fff;
  position: absolute;
  z-index: 99;
  width: calc(100% + 5px);
  border: 2px solid var(--prime-color);
  border-top: 0;
  margin-top: -4px;
  margin-left: -2px;
  border-radius: 0 0 0.5rem 0.5rem;
}
.search-results {
  position: relative;
  a {
    color: #000;
    font-size: 0.9rem;
    &:hover {
      color: var(--prime-color);
    }
  }
  ul {
    padding: 0.2rem;
    li {
      list-style: none;
      border-top: 1px solid var(--prime-color);
      font-size: 1.1rem;
      padding: 0.5rem 1rem;
      width: 100%;

      span {
        font-size: 0.9rem;
        color: var(--prime-color);
      }
    }
  }
}
</style>
