var path = require('path');

module.exports = function(grunt) {

    /*************************************************************************/
    // Clean
    /*************************************************************************/
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.config('clean', [ 'build' ]);

    /*************************************************************************/
    // Less
    /*************************************************************************/
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.config('less', {
        all: {
            files: [{
                expand: true,
                cwd: 'src/client/less',
                src: '*.less',
                dest: 'build/client/css/',
                ext: '.css'
            }],
        },
        options: {
            cleancss: true
        }
    });
 
    /*************************************************************************/
    // Copy
    /*************************************************************************/

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.config('copy', {
        html: {
            expand: true,
            cwd: 'src/client',
            src: 'index.html',
            dest: 'build/client'
        },
        js: {
            expand: true,
            cwd: 'src/client/js',
            src: '*',
            dest: 'build/client/js'
        },
        img: {
            expand: true,
            cwd: 'src/client/img',
            src: '*',
            dest: 'build/client/img'
        },
        ext: {
            expand: true,
            cwd: 'src/client/ext',
            src: '*',
            dest: 'build/client/ext'
        },
        server: {
            expand: true,
            cwd: 'src/server',
            src: '*.js',
            dest: 'build/server'
        },
        utilities: {
            expand: true,
            cwd: 'src/utilities',
            src: 'csv.js',
            dest: 'build/utilities',
        },
        data: {
            expand: true,
            cwd: 'src/data',
            src: 'trained-data/*',
            dest: 'build/data'
        }
    });
    
    /*************************************************************************/
    // Watch
    /*************************************************************************/

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.config('watch', {
        code: {
            files: ['src/**/*', 'ext/**/*', 'Gruntfile.js'],
            tasks: ['default'],
            options: { atBegin: true }
        },
        ext: {
            files: [path.join('src/client/ext/**/*.*')],
            tasks: ['default'],
        },
        app: {
            files: 'app.js',
            tasks: ['app'],
            options: {
                atBegin: true,
                nospawn: true
            }
        }
    });

    grunt.registerTask('default', [ 'clean', 'less', 'copy' ]);
};