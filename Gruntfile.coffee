module.exports = (grunt)->

  grunt.loadNpmTasks('grunt-contrib-compass')
  grunt.loadNpmTasks('grunt-typescript')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.registerTask('default', ['typescript', 'concat', 'uglify', 'clean', 'copy', 'compass'])
  grunt.registerTask('server', ['connect'])

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')

    uglify:
      dist:
        files: 'build/funnytap.min.js': ['build/funnytap.js']

    concat:
      hackleview:
        src: [
          'src/ts/hackleview.js',
          'src/ts/apprication.js',
          'src/ts/layout.js',
          'src/ts/controller.js',
          'src/ts/funnytap-view.js'
        ]

        dest: 'build/funnytap.js'

      options:
        separator: ';'

    copy:
      assets:
        files: [{
          expand: true
          cwd: 'assets/'
          src: ['**/*.*']
          dest: 'build/imgs/'
        }]

      hbs:
        files: [{
          expand: true
          cwd: 'src/hbs'
          src: ['**/*.hbs']
          dest: 'build/hbs/'
        }]

      html:
        files: [{
          expand: true
          cwd: 'src/html'
          src: ['**/*.html']
          dest: 'build/'
        }]

      jquery:
        files: [{
          expand: true
          cwd: 'bower_components/jquery/dist/'
          src: ['jquery.min.js']
          dest: 'build/js/'
        }]

      handlebars:
        files: [{
          expand: true
          cwd: 'bower_components/handlebars/'
          src: ['handlebars.min.js']
          dest: 'build/js/'
        }]

    typescript:
      base:
        src: ['src/ts/**/*.ts', 'tests/**/*.ts']
        options:
          sourceMap: false

    compass:
      dist:
        options:
          config: 'config.rb'

    watch:
      typescript:
        files: ['src/ts/**/*.ts', 'tests/**/*.ts']
        tasks: ['typescript', 'concat', 'uglify', 'clean', 'copy']
        options:
          atBegin: true

      css:
        files: ['src/scss/**/*.scss']
        tasks: ['compass']
        options:
          atBegin: true

      hbs:
        files: ['src/hbs/**/*.hbs']
        tasks: ['clean', 'copy:hbs']
        options:
          atBegin: true

      html:
        files: ['src/html/**/*.html']
        tasks: ['copy:html']
        options:
          atBegin: true

    clean: ['src/**/*.js', 'build/hbs/**/*.hbs']

    connect:
      server:
        options:
          port: 8000
          base: 'build'
          keepalive: true

  })
