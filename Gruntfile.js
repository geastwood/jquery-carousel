"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['src/*.js', 'test/*.js', 'temp/*.js'],
                tasks: ['build', 'uglify']
            }
        },
        uglify: {
            options: {
                sourceMap: true,
                banner: '/*!'                                                           + '\n' +
                            'name:          <%= pkg.name %>'                            + '\n' +
                            'version:       v<%= pkg.version %>'                        + '\n' +
                            'repo:          <%= pkg.repository.url %>'                  + '\n' +
                            'readme:        <%= pkg.repository.readme %>'               + '\n' +
                            'compiled at:   <%= grunt.template.today("yyyy-mm-dd") %>'  + '\n' +
                        '*/'
            },
            dist: {
                src: 'dist/carousel.js',
                dest: 'dist/carousel.min.js'
            }
        },
        requirejs: {
            js: {
                options: {
                    baseUrl: '.',
                    paths: {
                        jquery: 'bower_components/jquery/jquery',
                        squire: 'bower_components/squire/src/Squire'
                    },
                    optimize: 'none',
                    name: 'src/carouselManager',
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
                                'end': '\nreturn src_carouselManager;\n}(jQuery));'
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
