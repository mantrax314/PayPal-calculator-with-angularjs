module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['Gruntfile.js', 'app/*.js', 'app/modules/**/*.js']
        },        
        pug: {
            compile: {
                options: {
                    pretty: true,
                },
                files: [{
                    expand: true,
                    cwd: './src/views',
                    src: ['**/*.pug', '!includes/**', '!index.pug', '!index-dev.pug',],
                    dest: 'app/modules/',
                    ext: '.html',
                }, {
                    'index.html': 'src/views/index.pug',
                    'index-dev.html': 'src/views/index-dev.pug'
                }]
            }
        },
        watch: {
            options: {
                livereload: true,
            },           
            js: {
                files: ['Gruntfile.js', 'app/*.js', 'app/modules/**/*.js'],
                tasks: ['newer:jshint'], 
            },
            pug: {
                files: ['src/views/**/*.pug'],
                tasks: ['newer:pug']
            },
            html: {
                files: ['index.html', 'app/**/*.html', 'app/**/**/*.html'],
            },
        },
        concat: {
            dist: {
                src: [
                    //app
                    'app/app.js',
                    //root module
                    'app/**/**/*module*.js',
                    //js
                    'app/**/**/*.js',
                    '!app/modules/core/i18n/*.js',
                ],
                dest: 'build/app.paypal-calculator-with-angularjs.js',
            },
            css: {
                src: [
                    'node_modules/bootstrap/dist/css/bootstrap.css',
                    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
                    'node_modules/toastr/build/toastr.min.css',
                    'node_modules/angular-loading-bar/build/loading-bar.min.css'
                ],
                dest: 'build/style/style.css',
            },
            node: {
                src: [
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/bootstrap/dist/js/bootstrap.min.js',
                    'node_modules/angular/angular.js',
                    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
                    'node_modules/angular-route/angular-route.min.js',
                    'node_modules/angular-translate/dist/angular-translate.min.js',
                    'node_modules/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
                    'node_modules/angular-sanitize/angular-sanitize.min.js'
                ],
                dest: 'build/node_modules.js'
            }
        },
        uglify: {
            options: {
                compress: true,
                mangle: false,
                beautify: false,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= pkg.author %> -' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            build: {
                src: 'build/app.paypal-calculator-with-angularjs.js',
                dest: 'build/app.paypal-calculator-with-angularjs.min.js'
            }
        }, 
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: {
                        path: '.',
                        options: {
                            index: 'index-dev.html',
                        }
                    },
                    hostname: 'localhost',
                    protocol: 'http',
                    livereload: true,
                    open: true,
                }
            }
        },
    });

    // Grunts plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify'); 

    //production
    grunt.registerTask('production', [
        'concat',
        'uglify'
    ]);

    // Start the http server for development
    grunt.registerTask('server', [
        'jshint',
        'pug',
        'connect',
        'watch'
    ]);
};