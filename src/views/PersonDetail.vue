<template>
  <div class="backdrop" v-bind:style="haveBackdrop">
    <div class="gradian">
      <div class="container" id="container">
        <div class="button">
          <router-link to="/"> <button>&#60; Back</button></router-link>
        </div>
        <div class="flex flex-nowrap top">
          <img v-if="person.profile_path != null" :src="`${picUrl}${person.profile_path}`" :alt="`${person.name}`"
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
            <div class="status" v-if="person.status">
              <p>
                <strong>{{ person.status }}</strong>
                <span v-if="person.status == 'Released'">
                  in {{ person.release_date.substring(0, 4) }}</span>
              </p>
            </div>
            <div class="runtime" v-if="person.runtime > 0">
              <p>{{ runeTime(person.runtime) }}</p>
            </div>
            <div class="buget" v-if="person.budget > 0">
              <p>Budget: {{ person.budget.toLocaleString() }}</p>
            </div>
            <div class="revenue" v-if="person.revenue > 0">
              <p>Revenue {{ person.revenue.toLocaleString() }}</p>
            </div>
            <div class="calc" v-if="person.revenue > 0">
              <p>
                Profit:
                {{ (person.revenue - person.budget).toLocaleString() }}
              </p>
            </div>
            <div class="collection flex" v-if="person.belongs_to_collection">
              <span> {{ person.belongs_to_collection.name }}</span>
            </div>
          </div>
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
