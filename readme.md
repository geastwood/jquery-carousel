# Carousel plugin for banners (the jQuery way)

## setup

* `bower install`
* `npm install`

## what to use

Under `dist` folder, there are

* `carousel.js`
* `carousel.min.js`         => minified version
* `carousel.min.js.map`     => source map for helping debug

The `carousel.min.js` is for **production** use. In order to get the latest version, run `grunt build` to build manually.

## grunt commands

* `grunt` -> which monitors the file changes and runs `grunt:build`
* `grunt build` -> build to `dist` and `uglify`

## what to open in browser

*8* templates in browser

* 120x600.html
* 160x600.html
* 300x250.html
* 300x600.html
* 336x280.html
* 468x60.html
* 728x90.html
* 970x90.html

## what to watch out

* if to use together `live reload`, be sure to only monitor the `dist` folder for changes

## TODOs

* [x] handle direction
* [x] timer/rotation
* [x] different template update product differently
* [x] handle browser compatibility
* [x] 300x600     -> arrow flash
* [x] 120x600     -> arrow flash
* [x] add uglify
* [ ] to add additional css
* [ ] check hover show/hide
* [ ] Remove inline javascript, hover functions
