
module.exports = function(grunt) {
        var libraries = [
            "node_modules/jquery/dist/jquery.js",
            "node_modules/angular/angular.js",
            "node_modules/angular-ui-router/release/angular-ui-router.js",
            "node_modules/angular-resource/angular-resource.js",
            "node_modules/bootstrap/dist/js/bootstrap.js",
            "node_modules/angular-animate/angular-animate.js",
            "node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
            "node_modules/underscore/underscore.js",
            "node_modules/angular-underscore/index.js",
            "node_modules/angular-cookies/angular-cookies.js",
            "node_modules/js-cookie/src/js.cookie.js",
            "node_modules/toastr/build/toastr.min.js",
            "node_modules/angular-route/angular-route.js",
            "app/dependencies/jquery.colorscroll.js",
            "node_modules/jquery-color/jquery.color.js",
            "node_modules/chart.js/dist/Chart.js",
            "node_modules/angular-chart.js/dist/angular-chart.js",
            "node_modules/highcharts/highcharts.js",
            "node_modules/fullpage.js/jquery.fullPage.js",
            "node_modules/angular-fullpage.js/angular-fullpage.js",
            "app/app.js",
            "app/router.js",
            "app/application/**/*.js",
            "app/factories/**/*.js",
            "app/components/**/*.js",
            "app/dependencies/**/*.js"
        ];


        grunt.initConfig({
                // pkg: grunt.file.readJSON("package.json"),

          jshint: { //Check all selfwritten JS before concatting with jQuery and angularJS


                    // development: {
                    //
                    //     options: {
                    //         force: true
                    //     },
                    //     src: "app/**/*.js"
                    // },
                    // production: {
                    //     options: {
                    //         force: true
                    //     },
                    //     src: "app/**/*.js"
                    // },
                    development: {
                        options: {
                            force: true
                        },
                        src: "app/**/*.js",
                        dest: "dist/app.js"
                    }
                },
                //
        uglify: { //Make it ugly and unreadable - Improves performance a great deal
                    // development: {
                    //     options: {
                    //         mangle: false,
                    //         compress: false,
                    //         beautify: true
                    //     },
                    //     src: libraries,
                    //     dest: "dist/js/main.min.js"
                    // },
                    // production: {
                    //     options: {
                    //         mangle: true,
                    //         compress: true
                    //     },
                    //     src: libraries,
                    //     dest: "dist/js/main.min.js"
                    // },
                    components: {
                          options: {
                              mangle: false,
                              compress: false
                          },
                          src: libraries,
                          dest: "dist/js/main.min.js"
                    }
                },


          less: { //Make it ugly and unreadable - Improves performance a great deal
                    development: {
                        options: {
                            compress: false,
                            ieCompat: true,
                            strictMath: true,
                            syncImport: true,
                        },
                        src: [
                            "app/styles/app.less",
                            'app/styles/application/all.less',
                            "app/styles/night.css",
                            "node_modules/material-icons/css/material-icons.css",
                            "app/styles/bootstrap.css",
                            "node_modules/toastr/build/toastr.css",
                            "node_modules/fullpage.js/jquery.fullPage.css",
                            "node_modules/stroller/client/stroller/stroller.css",
                            "node_modules/animate.css/animate.css"
                        ],
                        dest: "dist/css/main.min.css"
                    },
                    production: {
                        options: {
                            compress: true,
                            ieCompat: true,
                            strictMath: true,
                            syncImport: true,
                        },
                        src: [
                            "app/styles/app.less",
                            "app/styles/bootstrap.css"
                        ],
                        dest: "dist/css/main.min.css"
                    }
                  },
          copy: {
                main: {
                    files: [{
                        expand: true,
                        cwd: "app/",
                        src: "**/*.html",
                        dest: "dist"
                    }, {
                        expand: true,
                        cwd: "node_modules/font-awesome",
                        src: "fonts/*",
                        dest: "dist"
                    }, {
                        expand: true,
                        cwd: "./",
                        src: "public/**/*",
                        dest: "dist"
                    }]
                }
            },

          cssmin: {
                target: {
                  files: [{
                    expand: true,
                    cwd: 'app/style/',
                    src: ['**/*.css'],
                    dest: "dist",
                    ext: 'styles.min.css'
                  }]
                }
              },

          clean: {
                  main: ["dist/*", "tmp/*"]
              },

          watch: {
                // production: {
                //     files: ["app/**/*", "public/**/*"],
                //     tasks: ["clean:main", "jshint:components", "uglify:components", "jshint:production", "uglify:production", "less:production", "copy"],
                //     options: {
                //         debounceDelay: 3000,
                //         spawn: true
                //     }
                // },
                development: {
                    files: ["app/**/*", "public/**/*"],
                    tasks: ["clean:main", "jshint:development", "uglify:components", "less:development", "cssmin:target", "copy:main"],
                    // tasks: ["clean:main", "jshint:development", "less:development", "cssmin:target", "copy:main"],
                    options: {
                        debounceDelay: 3000,
                        spawn: true
                    }
                }
            }
                //     components: {
                //         options: {
                //             compress: true,
                //             ieCompat: true,
                //             strictMath: true,
                //             syncImport: true,
                //         },
                //         src: [
                //             "madplan/src/less/global_comments.less"
                //         ],
                //         dest: "madplan/dist/min/main.min.css"
                //     }
                // },
                // watch: {
                //     production: {
                //         files: ["app/**/*", "public/**/*", "madplan/src/**/*"],
                //         tasks: ["uglify:components", "less:components", "jshint:production", "uglify:production", "less:production"],
                //         options: {
                //             debounceDelay: 3000,
                //             spawn: true
                //         }
                //     },
                //     development: {
                //         files: ["app/**/*", "public/**/*", "madplan/src/**/*"],
                //         tasks: ["uglify:components", "less:components", "jshint:production", "uglify:production", "less:production",
                //             options: {
                //                 debounceDelay: 3000,
                //                 spawn: true
                //             }
                //         }
                //     }

                });

            grunt.loadNpmTasks("grunt-contrib-uglify");
            grunt.loadNpmTasks("grunt-contrib-jshint");
            grunt.loadNpmTasks("grunt-contrib-less");
            grunt.loadNpmTasks("grunt-contrib-watch");
            grunt.loadNpmTasks("grunt-contrib-copy");
            grunt.loadNpmTasks('grunt-contrib-clean');
            grunt.loadNpmTasks("grunt-contrib-cssmin");


            // var environment = grunt.option('environment') || 'development'; //How must it build (production || development)
            // var watch = grunt.option("watch") || false;


            // if (watch) {
                // grunt.registerTask("default", ["jshint:components", "uglify:components", "less:components", "jshint:" + environment, "uglify:" + environment, "less:" + environment, "watch:" + environment]);
            // } else {
                // grunt.registerTask("default", ["jshint:components", "uglify:components", "less:components", "jshint:" + environment, "uglify:" + environment, "less:" + environment]);
                // grunt.registerTask("default", ["jshint:components", "uglify:components", "less:components"]);
                grunt.registerTask("default", ["jshint:development", "uglify:components", "less:development", "cssmin:target", "copy:main"]);
            // }


            // grunt.registerTask("components", ["jshint:components", "uglify:components", "less:components"]);

        };
