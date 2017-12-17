/* global module:false */
module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;
	var root = grunt.option('root') || '.';

	if (!Array.isArray(root)) root = [root];

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			themes: {
				expand: true,
				cwd: 'css/theme/source',
				src: ['*.sass', '*.scss'],
				dest: 'css/theme',
				ext: '.css'
			}
		},

		connect: {
			server: {
				options: {
					port: port,
					base: root,
					livereload: true,
					open: true,
					useAvailablePort: true
				}
			}
		},

		watch: {
			theme: {
				files: [
					'css/theme/source/*.sass',
					'css/theme/source/*.scss',
					'css/theme/template/*.sass',
					'css/theme/template/*.scss'
				],
				tasks: 'css-themes'
			},
			html: {
				files: root.map(path => path + '/*.html')
			},
			markdown: {
				files: root.map(path => path + '/*.md')
			},
			options: {
				livereload: true
			}
		},

	});

	// Dependencies
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-sass' );
	
	// Default task
	grunt.registerTask( 'default', [ 'serve' ] );

	// Theme CSS
	grunt.registerTask( 'css-themes', [ 'sass:themes' ] );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'connect', 'watch' ] );

};
