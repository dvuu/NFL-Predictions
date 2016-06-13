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
               cwd: 'src-client/less',
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
            cwd: 'src-client',
            src: 'index.html',
            dest: 'build/client'
        },
        js: {
            expand: true,
            cwd: 'src-client/javascript',
            src: '*.js',
            dest: 'build/client/js'
        },
        img: {
            expand: true,
            cwd: 'src-client/img',
            src: '*',
            dest: 'build/client/img'
        },
        server: {
            expand:true,
            cwd: 'src-server',
            src: '*',
            dest: 'build/server'
        },
        util: {
            expand: true,
            cwd: 'utilities',
            src: 'csv.js',
            dest: 'build/server',
        },
        data: {
            expand: true,
            cwd: '.',
            src: 'data/**',
            dest: 'build/server'
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