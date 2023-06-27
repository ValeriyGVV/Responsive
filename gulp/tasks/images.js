import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {  // час 1-11-32
	return app.gulp.src(app.path.src.images)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "IMAGES",
				massage: "Error: <%= error.message %>"
			}))
		)
		.pipe(app.plugins.newer(app.path.build.images))     // ---час 1-12-53
		.pipe(
			app.plugins.if(
				app.isBuild,
				webp()
			)
		)
		.pipe(   // 1-33-05
			app.plugins.if(
				app.isBuild,
				app.gulp.dest(app.path.build.images)
			)
		)
		.pipe(   // 1-33-05   25  рядок 
			app.plugins.if(
				app.isBuild,
				app.gulp.src(app.path.src.images)
			)
		)
		.pipe(   // 1-33-05   31  рядок 
			app.plugins.if(
				app.isBuild,
				app.plugins.newer(app.path.build.images)
			)
		)
		.pipe(   // 1-33-05   37  рядок 
			app.plugins.if(
				app.isBuild,
				imagemin({
					progressive: true,
					svgoPlugins: [{ removeViewBox: false }],
					interlaced: true,
					optimizationLevel: 3 // 0 to 7
				})
			)
		)
		// .pipe(webp())
		// .pipe(app.gulp.dest(app.path.build.images))
		// .pipe(app.gulp.src(app.path.src.images))
		// .pipe(app.plugins.newer(app.path.build.images))
		// .pipe(imagemin({
		// progressive: true,
		// svgoPlugins: [{ removeViewBox: false }],
		// interlaced: true,
		// optimizationLevel:3 // 0 to 7
		// }))
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.gulp.src(app.path.src.svg))
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.plugins.browsersync.stream());
}