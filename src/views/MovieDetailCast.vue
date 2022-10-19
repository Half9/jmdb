<template>
  <div class="container">
    <div class="grid2">
      <div class="actors">
        <h2 v-if="movie.cast">Cast ({{ movie.cast.length + 1 }})</h2>
        <ul>
          <li v-for="(actor, id) in movie.cast" :key="id">
            <router-link :to="'/person/' + actor.id" class="flex">
              <img
                v-if="actor.profile_path"
                :src="`${picUrl}${actor.profile_path}`"
                :alt="actor.name" />
              <img v-else src="@/assets/img/noprofile.png" :alt="actor.name" />
              <div class="name">
                <p>{{ actor.name }}</p>
                <p>{{ actor.character }}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="crew">
        <h2 v-if="movie.crew">Crew ({{ movie.crew.length + 1 }})</h2>
        <ul>
          <li v-for="(crew, id) in movie.crew" :key="id" class="flex">
            <img
              v-if="crew.profile_path"
              :src="`${picUrl}${crew.profile_path}`"
              :alt="crew.name" />
            <img v-else src="@/assets/img/noprofile.png" :alt="crew.name" />
            <router-link :to="'/person/' + crew.id" class="flex">
              <div class="name">
                <p>{{ crew.name }}</p>
                <p>{{ crew.job }}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const movie = ref([])
    const route = useRoute()
    const movieId = route.params.id
    const picUrl = 'https://image.tmdb.org/t/p/w500'

    onBeforeMount(async () => {
      await fetch(`/.netlify/functions/getMovieCast`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: movieId,
      })
        .then((response) => response.json())
        .then((data) => {
          movie.value = data.data
          console.log(movie.value)
        })
    })

    return {
      movie,
      picUrl,
    }
  },
}
</script>
<style lang="scss" scoped>
.flex {
  gap: 2rem;
}
.actors,
.crew {
  p:nth-child(1) {
    font-weight: bold;
  }
  p:nth-child(2) {
    font-size: 0.9rem;
  }
  li {
    margin-bottom: 1rem;
    list-style: none;
  }
  img {
    width: 66px;
    border-radius: 0.5rem;
  }
  a {
    color: #fff;
    &:hover {
      color: var(--prime-color);
    }
  }
}
@media (max-width: 500px) {
  .grid2 {
    grid-template-columns: 1fr;
  }
}
</style>
