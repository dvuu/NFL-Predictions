var path = require('path');
var shell = require('shelljs');

module.exports = function(grunt) {

    /*************************************************************************/
    // Clean
    /*************************************************************************/
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.config('clean', {
        pre: 'build',
        post: 'build/intermediates'
    });

    /*************************************************************************/
    // JS lint
    /*************************************************************************/
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.config('jshint', {
        options: {
            force: true
        },
        beforeconcat: 'src/client/js/*.js'
    });

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
                dest: 'build/intermediates/css',
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
        index: {
            expand: true,
            cwd: 'src/client',
            src: ['index.html', 'topGames.html'],
            dest: 'build/client'
        },
        topTen: {
            expand: true,
            cwd: 'src/client/topTen',
            src: '*.html',
            dest: 'build/client'
        },
        topTenjs: {
            expand: true,
            cwd: 'src/client/topTen',
            src: '*.js',
            dest: 'build/client/assets/js'
        },
        // extJs: {
        //     expand: true,
        //     cwd: 'src/client/ext/js',
        //     src: '*.js',
        //     dest: 'build/client/assets/ext/js'
        // },
        // extCss: {
        //     expand: true,
        //     cwd: 'src/client/ext/css',
        //     src: '*.css',
        //     dest: 'build/intermediates/client/ext/css'
        // },
        img: {
            expand: true,
            cwd: 'src/client/img',
            src: '*',
            dest: 'build/client/assets/images'
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
        css: {
            src: ['src/client/ext/css/*.css', 'build/intermediates/css/*.css'],
            dest: 'build/client/assets/css/style.css',
        },
        jsCommon: {
            src: ['src/client/ext/js/jquery-1.12.3.min.js', 'src/client/ext/js/*.js', 'src/client/js/chartObj2.js', 'src/client/js/chartObj.js', 'src/client/js/playInfoObj.js', 'src/client/js/topTenObj.js', 'src/client/js/fieldObj.js'],
            dest: 'build/client/assets/js/common.js',
            options: {
                banner: '// NFL Predictor - Dylan Vu, Anthony Van Pelt\n// ' + new Date().toString() + '\n;(function() {\n',
                separator: '\n})();\n(function() {\n',
                footer: '\n})();\n'
            }
        },
        jsIndex: {
            src: ['src/client/js/index.js'],
            dest: 'build/client/assets/js/index.js',
            options: {
                banner: '// NFL Predictor - Dylan Vu, Anthony Van Pelt\n// ' + new Date().toString() + '\n;(function() {\n',
                separator: '\n})();\n(function() {\n',
                footer: '\n})();\n'
            }
        },
        jsTopGames: { 
            src: ['src/client/js/topGames.js'],
            dest: 'build/client/assets/js/topGames.js',
            options: {
                banner: '// NFL Predictor - Dylan Vu, Anthony Van Pelt\n// ' + new Date().toString() + '\n;(function() {\n',
                separator: '\n})();\n(function() {\n',
                footer: '\n})();\n'
            }
        }
    });

    grunt.registerTask('default', [ 'clean:pre', 'copy', 'less', 'concat', 'clean:post']);
};
