module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    clean: ['dist', 'docs'],
    
    jshint: {
      files: {
        src: ['src/**/*.js']
      }
    },
    
    concat: {
      all: {
        options: {
          banner: '/*!\n  <%= pkg.name %> <%= pkg.version %>\n' +
            '  Licensed under the MIT license.\n' +
            '*/\n\n' +
            '(function (root) {\n\n' +
            '"use strict";\n\n',
          footer: '\nroot.BackboneBootstrapModals = BackboneBootstrapModals;\n\n' +
            '}(this));'
        },
        src: [
          'src/initializer.js',
          'src/base_header_view.js',
          'src/base_body_view.js',
          'src/base_footer_view.js',
          'src/base_modal.js',
          'src/confirmation_modal.js',
          'src/wizard_modal.js'
        ],
        dest: 'lib/backbone-bootstrap-modals.js'
      }
    },

    uglify: {
      options: {
        preserveComments: "some"
      },
      default: {
        files: {
          "lib/backbone-bootstrap-modals.min.js": ["lib/backbone-bootstrap-modals.js"]
        }
      }
    },

    docco: {
      debug: {
        src: ['lib/backbone-bootstrap-modals.js'],
        options: {
          output: 'docs/'
        }
      }
    },

    mocha: {
      test: {
        src: ['test/index.html'],
        options: {
          run: true
        }
      },
    },
    
    watch: {
      default: {
        files: ['src/**/*.*'],
        tasks: ['jshint', 'concat:all']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('default', ['clean', 'jshint', 'concat:all', 'mocha', 'uglify']);

};
