<template>
  <div class="backdrop" :style="haveBackdrop">
    <div class="gradian">
      <div id="container" class="container">
        <div class="button">
          <router-link to="/"> <button>&#60; Back</button></router-link>
        </div>
        <div class="flex flex-nowrap top">
          <img
v-if="person.profile_path != null" :src="`${picUrl}${person.profile_path}`" :alt="`${person.name}`"
            class="poster" />
          <div class="movie-info">
            <div class="flex">
              <div class="title">
                <h2>{{ person.name }}</h2>
              </div>
              <div v-if="person.birthday" class="tagline">
                <h4>{{ person.birthday }}</h4>
              </div>
            </div>
            <ul class="genre">
              <li>
                <strong>Place of Birth: </strong> {{ person.place_of_birth }}
              </li>
            </ul>
            <div class="overview">
              <p v-if="person.biography">{{ person.biography }}</p>
              <p v-else>No biography.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="container" class="container">
    <h2 class="margin-top">Know for</h2>
    <div class="grid2 margin-top">

      <div v-if="person.tv_credits" class="similar">
        <h3>Movie</h3>
        <div v-for="(cast, id) in person.movie_credits.cast.slice(0, 30)" :key="id">
          <router-link :to="'/movie/' + cast.id">
            <div class="card flex flex-center">
              <img :src="`${picUrl}${cast.poster_path}`" :alt="cast.title" />

              <h4>{{ cast.vote_average.toFixed(1) }}</h4>

              <p>{{ cast.title }}</p>
              <p>{{ cast.release_date.substring(0, 4) }}</p>
              <p>></p>
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="person.tv_credits" class="recommendations">
        <h3>Tv series</h3>
        <div v-for="(tv, id) in person.tv_credits.cast.slice(0, 30)" :key="id">
          <router-link :to="'/movie/' + tv.id">
            <div class="card flex flex-center">
              <img v-if="tv.poster_path" :src="`${picUrl}${tv.poster_path}`" :alt="tv.title" />
              <div v-else class="empty-poster"></div>

              <h4>{{ tv.vote_average.toFixed(1) }}</h4>

              <p>{{ tv.original_name }}</p>

              <p>{{ tv.first_air_date.substring(0, 4) }}</p>
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
import '@splidejs/vue-splide/css'

export default {
  setup() {
    const person = ref([])
    const route = useRoute()
    const personId = route.params.id
    const picUrl = 'https://image.tmdb.org/t/p/w500'
    const picUrlbg = 'https://image.tmdb.org/t/p/original'

    onBeforeMount(async () => {
      await fetch(`/.netlify/functions/getPersonInfo`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: personId,
      })
        .then((response) => response.json())
        .then((data) => {
          person.value = data.data
          console.log(person.value)
        })
    })

    const haveBackdrop = computed(() => {
      if (person.value.backdrop_path != null) {
        return `background-image: url(${picUrlbg}${person.value.backdrop_path})`
      } else {
        return ` background: rgb(33,31,31); background: linear-gradient(180deg, rgba(33,31,31,1) 38%, rgba(254,65,65,1) 100%); `
      }
    })

    return {
      person,
      picUrl,
      picUrlbg,
      personId,
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
  height: 100%;
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
      line-height: 1.5rem;
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
