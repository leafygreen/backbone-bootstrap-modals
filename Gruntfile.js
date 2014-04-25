module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    clean: ['dist', 'docco'],
    
    jshint: {
      files: {
        src: ['src/**/*.js']
      }
    },
    
    concat: {
      all: {
        options: {
          banner: '/*!\n  <%= pkg.name %> <%= pkg.version %>\n' +
            '  <%= pkg.repository.url %>\n\n' +
            '  Licensed under the MIT license.\n' +
            '*/\n\n' +
            '(function (root, factory) {\n\n' +
            '  if (typeof define === "function" && define.amd) {\n' +
            '    // AMD (+ global for extensions)\n' +
            '    define(["underscore", "backbone"], function (_, Backbone) {\n' +
            '      return (root.BackboneBootstrapModals = factory(_, Backbone));\n' +
            '    });\n' +
            '  } else if (typeof exports === "object") {\n' +
            '    // CommonJS\n' +
            '    module.exports = factory(require("underscore"), require("backbone"));\n' +
            '  } else {\n' +
            '    // Browser\n' +
            '    root.BackboneBootstrapModals = factory(root._, root.Backbone);\n' +
            '  }' +
            '}(this, function (_, Backbone) {\n\n  "use strict";\n\n',
          footer: '\n\n  return BackboneBootstrapModals;\n' +
            '}));'
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
          output: 'docco/'
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
