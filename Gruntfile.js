module.exports = function (grunt) {

  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'public',
          hostname: 'localhost',
          open: true
        }
      }
    },
    sass: {
      dist: {
        files: {
          'public/dist/css/style.css' : 'public/scss/style.sass'
        }
      }
    },
    jade: {
      compile: {
        options: {
          pretty: true,
        },
        files:
        [ {
          cwd: "public/jade",
          src: "**/*.jade",
          dest: "public/dist",
          expand: true,
          ext: ".html"
        } ]
      }
    },

    copy: {
            release: {
                src: 'libs/*',
                dest: '/public/dist/assets'
            }
        }, 

    watch: {
      project: {
        files: ['public/dist/js/*.js', 'public/*.html', 'public/dist/css/*.css', 'public/dist/img/*.*'],
        options: {
          livereload: true
        }
      },
      css: {
        files: 'public/scss/**/*.sass',
        tasks: ['sass']
      },
      jade: {
        files: 'public/jade/**/*.jade',
        tasks: ['jade']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-copy');

  grunt.registerTask('default', ['jade', 'sass', 'connect', 'watch', 'copy']);
};