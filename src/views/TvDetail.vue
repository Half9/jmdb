<template>
  <div class="backdrop" :style="haveBackdrop">
    <div class="gradian">
      <div id="container" class="container">
        <div class="button">
          <router-link to="/"> <button>&#60; Back</button></router-link>
        </div>
        <div class="flex flex-nowrap top">
          <img
v-if="tvSerie.poster_path != null" :src="`${picUrl}${tvSerie.poster_path}`" :alt="`${tvSerie.name}`"
            class="poster" />
          <div class="movie-info">
            <div class="flex">
              <div v-if="tvSerie.vote_average > 0" class="vote">
                <h2>{{ tvSerie.vote_average.toFixed(1) }}</h2>
              </div>
              <div class="">
                <div class="title">
                  <h2>{{ tvSerie.name }}</h2>
                </div>
                <div v-if="tvSerie.tagline" class="tagline">
                  <h4>"{{ tvSerie.tagline }}"</h4>
                </div>
              </div>
            </div>

            <ul class="genre">
              <li v-for="(genre, id) in tvSerie.genres" :key="id">
                {{ genre.name }}
              </li>
            </ul>
            <div class="overview">
              <p>{{ tvSerie.overview }}</p>
            </div>
            <div v-if="tvSerie.status" class="status">
              <p>
                <strong>{{ tvSerie.status }}</strong>
              </p>
            </div>
            <div v-if="tvSerie.number_of_seasons" class="next-episode">
              <p>
                {{ tvSerie.name }} has {{ tvSerie.number_of_seasons }} seasons
                and {{ tvSerie.number_of_episodes }} episodes
              </p>
            </div>
            <div v-if="tvSerie.budget > 0" class="buget">
              <p>Budget: {{ tvSerie.budget.toLocaleString() }}</p>
            </div>
            <div v-if="tvSerie.revenue > 0" class="revenue">
              <p>Revenue {{ tvSerie.revenue.toLocaleString() }}</p>
            </div>
            <div v-if="tvSerie.revenue > 0" class="calc">
              <p>
                Profit:
                {{ (tvSerie.revenue - tvSerie.budget).toLocaleString() }}
              </p>
            </div>
            <div v-if="tvSerie.belongs_to_collection" class="collection flex">
              <span> {{ tvSerie.belongs_to_collection.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="container" class="container">
    <h3 class="margin-top">Cast</h3>
    <div v-if="tvSerie.name" class="slider">
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
        <SplideSlide v-for="(cast, id) in tvSerie.credits.cast.slice(0, 14)" :key="id" class="cast">
          <router-link :to="'/person/' + cast.id" class="flex flex-col flex-nogap">
            <img v-if="cast.profile_path" :src="`${picUrl}${cast.profile_path}`" alt="" />

            <img v-else src="@/assets/img/noprofile.png" alt="No profile image" />

            <p>
              <strong>{{ cast.character }}</strong>
            </p>
            <p>{{ cast.name }}</p>
          </router-link>
        </SplideSlide>
        <!-- <SplideSlide>
          <router-link :to="'/movie/' + tvId + '/cast'">
            <div class="all-cast">
              <p class="big">></p>
              <p>All cast members</p>
            </div>
          </router-link>
        </SplideSlide> -->
      </Splide>
    </div>
    <div class="grid2 margin-top">
      <div v-if="tvSerie.name" class="similar">
        <h3>similar</h3>
        <div v-for="(sim, id) in tvSerie.similar.results.slice(0, 5)" :key="id">
          <router-link :to="'/tv/' + sim.id">
            <div class="card flex flex-center">
              <img :src="`${picUrl}${sim.poster_path}`" :alt="sim.name" />

              <h4>{{ sim.vote_average.toFixed(1) }}</h4>

              <p>{{ sim.name }}</p>
              <p>{{ sim.first_air_date.substring(0, 4) }}</p>
              <p>></p>
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="tvSerie.name" class="recommendations">
        <h3>recommendations</h3>
        <div v-for="(rec, id) in tvSerie.recommendations.results.slice(0, 5)" :key="id">
          <router-link :to="'/tv/' + rec.id">
            <div class="card flex flex-center">
              <img v-if="rec.poster_path" :src="`${picUrl}${rec.poster_path}`" :alt="rec.name" />
              <div v-else class="empty-poster"></div>

              <h4>{{ rec.vote_average.toFixed(1) }}</h4>

              <p>{{ rec.name }}</p>
              <p>{{ rec.first_air_date.substring(0, 4) }}</p>
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
  components: { Splide, SplideSlide },
  setup() {
    const tvSerie = ref([])
    const route = useRoute()
    const picUrl = 'https://image.tmdb.org/t/p/w500'
    const picUrlbg = 'https://image.tmdb.org/t/p/original'
    const tvId = route.params.id

    const haveBackdrop = computed(() => {
      if (tvSerie.value.backdrop_path != null) {
        return `background-image: url(${picUrlbg}${tvSerie.value.backdrop_path})`
      } else {
        return ` background: rgb(33,31,31); background: linear-gradient(180deg, rgba(33,31,31,1) 38%, rgba(254,65,65,1) 100%); `
      }
    })

    onBeforeMount(async () => {
      await fetch(`/.netlify/functions/getTvInfo`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: tvId,
      })
        .then((response) => response.json())
        .then((data) => {
          tvSerie.value = data.data
          // console.log(tvSerie.value);
        })
    })

    return {
      tvSerie,
      picUrl,
      haveBackdrop,
    }
  },
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

    li {
      list-style: none;
      background-color: var(--prime-color);
      padding: 0.2rem 0.5rem;
      margin-right: 1rem;
      border-radius: 1rem;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
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
    h3 {}

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
