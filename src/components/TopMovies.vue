<template>
  <h2>Popular this week</h2>
  <div class="grid">
    <div
      v-for="(movie, id) in topMoviesWeek.slice(0, 8)"
      :key="id"
      class="movie-card"
      :style="{
        'background-image': 'url(' + picUrl + '' + movie.poster_path + ')',
      }">
      <router-link :to="'/' + movie.media_type + '/' + movie.id">
        <div class="gradian">
          <div>
            <div class="score">
              <p>{{ movie.vote_average.toFixed(1) }}</p>
            </div>
          </div>

          <div v-if="movie.name" class="title">
            <h3>{{ movie.name }}</h3>
          </div>
          <div v-if="movie.title" class="title">
            <h3>{{ movie.title }}</h3>
          </div>
          <div>
            <div class="type">{{ movie.media_type }}</div>
          </div>
          <div class="summary">
            <p>
              {{ movie.overview.slice(0, 120) }}
              <span v-if="movie.overview.length > 120">...</span>
            </p>
          </div>
          <div class="button">
            <button>More Info</button>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue'

export default {
  setup() {
    const topMoviesWeek = ref([])
    const picUrl = 'https://image.tmdb.org/t/p/w500'

    onBeforeMount(async () => {
      await fetch(`.netlify/functions/getPopularWeek`)
        .then((response) => response.json())
        .then((data) => {
          topMoviesWeek.value = data.data.results
        })
    })

    return {
      topMoviesWeek,
      picUrl,
    }
  },
}
</script>
