var id

var ProjectView = Backbone.View.extend({

	className: "projectView",

	events: {
		"click .projectName": "projectDetail",
		"click .delete": "deleteProject"
	},

	initialize: function(){
		this.render()
	},

	render: function() {

		var attrs = this.model.attributes

		attrs.deadline = moment(attrs.deadline).fromNow()

		var htmlString = this.template(attrs)
		this.$el.html(htmlString)

	},

	projectDetail: function() {
		id = this.model.id
		router.navigate("projects/" + this.model.id, { trigger: true })
	},

	deleteProject: function() {
		console.log('click')

		this.$el.remove()
		this.model.delete({
			headers: {Authorization: authToken}
		})
	},

	template: Handlebars.compile( $("#project-template").html() )



})