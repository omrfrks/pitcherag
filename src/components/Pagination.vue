<template>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              class="my-4"
              :length="totalPage"
              @input="pageClicked"
              @next="pageClicked"
              @previous="pageClicked"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { watch, toRefs, reactive } from "@vue/composition-api";
export default {
  setup(props, context) {
    const { $store } = context.root;

    const state = reactive({
      page: $store.state.page,
      totalPage: $store.state.totalPage,
    });

    watch(
      () => $store.state.totalPage,
      (newValue) => {
        state.totalPage = newValue;
      }
    );
    function pageClicked() {
      $store.dispatch("getMovies", {
        value: $store.state.search,
        page: state.page,
      });
    }
    return {
      ...toRefs(state),
      pageClicked,
    };
  },
};
</script>