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
    <Pagination v-if="$store.state.totalPage > 1" />
  </div>
</template>

<script>
import MovieCard from "@/components/MovieCard.vue";
import Loaders from "@/components/Loaders.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "Home",
  components: {
    MovieCard,
    Loaders,
    Pagination,
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