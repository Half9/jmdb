<template>
  <div class="container">
    <SearchBar />
    <h2>Search Results</h2>
    <div class="flex flex-wrap">
      <div
        v-for="(item, id) in searchResult"
        :key="id"
        class="card flex flex-col">
        <router-link :to="'/' + item.media_type + '/' + item.id">
          <div class="poster">
            <img
              v-if="item.media_type !== 'person' && item.poster_path !== null"
              :src="`${picUrl}${item.poster_path}`"
              :alt="item.title" />
            <img
              v-else-if="
                item.media_type == 'person' && item.profile_path !== null
              "
              :src="`${picUrl}${item.profile_path}`"
              :alt="item.title" />
            <img
              v-else
              src="@/assets/img/noprofile.png"
              alt="No profile image" />
          </div>
          <div class="info">
            <h3>{{ item.title }}{{ item.name }}</h3>
            <p>
              {{ item.media_type }} (<span v-if="item.release_date">{{
                item.release_date.substring(0, 4)
              }}</span
              ><span v-if="item.first_air_date">{{
                item.first_air_date.substring(0, 4)
              }}</span
              >)
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import { useRoute } from 'vue-router'
import { ref, onBeforeMount } from 'vue'

const picUrl = 'https://image.tmdb.org/t/p/w500'

export default {
  components: { SearchBar },
  setup() {
    const route = useRoute()
    const searchTerm = route.params.id
    const searchResult = ref([])

    onBeforeMount(async () => {
      await fetch(`/.netlify/functions/searchItems`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: searchTerm,
      })
        .then((response) => response.json())
        .then((data) => {
          searchResult.value = data.data.results
          window.localStorage.setItem(
            'searchResultHistory',
            JSON.stringify(searchResult.value)
          )
          window.localStorage.setItem(
            'searchHistory',
            JSON.stringify(searchTerm)
          )
        })
    })

    // if (window.localStorage.getItem("searchResultHistory") !== null) {
    //   searchResult.value = JSON.parse(
    //     window.localStorage.getItem("searchResultHistory")
    //   );
    // }

    return {
      searchResult,
      picUrl,
    }
  },
}
</script>

<style lang="scss">
h2 {
  margin-bottom: 1rem;
}

.card {
  background-color: rgba(0, 0, 0, 0.6);
  margin: 0 1rem 0.3rem 0;
  border-radius: 1rem;
  color: #fff;
  width: 150px;
  margin-bottom: 1rem;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.8);
  padding-bottom: 1rem;

  a {
    color: #fff;
    &:hover {
      color: var(--prime-color);
    }
  }
  .info {
    padding: 0.2rem 0.5rem;

    h3 {
      font-size: 1rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
  &:hover {
    color: var(--prime-color);
  }
  img {
    max-width: 150px;
    border-radius: 0.5rem;
  }
  .empty-poster {
    width: 20px;
    height: 1px;
  }
}
</style>
