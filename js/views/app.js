// js/views/app.js
//var app = app || {};

// наше приложение
// ---------------


// USERS LOGIC
// -----------

UsersAppView = Backbone.View.extend({
	el: '#block_content',
	
	initialize: function() {
		//this.listenTo(app.Pages, 'all', this.render);
		this.listenTo(Users, 'add', this.addOne);
		this.listenTo(Users, 'visible', this.render);
		Users.fetch({data: {id: 1}, processData: true});
		console.log('usersFetch');
	},
	render: function() {
		this.$('.sidebar').html('');
		Users.each(this.addOne, this);
	},
	addOne: function( user ) {
		var view = new UsersView({ model: user });
		$('.sidebar').html( view.render().el );
	}
});

// PAGES LOGIC
// -----------

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


// POSTS LOGIC
// -----------


PostsAppView = Backbone.View.extend({
	el: '.content',
	
	events: {
		'click #send_post': 'createOnClick'
	},
	
	initialize: function() {
		this.listenTo(Posts, 'visible', this.render);
		this.listenTo(Posts, 'add', this.addNew);
		//this.$input = this.$('#new_post');
		this.$button = this.$('#send_post');
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
		console.log(post);
	},
	addNew: function( post ) {
		var view = new PostsView({ model: post });
		$( view.render().el ).insertAfter('#main');
		console.log(post);
	},
	addAll: function() {
		//this.$('#blog__posts').html('');
		//this.$('.post').remove();
		//Posts.each(this.addOne, this);
	},
	newAttributes: function() {
		
		function addZero( a ) {
			if( a < 10 )
				a = "0" + a;
			return a;
		}
		
		var now = new Date();
		var year = now.getFullYear();
		var month = addZero(now.getMonth()+1);
		var day = addZero(now.getDate());
		var hours = addZero(now.getHours());
		var minutes = addZero(now.getMinutes());
		var seconds = addZero(now.getSeconds());
		var date = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
		return {
			content: $('.content #new_post').val().trim(),
			author: 1,
			authorName: Users.get(1).attributes.name,
			date: date
		};
	},
	createOnClick: function( event ) {
		//console.log(this.$input);
		//$('.content #new_post').val("123");
		//if ( !this.$input.val().trim() ) {
		if ( !!$('.content #new_post').val().trim() ) {
			this.newAttributes();
			Posts.create( this.newAttributes() );
			//this.$input.val('');
			$('.content #new_post').val('');
		}
	}
});