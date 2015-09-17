// js/views/app.js
var app = app || {};

// наше приложение
// ---------------
app.PagesAppView = Backbone.View.extend({
	el: '#block_content',
	
	initialize: function() {
		//this.listenTo(app.Pages, 'all', this.render);
		this.listenTo(app.Pages, 'add', this.addOne);
		this.listenTo(app.Pages, 'visible', this.render);
		//fetch
		//app.Pages.fetch({data: {id: "3"}, processData: true});
	},
	render: function() {
		this.$('.content').html('');
		app.Pages.each(this.addOne, this);
	},
	addOne: function( page ) {
		var view = new app.PagesView({ model: page });
		$('.content').html( view.render().el );
	},
	addAll: function() {
		this.$('.content').html('');
		app.Pages.each(this.addOne, this);
	}
});


// наше приложение
// ---------------
app.PostsAppView = Backbone.View.extend({
	el: '#block_content',
	
	initialize: function() {
		//this.listenTo(app.Posts, 'all', this.render);
		//this.listenTo(app.Posts, 'post', this.render);
		//this.listenTo(app.Posts, 'add', this.addOne);
		//this.listenTo(app.Posts, 'all', this.addAll);
		this.listenTo(app.Posts, 'visible', this.render);
		console.log("Posts AppViewInit" + app.Posts.length);
		//fetch
		//app.Pages.fetch({data: {id: "3"}, processData: true});
	},
	render: function() {
		this.$('.content').html('');
		app.Posts.each(this.addOne, this);
		console.log("Posts Render" + app.Posts.length);
	},
	addOne: function( post ) {
		var view = new app.PostsView({ model: post });
		$('.content').append( view.render().el );
		console.log("Posts AddOne" + app.Posts.length);
	},
	addAll: function() {
		this.$('.content').html('');
		app.Posts.each(this.addOne, this);
		console.log("Posts AddAll" + app.Posts.length);
	}
});