// js/views/todos.js
var app = app || {};
// модель задачи
// ----------
app.Post = Backbone.Model.extend({
	defaults: {
		id: '0',
		content: 'There are may be content!',
		author: 'Author Name',
		date: 'date'
	}
});

// коллекция задачи
// ----------
var PostsList = Backbone.Collection.extend({
	model: app.Post,
	url: 'api/blog',
	initialize: function() {
		console.log("Posts CollectionInit" + this.length);
	}
});

app.Posts = new PostsList();

// представление задачи
// --------------
app.PostsView = Backbone.View.extend({
	
	tagName: 'div',
	className: 'post',
	
	template: _.template( $('#post-template').html() ),
	
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
		console.log("Posts ViewRender" + app.Posts.length);
	}
});