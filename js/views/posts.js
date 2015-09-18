// js/views/todos.js
//var app = app || {};
// модель задачи
// ----------
Post = Backbone.Model.extend({
	defaults: {
		//id: '0',
		content: 'There are may be content!',
		//author: 'Author Name',
		//date: 'date'
	}
});

// коллекция задачи
// ----------
PostsList = Backbone.Collection.extend({
	model: Post,
	url: 'api/blog',
	comparator: function(model) {
		return -model.get('id');
	},
	initialize: function() {
		this.sort();
	}
});

var Posts = new PostsList();

// представление задачи
// --------------
PostsView = Backbone.View.extend({
	
	tagName: 'div',
	className: 'post',
	
	template: _.template( $('#post-template').html() ),
	
	events: {
		'click .destroy': 'clear'
	},
	initialize: function() {
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(Posts, 'add', this.addNew);
		//this.listenTo(Posts, 'create', this.addOne);
		//Posts.trigger('sort');//();
	},
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	},
	clear: function() {
		this.model.destroy();
	}
});