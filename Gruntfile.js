var path = require('path');
var shell = require('shelljs');

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
                src: '*',
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
            src: '*.js',
            dest: 'build/client/js'
        },
        extJs: {
            expand: true,
            cwd: 'src/client/ext/js',
            src: '*.js',
            dest: 'build/client/ext/js'
        },
        extCss: {
            expand: true,
            cwd: 'src/client/ext/css',
            src: '*.css',
            dest: 'build/client/ext/css'
        },
        img: {
            expand: true,
            cwd: 'src/client/img',
            src: '*',
            dest: 'build/client/img'
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
            src: '*.js',
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
    // Restart node app
    /*************************************************************************/

    // TODO: can't store pid in zePid because it seems to get erased in between invocations
    // of grunt. Find a different way.

    var nodePid = null;
    grunt.registerTask('app', 'restart node app', function() {
        console.log("********** RESTARTING THE SERVER **********");
        if (nodePid) {
            console.log('killing old node process (nodePid ' + nodePid + ')');
            shell.exec('kill ' + nodePid);
        }
        shell.cd('build/server');
        var f = shell.exec('node --max-old-space-size=8192 app.js', { async: true });
        shell.cd('../..');
        nodePid = f._handle.pid;
        console.log('new node process has pid ' + f._handle.pid);
        console.log("********** RESTARTED THE SERVER **********");
    });

    /*************************************************************************/
    // Watch
    /*************************************************************************/

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.config('watch', {
        client: {
            files: ['src/**/*', 'Gruntfile.js'],
            tasks: ['default'],
            options: { atBegin: true }
        },
        ext: {
            files: [path.join('src/client/ext/**/*.*')],
            tasks: ['default'],
        },
        server: {
            files: ['src/server/**/*'],
            tasks: ['app'],
            options: {
                atBegin: true,
                nospawn: true
            }
        }
    });
    /*************************************************************************/
    // Concat
    /*************************************************************************/

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.config('concat', {
        concat: {
            options: {
                seperator: ";",
                stripBanner: true,
                banner: "/*! NFL Predictions by: Dylan Vu & Anthony Van Pelt */"
            },
            css: {
               src: [ ],
               dest: '',

            },
            extCss: {
                src: [ ],
                dest: '',
            },
            js: {
                src: '',
                dest: 'build/client/js',
            },
            extJs: {
                src: [ ],
                dest: '',
            }
        }
    });

    grunt.registerTask('default', [ 'clean', 'less', 'copy' ]);
};
