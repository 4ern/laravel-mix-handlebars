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

## Note:
- The file extension must be `.hbs`.
- Partials must begin with an underscore so that they are recognized as partials. `_myPartial.hbs`.
