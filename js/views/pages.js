// js/views/todos.js
//var app = app || {};
// модель задачи
// ----------
Page = Backbone.Model.extend({
	defaults: {
		id: '0',
		content: '<h2>There are may be content!</h2>'
	}
});

// коллекция задачи
// ----------
PagesList = Backbone.Collection.extend({
	model: Page,
	url: 'api/page'
});

Pages = new PagesList();

// представление задачи
// --------------
PagesView = Backbone.View.extend({
	
	tagName: 'div',
	className: 'page_content',
	
	events: {
	},
	
	template: _.template( $('#page-template').html() ),
	
	initialize: function() {
	},
	
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	}
});