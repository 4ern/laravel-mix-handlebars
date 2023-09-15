# laravel-mix-handlebars plugin for [Laravel-Mix](https://github.com/JeffreyWay/laravel-mix)

With this plugin you can use [Handlebars](https://github.com/wycats/handlebars.js) and [Handlebars-Layout](https://github.com/shannonmoeller/handlebars-layouts) with Laravel-Mix.

## Install:

```
$ npm install --save-dev laravel-mix-handlebars
```
or

```
$ yarn add --dev laravel-mix-handlebars
```

## Usage:

in your `webpack.mix.js`:

```js
const mix = require('laravel-mix');
require('laravel-mix-handlebars');

/// mix.handlebars('your source folder', 'your dist or public folder', {your vars})
mix.handlebars('src/', 'dist/');
```

Passing variable
```js
mix.handlebars('src/', 'dist/', {
    "TITLE" : "Example Title"
});
```
in `.hbs`
```hbs
{{TITLE}}
```

## Note:
- The file extension must be `.hbs`.
- Partials must begin with an underscore so that they are recognized as partials. `_myPartial.hbs`.

## Workaround for BrowserSync:

```js
// webpack.mix.js
const mix = require('laravel-mix');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

mix.webpackConfig(() => {
    return {
        plugins: [
            new BrowserSyncPlugin({
                host: 'localhost',
                port: 3003,
                watch: true,
                server: { baseDir: ['dist'] }
            })
        ]
    };
});
```
