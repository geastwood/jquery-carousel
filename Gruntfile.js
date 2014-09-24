"use strict";

module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            scripts: {
                files: ['src/*.js', 'test/*.js'],
                tasks: ['intern', 'build']
            }
        },
        intern: {
            client: {
                options: {
                    // for other available options, see:
                    // https://github.com/theintern/intern/wiki/Using-Intern-with-Grunt#task-options
                    config: 'test/intern'
                }
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
                            }
                        }));
                    }
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('intern');
    grunt.registerTask('build', ['requirejs:js']);
    grunt.registerTask('test', ['intern']);
    grunt.registerTask('default', ['watch']);
};
