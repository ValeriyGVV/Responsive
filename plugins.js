//  import notify from "browser-sync";
import replace from "gulp-replace";  //Поиск и замена
import plumber from "gulp-plumber"; //Обработка ошибок
import notify from "gulp-notify"; //Сообщение (подсказки)
import browsersync from "browser-sync"; //Локальний сервер
import newer from "gulp-newer"; //Перевірка обновлення
import ifPlugin from "gulp-if"; // Умовні вітки 1-31-08

//  Экспортируем  обьект
export const plugins = {
	replace: replace,
	plumber: plumber,
	notify:notify,
	browsersync: browsersync,
	newer: newer,
	if:ifPlugin
}