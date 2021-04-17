<template>
  <div class="movie">
    <Loaders v-if="$store.state.loading" />
    <h1>{{ movie.Title }}</h1>
    <v-img
      :src="
        movie.Poster !== 'N/A' ? movie.Poster : 'https://picsum.photos/200/300'
      "
      max-height="300"
      max-width="500"
    />
    <v-row align="center" class="mx-0">
      <v-rating
        :value="parseFloat(movie.imdbRating)"
        length="10"
        color="amber"
        dense
        half-increments
        readonly
        size="14"
      ></v-rating>

      <div class="grey--text ml-4">
        {{ movie.imdbRating !== "N/A" ? movie.imdbRating : 0 }} ({{
          movie.imdbVotes !== "N/A" ? movie.imdbVotes : 0
        }})
      </div>
    </v-row>
    <div class="my-4 subtitle-1" v-if="movie.Actors !== 'N/A'">
      {{ movie.Actors }}
    </div>
    <div v-if="movie.Plot !== 'N/A'">Plot: {{ movie.Plot }}</div>
    <div>Awards: {{ movie.Awards !== "N/A" ? movie.Awards : "None" }}</div>
    <div v-if="movie.Country !== 'N/A'">Country: {{ movie.Country }}</div>
    <div v-if="movie.Director !== 'N/A'">Director: {{ movie.Director }}</div>
    <div v-if="movie.Genre !== 'N/A'">Genre: {{ movie.Genre }}</div>
    <div v-if="movie.Language !== 'N/A'">Language: {{ movie.Language }}</div>
    <div v-if="movie.Writer !== 'N/A'">Writer: {{ movie.Writer }}</div>
    <div>Year: {{ movie.Year }}</div>
  </div>
</template>
<script>
import { watch, ref } from "@vue/composition-api";
import Loaders from "@/components/Loaders.vue";

export default {
  components: { Loaders },
  setup(props, context) {
    const { $store } = context.root;
    const movie = ref($store.state.movie);
    watch(
      () => $store.state.movie,
      (newValue) => {
        movie.value = newValue;
      }
    );
    return {
      movie,
    };
  },
};
</script>
<style scoped>
.movie {
  width: 70vw;
  margin-left: 15vw;
  margin-top: 2vh;
  display: grid;
  justify-items: center;
  gap: 25px;
}
</style>