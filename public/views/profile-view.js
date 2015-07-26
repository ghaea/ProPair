var profileView = Backbone.View.extend({

	initialize: function() {
		this.render()
	},

	render: function() {

		var attrs = this.model.attributes

		var htmlString = this.template(attrs)
		this.$el.html(htmlString)
	},

	template: Handlebars.compile( $("#myInfo-template").html() )	

})