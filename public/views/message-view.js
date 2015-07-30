var MessageView = Backbone.View.extend({

	className: "message-received",

	initialize: function() {
		this.render()
	},

	render: function() {
		var attrs = this.model

		var htmlString = this.template(attrs)
		this.$el.html(htmlString)
	},

	template: Handlebars.compile( $("#message-template").html() )	
})

