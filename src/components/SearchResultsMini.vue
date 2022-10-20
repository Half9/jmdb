<template>
  <div v-if="showSearch" class="flex top">
    <h2>Quick Search Results</h2>
    <button @click="clearSearch()">Reset</button>
  </div>
  <Splide
    v-if="showSearch"
    aria-labelledby="Quick Search Results"
    :options="{
      fixedWidth: '150px',
      pagination: false,
      drag: 'free',
      snap: true,
      perPage: 7,
      breakpoints: {
        900: {
          perPage: 6,
        },
        790: {
          perPage: 5,
        },
        650: {
          perPage: 4,
        },
        540: {
          perPage: 3,
        },
        410: {
          perPage: 2,
        },
      },
    }">
    <SplideSlide
      v-for="(item, id) in searchResult.slice(0, 14)"
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
          <img v-else src="@/assets/img/noprofile.png" alt="No profile image" />
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
    </SplideSlide>
    <div class="splide__progress">
      <div class="splide__progress__bar" />
    </div>
  </Splide>
</template>

<script>
import { ref, computed } from 'vue'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'

const picUrl = 'https://image.tmdb.org/t/p/w500'
const searchResult = ref([])

export default {
  components: { Splide, SplideSlide },
  setup() {
    if (window.localStorage.getItem('searchResultHistory') !== null) {
      searchResult.value = JSON.parse(
        window.localStorage.getItem('searchResultHistory')
      )
    }
    // console.log(searchResult);
    const clearSearch = () => {
      searchResult.value = ''
      localStorage.clear('searchResultHistory')
    }

    const showSearch = computed(() => {
      return searchResult.value == '' ? false : true
    })

    return {
      searchResult,
      showSearch,
      clearSearch,
      picUrl,
    }
  },
}
</script>

<style lang="scss" scoped>
.top {
  button {
    margin-left: auto;
    height: 1%;
  }
  h2 {
    margin-bottom: 1rem;
  }
}

.card {
  background-color: rgba(0, 0, 0, 0.6);
  margin: 0.1rem 1rem 1rem 0.1rem;
  border-radius: 0.5rem;
  color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.8);
  padding-bottom: 1rem;

  a {
    color: #fff;
    &:hover {
      color: var(--prime-color);
    }
  }
  .info {
    padding: 1rem 0.5rem 0.5rem 0.5rem;

    h3 {
      font-size: 1rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
  &:hover {
    color: var(--prime-color);
    outline: 2px solid var(--prime-color);
  }
  img {
    border-radius: 0.5rem;
  }
}
</style>
