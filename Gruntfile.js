var path = require('path');

module.exports = function(grunt) {

    /*************************************************************************/
    // Clean
    /*************************************************************************/
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.config('clean', [ 'public' ]);

    /*************************************************************************/
    // Less
    /*************************************************************************/
    grunt.loadNpmTasks('grunt-contrib-less');
    var lessRoot = 'web-client/less/';
    var lessPattern = '**/*.less';
    grunt.config('less', {
        all: {
           files: [{
               expand: true,
               cwd: lessRoot,
               src: [lessPattern],
               dest: 'public/css',
               ext: '.css'
            }],
        },
        options: {
            cleancss: true
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

    /*************************************************************************/
    // Copy
    /*************************************************************************/

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.config('copy', {
        html: {
            expand: true,
            cwd: 'src',
            src: 'web-client/index.html',
            dest: 'public'
        },
        ext: {
            expand: true,
            cwd: 'ext',
            src: '**',
            dest: 'public/ext'
        },
        assets: {
            expand: true,
            cwd: 'assets',
            src: '**',
            dest: 'public/assets'
        }
    });

    grunt.registerTask('default', [ 'clean', 'less', 'copy' ]);
};