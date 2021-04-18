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
  mutations: {
    setMovie(state, newMovie) {
      state.movie = newMovie;
    },
    setMovies(state, movies) {
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
    setPage(state, page) {
      state.page = page;
    },
    setTotalPage(state, totalPage) {
      state.totalPage = totalPage;
    },
  },
  actions: {
    getMovies: ({ commit }, { value, page }) => {
      commit("setPage", page);
      commit("setMovies", []);
      commit("setLoading", true);
      axios
        .get(
          `https://www.omdbapi.com/?s=${value}&y=2020&apikey=${process.env.VUE_APP_API_KEY}&type=movie&page=${page}`
        )
        .then((response) => {
          if (response.data.Search) {
            commit(
              "setTotalPage",
              Math.max(1, Math.ceil(response.data.totalResults / 10))
            );
            commit("setMovies", response.data.Search);
            commit("setError", "");
          } else if (response.data.Error === "Too many results.") {
            commit("setError", "Continue typing...");
            commit("setMovies", []);
          } else {
            commit("setError", response.data.Error);
            commit("setMovies", []);
          }
          commit("setLoading", false);
        });
    },
    getMovie: ({ commit }, movieTitle) => {
      commit("setMovie", {});
      commit("setLoading", true);
      if (!localStorage.getItem(movieTitle)) {
        axios
          .get(
            `https://www.omdbapi.com/?t=${movieTitle}&y=2020&plot=full&apikey=${process.env.VUE_APP_API_KEY}&type=movie`
          )
          .then((response) => {
            const parsed = JSON.stringify(response.data);
            localStorage.setItem(movieTitle, parsed);
            commit("setMovie", response.data);
            commit("setLoading", false);
          });
      } else {
        const movie = JSON.parse(localStorage.getItem(movieTitle));
        commit("setMovie", movie);
        commit("setLoading", false);
      }
    },
  },
  modules: {},
});
