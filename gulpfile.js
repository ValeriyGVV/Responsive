// const { src } = require("gulp");
// const fileinclude = require('gulp-file-include');
// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/path.js";
// Импорт общих плагинов 
import { plugins } from "./gulp/config/plugins.js";
// Передаем значення в глобальную переменную
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins
}
//  Импорт задач 
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";  // час 1-12-00
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js"; // час 1-23-11
import { svgSprive } from "./gulp/tasks/svgSprive.js";// час 1-28-09
import { zip } from "./gulp/tasks/zip.js";// час 1-38-09
import { ftp } from "./gulp/tasks/ftp.js";// час 1-42-09

// Наблюдатель за изменениями в файлах 
function watcher() {
	gulp.watch(path.watch.files, gulp.series(copy, ftp));
	gulp.watch(path.watch.html, gulp.series(html, ftp)); // замість html(path.watch.html,html)
	gulp.watch(path.watch.scss, gulp.series(scss, ftp)); // -----час 55-34 
	gulp.watch(path.watch.js, gulp.series(js, ftp)); // -----час 1-03-58 
	gulp.watch(path.watch.images, gulp.series(images, ftp)); // -----час 1-12-08

}
export { svgSprive }
// Послідовне опрацювання шрифтів
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);// -----час 1-23-15

// Оснвні завдання
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));// ---набор--час 55-34(Заміна з paralleli на series 1-23-34)

//  Побудова сценаріев виконання задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks); // -----час 1-34-15
const deployZIP = gulp.series(reset, mainTasks, zip); // -----час 1-38-15
const deployFTP = gulp.series(reset, mainTasks, ftp); // -----час 1-42-15
// експорт сценариев 
export { dev }
export { build }
export { deployZIP }
export { deployFTP }
// Выполнение сценария по умолчанию
gulp.task('default', dev);













// ===========Стара версія==============================================


