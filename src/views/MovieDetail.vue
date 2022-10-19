<template>
  <div class="backdrop" v-bind:style="haveBackdrop">
    <div class="gradian">
      <div class="container" id="container">
        <div class="button">
          <router-link to="/"> <button>&#60; Back</button></router-link>
        </div>
        <div class="flex flex-nowrap top">
          <img
            v-if="movie.poster_path != null"
            :src="`${picUrl}${movie.poster_path}`"
            :alt="`${movie.title}`"
            class="poster" />
          <div class="movie-info">
            <div class="flex">
              <div class="vote" v-if="movie.vote_average > 0">
                <h2>{{ movie.vote_average.toFixed(1) }}</h2>
              </div>
              <div class="">
                <div class="title">
                  <h2>{{ movie.title }}</h2>
                </div>
                <div v-if="movie.tagline" class="tagline">
                  <h4>"{{ movie.tagline }}"</h4>
                </div>
              </div>
            </div>
            <ul class="genre">
              <li v-for="(genre, id) in movie.genres" :key="id">
                {{ genre.name }}
              </li>
            </ul>
            <div class="overview">
              <p>{{ movie.overview }}</p>
            </div>
            <div class="status" v-if="movie.status">
              <p>
                <strong>{{ movie.status }}</strong>
                <span v-if="movie.status == 'Released'">
                  in {{ movie.release_date.substring(0, 4) }}</span
                >
              </p>
            </div>
            <div class="runtime" v-if="movie.runtime > 0">
              <p>{{ runeTime(movie.runtime) }}</p>
            </div>
            <div class="buget" v-if="movie.budget > 0">
              <p>Budget: {{ movie.budget.toLocaleString() }}</p>
            </div>
            <div class="revenue" v-if="movie.revenue > 0">
              <p>Revenue {{ movie.revenue.toLocaleString() }}</p>
            </div>
            <div class="calc" v-if="movie.revenue > 0">
              <p>
                Profit:
                {{ (movie.revenue - movie.budget).toLocaleString() }}
              </p>
            </div>
            <div class="collection flex" v-if="movie.belongs_to_collection">
              <span> {{ movie.belongs_to_collection.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container" id="container">
    <h3 class="margin-top">Cast</h3>
    <div class="slider" v-if="movie.title">
      <Splide
        :options="{
          drag: 'free',
          fixedWidth: '130px',
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
          class="cast"
          v-for="(cast, id) in movie.credits.cast.slice(0, 14)"
          :key="id">
          <router-link
            :to="'/person/' + cast.id"
            class="flex flex-col flex-nogap">
            <img
              v-if="cast.profile_path"
              :src="`${picUrl}${cast.profile_path}`"
              alt="" />

            <img
              v-else
              src="@/assets/img/noprofile.png"
              alt="No profile image" />

            <p>
              <strong>{{ cast.character }}</strong>
            </p>
            <p>{{ cast.name }}</p>
          </router-link>
        </SplideSlide>
        <SplideSlide>
          <router-link :to="'/movie/' + movieId + '/cast'">
            <div class="all-cast">
              <p class="big">></p>
              <p>All cast members</p>
            </div>
          </router-link>
        </SplideSlide>
      </Splide>
    </div>
    <div class="grid2 margin-top">
      <div class="similar" v-if="movie.title">
        <h3>similar</h3>
        <div v-for="(sim, id) in movie.similar.results.slice(0, 5)" :key="id">
          <router-link :to="'/movie/' + sim.id">
            <div class="card flex flex-center">
              <img :src="`${picUrl}${sim.poster_path}`" :alt="sim.title" />

              <h4>{{ sim.vote_average.toFixed(1) }}</h4>

              <p>{{ sim.title }}</p>
              <p>{{ sim.release_date.substring(0, 4) }}</p>
              <p>></p>
            </div>
          </router-link>
        </div>
      </div>
      <div class="recommendations" v-if="movie.title">
        <h3>recommendations</h3>
        <div
          v-for="(rec, id) in movie.recommendations.results.slice(0, 5)"
          :key="id">
          <router-link :to="'/movie/' + rec.id">
            <div class="card flex flex-center">
              <img
                v-if="rec.poster_path"
                :src="`${picUrl}${rec.poster_path}`"
                :alt="rec.title" />
              <div v-else class="empty-poster"></div>

              <h4>{{ rec.vote_average.toFixed(1) }}</h4>

              <p>{{ rec.title }}</p>
              <p>{{ rec.release_date.substring(0, 4) }}</p>
              <p>></p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'

export default {
  setup() {
    const movie = ref([])
    const route = useRoute()
    const movieId = route.params.id
    const picUrl = 'https://image.tmdb.org/t/p/w500'
    const picUrlbg = 'https://image.tmdb.org/t/p/original'

    const haveBackdrop = computed(() => {
      if (movie.value.backdrop_path != null) {
        return `background-image: url(${picUrlbg}${movie.value.backdrop_path})`
      } else {
        return ` background: rgb(33,31,31); background: linear-gradient(180deg, rgba(33,31,31,1) 38%, rgba(254,65,65,1) 100%); `
      }
    })

    onBeforeMount(async () => {
      await fetch(`/.netlify/functions/getMovieInfo`, {
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

    function runeTime(num) {
      const hours = Math.floor(num / 60)
      const min = num % 60
      if (hours <= 1 && min > 1) {
        return `${hours} hour and ${min} minutes`
      }
      if (hours <= 1 && min <= 1) {
        return `${hours} hour and ${min} minute`
      }
      if (hours > 1 && min <= 1) {
        return `${hours} hours and ${min} minute`
      } else {
        return `${hours} hours and ${min} minutes`
      }
    }

    return {
      movie,
      picUrl,
      picUrlbg,
      movieId,
      runeTime,
      haveBackdrop,
    }
  },
  components: { Splide, SplideSlide },
}
</script>
<style lang="scss" scoped>
h3 {
  margin-bottom: 1rem;
}

.flex-center {
  align-items: center;
}

.flex {
  gap: 1rem;
}

.button {
  margin: 2rem 0;
}

img {
  border-radius: 1rem;
}

#container {
  z-index: 9999;
}

.backdrop {
  background-size: cover;
  background-position: bottom;
  background-attachment: fixed;
  left: 0;
  right: 0;

  .gradian {
    background: rgba(0, 0, 0, 0.8);
    height: 100%;
    padding: 2rem 0;
    margin-top: -32px;
  }
}

.movie-info {
  color: #fff;

  .title h2 {
    margin-bottom: 0rem;
  }

  .vote {
    background-color: var(--prime-color);
    height: 100%;
    border-radius: 1rem;

    h2 {
      margin-bottom: 0;
      padding: 0.5rem 1rem;
      font-size: 2.5rem;
    }
  }

  .tagline {
    margin-top: 0.5rem;
  }

  .genre {
    display: flex;
    margin: 2rem 0;
    flex-flow: wrap;
    margin-bottom: 0.5rem;

    li {
      list-style: none;
      background-color: var(--prime-color);
      padding: 0.2rem 0.5rem;
      margin-right: 1rem;
      border-radius: 1rem;
      font-size: 0.9rem;
    }
  }

  .overview {
    margin: 4rem 0;

    p {
      font-weight: 400;
      font-size: 0.9rem;
      line-height: 1.3rem;
      // margin-bottom: 1rem;
    }
  }

  .status {
    background-color: var(--prime-color);
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;

    p {
      font-size: 1rem;
    }
  }

  .runtime {
    margin: 2rem 0;

    p {
      font-size: 1.5rem;
    }
  }

  .collection {
    h3 {
    }

    span {
      background-color: var(--prime-color);
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      margin: 2rem 0 0.4rem 0;
      font-weight: bold;
    }
  }
}

.similar .flex p:last-child,
.recommendations .flex p:last-child {
  margin-left: auto;
}

.margin-top {
  margin-top: 2rem;
}

.card {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0.5rem;
  margin: 0 1rem 0.3rem 0;
  border-radius: 1rem;
  color: rgba(255, 255, 255, 0.8);
  width: 100%;

  &:hover {
    background-color: var(--prime-color);
    color: #fff;
  }

  img {
    width: 20px;
    border-radius: 0.5rem;
  }

  .empty-poster {
    width: 20px;
    height: 1px;
  }

  p {
    font-weight: 700;
  }
}

.cast {
  a {
    color: #fff;
  }

  img {
    width: 120px;
    border-radius: 0.5rem;
  }

  p {
    font-size: 0.8rem;

    &:first-of-type {
      margin-top: 0.5rem;
    }
  }
}

.all-cast {
  .big {
    font-size: 4rem;
    justify-content: center;
  }

  p {
    color: #fff;

    &:hover {
      color: var(--prime-color);
    }
  }
}

@media (max-width: 900px) {
  .poster {
    height: 400px;
  }
}

@media (max-width: 600px) {
  .top {
    flex-direction: column;
  }

  .poster {
    width: 140px;
    height: 200px;
  }

  .grid2 {
    grid-template-columns: 1fr;
  }
}
</style>
