// js/app.js
var app = app || {};
var blog = blog || {};
//var pages = pages || {};
var ENTER_KEY = 13;
$(function() {
	// начинаем с создания **App**.
	app = new PagesAppView();
	blog = new PostsAppView();
});