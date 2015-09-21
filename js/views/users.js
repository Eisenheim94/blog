// js/views/todos.js
//var app = app || {};
// модель задачи
// ----------
User = Backbone.Model.extend({
	defaults: {
		id: 0,
		name: 'Unknown User',
		posts: 0,
		start: 0,
		likes: 0
		//content: 'There are may be content!',
		//author: 'Author Name',
		//date: 'date'
	}
});

// коллекция задачи
// ----------
UsersList = Backbone.Collection.extend({
	model: User,
	url: 'api/user',
	/*comparator: function(model) {
		return -model.get('id');
	},
	initialize: function() {
		this.sort();
	}*/
});

var Users = new UsersList();

// представление задачи
// --------------
UsersView = Backbone.View.extend({
	
	tagName: 'div',
	className: 'person',
	
	template: _.template( $('#user-template').html() ),
	
	events: {
	},
	initialize: function() {
		this.listenTo(Posts, 'add', this.addOne);
	},
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	},
	clear: function() {
		this.model.destroy();
	}
});