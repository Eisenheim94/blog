// js/routers/router.js
var app = app || {};
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
		$.when(
			window.app.Pages.length || window.app.Pages.fetch({data: {id: id}, processData: true})
		).done(function() {
			window.app.Pages.trigger("visible");
		});
		//window.app.PagesAppView.render();
		//window.app.PagesView.render();
	},
	getBlog: function( id ) {
		$.when(
			window.app.Posts.length || window.app.Posts.fetch({
			success: function(collection, response, options) {
        console.log("@Stopcodes.fetch()");
        console.log(collection); // shows a collection of one element
        console.log(response);   // shows an array with the right 
                                 // number of elements
    }
			})
		).done(function() {
			window.app.Posts.trigger("visible");
			console.log("Posts Router" + window.app.Posts.length);
		});
		//window.app.PostsAppView.render();
		//window.app.PostsView.render();
	}
});
app.PagesRouter = new Workspace();
Backbone.history.start();