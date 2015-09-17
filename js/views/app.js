// js/views/app.js
//var app = app || {};

// наше приложение
// ---------------
PagesAppView = Backbone.View.extend({
	el: '#block_content',
	
	initialize: function() {
		//this.listenTo(app.Pages, 'all', this.render);
		this.listenTo(Pages, 'add', this.addOne);
		this.listenTo(Pages, 'visible', this.render);
		this.listenTo(Pages, 'routeTo', this.routeTo, this);
		this.$page = '';
	},
	render: function() {
		console.log("removing content at pages");
		this.$('#main').html('');
		Pages.each(this.addOne, this);
		Pages.fetch({data: {id: this.$page}, processData: true});
	},
	addOne: function( page ) {
		var view = new PagesView({ model: page });
		//$('.content').html( view.render().el );
		//console.log(this.$page);
		//console.log(page.attributes['content']);
		$('#main').html( page.attributes['content'] );
		if(this.$page != 'index')
			this.$('.post').remove();
	},
	addAll: function() {
		//this.$('#main').html('');
		//Pages.each(this.addOne, this);
	},
	routeTo: function( page ) {
		if(this.$page !== page['page']) {
			this.$page = page['page'];
			Pages.trigger('visible');
		}
	}
});


// наше приложение
// ---------------
PostsAppView = Backbone.View.extend({
	el: '#block_content',
	
	initialize: function() {
		this.listenTo(Posts, 'visible', this.render);
	},
	render: function() {
		console.log("removing content at posts");
		Posts.fetch();
		//this.$('.content').html('');
		this.$('.post').remove();
		Posts.each(this.addOne, this);
	
	},
	addOne: function( post ) {
		var view = new PostsView({ model: post });
		$('.content').append( view.render().el );
	},
	addAll: function() {
		//this.$('#blog__posts').html('');
		this.$('.post').remove();
		//Posts.each(this.addOne, this);
	}
});