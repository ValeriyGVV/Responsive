import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";// час 39-15
//import pug from "gulp-pug";

export const html = () => {
	return app.gulp.src(app.path.src.html)
		// .pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "HTML",
				massage: "Error: <%= error.message %>"
			}))
		)
		.pipe(fileInclude())
		/*
			.pipe(pug({
			// Сжатие HTML
			pretty: true,
			// Показать в терминале
			verbose: true
		}))
*/
		// .pipe(fileInclude())
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(                // 1-32-25
			app.plugins.if(
				app.isBuild,
				webpHtmlNosvg()
			)
		)

		.pipe(          // 1-32-25
			app.plugins.if(
				app.isBuild,
				versionNumber({
					'value': '%DT%',
					'append': {
						'key': '_v',
						'cover': 0,
						'to': [
							'css',
							'js',
						]
					},
					'output': {
						'file': 'gulp/version.json'
					}
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browsersync.stream());
} 
