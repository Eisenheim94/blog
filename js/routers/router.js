// js/routers/router.js
//var app = app || {};
// маршрутизатор задач
// ----------

var Workspace = Backbone.Router.extend({
	routes:{
		'.*': 'getPage',
		//'page/index': 'getPage',
		'page/:id': 'getPage'
	},
	getPage: function( id ) {
		if(!id || id == "index") {
			this.getBlog( id );
			id = 'index';
		}
		$.when(
			Pages.length || Pages.fetch({data: {id: id}, processData: true})
		).done(function() {
			Pages.trigger("routeTo", {page: id});
		});
	},
	getBlog: function( id ) {
		$.when(
			window.Posts.length || window.Posts.fetch()
		).done(function() {
			window.Posts.trigger("visible");
		});
	}
});
app.PagesRouter = new Workspace();
Backbone.history.start();