<template>
  <v-app>
    <Search />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Search from "@/components/Search.vue";

export default {
  name: "App",
  components: {
    Search,
  },
  data: () => ({
    //
  }),
};
</script>
