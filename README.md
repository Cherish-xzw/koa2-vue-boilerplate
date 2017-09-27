# Koa2-vue-boilerplate
> An admin application template using koa2 and vue.

this boilerplate clone built with [vuejs-templates](https://github.com/vuejs-templates/webpack), based on [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

## Environments
Make sure that you have Node.js v6 or newer and npm installed on your development machine. Because it will be better

* node ^6.0.0
* npm ^5.0.0

## Clone this repository

```
$ git clone http://gitlab.whup.com/UPOem-WebApplication/koa2-vue-boilerplate.git MyApp
$ cd MyApp
$ npm install        # Install project dependencies listed in package.json
```

If you just want to start a new project without the koa2 boilerplate commit history then you can do:

```
$ git clone --depth=1 http://gitlab.whup.com/UPOem-WebApplication/koa2-vue-boilerplate.git MyApp
```

The depth=1 tells git to only pull down one commit worth of historical data.

## In development mode

Compile and launch your app by running:

```
# Compiles the app and opens it in a browser with "hot reload"
# running at http://0.0.0.0:3000

$ npm run dev

```

```
# Open the backend API server
# running at http://0.0.0.0:4000

$ npm run server
```

Or start frontend and backend together
```
# Start frontent and backend concurrently
$ npm start
```


## In porduction mode

A `build` script to bundle JS, CSS, and Images for production, with sourcemaps.

```
$ npm run build
```
