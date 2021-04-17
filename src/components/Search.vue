<template>
  <v-toolbar dark color="orange">
    <v-toolbar-title>Search Movie</v-toolbar-title>
    <v-autocomplete
      v-model="select"
      :loading="$store.state.loading"
      :items="$store.getters.movieNames(search)"
      :search-input.sync="search"
      class="mx-4"
      hide-details
      flat
      autofocus
      loader-height="3"
      :no-data-text="$store.state.error"
      label="Start typing..."
      @input="selected"
      solo-inverted
    ></v-autocomplete>
  </v-toolbar>
</template>
<script>
import { watch, toRefs, reactive } from "@vue/composition-api";

export default {
  setup(props, context) {
    const state = reactive({
      select: "",
      search: "",
    });
    const { $store, $router } = context.root;

    function selected() {
      if ($router.history.current.name !== "Movie") {
        $router.push({ name: "Movie" });
      }
      $store.dispatch("getMovie", state.select);
    }
    watch(
      () => state.search,
      (searchValue) => {
        if (
          $router.history.current.name !== "Home" &&
          searchValue !== state.select
        ) {
          $router.push({ name: "Home" });
        }
        searchValue &&
          searchValue !== state.select &&
          $store.dispatch("getMovies", { value: searchValue, page: 1 }) &&
          $store.commit("setSearch", searchValue);
      }
    );
    return {
      ...toRefs(state),
      selected,
    };
  },
};
</script>
<style scoped>
.v-toolbar {
  flex: none;
}
</style>