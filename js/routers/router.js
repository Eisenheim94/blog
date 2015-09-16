// js/routers/router.js
// маршрутизатор задач
// ----------
var Workspace = Backbone.Router.extend({
	routes:{
		'.*': 'getBlog',
		'page/index': 'getBlog',
		'page/:id': 'getPage'
	},
	getPage: function( id ) {
		if(!id) {
			getBlog();
			return;
		}
		window.app.Pages.fetch({data: {id: id}, processData: true});
		window.app.Pages.trigger("visible");
		//window.app.PagesAppView.render();
		//window.app.PagesView.render();
	},
	getBlog: function( id ) {
		window.app.Posts.fetch();
		window.app.Posts.trigger("visible");
		//window.app.PostsAppView.render();
		//window.app.PostsView.render();
	}
});
app.PagesRouter = new Workspace();
Backbone.history.start();