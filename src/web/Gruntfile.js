'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    // Metadata. Use this to tweak your paths if you want something different.
    meta: {
      bower: 'public/bower_components',
      less: 'public/less',
      css: 'public/css',
      fonts: 'public/fonts',
      jsSrc: 'public/js/src',
      jsDist: 'public/js/dist'
    },
    browserify: {
      development: {
        options: {
          watch: true,
          keepAlive: true,
          debug: true
        },
        files: {
          '<%= meta.jsDist %>/index.js': '<%= meta.jsSrc %>/index.js'
        }
      },
      dist: {
        files: {
          '<%= meta.jsDist %>/index.js': '<%= meta.jsSrc %>/index.js'
        }
      }
    },
    clean: {
      build: ['<%= meta.jsDist %>', '<%= meta.css %>', '<%= meta.fonts %>']
    },
    concat: {
      options: {
        separator: ';',
        stripBanners: true
      },
      development: {
        files: {
          '<%= meta.jsDist %>/libs.js': [
            '<%= meta.bower %>/lodash/dist/lodash.js',
            '<%= meta.bower %>/angular/angular.js',
            '<%= meta.bower %>/angular-bootstrap/ui-bootstrap-tpls.js',
            '<%= meta.bower %>/angular-ui-router/release/angular-ui-router.js',
            '<%= meta.bower %>/restangular/dist/restangular.js',
            '<%= meta.bower %>/alertify.js/lib/alertify.js'
          ]
        }
      },
      dist: {
        files: {
          '<%= meta.jsDist %>/libs.js': [
            '<%= meta.bower %>/lodash/dist/lodash.min.js',
            '<%= meta.bower %>/angular/angular.min.js',
            '<%= meta.bower %>/angular-bootstrap/ui-bootstrap-tpls.min.js',
            '<%= meta.bower %>/angular-ui-router/release/angular-ui-router.min.js',
            '<%= meta.bower %>/restangular/dist/restangular.min.js',
            '<%= meta.bower %>/alertify.js/lib/alertify.min.js'
          ]
        }
      }
    },
    concurrent: {
      development: {
        tasks: ['watch', 'browserify:development'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    copy: {
      fonts: {
        expand: true,
        flatten: true,
        filter: 'isFile',
        src: ['<%= meta.bower %>/bootstrap/fonts/**'],
        dest: '<%= meta.fonts %>/'
      }
    },
    less: {
      development: {
        options: {
          paths: [
            '<%= meta.bower %>',
            '<%= meta.less %>'
          ]
        },
        files: {
          '<%= meta.css %>/styles.css': '<%= meta.less %>/styles.less'
        }
      },
      dist: {
        options: {
          paths: [
            '<%= meta.bower %>',
            '<%= meta.less %>'
          ],
          compress: false,
          optimization: 2,
          sourceMap: true,
          sourceMapFilename: '<%= meta.css %>/styles.css.map',
          sourceMapBasepath: '<%= meta.css %>/'
        },
        files: {
          '<%= meta.css %>/styles.css': '<%= meta.less %>/styles.less'
        }
      }
    },
    uglify: {
      index: {
        files: {
          '<%= meta.jsDist %>/index.js': '<%= meta.jsDist %>/index.js'
        }
      }
    },
    watch: {
      less: {
        files: ['<%= meta.less %>/**/*.less'],
        tasks: ['less:development'],
        options: {
          livereload: true
        }
      }
    }
  });

  // Load Grunt tasks.
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Local tasks.
  grunt.registerTask('development', ['clean:build', 'concat:development', 'less:development', 'copy:fonts']);
  grunt.registerTask('dist', ['clean:build', 'concat:dist', 'browserify:dist', 'uglify', 'less:dist', 'copy:fonts']);

  grunt.registerTask('default', ['development', 'concurrent:development']);
};
