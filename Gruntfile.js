/*global module:false*/
module.exports = function(grunt) {

    /************************************************************************
     * GLOBAL CONFIGURATION
     *************************************************************************/
    var globalConfig = {
        src        :'source',
        dest       :'public/assets',
        angular    :'public/app/modules/stage'
    };



    /************************************************************************
     * TASKS CONFIGURATIONS
     ***********************************************************************/
    grunt.initConfig({
        /*******************************
         * VARS
         ******************************/
        globalConfig: globalConfig,
        pkg: grunt.file.readJSON('package.json'),

        /*******************************
         * JAVASCRIPT CONCAT
         *******************************/
        concat: {
            options: {
                separator: '\n'
            },
            dist: {
                src: [
                    '<%= globalConfig.src %>/javascripts/vendors/jquery.js',
                    '<%= globalConfig.src %>/javascripts/vendors/angular.js',
                    '<%= globalConfig.src %>/javascripts/vendors/angular-animate.js',
                    '<%= globalConfig.src %>/javascripts/vendors/materialize.min.js',
                    '<%= globalConfig.src %>/javascripts/javascript.js'
                ],
                dest: '<%= globalConfig.dest %>/javascripts/combo.js'
            },
            angular : {
                src: [
                    '<%= globalConfig.angular %>/stage.js',
                    '<%= globalConfig.angular %>/controllers/*.js',
                    '<%= globalConfig.angular %>/directives/*.js'
                ],
                dest: '<%= globalConfig.dest %>/javascripts/app.js'
            }
        },

        /*******************************
         * LESS COMPILATION
         *******************************/
        less: {
            development: {
                options: {
                    paths: ["<%= globalConfig.dest %>"],
                    plugins : [ new (require('less-plugin-autoprefix'))({browsers : [ "last 2 versions" ]}) ]
                },
                files: {
                    "<%= globalConfig.dest %>/stylesheet.css": "<%= globalConfig.src %>/less/style.less"
                }
            },
            production: {
                options: {
                    paths: ["<%= globalConfig.dest %>"],
                    plugins : [ new (require('less-plugin-autoprefix'))({browsers : [ "last 2 versions" ]}) ]
                },
                files: {
                    "<%= globalConfig.dest %>/stylesheet.css": "<%= globalConfig.src %>/less/style.less"
                }
            }
        },

        /******************************
         * WATCH FILES
         *******************************/
        watch: {
            css: {
                files: '<%= globalConfig.src %>/less/**/*.less',
                tasks: ['less:development']
            },
            jsConcat: {
                files: '<%= globalConfig.src %>/javascripts/**/*.js',
                tasks: ['concat:dist']
            },
            angularConcat: {
                files: '<%= globalConfig.angular %>/**/*.js',
                tasks: ['concat:angular']
            }
        }

    });

    /*****************************
     * LOAD TASKS
     *****************************/
    require('load-grunt-tasks')(grunt);

    /*****************************
     * REGISTER TASKS
     *****************************/
    grunt.registerTask('dev', ['less:development', 'concat', 'watch']);

};