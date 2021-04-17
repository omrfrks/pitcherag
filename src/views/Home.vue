<template>
  <div class="home">
    <div class="movies">
      <MovieCard
        v-for="movie in $store.state.movies"
        :movie="movie"
        :key="movie.title"
      />
      <Loaders v-if="$store.state.loading" />
    </div>
  </div>
</template>

<script>
import MovieCard from "@/components/MovieCard.vue";
import Loaders from "@/components/Loaders.vue";

export default {
  name: "Home",
  components: {
    MovieCard,
    Loaders,
  },
  setup() {},
};
</script>
<style>
.movies {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>