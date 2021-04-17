<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-img
      height="250"
      :src="
        movie.Poster !== 'N/A' ? movie.Poster : 'https://picsum.photos/200/300'
      "
    ></v-img>

    <v-card-title>{{ movie.Title }}</v-card-title>

    <v-card-text>
      <v-row v-if="movie.imdbRating" align="center" class="mx-0">
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
          {{ movie.imdbRating }} ({{ movie.imdbVotes }})
        </div>
      </v-row>

      <div class="my-4 subtitle-1">{{ movie.Actors }}</div>

      <div>
        {{ movie.Plot }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="clicked">
        See details
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { reactive, toRefs, onMounted } from "@vue/composition-api";

export default {
  props: ["movie"],
  setup(props, context) {
    const { $store, $router } = context.root;
    const state = reactive({
      loading: true,
    });
    function clicked() {
      $router.push({ name: "Movie" });
      $store.dispatch("getMovie", props.movie.Title);
    }
    onMounted(() => {
      state.loading = false;
    });
    return {
      ...toRefs(state),
      clicked,
    };
  },
};
</script>