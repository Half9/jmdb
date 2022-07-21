<template>
  <h2>PERSON: {{ person.name }}</h2>
</template>
<script>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const person = ref([]);
    const route = useRoute();
    const picUrl = "https://image.tmdb.org/t/p/w500";
    const personId = route.params.id;

    onBeforeMount(async () => {
      await fetch(`/.netlify/functions/getPersonInfo`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: personId,
      })
        .then((response) => response.json())
        .then((data) => {
          person.value = data.data;
          console.log(person.value);
        });
    });

    return {
      person,
      picUrl,
    };
  },
};
</script>
<style lang="scss"></style>
