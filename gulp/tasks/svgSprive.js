import svgSprite from "gulp-svg-sprite";

export const svgSprive = () => {  // час 1-11-32
	return app.gulp.src(`${app.path.src.svgicons}`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SVG",
				massage: "Error: <%= error.message %>"
			}))
		)
		.pipe(svgSprite({ // час 1-27-25
			mode: {
				stack: {
					sprite: `../icons/icons.svg`,
					// Створюєм сторінку з переліком іконок
					example: true
				}
			},
		}))
		.pipe(app.gulp.dest(`${app.path.build.images}`));
}