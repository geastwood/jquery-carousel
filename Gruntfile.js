"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['src/*.js', 'test/*.js', 'temp/*.js'],
                tasks: ['build', 'uglify']
            }
        },
        uglify: {
            options: {
                sourceMap: true,
            },
            dist: {
                src: 'dist/carousel.js',
                dest: 'dist/carousel.min.js'
            }
        },
        requirejs: {
            js: {
                options: {
                    baseUrl: 'src',
                    optimize: 'none',
                    name: 'carouselManager',
                    out: 'dist/carousel.js',
                    /*wrap: true,*/
                    onModuleBundleComplete: function (data) {
                        var fs = require('fs'),
                        amdclean = require('amdclean'),
                        outputFile = data.path;
                        fs.writeFileSync(outputFile, amdclean.clean({
                            'filePath': outputFile,
                            wrap: {
                                'start': ';var IABannerCarousel = (function($) {\n',
                                'end': '\nreturn carouselManager;\n}(jQuery));'
                            }
                        }));
                    }
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('build', ['requirejs:js']);
    grunt.registerTask('default', ['watch']);
};
