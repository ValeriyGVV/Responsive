import dartSass from 'sass';              //--------час 51-44
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; //Сжатие Css файла
import webpcss from 'gulp-webpcss'; //Вівод WEBP изображений 
import autoprefixer from 'gulp-autoprefixer'; //Добавление вендорніх префіксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; //Групіровка медіа запросов  час 57-02

const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SCSS",
				massage: "Error: <%= error.message %>"
			})))
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(sass({                               //----час 52-27
			outputStyle: 'expanded'
		}))
		.pipe(
			app.plugins.if(            //----час 1-33-27
				app.isBuild,
				groupCssMediaQueries()
			)
		)
		.pipe(
			app.plugins.if(  //----час 1-33-27
				app.isBuild,
				autoprefixer({
					grid: true,
					overrideBrowserslist: ["last 3 versions"],  //----час 59-27
					cascade: true
				})
			)
		)
		.pipe(
			app.plugins.if(          //----час 1-33-27
				app.isBuild,
				webpcss(
					{
						webpClass: ".webp",
						noWebpClass: ".no-webp"               //----час 57-27
					}
				)
			)
		)
		// Раскоментировать если нужен не сжатій дубль файла стилей  час 1-00-00
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(
			app.plugins.if(            //----час 1-33-27
				app.isBuild,
			cleanCss()
			)
		)
		.pipe(rename({
			extname: ".min.css"
		}))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream());
}