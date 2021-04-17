import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movie: {},
    movies: [],
    loading: false,
    search: "",
    error: "",
    page: 1,
    totalPage: 1,
  },
  mutations: {
    updateMovie(state, newMovie) {
      state.movie = newMovie;
    },
    updateMovies(state, movies) {
      state.movies = movies;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    setError(state, error) {
      state.error = error;
    },
    setSearch(state, value) {
      state.search = value;
    },
    updatePage(state, page) {
      state.page = page;
    },
    updateTotalPage(state, totalPage) {
      state.totalPage = totalPage;
    },
  },
  getters: {
    movieNames: (state) => (searchValue) => {
      return state.movies.map((e) => {
        (e.Title || "")
          .toLowerCase()
          .indexOf((searchValue || "").toLowerCase()) > -1;
        return e.Title;
      });
    },
  },
  actions: {
    getMovies: ({ commit }, { value, page }) => {
      commit("updatePage", page);
      commit("updateMovies", []);
      commit("setLoading", true);
      axios
        .get(
          `https://www.omdbapi.com/?s=${value}&y=2020&apikey=f353fc1c&type=movie&page=${page}`
        )
        .then((response) => {
          if (response.data.Search) {
            commit(
              "updateTotalPage",
              Math.max(1, Math.ceil(response.data.totalResults / 10))
            );
            commit("updateMovies", response.data.Search);
            commit("setError", "");
          } else if (response.data.Error === "Too many results.") {
            commit("setError", "Continue typing...");
            commit("updateMovies", []);
          } else {
            commit("setError", response.data.Error);
            commit("updateMovies", []);
          }
          commit("setLoading", false);
        });
    },
    getMovie: ({ commit }, movieTitle) => {
      commit("updateMovie", {});
      commit("setLoading", true);
      if (!localStorage.getItem(movieTitle)) {
        axios
          .get(
            `https://www.omdbapi.com/?t=${movieTitle}&y=2020&plot=full&apikey=f353fc1c&type=movie`
          )
          .then((response) => {
            const parsed = JSON.stringify(response.data);
            localStorage.setItem(movieTitle, parsed);
            commit("updateMovie", response.data);
            commit("setLoading", false);
          });
      } else {
        const movie = JSON.parse(localStorage.getItem(movieTitle));
        commit("updateMovie", movie);
        commit("setLoading", false);
      }
    },
  },
  modules: {},
});
