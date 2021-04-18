# pitcherag
[![Netlify Status](https://api.netlify.com/api/v1/badges/07e42b40-f8df-42bb-a790-f9c0fb174ace/deploy-status)](https://app.netlify.com/sites/pitcherag/deploys)
## Live

[Live Demo](https://pitcherag.netlify.app)

## Env

i remove the api key from code and added as .env variable. At netlify env variable added.
VUE_APP_API_KEY=f353fc1c

## Usage

To see results user should start typing, if api returns "too many results" error, user will be informed as "continue typing", if api returns "movie not found" error, user will be informed with same error. if api return movies, movie titles will be shown at input area with highlighted text and movies will be shown as cards with poster at page. user can click to "see details" button at movie card or can click to title at input suggestion area to see details of movie at movie page. movie cached with localstorage according to their titles. User can see other search results with pagination.

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```
