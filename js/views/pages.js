// js/views/todos.js
var app = app || {};
// модель задачи
// ----------
app.Page = Backbone.Model.extend({
	defaults: {
		id: '0',
		content: '<h2>There are may be content!</h2>'
	}
});

// коллекция задачи
// ----------
var PagesList = Backbone.Collection.extend({
	model: app.Page,
	url: 'api/page'
});

app.Pages = new PagesList();

// представление задачи
// --------------
app.PagesView = Backbone.View.extend({
	
	tagName: 'div',
	className: 'page_content',
	
	template: _.template( $('#page-template').html() ),
	
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	}
});