import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';   //-------час 1-18-06 

export const otfToTtf = () => {
	// Шукаєм файлі шрифтов .otf
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				massage: "Error: <%= error.message %>"
			}))
		)
		// Конвертуєм в ttf
		.pipe(fonter({
			formats: ['ttf']
		}))
		// Вигружаєм в исходную папку
		.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}
//   час 1-19-33
export const ttfToWoff = () => {
	// Шукаєм файлі шрифтов .ttf
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FONTS",
				massage: "Error: <%= error.message %>"
			}))
		)
		// Конвертуєм в .woff
		.pipe(fonter({
			formats: ['woff']
		}))
		// Вигружаєм в  папку з результатом
		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
		// Шукаєм файлі шрифтов .ttf
		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
		// Конвертуєм в  .woff2
		.pipe(ttf2woff2())
		// Вигружаєм в  папку з результатом
		.pipe(app.gulp.dest(`${app.path.build.fonts}`));
}
export const fontsStyle = () => {
	//Файл підключення шрифтів
	let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`; //---ПАПКА /scss/fonts.scss---час 1=22=13--------
	// Провіряем наявність файлів шрифтів
	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
		if (fontsFiles) { 			                                                 // час 1-20-15
			// провіряем наявність файлів стилів  для підключення шрифтів
			if (!fs.existsSync(fontsFile)) {
				// Якщо файла нема, то створюєм його 
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				for (var i = 0; i < fontsFiles.length; i++) {
					//  Записуем подключення шрифтов в файл стилів=============================================
					let fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
						if (fontWeight.toLowerCase() === 'thin') {
							fontWeight = 100;
						} else if (fontWeight.toLowerCase() === 'extralight') {
							fontWeight = 200;
						} else if (fontWeight.toLowerCase() === 'light') {
							fontWeight = 300;
						} else if (fontWeight.toLowerCase() === 'medium') {
							fontWeight = 500;
						} else if (fontWeight.toLowerCase() === 'semibold') {
							fontWeight = 600;
						} else if (fontWeight.toLowerCase() === 'bold') {
							fontWeight = 700;
						} else if (fontWeight.toLowerCase() === 'exrabold' || fontWeight.toLowerCase() === 'heavy') {
							fontWeight = 800;
						} else if (fontWeight.toLowerCase() === 'black') {
							fontWeight = 900;
						} else {
							fontWeight = 400;
						}
						fs.appendFile(fontsFile, `@font-face {
							\n\tfont-family: ${fontName};
							\n\tfont-display: swap;
							\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2");
							\n\tfont-weight: ${fontWeight};
							\n\tfont-style: normal;
							\n}\r\n`, cb);	 // час 1-22-01
						newFileOnly = fontFileName;
/*
						// `@font-face {
						// font-family: ${fontName};
						// font-display: swap;
						// src: url("../fonts/${fontFileName}.woff2") format ("woff2"),
						// font-weight: ${fontWeight};
						// font-style: normal;
					// }\r\n`, cb);
*/
					}
				}
			} else {
				console.log("File scss/fonts.scss already exists.Must be removed to update!");
			}
		}
	});
	return app.gulp.src(`${app.path.srcFolder}`);
	function cb() { }
}


