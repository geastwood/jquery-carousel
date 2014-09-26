# Carousel the jQuery way

## setup

* `bower install`
* `npm install`

## output

Under `dist` folder, there are

* `carousel.js`
* `carousel.min.js`         => minified version
* `carousel.min.js.map`     => source map for helping debug

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
