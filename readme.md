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

## how to use

1. run `npm install` and `grunt build`
2. load the plugin js `carousel.min.js` under `dist`
3. init carousel by calling `IABannerCarousel.init`, e.g.

```js
IABannerCarousel.init([{
        iden: 'a23363276cb946490cd990200fd2401d',
        config: { elLocator: 'find' }
    }, {
        iden: '31abc6c6c2927fd4f4355ffbe692bde4',
        config: { rotate: true, count: 3, step: 1 }
    }, {
        iden: '8b99ee2e74b813ad2ce20956e485c105',
        config: { rotate: true, count: 2, step: 1, orientation: 'landscape' }
    }]);
```

## grunt commands

* `grunt` -> which monitors the file changes and runs `grunt:build`
* `grunt build` -> build to `dist` and `uglify`

## what to open in browser

*8* templates in browser

**in order to view in browser, be sure to run `bower install` to get `jQuery` first**

**you may also need a server, run `php -S localhost:8888`** to start a server and type in `localhost:8888/120x600.html`

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
