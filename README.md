# PPMI Participant Authentication Sample
This is a sample project for partners to use when implementing participant authentication against Blackfynn's CDMS. 

We've implemented an OAuth 2.0 Authorization Grant using PKCE against the Blackfynn's participant authentication system (backed by AWS Cognito).


## Project setup
```
yarn install
```

In order to run this example, you will need to update the values in both views, `src/views/Welcome.vue` & `src/views/Home.vue`.

You will need to update the _DOMAIN_, _CLIENT_ID_, _REDIRECT_URI_ values. 


### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
