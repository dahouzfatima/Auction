const mix = require('laravel-mix');
require('react-refresh-webpack-plugin');

mix.js('resources/js/app.js', 'public/js')
   .react()
   .sass('resources/sass/app.scss', 'public/css');
