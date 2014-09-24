"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['src/*.js'],
                tasks: ['build']
            }
        },
        requirejs: {
            js: {
                options: {
                    baseUrl: 'src',
                    optimize: 'none',
                    name: 'carousel',
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
                                'end': '\nreturn carousel;\n}(jQuery));'
                            },
                            //globalModules: ['IABannerCarousel']
                        }));
                    }
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('build', ['requirejs:js']);
    grunt.registerTask('default', ['watch']);
};
